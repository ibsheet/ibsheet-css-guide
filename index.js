gsap.registerPlugin(TextPlugin);

// const driver = window.driver.js.driver;
var driverJs = window.driver.js.driver;

// tippy.js 기본 설정
tippy.setDefaultProps({
  allowHTML: true,
  arrow: true,
  // followCursor: 'initial',
  theme: 'light',
  maxWidth: 600,
  placement: 'auto',
  boundary: 'viewport',
  interactive: true,
  appendTo: () => document.body,
  hideOnClick: false,
  onShown(instance) {
    if (instance.popper) {
      const elem = instance.popper;
      elem.addEventListener('mouseenter', () => {
        window.globalTippyInstances.forEach(inst => {
          if (inst != instance) {
            inst.hide();
          }
        });
      });
    }
  },
  onHidden(instance) {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
      const tabId = activeTab.id;
      let tippyAllHide = true;
      window.globalTippyInstances.forEach(inst => {
        if (inst && inst.state.isShown) {
          tippyAllHide = false;
        }
      });

      const tabDiv = document.getElementById(tabId);
      const tipButton = tabDiv.querySelector('#tipShow');
      if (tippyAllHide && tipButton && tipButton.textContent == '안내 숨기기') {
        if (tabId == 'layout-content') {
          layoutTippyInstances.forEach(instance => {
            if (instance) {
              instance.show();
            }
          });
        } else if (tabId == 'type-content') {
          typeTippyInstances.forEach(instance => {
            if (instance) {
              instance.show();
            }
          });
        } else if (tabId == 'filternsort-content') {
          filternsortTippyInstances.forEach(instance => {
            if (instance) {
              instance.show();
            }
          });
        } else if (tabId == 'focus-content') {
          focusTippyInstances.forEach(instance => {
            if (instance) {
              instance.show();
            }
          });
        } else if (tabId == 'tree-content') {
          treeTippyInstances.forEach(instance => {
            if (instance) {
              instance.show();
            }
          });
        } else if (tabId == 'subtotal-content') {
          subtotalTippyInstances.forEach(instance => {
            if (instance) {
              instance.show();
            }
          });
        } else if (tabId == 'group-content') {
          groupTippyInstances.forEach(instance => {
            if (instance) {
              instance.show();
            }
          });
        }
      }
      /*
      if (tippyAllHide) {
        if (tipButton) {
          tipButton.textContent = '안내 보기';
        }
      };
      */
    }
  }
});

