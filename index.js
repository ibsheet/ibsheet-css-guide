// tippy.js 기본 설정
tippy.setDefaultProps({
  allowHTML: true,
  theme: 'light',
  maxWidth: 600,
  placement: 'auto',
  // placement: 'top',
  boundary: 'viewport',
  interactive: true,
  appendTo: () => document.body,
  // trigger: 'mouseenter click', 
});

// 전역 tippy 인스턴스 관리
window.globalTippyInstances = [];

// tippy 인스턴스 등록 함수
window.registerTippy = function(instance) {
  if (instance && window.globalTippyInstances.indexOf(instance) === -1) {
    window.globalTippyInstances.push(instance);
  }
};

// 모든 tippy 인스턴스 파괴 함수
window.destroyAllTippies = function() {
  window.globalTippyInstances.forEach(instance => {
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
  });
  window.globalTippyInstances = [];
};

// tippy 재설정 함수
window.reinitializeTippies = function() {
  // 기존 tippy들 파괴
  window.destroyAllTippies();
  
  // 현재 활성화된 탭의 스크립트 파일 다시 실행
  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab) {
    const tabId = activeTab.id;
    const jsFile = './script/' + tabId + '.js';
    
    // 기존 스크립트 태그 제거
    const existingScript = document.querySelector('script[src*="' + tabId + '.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // 새 스크립트 태그 추가 (캐시 방지를 위해 timestamp 추가)
    const script = document.createElement('script');
    script.src = jsFile + '?t=' + Date.now();
    script.async = false;
    document.body.appendChild(script);
  }
};

// 테마 클래스 교체 함수
function replaceThemeClasses(newPrefix, themes) {
  // 모든 탭 콘텐츠 영역에서 클래스 교체
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabContents.forEach(tabContent => {
    replaceThemeInElement(tabContent, newPrefix, themes);
  });
  
  // 메인 영역에서도 클래스 교체 (현재 활성화된 탭)
  const mainArea = document.querySelector('.main-area');
  if (mainArea) {
    replaceThemeInElement(mainArea, newPrefix, themes);
  }
}

// 특정 요소와 그 하위 요소들에서 테마 클래스 교체
function replaceThemeInElement(element, newPrefix, themes) {
  if (!element) return;
  
  // 모든 하위 요소들 가져오기
  const allElements = element.querySelectorAll('*');
  
  // 현재 요소와 모든 하위 요소들에 대해 클래스 교체
  [element, ...allElements].forEach(el => {
    if (el.className && typeof el.className === 'string') {

      if (el.className.indexOf('IB') === -1) return;

      let hasChanged = false;
      for (let theme of themes) {
        if (el.className.indexOf(theme) !== -1) {
          hasChanged = true;
          // el.className = el.className.replace(new RegExp(`^${theme}`), newPrefix);
          el.className = el.className.replaceAll(`${theme}`, newPrefix);
          break;
        }
      }

      if (!hasChanged && el.className.indexOf('IB') !== -1 && newPrefix !== 'IB') {
        el.className = el.className.replaceAll(`IB`, newPrefix);
      }
    }
  });
}

// 탭 전환 및 html 동적 로드
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const contents = {
  'main-content': './html/tab-main.html',
  // 'sort-content': './html/tab-sort.html',
  // 'filter-content': './html/tab-filter.html',
  'filternsort-content': './html/tab-filternsort.html',
  'focus-content': './html/tab-focus.html',
  'tree-content': './html/tab-tree.html',
  'subtotal-content': './html/tab-subtotal.html',
  'group-content': './html/tab-group.html',
  'icon-content1': './html/tab-icon1.html',
  'icon-content2': './html/tab-icon2.html',
  'icon-content3': './html/tab-icon3.html',
  'icon-content4': './html/tab-icon4.html',
  'icon-content5': './html/tab-icon5.html',
};

const themes = ['IBGR', 'IBMR', 'IBMT', 'IBSP', 'IBGY'];
// let prefixTheme = 'IB';
let prefixTheme = 'IBGY'; // 초기값을 Gray 테마로 설정

