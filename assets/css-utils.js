/**
 * CSS 유틸리티 함수들 - 공통 모듈
 * inspector.js와 css-highlighter.js에서 공통으로 사용하는 CSS 관련 함수들
 */

/**
 * 모든 스타일시트에서 CSS 규칙들을 추출하는 함수
 * @returns {Promise<CSSRule[]>} CSS 규칙 배열
 */
async function getCSSRules() {
  const sheets = Array.from(document.styleSheets);
  let rules = [];
  for (const sheet of sheets) {
    try {
      rules = rules.concat(Array.from(sheet.cssRules));
    } catch (e) {
      // CORS로 읽을 수 없는 외부 CSS는 무시
      console.warn('Could not access cssRules for stylesheet:', sheet.href, e);
    }
  }
  return rules;
}

/**
 * 실제 스타일시트에서 특정 셀렉터와 일치하는 CSS 속성들을 찾는 함수
 * @param {string} selector - CSS 셀렉터
 * @returns {Object} 찾은 CSS 속성들
 */
function getStylesFromStyleSheets(selector) {

  const styles = {};
  
  try {
    // 모든 스타일시트를 순회
    for (let i = 0; i < document.styleSheets.length; i++) {
      const styleSheet = document.styleSheets[i];
      
      try {
        // 각 스타일시트의 규칙들을 확인
        const rules = styleSheet.cssRules || styleSheet.rules;
        if (!rules) continue;
        
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          
          // CSS 규칙이 우리가 찾는 셀렉터와 일치하는지 확인
          if (rule.type === CSSRule.STYLE_RULE && rule.selectorText) {

            // 셀렉터가 일치하거나 포함되는지 확인
            const ruleSelector = rule.selectorText.toLowerCase();
            const targetSelector = selector.toLowerCase();

            // if (ruleSelector === targetSelector || 
            //     ruleSelector.includes(targetSelector) ||
            //     targetSelector.includes(ruleSelector.replace(/[\.#]/g, ''))
            //   ) {
            if (ruleSelector === targetSelector) {
              const cssText = rule.cssText;
              // CSS 텍스트에서 중괄호 안의 속성들만 추출
              const match = cssText.match(/\{([\s\S]*)\}/);
              if (match) {
                const properties = match[1].trim();
                
                // CSS 속성을 안전하게 파싱하는 함수
                const parseCSS = (cssString) => {
                  const result = {};
                  let i = 0;
                  
                  while (i < cssString.length) {
                    // 공백 건너뛰기
                    while (i < cssString.length && /\s/.test(cssString[i])) {
                      i++;
                    }
                    
                    if (i >= cssString.length) break;
                    
                    // 속성명 찾기
                    let propStart = i;
                    while (i < cssString.length && cssString[i] !== ':') {
                      i++;
                    }
                    
                    if (i >= cssString.length) break;
                    
                    const property = cssString.substring(propStart, i).trim();
                    i++; // ':' 건너뛰기
                    
                    // 공백 건너뛰기
                    while (i < cssString.length && /\s/.test(cssString[i])) {
                      i++;
                    }
                    
                    // 값 찾기 (세미콜론까지, 단 따옴표나 괄호 안은 제외)
                    let valueStart = i;
                    let depth = 0;
                    let inQuotes = false;
                    let quoteChar = '';
                    
                    while (i < cssString.length) {
                      const char = cssString[i];
                      
                      if (!inQuotes) {
                        if (char === '"' || char === "'") {
                          inQuotes = true;
                          quoteChar = char;
                        } else if (char === '(') {
                          depth++;
                        } else if (char === ')') {
                          depth--;
                        } else if (char === ';' && depth === 0) {
                          break;
                        }
                      } else {
                        if (char === quoteChar && cssString[i-1] !== '\\') {
                          inQuotes = false;
                          quoteChar = '';
                        }
                      }
                      
                      i++;
                    }
                    
                    const value = cssString.substring(valueStart, i).trim();
                    
                    if (property && value) {
                      result[property] = value;
                    }
                    
                    // 세미콜론 건너뛰기
                    if (i < cssString.length && cssString[i] === ';') {
                      i++;
                    }
                  }
                  
                  return result;
                };
                
                // CSS 속성 파싱
                const parsedStyles = parseCSS(properties);
                Object.assign(styles, parsedStyles);
              }
              
              // console.log('parsed styles:', styles);
              break;
            }
          }
        }
      } catch (e) {
        // CORS 등의 이유로 접근할 수 없는 스타일시트는 무시
        console.warn('Cannot access stylesheet:', styleSheet.href, e);
      }
    }
  } catch (e) {
    console.warn('Error accessing stylesheets:', e);
  }
  
  return styles;
}

