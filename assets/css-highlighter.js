/**
 * Simple CSS syntax highlighter for tippy.js content
 */
function highlightCSS(cssCode) {
  // CSS 문법 하이라이팅을 위한 정규식 패턴들
  return cssCode
    // CSS 셀렉터 (클래스명, ID, 태그명)
    .replace(/^(\s*)([\.\#]?[a-zA-Z][a-zA-Z0-9\-_]*(?:\s*>\s*[a-zA-Z][a-zA-Z0-9\-_]*)*)\s*\{/gm, 
      '$1<span class="highlight-selector">$2</span> <span class="highlight-bracket">{</span>')
    
    // CSS 속성명과 값
    .replace(/(\s+)([a-zA-Z\-]+)(\s*:\s*)([^;]+)(;?)/g, 
      '$1<span class="highlight-property">$2</span>$3<span class="highlight-value">$4</span>$5')
    
    // 닫는 중괄호
    .replace(/(\s*)\}/g, '$1<span class="highlight-bracket">}</span>')
    
    // 주석
    .replace(/(\/\*.*?\*\/)/g, '<span class="highlight-comment">$1</span>');
}

/**
 * CSS 코드를 Monaco Editor 스타일로 포맷팅하는 함수
 */
function formatCSSCode(cssCode) {
  const highlightedCode = highlightCSS(cssCode);
  
  return `
    <div class="code-section">
      <pre><code>${highlightedCode}</code></pre>
    </div>
  `;
}

/**
 * CSS 코드를 라인별로 처리하여 하이라이팅
 */
function createHighlightedCSS(cssLines) {
  const formattedLines = cssLines.map(line => {
    // 들여쓰기 보존
    const indent = line.match(/^\s*/)[0];
    const content = line.trim();
    
    if (!content) return line;
    
    // 셀렉터 라인
    if (content.includes('{')) {
      const selector = content.replace(/\s*\{.*/, '');
      return `${indent}<span class="highlight-selector">${selector}</span> <span class="highlight-bracket">{</span>`;
    }
    
    // 속성 라인
    if (content.includes(':') && content.includes(';')) {
      const [property, ...valueParts] = content.split(':');
      const value = valueParts.join(':').replace(';', '');
      return `${indent}<span class="highlight-property">${property.trim()}</span>: <span class="highlight-value">${value.trim()}</span>;`;
    }
    
    // 닫는 중괄호
    if (content === '}') {
      return `${indent}<span class="highlight-bracket">}</span>`;
    }
    
    // 기타 라인 (주석 등)
    if (content.startsWith('/*') && content.endsWith('*/')) {
      return `${indent}<span class="highlight-comment">${content}</span>`;
    }
    
    return line;
  });
  
  return formattedLines.join('\n');
}

/**
 * CSS 속성 객체를 하이라이팅된 CSS 문자열로 변환
 * @param {string} selector - CSS 셀렉터
 * @param {Object} properties - CSS 속성들 (없으면 스타일시트에서 자동으로 가져옴)
 * @returns {string} 하이라이팅된 CSS 문자열
 */
function createCSSBlock(selector, properties) {
  // properties가 없거나 빈 객체인 경우 스타일시트에서 자동으로 가져오기
  if (!properties || typeof properties !== 'object' || Object.keys(properties).length === 0) {
    // css-utils.js의 공통 함수 사용
    properties = window.CSSUtils ? window.CSSUtils.getStylesFromStyleSheets(selector) : {};
  }
  
  // 여전히 속성이 없으면 빈 문자열 반환
  if (!properties || Object.keys(properties).length === 0) {
    return `<span class="highlight-selector">${selector}</span> <span class="highlight-bracket">{</span>\n  <span class="highlight-comment"></span>\n<span class="highlight-bracket">}</span>`;
  }
  
  let css = `<span class="highlight-selector">${selector}</span> <span class="highlight-bracket">{</span>\n`;
  
  for (const [prop, value] of Object.entries(properties)) {
    css += `  <span class="highlight-property">${prop}</span>: <span class="highlight-value">${value}</span>;\n`;
  }
  
  css += `<span class="highlight-bracket">}</span>`;
  return css;
}

/**
 * Tippy 콘텐츠를 생성하는 헬퍼 함수
 * @param {string} title - 제목 (CSS 클래스명)
 * @param {string} description - 설명
 * @param {string|Array} selectorOrBlocks - CSS 셀렉터 또는 CSS 블록 배열
 * @param {Object} properties - CSS 속성들 (selectorOrBlocks가 문자열일 때만 사용, 없으면 자동으로 스타일시트에서 가져옴)
 * @returns {string} 완성된 tippy 콘텐츠
 */
function createTippyContent(title, description, selectorOrBlocks, properties = {}) {
  let cssContent = '';
  
  if (Array.isArray(selectorOrBlocks)) {
    // 배열인 경우: 여러 CSS 블록들
    cssContent = selectorOrBlocks.map(block => {
      // 각 블록에 대해 properties가 없으면 스타일시트에서 자동으로 가져오기
      const blockProperties = block.properties || 
        (window.CSSUtils ? window.CSSUtils.getStylesFromStyleSheets(block.selector) : {});
      return createCSSBlock(block.selector, blockProperties);
    }).join('\n\n');
  } else {
    // 문자열인 경우: 단일 CSS 블록
    // properties가 비어있으면 스타일시트에서 자동으로 가져오기
    const finalProperties = Object.keys(properties).length > 0 ? properties : 
      (window.CSSUtils ? window.CSSUtils.getStylesFromStyleSheets(selectorOrBlocks) : {});
    cssContent = createCSSBlock(selectorOrBlocks, finalProperties);
  }
  
  return `
    <div class="guide-content">
      <h4>${title}</h4>
      <p>${description}</p>
      <div class="code-section">
        <pre><code>${cssContent}</code></pre>
      </div>
    </div>
  `;
}