// tippy 재설정 함수
window.reinitializeTippies = function() {
  // 기존 tippy들 파괴
  window.destroyAllTippies();

  // 열린 모든 tab의 script 재실행
  tabContents.forEach(tabContent => {
    if (tabContent.innerHTML) {
      const tabId = tabContent.id;
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
  });
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

// URL 해시값과 탭 ID 매핑
const hashToTabMap = {
  'tutorial': 'tutorial-content',
  'layout': 'layout-content',
  'header': 'header-content',
  'type': 'type-content',
  'type2': 'type2-content',
  'filternsort': 'filternsort-content',
  'focus': 'focus-content',
  'tree': 'tree-content',
  'subtotal': 'subtotal-content',
  'group': 'group-content',
  'icon': 'icon-content',
  // 'style': 'style-content'
};

// 탭 ID에서 해시값으로 변환하는 맵
const tabToHashMap = Object.fromEntries(
  Object.entries(hashToTabMap).map(([hash, tabId]) => [tabId, hash])
);

// 탭 전환 및 html 동적 로드
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const contents = {
  'tutorial-content':       './html/tab-tutorial.html',
  'layout-content':         './html/tab-layout.html',
  'header-content':        './html/tab-header.html',
  'type-content':           './html/tab-type.html',
  'type2-content':          './html/tab-type2.html',
  'filternsort-content':    './html/tab-filternsort.html',
  'focus-content':          './html/tab-focus.html',
  'tree-content':           './html/tab-tree.html',
  'subtotal-content':       './html/tab-subtotal.html',
  'group-content':          './html/tab-group.html',
  'icon-content':           './html/tab-icon.html',
  // 'icon1-content':          './html/tab-icon1.html',
  // 'icon2-content':          './html/tab-icon2.html',
  // 'icon3-content':          './html/tab-icon3.html',
  // 'icon4-content':          './html/tab-icon4.html',
  // 'icon5-content':          './html/tab-icon5.html',
  // 'aggrid-content':         './html/tab-aggrid.html',
  // 'style-content':          './html/tab-style.html',
};

// 탭 활성화 함수
function activateTab(tabId, updateHash = true) {
  // 버튼 활성화 상태 토글
  tabs.forEach(t => t.classList.remove('active'));
  const targetTab = document.querySelector(`[data-tab="${tabId}"]`);
  if (targetTab) {
    targetTab.classList.add('active');
  }

  // 탭 컨텐츠 표시/숨김 처리
  tabContents.forEach(div => {
    div.classList.remove('active');
    div.style.display = 'none';
  });
  
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.style.display = 'block';
    activeTab.classList.add('active');
  }

  if (window['tippy']) {
    window['tippy'].hideAll();
  }

  let tipButton = activeTab.querySelector('#tipShow');
  if (tipButton) {
    tipButton.textContent = '안내 보기';
  }

  if (tabId == 'tutorial-content') {
    // if (window.hasOwnProperty('tuto1')) {
    //   // tutorial 초기화
    //   tuto1 = true;
    //   tuto2 = false;
    //   tuto3 = false;
    //   tuto4 = false;
    //   tuto1Show();
    // }
    if (window.hasOwnProperty('tutorialSet')) tutorialSet();
  } else {
    // tutorial 관련 레이어 숨기기
    const tuto_layers = document.querySelectorAll('.tuto_layer');
    tuto_layers.forEach(function(tuto_layer) {
      tuto_layer.style.display = 'none';
    });

    showInspector(null, true);
  }

  // 필요시 탭 내용 동적 로드
  if (!document.getElementById(tabId).innerHTML) loadTab(tabId);

  // URL 해시 업데이트 (updateHash가 true인 경우에만)
  if (updateHash && tabToHashMap[tabId]) {
    const newHash = `#${tabToHashMap[tabId]}`;
    if (window.location.hash !== newHash) {
      history.pushState(null, '', newHash);
    }
  }
}

// URL 해시값에 따라 탭 활성화
function activateTabFromHash() {
  const fullHash = window.location.hash.slice(1); // # 제거
  
  // 쿼리 파라미터와 해시값 분리
  let hash = fullHash;
  let queryParams = '';
  
  if (fullHash.includes('?')) {
    const parts = fullHash.split('?');
    hash = parts[0];
    queryParams = parts[1];
  }
  
  if (hash && hashToTabMap[hash]) {
    const tabId = hashToTabMap[hash];
    activateTab(tabId, false); // URL은 이미 해시가 있으므로 updateHash는 false
    
    // 쿼리 파라미터가 있으면 추가 처리 (필요시)
    if (queryParams) {
      handleQueryParameters(queryParams, hash);
    }
  } else {
    // 기본 탭 (tutorial) 활성화
    activateTab('tutorial-content', false);
  }
}

// URL 디코딩 및 리터럴 문자 치환 함수
function changeLiteral(str) {
  let result = str;
  result = decodeURIComponent(result);

  // 줄바꿈 문자 \n이 있는 경우, 문자 치환
  if (result.includes('\\n')) {
    // \n 다음 문자가 공백이 아니고 }도 아닌 경우 공백 2개 추가
    result = result.replace(/\\n(?! |})/g, '\\n  ');
  
    // 리터럴 문자들을 실제 문자로 치환
    result = result.replace(/\\n/g, '\n')          // \n을 줄바꿈으로
                  .replace(/\\t/g, '\t')           // \t을 탭으로
                  .replace(/\\r/g, '\r')           // \r을 캐리지 리턴으로
                  .replace(/\\"/g, '"')            // \"을 따옴표로
                  .replace(/\\'/g, "'")            // \'을 작은따옴표로
                  .replace(/\\\\/g, '\\');         // \\을 백슬래시로
  }

  return result;
}

function setTheme(tabId, theme) {
  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    if (prefixTheme != theme) {
      const allElements = targetContent.querySelectorAll('*');
      // 현재 요소와 모든 하위 요소들에 대해 클래스 교체
      allElements.forEach(el => {
        if (el.className && typeof el.className === 'string') {
          if (el.className.indexOf(`${prefixTheme}`) !== -1) {
            el.className = el.className.replaceAll(`${prefixTheme}`, theme);
          }
        }
      });
    }
  }
}

// 쿼리 파라미터 처리 함수
function handleQueryParameters(queryParams, hash) {
  const urlParams = new URLSearchParams(queryParams);

  const customCss = urlParams.get('customCss');
  if (customCss) {
    // Style적용 가이드는 기본 테마를 기준으로 동작함
    setTimeout(() => {
      const tabId = hashToTabMap[hash];
      setTheme(tabId, 'IB');
      if (window.hasOwnProperty(hash+'ClickSetting')) {
        window[hash+'ClickSetting']('IB');
      }
    }, 100);

    let litStr = changeLiteral(customCss);
    
    setTimeout(() => {
      customCssEditor.setValue(litStr);
    }, 1000);

  }
  
  // 다른 파라미터들도 필요에 따라 처리 가능
  // 예: view, filter 등의 파라미터
  // theme 파라미터 처리
  // const theme = urlParams.get('theme');
  // if (theme) {
  //   const themeSelector = document.getElementById('theme-selector');
  //   if (themeSelector && themeSelector.querySelector(`option[value="${theme}"]`)) {
  //     themeSelector.value = theme;
  //     themeSelector.dispatchEvent(new Event('change'));
  //   }
  // }
}

// 브라우저 뒤로가기/앞으로가기 이벤트 처리
window.addEventListener('popstate', () => {
  activateTabFromHash();
});

// 탭 버튼 클릭 이벤트
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const activeId = tab.dataset.tab;
    activateTab(activeId, true); // 클릭 시에는 URL 해시 업데이트
  });
});