function loadTab(tabId) {
  // const panel = document.getElementById("inspector-panel");
  // if (panel) {
  //   panel.classList.remove('active');
  //   // Inspector 콘텐츠 초기화 (가이드가 다시 보이도록)
  //   const inspectorContent = panel.querySelector('#inspector-content');
  //   if (inspectorContent) {
  //     inspectorContent.remove();
  //   }
  // }

  fetch(contents[tabId])
    .then(res => res.text())
    .then(html => {
      const tabDiv = document.getElementById(tabId);
      tabDiv.innerHTML = html;
      
      if (prefixTheme) {
        replaceThemeInElement(tabDiv, prefixTheme, themes);
      }
      
      // alternate 색상 설정
      // setAlternateColor();
      // setReadOnlyColor();
      
      // tabId에 맞는 JS를 동적으로 로드
      const jsFile = './script/'+tabId + '.js';
      if (!document.querySelector('script[src="' + jsFile + '"]')) {
          // 파일 존재 여부 확인
          fetch(jsFile, { method: "HEAD" })
            .then(response => {
              if (response.ok) {
                // 파일이 존재하면 script 태그 추가
                const script = document.createElement('script');
                script.src = jsFile;
                script.async = false; // 필요시 동기 실행
                document.body.appendChild(script);
              } else {
                // 파일이 없으면 에러 처리 또는 무시
                console.warn('JS file not found:', jsFile);
              }
            })
            .catch(err => {
              console.warn('Error checking JS file:', jsFile, err);
            });
        }
    });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // 버튼 활성화 상태 토글
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // 탭 컨텐츠 표시/숨김 처리
    tabContents.forEach(div => {
      div.classList.remove('active');
      div.style.display = 'none';
    });
    const activeId = tab.dataset.tab;
    const activeTab = document.getElementById(activeId);
    activeTab.style.display = 'block';
    activeTab.classList.add('active');
    // 필요시 탭 내용 동적 로드
    if (!document.getElementById(activeId).innerHTML)
      loadTab(activeId);
  });
});

// 최초 메인 탭 로드
loadTab('main-content');
// loadTab('group-content');
// loadTab('icon-content1');

document.getElementById('theme-selector').addEventListener('change', function() {
  const selectedTheme = this.value;
  switch (selectedTheme) {
    case 'grace':
      prefixTheme = 'IBGR';
      break;
    case 'material':
      prefixTheme = 'IBMR';
      break;
    case 'mint':
      prefixTheme = 'IBMT';
      break;
    case 'simple':
      prefixTheme = 'IBSP';
      break;
    case 'gray':
      prefixTheme = 'IBGY';
      break;
    default:
      prefixTheme = 'IB';
      break;
  }
  // 모든 탭의 HTML에서 테마 클래스 교체
  replaceThemeClasses(prefixTheme, themes);

  // alternate 색상도 다시 설정
  setAlternateColor();
  setReadOnlyColor();

  // tippy 인스턴스들 재설정
  window.reinitializeTippies();
})

function setAlternateColor() {
  // ColorAlternate 클래스에서 background-color 가져오기
  const colorAlternateClass = `.${prefixTheme}ColorAlternate`;
  let backgroundColor = null;
  
  // #custom-inspector-style에서 해당 클래스 확인
  const customInspectorStyle = document.getElementById('custom-inspector-style');
  if (customInspectorStyle && customInspectorStyle.textContent) {
    const styleContent = customInspectorStyle.textContent;
    const classPattern = new RegExp(`\\.${prefixTheme}ColorAlternate\\s*{[^}]*background-color\\s*:\\s*([^;]+)`, 'i');
    const match = styleContent.match(classPattern);
    
    if (match && match[1]) {
      backgroundColor = match[1].trim();
    }
  }
  
  // #custom-inspector-style에서 찾지 못한 경우 기존 방식 사용
  if (!backgroundColor) {
    const AlterNateBackgroundColor = window.CSSUtils.getStylesFromStyleSheets(colorAlternateClass);
    backgroundColor = AlterNateBackgroundColor['background-color'];
  }

  const alternateElements = document.querySelectorAll(`.${prefixTheme}ClassAlternate > td:not(.${prefixTheme}CellIndex)`);

  // 각 요소에 background-color 인라인 스타일 적용
  alternateElements.forEach(element => {
    element.style.backgroundColor = backgroundColor;
  });
}

function setReadOnlyColor() {
  // ColorReadOnly 클래스에서 background-color 가져오기
  const colorReadOnlyClass = `.${prefixTheme}ColorReadOnly`;
  let backgroundColor = null;

  // #custom-inspector-style에서 해당 클래스 확인
  const customInspectorStyle = document.getElementById('custom-inspector-style');
  if (customInspectorStyle && customInspectorStyle.textContent) {
    const styleContent = customInspectorStyle.textContent;
    const classPattern = new RegExp(`\\.${prefixTheme}ColorReadOnly\\s*{[^}]*background-color\\s*:\\s*([^;]+)`, 'i');
    const match = styleContent.match(classPattern);
    if (match && match[1]) {
      backgroundColor = match[1].trim();
    }
  }

  // #custom-inspector-style에서 찾지 못한 경우 기존 방식 사용
  if (!backgroundColor) {
    const readOnlyBackgroundColor = window.CSSUtils.getStylesFromStyleSheets(colorReadOnlyClass);
    backgroundColor = readOnlyBackgroundColor['background-color'];
  }

  const readOnlyElements = document.querySelectorAll(`td.${prefixTheme}ClassReadOnly`);
  // 각 요소에 background-color 인라인 스타일 적용
  readOnlyElements.forEach(element => {
    element.style.backgroundColor = backgroundColor;
  });
}