/**
 * 특정 클래스명들에 대한 CSS 정보를 추출하는 함수
 * @param {string[]} classNames - 검색할 클래스명 배열
 * @param {CSSRule[]} cssRules - CSS 규칙 배열
 * @returns {Object} 클래스별 CSS 정보
 */
function getClassCSS(classNames, cssRules) {
  const classCSS = {};
  
  for (const className of classNames) {
    for (const rule of cssRules) {
      if (rule.type === CSSRule.STYLE_RULE && rule.selectorText) {
        const selector = rule.selectorText;
        if (selector.includes(`.${className}`) || 
            selector.includes(`#${className}`) ||
            selector === className) {
          if (!classCSS[className]) {
            classCSS[className] = [];
          }
          classCSS[className].push({
            selector: selector,
            cssText: rule.cssText,
            style: rule.style
          });
        }
      }
    }
  }
  
  return classCSS;
}

/**
 * 기본 클래스 CSS를 가져오는 함수
 * @param {string} className - 클래스명
 * @param {CSSRule[]} cssRules - CSS 규칙 배열
 * @returns {string} CSS 텍스트
 */
function getDefaultClassCSS(className, cssRules) {
  const normalizedClassName = className.replace(/^\./, '');
  
  for (const rule of cssRules) {
    if (rule.type === CSSRule.STYLE_RULE && rule.selectorText) {
      const selector = rule.selectorText;
      // 정확한 클래스 이름 매칭
      if (selector === `.${normalizedClassName}` || 
          selector.includes(`.${normalizedClassName}:`) ||
          selector.includes(`.${normalizedClassName}.`) ||
          selector.includes(`.${normalizedClassName} `)) {
        
        // CSS 텍스트에서 선택자 부분 제거하고 속성만 반환
        const cssText = rule.cssText;
        const match = cssText.match(/\{([\s\S]*)\}/);
        if (match) {
          return match[1].trim();
        }
      }
    }
  }
  
  return '';
}

/**
 * CSS 텍스트를 정규화하는 함수 (공백, 개행, 세미콜론 등을 정리)
 * @param {string} cssText - 정규화할 CSS 텍스트
 * @returns {string} 정규화된 CSS 텍스트
 */
function normalizeCSSText(cssText) {
  if (!cssText || typeof cssText !== 'string') return '';
  
  // CSS 규칙에서 선택자와 속성 부분을 분리
  const match = cssText.match(/^([^{]+)\{([^}]*)\}/s);
  if (!match) return cssText;
  
  const [, selector, properties] = match;
  
  // 속성들을 정리하고 정렬
  const props = properties
    .split(';')
    .map(prop => prop.trim())
    .filter(prop => prop.length > 0)
    .sort();
  
  return `${selector.trim()} {\n  ${props.join(';\n  ')}${props.length > 0 ? ';' : ''}\n}`;
}

/**
 * CSS 속성에 색상이나 이미지 관련 속성이 있는지 확인하는 함수
 * @param {string} cssText - 확인할 CSS 텍스트
 * @returns {boolean} 색상이나 이미지 속성 포함 여부
 */
function hasColorOrImageProps(cssText) {
  // 입력값 타입 체크
  if (!cssText || typeof cssText !== 'string') {
    return false;
  }

  const COLOR_PROPS = [
    'color',
    'background-color',
    'border-color',
    'outline-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'text-decoration-color',
    'caret-color',
  ];

  const IMAGE_PROPS = [
    'background-image',
    'background',
    'list-style-image',
    'border-image',
    'content'
  ];

  const allProps = [...COLOR_PROPS, ...IMAGE_PROPS];
  const bodyMatch = cssText.match(/\{([\s\S]+)\}/);
  if (!bodyMatch) return false;
  
  const body = bodyMatch[1];
  const lines = body.split(/;\s*|\n/).map(l => l.trim()).filter(l => l);
  
  return lines.some(line => {
    const [prop] = line.split(':').map(x => x.trim());
    return allProps.includes(prop) || 
           (prop === 'background' && line.includes('url(')) ||
           (prop === 'content' && line.includes('url('));
  });
}

// 전역 스코프에 함수들 노출
window.CSSUtils = {
  getCSSRules,
  getStylesFromStyleSheets,
  getClassCSS,
  getDefaultClassCSS,
  normalizeCSSText,
  hasColorOrImageProps
};