const themes = ['IBGR', 'IBMR', 'IBMT', 'IBSP', 'IBGY'];
// let prefixTheme = 'IB';
let prefixTheme = 'IBGY'; // 초기값을 Gray 테마로 설정

function loadTab(tabId) {
  // 이미 로드된 적이 없는 경우에만 tab click
  // if (!document.getElementById(tabId).innerHTML) {
  //   tabs.forEach(
  //     t => {
  //       if (t.dataset.tab == tabId) {
  //         t.click();
  //       }
  //     }
  //   );
  // }

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

// 페이지 로드 시 URL 해시값에 따라 탭 활성화
document.addEventListener('DOMContentLoaded', () => {
  activateTabFromHash();
});

// 스크립트가 이미 로드된 후에 실행되는 경우를 위해 즉시 실행도 추가
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', activateTabFromHash);
// } else {
//   // DOM이 이미 로드된 경우 즉시 실행
//   activateTabFromHash();
// }

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

  document.querySelectorAll('.tipShow').forEach(tipShow => {
    tipShow.textContent = '안내 보기';
  });
  
  if (window['tippy']) {
    window['tippy'].hideAll();
  }

  // tippy 인스턴스들 재설정
  window.reinitializeTippies();
})

// 테마 미리보기 클릭 이벤트
document.addEventListener('DOMContentLoaded', () => {
  const themePreviewItems = document.querySelectorAll('.theme-preview-item');
  const themeSelector = document.getElementById('theme-selector');
  
  // 초기 활성 테마 설정
  const initialTheme = themeSelector.value || 'gray';
  document.querySelector(`[data-theme="${initialTheme}"]`)?.classList.add('active');
  
  themePreviewItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedTheme = item.dataset.theme;
      
      // 모든 미리보기 아이템에서 active 클래스 제거
      themePreviewItems.forEach(preview => preview.classList.remove('active'));
      
      // 클릭된 아이템에 active 클래스 추가
      item.classList.add('active');
      
      // 기존 테마 선택기도 동기화
      themeSelector.value = selectedTheme;
      
      // 테마 변경 이벤트 트리거
      themeSelector.dispatchEvent(new Event('change'));
    });
  });
});

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

// Panel Resize Functionality
// document.addEventListener('DOMContentLoaded', function() {
//   const resizeDivider = document.getElementById('resize-divider');
//   const inspectorPanel = document.getElementById('inspector-panel');
//   const mainArea = document.querySelector('.main-area');
//   const container = document.querySelector('.container');
  
//   if (!resizeDivider || !inspectorPanel || !mainArea || !container) {
//     console.warn('Resize elements not found');
//     return;
//   }
  
//   let isResizing = false;
//   let startX = 0;
//   let startInspectorWidth = 420; // 초기 너비
  
//   const minInspectorWidth = 250;  // 최소 너비
//   const maxInspectorWidth = 800;  // 최대 너비
  
//   // 마우스 다운 이벤트
//   resizeDivider.addEventListener('mousedown', function(e) {
//     isResizing = true;
//     startX = e.clientX;
//     startInspectorWidth = inspectorPanel.offsetWidth;
    
//     // 드래그 중 상태 클래스 추가
//     container.classList.add('resizing');
//     document.body.style.cursor = 'col-resize';
//     document.body.style.userSelect = 'none';
    
//     e.preventDefault();
//     e.stopPropagation();
//   });
  
//   // 마우스 이동 이벤트
//   document.addEventListener('mousemove', function(e) {
//     if (!isResizing) return;
    
//     const deltaX = e.clientX - startX;
//     let newInspectorWidth = startInspectorWidth + deltaX;
    
//     // 최소/최대 너비 제한
//     newInspectorWidth = Math.max(minInspectorWidth, Math.min(maxInspectorWidth, newInspectorWidth));
    
//     // CSS 그리드 컬럼 업데이트
//     container.style.gridTemplateColumns = `${newInspectorWidth}px 5px 1fr`;
    
//     e.preventDefault();
//   });
  
//   // 마우스 업 이벤트
//   document.addEventListener('mouseup', function() {
//     if (!isResizing) return;
    
//     isResizing = false;
    
//     // 상태 클래스 제거
//     container.classList.remove('resizing');
//     document.body.style.cursor = '';
//     document.body.style.userSelect = '';
//   });
  
//   // 더블클릭으로 기본 크기 복원
//   resizeDivider.addEventListener('dblclick', function() {
//     container.style.gridTemplateColumns = '420px 5px 1fr';
//   });
  
//   // 창에서 마우스가 벗어날 때도 resize 종료
//   document.addEventListener('mouseleave', function() {
//     if (isResizing) {
//       isResizing = false;
//       container.classList.remove('resizing');
//       document.body.style.cursor = '';
//       document.body.style.userSelect = '';
//     }
//   });
// });
