// 색상 또는 배경 이미지 속성이 있는지 확인하는 함수 - 공통 모듈 사용
function hasColorOrImageProps(cssText) {
  if (window.CSSUtils) {
    return window.CSSUtils.hasColorOrImageProps(cssText);
  }
  
  // 폴백: 기존 로직 유지
  if (!cssText || typeof cssText !== 'string') return false;
  
  const colorImageProps = [
    'color', 'background-color', 'background', 'background-image',
    'border-color', 'border-top-color', 'border-right-color', 
    'border-bottom-color', 'border-left-color', 'box-shadow',
    'text-shadow', 'outline-color', 'fill', 'stroke'
  ];
  
  const lowerCssText = cssText.toLowerCase();
  return colorImageProps.some(prop => 
    lowerCssText.includes(prop + ':') || 
    lowerCssText.includes(prop + ' ')
  );
}

// Monaco Editor 관련 변수 및 함수
let monacoLoaded = false;
let customCssEditor = null;
let cssClassEditors = new Map();
let currentHighlightedElements = []; // 현재 하이라이트된 요소들을 추적

// CSS 클래스명 추출 함수
function extractClassNameFromCSS(cssText) {
  if (!cssText || typeof cssText !== 'string') return null;
  
  const match = cssText.match(/^\s*\.([A-Za-z0-9_-]+)(?:\s*,\s*[^{]*)*\s*\{/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

// Monaco Editor 컨테이너로부터 클래스명 추출 함수
function getClassNameFromEditorContainer(editor) {
  try {
    // Monaco Editor의 DOM 요소 찾기
    const editorElement = editor.getDomNode();
    if (!editorElement) return null;
    
    // 에디터 컨테이너의 이전 형제 요소에서 .css-class-name 찾기
    let currentElement = editorElement.parentElement;
    while (currentElement) {
      const classNameElement = currentElement.querySelector('.css-class-name');
      if (classNameElement) {
        const text = classNameElement.innerText || classNameElement.textContent || '';
        // '▷ ' 제거하고 클래스명만 반환
        return text.replace(/^▷\s*/, '').trim();
      }
      
      // 현재 요소의 이전 형제 요소 확인
      const prevSibling = currentElement.previousElementSibling;
      if (prevSibling && prevSibling.classList.contains('css-class-name')) {
        const text = prevSibling.innerText || prevSibling.textContent || '';
        return text.replace(/^▷\s*/, '').trim();
      }
      
      // 상위 요소로 이동
      currentElement = currentElement.parentElement;
    }
    
    return null;
  } catch (error) {
    console.warn('Error getting class name from editor container:', error);
    return null;
  }
}

// 특정 클래스명을 가진 모든 요소에 하이라이트 적용
function applyHighlightToClass(className) {
  if (!className) return;
  
  // 기존 하이라이트 제거
  removeHighlightFromElements();
  
  // 새로운 요소들에 하이라이트 적용
  let elements = document.querySelectorAll(`.${className}`);
  // console.log('applyHighlightToClass:', className, elements);
  if (className === `${prefixTheme}ColorAlternate`) {
    elements = document.querySelectorAll(`.${prefixTheme}ClassAlternate > td:not(.${prefixTheme}CellIndex)`);
  } else if (className === `${prefixTheme}ColorReadOnly`) {
    elements = document.querySelectorAll(`td.${prefixTheme}ClassReadOnly`);
  }

  elements.forEach(element => {
    element.classList.add('css-editing-highlight');
    currentHighlightedElements.push(element);
  });
}

// 모든 하이라이트된 요소에서 하이라이트 제거
function removeHighlightFromElements() {
  currentHighlightedElements.forEach(element => {
    if (element && element.classList) {
      element.classList.remove('css-editing-highlight');
    }
  });
  currentHighlightedElements = [];
}

// Monaco Editor 기본 옵션 생성 함수
function getMonacoEditorOptions(value = '') {
  return {
    value: value,
    language: 'css',
    theme: 'vs-dark',
    automaticLayout: true,
    fontSize: 14,
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontWeight: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    minimap: { enabled: false },
    folding: true,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    glyphMargin: false,
    contextmenu: false,
    wordWrap: 'on',
    wordWrapColumn: 120,
    formatOnPaste: true,
    formatOnType: true,
    renderLineHighlight: 'none',
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    // 자동완성(suggest) 기능 비활성화
    quickSuggestions: false,
    suggestOnTriggerCharacters: false,
    acceptSuggestionOnEnter: 'off',
    acceptSuggestionOnCommitCharacter: false,
    tabCompletion: 'off',
    wordBasedSuggestions: false,
    parameterHints: { enabled: false },
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
      useShadows: false
    },
    hover: {
      enabled: true,             // Hover 기능 켜기
      delay: 0,                // hover 나타나는 시간 (기본은 300ms)
      sticky: true               // 마우스 hover 시 유지 여부
    },
    // overflow-y:auto 인 패널(#inspector-panel) 내부에서 컬러피커/자동완성 등이 잘리지 않도록
    // 위젯을 body 아래로 고정(fixed) 렌더링
    fixedOverflowWidgets: true,
    overflowWidgetsDomNode: document.body,
    // 스크롤 및 레이아웃 최적화 (배경 이미지 대응)
    // smoothScrolling: true,
    // mouseWheelScrollSensitivity: 1,
    // fastScrollSensitivity: 5
  };
}

// Monaco Editor 로드 및 초기화
async function loadMonacoEditor() {
  if (monacoLoaded) return true;
  
  return new Promise((resolve, reject) => {
    // AMD 로더가 이미 존재하는지 확인
    if (typeof window.require === 'undefined') {
      console.error('Monaco Editor loader not found');
      reject(new Error('Monaco Editor loader not found'));
      return;
    }
    
    // require를 안전하게 참조
    const monacoRequire = window.require;
    
    // Monaco Editor 경로 설정
    monacoRequire.config({ 
      paths: { 
        'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs' 
      }
    });
    
    // 에러 핸들링을 위한 타임아웃
    const timeoutId = setTimeout(() => {
      reject(new Error('Monaco Editor loading timeout'));
    }, 10000);
    
    monacoRequire(['vs/editor/editor.main'], function() {
      clearTimeout(timeoutId);
      
      try {
        // Monaco Editor가 완전히 로드되었는지 확인
        if (!window.monaco || !window.monaco.editor || typeof window.monaco.editor.create !== 'function') {
          throw new Error('Monaco Editor API not properly initialized');
        }
        
        // CSS 언어 지원 설정
        if (window.monaco.languages && window.monaco.languages.css) {
          window.monaco.languages.css.cssDefaults.setOptions({
            validate: false,
            lint: {
              unknownAtRules: 'ignore',
              ieHack: 'ignore',
              duplicateProperties: 'ignore',
              compatibleVendorPrefixes: 'ignore',
              vendorPrefix: 'ignore',
              unknownVendorSpecificProperties: 'ignore'
            }
          });
        }
        
        // 안전한 색상 제공자 등록 (스크립트 오류 방지)
        if (window.monaco.languages && window.monaco.languages.registerColorProvider) {
          try {
            window.monaco.languages.registerColorProvider('css', {
              provideColorPresentations: function(model, colorInfo, token) {
                try {
                  // model이 dispose되었는지 확인
                  if (!model || typeof model.isDisposed === 'function' && model.isDisposed()) {
                    return [];
                  }
                  
                  const color = colorInfo.color;
                  if (!color) return [];
                  
                  return [{
                    label: `rgba(${Math.round(color.red * 255)}, ${Math.round(color.green * 255)}, ${Math.round(color.blue * 255)}, ${color.alpha})`
                  }];
                } catch (error) {
                  console.warn('Error in provideColorPresentations:', error);
                  return [];
                }
              },
              provideDocumentColors: function(model, token) {
                try {
                  // model이 dispose되었는지 확인
                  if (!model || typeof model.isDisposed === 'function' && model.isDisposed()) {
                    return [];
                  }
                  return [];
                } catch (error) {
                  console.warn('Error in provideDocumentColors:', error);
                  return [];
                }
              }
            });
          } catch (colorProviderError) {
            console.warn('Error registering color provider:', colorProviderError);
          }
        }
        
        monacoLoaded = true;
        // 투명 컬러피커/위젯 배경 문제 방지를 위한 커스텀 다크 테마 정의
        try {
          const themeName = 'ibsheet-dark';
          window.monaco.editor.defineTheme(themeName, {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: '', background: '1e1e1e', foreground: 'd4d4d4' }
            ],
            colors: {
              'editor.background': '#1e1e1e',
              'editorWidget.background': '#1e1e1e',
              'editorWidget.border': '#454545',
              'editorHoverWidget.background': '#1e1e1e',
              'editorHoverWidget.border': '#454545',
              'editorSuggestWidget.background': '#1e1e1e',
              'editorSuggestWidget.border': '#454545',
              'editorSuggestWidget.selectedBackground': '#264f78',
              'editorSuggestWidget.highlightForeground': '#569cd6',
              'editor.lineHighlightBackground': '#2a2d2e',
              'editorLineNumber.foreground': '#858585',
              'editorCursor.foreground': '#ffffff',
              'editor.selectionBackground': '#264f78',
              'editorIndentGuide.background': '#404040',
              'editorIndentGuide.activeBackground': '#606060'
            }
          });
          window.monaco.editor.setTheme(themeName);
        } catch(themeErr) {
          console.warn('Custom theme apply failed:', themeErr);
        }
        resolve(true);
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('Monaco Editor setup failed:', error);
        reject(error);
      }
    }, function(error) {
      clearTimeout(timeoutId);
      console.error('Monaco Editor loading failed:', error);
      reject(error);
    });
  });
}

// 커스텀 CSS Monaco Editor 생성
function createCustomCssEditor(containerId, value = '') {
  if (!monacoLoaded || !window.monaco || !window.monaco.editor) {
    console.error('Monaco Editor not loaded properly');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return null;
  }
  
  // 컨테이너가 실제로 DOM에 연결되어 있는지 확인
  if (!document.body.contains(container)) {
    console.error('Container not attached to DOM:', containerId);
    return null;
  }
  
  // 기존 에디터가 있다면 정리
  if (customCssEditor && typeof customCssEditor.dispose === 'function') {
    customCssEditor.dispose();
    customCssEditor = null;
  }
  
  try {
    // 추가 안전성 체크
    if (typeof window.monaco.editor.create !== 'function') {
      console.error('Monaco Editor create function not available');
      return null;
    }
    
    // 컨테이너 초기화
    container.innerHTML = '';
    
    const editor = window.monaco.editor.create(container, getMonacoEditorOptions(value));
    
    // 첫 번째 라인과 마지막 라인을 읽기 전용으로 설정
    const model = editor.getModel();
    if (model && value.trim()) {
      const lineCount = model.getLineCount();
      if (lineCount >= 2) {
        // 첫 번째 라인과 마지막 라인의 범위 설정
        const readOnlyRanges = [
          {
            range: new window.monaco.Range(1, 1, 1, model.getLineMaxColumn(1)),
            options: {
              className: 'readonly-line',
              isWholeLine: true
            }
          }
        ];
        
        // 마지막 라인이 닫는 중괄호만 있는 경우에만 읽기 전용으로 설정
        const lastLineContent = model.getLineContent(lineCount).trim();
        if (lastLineContent === '}') {
          readOnlyRanges.push({
            range: new window.monaco.Range(lineCount, 1, lineCount, model.getLineMaxColumn(lineCount)),
            options: {
              className: 'readonly-line',
              isWholeLine: true
            }
          });
        }
        
        // 키보드 입력 제한
        editor.onKeyDown((e) => {
          const position = editor.getPosition();
          if (position) {
            const lineNumber = position.lineNumber;
            const currentModel = editor.getModel();

            if (currentModel) {
              const currentLineCount = currentModel.getLineCount();
              const lastLineContent = currentModel.getLineContent(currentLineCount).trim();
              const currentLineContent = currentModel.getLineContent(lineNumber).trim();
              const beforeLineContent = lineNumber > 1 ? currentModel.getLineContent(lineNumber - 1).trim() : '';
              
              // 첫 번째 라인이나 마지막 라인(닫는 중괄호)에서 편집 시도 시 차단
              if (lineNumber === 1 || (lineNumber === currentLineCount && lastLineContent === '}') || (beforeLineContent && beforeLineContent.startsWith('.') && currentLineContent === '{') || (beforeLineContent === '' && currentLineContent.startsWith('.')) || (currentLineContent.startsWith('}') && currentLineContent.endsWith('}')) ) {
                // 방향키, 복사, 선택 등은 허용
                const allowedKeys = [
                  window.monaco.KeyCode.UpArrow,
                  window.monaco.KeyCode.DownArrow,
                  window.monaco.KeyCode.LeftArrow,
                  window.monaco.KeyCode.RightArrow,
                  window.monaco.KeyCode.Home,
                  window.monaco.KeyCode.End,
                  window.monaco.KeyCode.PageUp,
                  window.monaco.KeyCode.PageDown,
                  window.monaco.KeyCode.Tab,
                  window.monaco.KeyCode.Escape
                ];
                
                // Ctrl 키 조합 (복사, 붙여넣기 등)은 허용하되 편집은 차단
                if (e.ctrlKey || e.metaKey) {
                  if (e.keyCode === window.monaco.KeyCode.KeyV || 
                      e.keyCode === window.monaco.KeyCode.KeyX ||
                      e.keyCode === window.monaco.KeyCode.Backspace ||
                      e.keyCode === window.monaco.KeyCode.Delete) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                } else if (!allowedKeys.includes(e.keyCode)) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }
            }
          }
        });
        
        // 붙여넣기 차단
        editor.onDidPaste((e) => {
          const position = editor.getPosition();
          if (position) {
            const lineNumber = position.lineNumber;
            const currentModel = editor.getModel();
            if (currentModel) {
              const currentLineCount = currentModel.getLineCount();
              const lastLineContent = currentModel.getLineContent(currentLineCount).trim();
              
              if (lineNumber === 1 || (lineNumber === currentLineCount && lastLineContent === '}')) {
                // 붙여넣기 실행 취소
                setTimeout(() => {
                  editor.trigger('undo', 'undo', null);
                }, 10);
              }
            }
          }
        });
      }
    }
    
    // 에디터 model의 안전성 보장을 위한 wrapper 함수들 추가
    const safeGetModel = () => {
      try {
        const model = editor.getModel();
        return (model && !model.isDisposed()) ? model : null;
      } catch (error) {
        console.warn('Error getting editor model:', error);
        return null;
      }
    };
    
    const safeGetPosition = () => {
      try {
        const model = safeGetModel();
        const position = editor.getPosition();
        return (model && position) ? position : null;
      } catch (error) {
        console.warn('Error getting editor position:', error);
        return null;
      }
    };
    
    // Monaco Editor 위젯에 monaco-editor 클래스 추가
    setTimeout(() => {
      const overflowWidgets = document.body.querySelectorAll('.overflowingContentWidgets:not(.monaco-editor-added)');
      overflowWidgets.forEach(widget => {
        widget.classList.add('monaco-editor', 'monaco-editor-added');
      });
    }, 100);
    
    // 포커스 이벤트 핸들러 추가 - 안전한 model 접근
    editor.onDidFocusEditorText(() => {
      try {
        // 커스텀 CSS에서 현재 커서 위치의 클래스명 찾기
        const model = safeGetModel();
        const position = safeGetPosition();
        if (model && position) {
          const lineContent = model.getLineContent(position.lineNumber);
          const extractedClassName = extractClassNameFromCSS(lineContent);
          if (extractedClassName) {
            applyHighlightToClass(extractedClassName);
          }
        }
      } catch (error) {
        console.warn('Error in focus event handler:', error);
      }
    });
    
    // 블러 이벤트 핸들러 추가
    editor.onDidBlurEditorText(() => {
      try {
        removeHighlightFromElements();
      } catch (error) {
        console.warn('Error in blur event handler:', error);
      }
    });
    
    // 커서 위치 변경 이벤트 핸들러 추가 - 안전한 model 접근
    editor.onDidChangeCursorPosition(() => {
      try {
        if (editor.hasTextFocus()) {
          const model = safeGetModel();
          const position = safeGetPosition();
          if (model && position) {
            // 현재 라인과 주변 라인들을 체크하여 CSS 블록 찾기
            const currentLine = position.lineNumber;
            let cssBlock = '';
            
            // 현재 라인부터 위로 올라가면서 클래스 선택자 찾기
            for (let i = currentLine; i >= 1; i--) {
              const lineContent = model.getLineContent(i);
              cssBlock = lineContent + '\n' + cssBlock;
              
              if (lineContent.includes('{')) {
                break;
              }
            }
            
            // 현재 라인부터 아래로 내려가면서 닫는 브래킷 찾기
            for (let i = currentLine + 1; i <= model.getLineCount(); i++) {
              const lineContent = model.getLineContent(i);
              cssBlock += lineContent + '\n';
              
              if (lineContent.includes('}')) {
                break;
              }
            }
            
            const extractedClassName = extractClassNameFromCSS(cssBlock.trim());
            if (extractedClassName) {
              // 기존 하이라이트 제거 후 새로운 클래스명으로 하이라이트 적용
              removeHighlightFromElements();
              applyHighlightToClass(extractedClassName);
            } else {
              // 유효한 클래스명이 없으면 하이라이트 제거
              removeHighlightFromElements();
            }
          }
        }
      } catch (error) {
        console.warn('Error in cursor position change handler:', error);
      }
    });
    
    // 레이아웃 강제 업데이트
    setTimeout(() => {
      if (editor && typeof editor.layout === 'function') {
        try {
          editor.layout();
        } catch (layoutError) {
          console.warn('Layout error for custom editor:', layoutError);
        }
      }
    }, 300);
    
    return editor;
  } catch (error) {
    console.error('Failed to create Monaco Editor:', error);
    return null;
  }
}

// 클래스별 CSS Monaco Editor 생성
function createClassCssEditor(containerId, value = '', className = '') {
  if (!monacoLoaded || !window.monaco || !window.monaco.editor) {
    console.error('Monaco Editor not loaded properly');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return null;
  }
  
  // 컨테이너가 실제로 DOM에 연결되어 있는지 확인
  if (!document.body.contains(container)) {
    console.error('Container not attached to DOM:', containerId);
    return null;
  }
  
  // 이미 해당 클래스명으로 에디터가 존재하는지 확인
  if (cssClassEditors.has(className)) {
    const existingEditor = cssClassEditors.get(className);
    if (existingEditor && typeof existingEditor.dispose === 'function') {
      existingEditor.dispose();
    }
    cssClassEditors.delete(className);
  }
  
  try {
    // 추가 안전성 체크
    if (typeof window.monaco.editor.create !== 'function') {
      console.error('Monaco Editor create function not available');
      return null;
    }
    
    // 컨테이너 초기화
    container.innerHTML = '';
    
    const editor = window.monaco.editor.create(container, getMonacoEditorOptions(value));
    
    // 클래스별 에디터를 Map에 저장
    cssClassEditors.set(className, editor);
    
    // 첫 번째 라인과 마지막 라인을 읽기 전용으로 설정
    const model = editor.getModel();
    if (model && value.trim()) {
      const lineCount = model.getLineCount();
      if (lineCount >= 2) {
        // 첫 번째 라인과 마지막 라인의 범위 설정
        const readOnlyRanges = [
          {
            range: new window.monaco.Range(1, 1, 1, model.getLineMaxColumn(1)),
            options: {
              className: 'readonly-line',
              isWholeLine: true
            }
          }
        ];
        
        // 마지막 라인이 닫는 중괄호만 있는 경우에만 읽기 전용으로 설정
        const lastLineContent = model.getLineContent(lineCount).trim();
        if (lastLineContent === '}') {
          readOnlyRanges.push({
            range: new window.monaco.Range(lineCount, 1, lineCount, model.getLineMaxColumn(lineCount)),
            options: {
              className: 'readonly-line',
              isWholeLine: true
            }
          });
        }
        
        // 키보드 입력 제한
        editor.onKeyDown((e) => {
          const position = editor.getPosition();
          if (position) {
            const lineNumber = position.lineNumber;
            const currentModel = editor.getModel();

            if (currentModel) {
              const currentLineCount = currentModel.getLineCount();
              const lastLineContent = currentModel.getLineContent(currentLineCount).trim();
              const currentLineContent = currentModel.getLineContent(lineNumber).trim();
              const beforeLineContent = lineNumber > 1 ? currentModel.getLineContent(lineNumber - 1).trim() : '';
              
              // 첫 번째 라인이나 마지막 라인(닫는 중괄호)에서 편집 시도 시 차단
              if (lineNumber === 1 || (lineNumber === currentLineCount && lastLineContent === '}') || (beforeLineContent && beforeLineContent.startsWith('.') && currentLineContent === '{')) {
                // 방향키, 복사, 선택 등은 허용
                const allowedKeys = [
                  window.monaco.KeyCode.UpArrow,
                  window.monaco.KeyCode.DownArrow,
                  window.monaco.KeyCode.LeftArrow,
                  window.monaco.KeyCode.RightArrow,
                  window.monaco.KeyCode.Home,
                  window.monaco.KeyCode.End,
                  window.monaco.KeyCode.PageUp,
                  window.monaco.KeyCode.PageDown,
                  window.monaco.KeyCode.Tab,
                  window.monaco.KeyCode.Escape
                ];
                
                // Ctrl 키 조합 (복사, 붙여넣기 등)은 허용하되 편집은 차단
                if (e.ctrlKey || e.metaKey) {
                  if (e.keyCode === window.monaco.KeyCode.KeyV || 
                      e.keyCode === window.monaco.KeyCode.KeyX ||
                      e.keyCode === window.monaco.KeyCode.Backspace ||
                      e.keyCode === window.monaco.KeyCode.Delete) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                } else if (!allowedKeys.includes(e.keyCode)) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }
            }
          }
        });
        
        // 붙여넣기 차단
        editor.onDidPaste((e) => {
          const position = editor.getPosition();
          if (position) {
            const lineNumber = position.lineNumber;
            const currentModel = editor.getModel();
            if (currentModel) {
              const currentLineCount = currentModel.getLineCount();
              const lastLineContent = currentModel.getLineContent(currentLineCount).trim();
              
              if (lineNumber === 1 || (lineNumber === currentLineCount && lastLineContent === '}')) {
                // 붙여넣기 실행 취소
                setTimeout(() => {
                  editor.trigger('undo', 'undo', null);
                }, 10);
              }
            }
          }
        });
      }
    }
    
    // 에디터 model의 안전성 보장을 위한 wrapper 함수들 추가
    const safeGetModel = () => {
      try {
        const model = editor.getModel();
        return (model && !model.isDisposed()) ? model : null;
      } catch (error) {
        console.warn('Error getting class editor model:', error);
        return null;
      }
    };
    
    // Monaco Editor 위젯에 monaco-editor 클래스 추가
    setTimeout(() => {
      const overflowWidgets = document.body.querySelectorAll('.overflowingContentWidgets:not(.monaco-editor-added)');
      overflowWidgets.forEach(widget => {
        widget.classList.add('monaco-editor', 'monaco-editor-added');
      });
    }, 100);
    
    // 포커스 이벤트 핸들러 추가 - 안전한 model 접근
    editor.onDidFocusEditorText(() => {
      try {
        // 에디터 컨테이너의 상단에 있는 .css-class-name에서 클래스명 추출
        const className = getClassNameFromEditorContainer(editor);
        if (className) {
          applyHighlightToClass(className);
        }
      } catch (error) {
        console.warn('Error in focus event handler for class editor:', error);
      }
    });
    
    // 블러 이벤트 핸들러 추가
    editor.onDidBlurEditorText(() => {
      try {
        removeHighlightFromElements();
      } catch (error) {
        console.warn('Error in blur event handler for class editor:', error);
      }
    });
    
    // 내용 변경 이벤트 핸들러 추가 (실시간으로 클래스명 변경 감지) - 안전한 model 접근
    editor.onDidChangeModelContent(() => {
      try {
        if (editor.hasTextFocus()) {
          const model = safeGetModel();
          if (model) {
            // 에디터 컨테이너의 상단에 있는 .css-class-name에서 클래스명 추출
            const className = getClassNameFromEditorContainer(editor);
            if (className) {
              // 기존 하이라이트 제거 후 새로운 클래스명으로 하이라이트 적용
              removeHighlightFromElements();
              applyHighlightToClass(className);
            } else {
              // 유효한 클래스명이 없으면 하이라이트 제거
              removeHighlightFromElements();
            }
          }
        }
      } catch (error) {
        console.warn('Error in content change handler for class editor:', error);
      }
    });
    
    // 레이아웃 강제 업데이트
    setTimeout(() => {
      if (editor && typeof editor.layout === 'function') {
        try {
          editor.layout();
        } catch (layoutError) {
          console.warn('Layout error for editor:', className, layoutError);
        }
      }
    }, 300);
    
    return editor;
  } catch (error) {
    console.error('Failed to create Monaco Editor for class:', className, error);
    return null;
  }
}

// 에디터 정리 함수
function disposeEditors() {
  // 모든 하이라이트 제거
  removeHighlightFromElements();
  
  if (customCssEditor) {
    customCssEditor.dispose();
    customCssEditor = null;
  }
  
  cssClassEditors.forEach(editor => {
    editor.dispose();
  });
  cssClassEditors.clear();
}

function disposeCssEditors() {
  cssClassEditors.forEach(editor => {
    editor.dispose();
  });
  cssClassEditors.clear();
}

// Monaco Editor용 이벤트 바인딩
function bindMonacoEditorEvents(panel, styleElem, classNames, classCSS, cssRules) {
  // "수정 적용" 버튼: Monaco Editor 값 전체를 styleElem에 반영
  function bindCustomCssApplyButton() {
    const applyBtn = document.getElementById('custom-css-apply');
    if (applyBtn) {
      applyBtn.onclick = () => {
        if (customCssEditor) {
          const newCSS = customCssEditor.getValue();
          styleElem.textContent = newCSS;

          // IBColorAlternate 클래스들을 찾아서 background-color 적용
          const colorAlternateMatches = newCSS.match(/\.([A-Za-z0-9_-]*ColorAlternate[A-Za-z0-9_-]*)\s*\{[^}]*\}/g);
          if (colorAlternateMatches) {
            colorAlternateMatches.forEach(match => {
              const classNameMatch = match.match(/\.([A-Za-z0-9_-]*ColorAlternate[A-Za-z0-9_-]*)/);
              if (classNameMatch) {
                applyAlternateBackgroundColor(classNameMatch[1], match);
              }
            });
          }

          const colorReadOnlyMatches = newCSS.match(/\.([A-Za-z0-9_-]*ColorReadOnly[A-Za-z0-9_-]*)\s*\{[^}]*\}/g);
          if (colorReadOnlyMatches) {
            colorReadOnlyMatches.forEach(match => {
              const classNameMatch = match.match(/\.([A-Za-z0-9_-]*ColorReadOnly[A-Za-z0-9_-]*)/);
              if (classNameMatch) {
                applyReadOnlyBackgroundColor(classNameMatch[1], match);
              }
            });
          }

          // 커스텀 CSS 영역 리렌더 및 바인딩 재설정
          const customCssWrap = panel.querySelector('#custom-css-edit-wrap');
          customCssWrap.innerHTML = renderCustomCssEditor(newCSS);
          
          // 기존 에디터 정리 후 새로 생성
          if (customCssEditor) {
            customCssEditor.dispose();
          }
          setTimeout(() => {
            customCssEditor = createCustomCssEditor('custom-css-editor', newCSS);
            bindCustomCssApplyButton();
            bindCustomCssDownloadButton();
          }, 100);
        }
      };
    }
  }

  // "CSS 파일로 저장" 버튼
  function bindCustomCssDownloadButton() {
    const downloadBtn = document.getElementById('custom-css-download');
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        if (customCssEditor) {
          const cssContent = customCssEditor.getValue();
          downloadCSSFile(cssContent);
        }
      };
    }
  }
  
  setTimeout(() => {
    bindCustomCssApplyButton();
    bindCustomCssDownloadButton();
  }, 150);

  // 각 클래스별 CSS 적용 버튼
  setTimeout(() => {
    const applyBtns = panel.querySelectorAll('.css-apply-btn');
    applyBtns.forEach(btn => {
      btn.onclick = () => {
        const idx = btn.getAttribute('data-idx');
        const className = btn.getAttribute('data-classname');
        const editor = cssClassEditors.get(className);
        
        if (editor) {
          const cssText = editor.getValue();
          
          const classNameMatch = cssText.match(/^\s*\.([A-Za-z0-9_-]+)(?:\s*,\s*[^{]*)*\s*\{/);
          if (!classNameMatch) return;
          const extractedClassName = classNameMatch[1];

          // 기본 CSS에서 해당 클래스의 정의를 가져옴
          const defaultClassCSS = getDefaultClassCSS(extractedClassName, cssRules);
          
          // 현재 CSS 텍스트와 기본 CSS를 비교
          if (defaultClassCSS && isSameCSSContent(cssText, defaultClassCSS)) {
            // 동일한 내용이면 커스텀 CSS에서 제거
            let customCSS = styleElem.textContent || "";
            customCSS = removeClassFromCustomCSS(customCSS, extractedClassName);
            styleElem.textContent = customCSS;
            
            console.log(`클래스 .${extractedClassName}이(가) 기본 CSS와 동일하여 커스텀 CSS에서 제거되었습니다.`);
            
            // 사용자에게 시각적 피드백 제공
            btn.textContent = '제거됨';
            btn.style.setProperty('background', '#dc3545', 'important');
            btn.style.color = 'white';
            setTimeout(() => {
              btn.textContent = '적용';
              btn.style.removeProperty('background');
              btn.style.removeProperty('color');
            }, 1000);
          } else {
            // 다른 내용이면 기존 로직대로 추가/수정
            let customCSS = styleElem.textContent || "";
            
            const escapedClassName = extractedClassName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\.${escapedClassName}(?:\\s*,\\s*[^{]*)*\\s*\\{[^}]*\\}`, 'g');
            
            if (regex.test(customCSS)) {
              customCSS = customCSS.replace(regex, cssText);
            } else {
              customCSS += (customCSS.trim() ? '\n\n' : '') + cssText;
            }
            
            styleElem.textContent = customCSS;
            
            // IBColorAlternate의 background-color를 IBClassAlternate > td에 적용
            applyAlternateBackgroundColor(extractedClassName, cssText);
            applyReadOnlyBackgroundColor(extractedClassName, cssText);
            
            // 사용자에게 시각적 피드백 제공
            btn.textContent = '적용됨';
            btn.style.setProperty('background', '#28a745', 'important');
            btn.style.color = 'white';
            setTimeout(() => {
              btn.textContent = '적용';
              btn.style.removeProperty('background');
              btn.style.removeProperty('color');
            }, 1000);
          }
          
          // 커스텀 CSS 영역만 리렌더
          const customCssWrap = panel.querySelector('#custom-css-edit-wrap');
          customCssWrap.innerHTML = renderCustomCssEditor(styleElem.textContent);
          
          // 커스텀 CSS 에디터 재생성
          if (customCssEditor) {
            customCssEditor.dispose();
          }
          setTimeout(() => {
            customCssEditor = createCustomCssEditor('custom-css-editor', styleElem.textContent);
            bindCustomCssApplyButton();
            bindCustomCssDownloadButton();
          }, 100);
        }
      };
    });
  }, 200);
}

// Textarea Fallback용 이벤트 바인딩
function bindTextareaEvents(panel, styleElem, cssRules) {
  // "수정 적용" 버튼: textarea 값 전체를 styleElem에 반영
  function bindCustomCssApplyButton() {
    const applyBtn = document.getElementById('custom-css-apply');
    if (applyBtn) {
      applyBtn.onclick = () => {
        const cssArea = document.getElementById('custom-css-area');
        if (cssArea) {
          const newCSS = cssArea.value;
          styleElem.textContent = newCSS;

          // IBColorAlternate 클래스들을 찾아서 background-color 적용
          const colorAlternateMatches = newCSS.match(/\.([A-Za-z0-9_-]*ColorAlternate[A-Za-z0-9_-]*)\s*\{[^}]*\}/g);
          if (colorAlternateMatches) {
            colorAlternateMatches.forEach(match => {
              const classNameMatch = match.match(/\.([A-Za-z0-9_-]*ColorAlternate[A-Za-z0-9_-]*)/);
              if (classNameMatch) {
                applyAlternateBackgroundColor(classNameMatch[1], match);
              }
            });
          }

          const colorReadOnlyMatches = newCSS.match(/\.([A-Za-z0-9_-]*ColorReadOnly[A-Za-z0-9_-]*)\s*\{[^}]*\}/g);
          if (colorReadOnlyMatches) {
            colorReadOnlyMatches.forEach(match => {
              const classNameMatch = match.match(/\.([A-Za-z0-9_-]*ColorReadOnly[A-Za-z0-9_-]*)/);
              if (classNameMatch) {
                applyReadOnlyBackgroundColor(classNameMatch[1], match);
              }
            });
          }

          // 커스텀 CSS 영역 리렌더 및 바인딩 재설정
          const customCssWrap = panel.querySelector('#custom-css-edit-wrap');
          customCssWrap.innerHTML = renderCustomCssEditor(newCSS);
          bindCustomCssApplyButton();
          bindCustomCssDownloadButton();
        }
      };
    }
  }

  // "CSS 파일로 저장" 버튼
  function bindCustomCssDownloadButton() {
    const downloadBtn = document.getElementById('custom-css-download');
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        const cssArea = document.getElementById('custom-css-area');
        if (cssArea) {
          const cssContent = cssArea.value;
          downloadCSSFile(cssContent);
        }
      };
    }
  }
  
  setTimeout(() => {
    bindCustomCssApplyButton();
    bindCustomCssDownloadButton();
  }, 150);

  // 각 클래스별 CSS 적용 버튼
  setTimeout(() => {
    const applyBtns = panel.querySelectorAll('.css-apply-btn');
    applyBtns.forEach(btn => {
      btn.onclick = () => {
        const idx = btn.getAttribute('data-idx');
        const cssTextarea = document.getElementById(`css-edit-${idx}`);
        
        if (cssTextarea) {
          const cssText = cssTextarea.value;
          
          const classNameMatch = cssText.match(/^\s*\.([A-Za-z0-9_-]+)(?:\s*,\s*[^{]*)*\s*\{/);
          if (!classNameMatch) return;
          const className = classNameMatch[1];

          // 기본 CSS에서 해당 클래스의 정의를 가져옴
          const defaultClassCSS = getDefaultClassCSS(className, cssRules);
          
          // 현재 CSS 텍스트와 기본 CSS를 비교
          if (defaultClassCSS && isSameCSSContent(cssText, defaultClassCSS)) {
            // 동일한 내용이면 커스텀 CSS에서 제거
            let customCSS = styleElem.textContent || "";
            customCSS = removeClassFromCustomCSS(customCSS, className);
            styleElem.textContent = customCSS;
            
            console.log(`클래스 .${className}이(가) 기본 CSS와 동일하여 커스텀 CSS에서 제거되었습니다.`);
            
            // 사용자에게 시각적 피드백 제공
            btn.textContent = '제거됨';
            btn.style.setProperty('background', '#dc3545', 'important');
            btn.style.color = 'white';
            setTimeout(() => {
              btn.textContent = '적용';
              btn.style.removeProperty('background');
              btn.style.removeProperty('color');
            }, 1000);
          } else {
            // 다른 내용이면 기존 로직대로 추가/수정
            let customCSS = styleElem.textContent || "";
            
            const escapedClassName = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\.${escapedClassName}(?:\\s*,\\s*[^{]*)*\\s*\\{[^}]*\\}`, 'g');
            
            if (regex.test(customCSS)) {
              customCSS = customCSS.replace(regex, cssText);
            } else {
              customCSS += (customCSS.trim() ? '\n\n' : '') + cssText;
            }
            
            styleElem.textContent = customCSS;
            
            // IBColorAlternate의 background-color를 IBClassAlternate > td에 적용
            applyAlternateBackgroundColor(className, cssText);
            
            // 사용자에게 시각적 피드백 제공
            btn.textContent = '적용됨';
            btn.style.setProperty('background', '#28a745', 'important');
            btn.style.color = 'white';
            setTimeout(() => {
              btn.textContent = '적용';
              btn.style.removeProperty('background');
              btn.style.removeProperty('color');
            }, 1000);
          }
          
          // 커스텀 CSS 영역만 리렌더
          const customCssWrap = panel.querySelector('#custom-css-edit-wrap');
          customCssWrap.innerHTML = renderCustomCssEditor(styleElem.textContent);
          bindCustomCssApplyButton();
          bindCustomCssDownloadButton();
        }
      };
    });
  }, 200);
}

// CSSRule을 예쁘게 포매팅
function formatCssRule(rule) {
  if (!rule.cssText) return '';
  const match = rule.cssText.match(/^([^{]+)\{([^}]*)\}/s);
  if (!match) return rule.cssText;
  const selector = match[1].trim();
  const body = match[2]
    .split(';')
    .map(l => l.trim())
    .filter(l => l)
    .map(l => "  " + l + ";")
    .join("\n");
  return `${selector}\n{\n${body}\n}`;
}

// CSS 파일에서 클래스 정의 파싱 - 공통 모듈 사용
async function getCSSRules() {
  return window.CSSUtils ? await window.CSSUtils.getCSSRules() : [];
}

// CSS 텍스트를 정규화하는 함수 - 공통 모듈 사용
function normalizeCSSText(cssText) {
  if (window.CSSUtils) {
    return window.CSSUtils.normalizeCSSText(cssText);
  }
  
  // 폴백: 기존 로직 유지
  if (!cssText || typeof cssText !== 'string') return '';
  
  // CSS 규칙에서 선택자와 속성 부분을 분리
  const match = cssText.match(/^([^{]+)\{([^}]*)\}/s);
  if (!match) return cssText.trim();
  
  const selector = match[1].trim();
  const properties = match[2];
  
  // 속성들을 정리하고 정렬
  const normalizedProperties = properties
    .split(';')
    .map(prop => prop.trim())
    .filter(prop => prop.length > 0)
    .map(prop => {
      // 속성명과 값을 분리하여 공백 정리
      const [key, ...valueParts] = prop.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        // 색상 값 정규화 (hex, rgb 등)
        const normalizedValue = normalizeColorValue(value);
        return `${key.trim()}: ${normalizedValue}`;
      }
      return prop;
    })
    .sort() // 속성을 알파벳 순으로 정렬
    .join('; ');
  
  return `${selector} { ${normalizedProperties} }`;
}

// 색상 값을 정규화하는 함수
function normalizeColorValue(value) {
  if (!value) return value;
  
  // RGB 색상을 정규화
  const rgbMatch = value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (rgbMatch) {
    return `rgb(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]})`;
  }
  
  // RGBA 색상을 정규화
  const rgbaMatch = value.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/);
  if (rgbaMatch) {
    return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${rgbaMatch[4]})`;
  }
  
  // HEX 색상을 소문자로 정규화
  if (value.match(/^#[0-9a-fA-F]+$/)) {
    return value.toLowerCase();
  }
  
  // 기타 공백 정리
  return value.replace(/\s+/g, ' ').trim();
}

// 기본 CSS에서 특정 클래스의 정의를 가져오는 함수 - 공통 모듈 사용
function getDefaultClassCSS(className, cssRules) {
  if (window.CSSUtils) {
    return window.CSSUtils.getDefaultClassCSS(className, cssRules);
  }
  
  // 폴백: 기존 로직 유지
  const selector = "." + className;
  let foundRule = null;
  
  for (const rule of cssRules) {
    if (rule.selectorText) {
      const selectors = rule.selectorText.split(",").map(sel => sel.trim());
      // 정확히 .className과 일치하는 셀렉터만 찾기
      if (selectors.includes(selector)) {
        foundRule = rule;
        // 가장 마지막에 정의된 것을 사용 (CSS 우선순위)
      }
    }
  }
  
  if (foundRule) {
    return normalizeCSSText(formatCssRule(foundRule));
  }
  
  return null;
}

// 두 CSS 텍스트가 동일한 내용인지 비교하는 함수
function isSameCSSContent(cssText1, cssText2) {
  const normalized1 = normalizeCSSText(cssText1);
  const normalized2 = normalizeCSSText(cssText2);
  
  return normalized1 === normalized2;
}

// 커스텀 CSS에서 특정 클래스를 제거하는 함수
function removeClassFromCustomCSS(cssText, className) {
  if (!cssText || !className) return cssText;
  
  const escapedClassName = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\.${escapedClassName}(?:\\s*,\\s*[^{]*)*\\s*\\{[^}]*\\}\\s*`, 'g');
  
  return cssText.replace(regex, '').trim();
}

// 클래스명에 해당하는 CSS 내용 추출 - 공통 모듈 사용
function getClassCSS(classNames, cssRules, type) {
  if (!type && window.CSSUtils) {
    return window.CSSUtils.getClassCSS(classNames, cssRules);
  }
  
  // 폴백: 기존 로직 유지
  const result = {};
  for (const className of classNames) {
    const selector = "." + className;
    result[className] = [];
    for (const rule of cssRules) {
      if (rule.selectorText) {
        const selectors = rule.selectorText.split(",").map(sel => sel.trim());
        const regex = new RegExp(`\\b${selector}\\b`);
        const matchingItems = selectors.filter(item => regex.test(item));
        if (matchingItems.length > 0) {
          result[className].push(formatCssRule(rule));
        }

        // 정확히 .className과 일치하는 셀렉터만 허용
        if (selectors.includes(selector)) {
          result[className].push(formatCssRule(rule));
        }
      }
    }
  }
  return result;
}

// 전역 CSS에서 특정 클래스의 CSS 규칙 추출
function extractClassFromCustomCSS(cssText, className) {
  if (!cssText || !className) return null;
  
  const escapedClassName = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\.${escapedClassName}(?:\\s*,\\s*[^{]*)*\\s*\\{[^}]*\\}`, 'g');
  const match = cssText.match(regex);
  
  if (match && match.length > 0) {
    // 가장 마지막에 정의된 것을 반환 (나중에 정의된 것이 우선)
    return match[match.length - 1];
  }
  
  return null;
}

// CSS 파일 다운로드 함수
function downloadCSSFile(cssContent) {
  if (!cssContent || !cssContent.trim()) {
    alert('저장할 CSS 내용이 없습니다.');
    return;
  }
  
  const blob = new Blob([cssContent], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // 현재 날짜와 시간으로 파일명 생성
  const now = new Date();
  const dateStr = now.getFullYear() + 
    String(now.getMonth() + 1).padStart(2, '0') + 
    String(now.getDate()).padStart(2, '0');
  const timeStr = String(now.getHours()).padStart(2, '0') + 
    String(now.getMinutes()).padStart(2, '0');
  
  link.href = url;
  link.download = `ibsheet-custom-styles-${dateStr}-${timeStr}.css`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// CSS에서 background-color 추출 함수
function extractBackgroundColor(cssText) {
  if (!cssText) return null;
  
  // background-color 속성 찾기
  const bgColorMatch = cssText.match(/background-color\s*:\s*([^;]+)/i);
  if (bgColorMatch) {
    return bgColorMatch[1].trim();
  }
  
  // background 속성에서 색상 찾기 (단색인 경우)
  const bgMatch = cssText.match(/background\s*:\s*([^;]+)/i);
  if (bgMatch) {
    const bgValue = bgMatch[1].trim();
    // gradient나 url이 아닌 단순 색상인지 확인
    if (!bgValue.includes('gradient') && !bgValue.includes('url') && 
        (bgValue.match(/^#[0-9a-fA-F]{3,8}$/) || 
         bgValue.match(/^rgb/) || 
         bgValue.match(/^hsl/) ||
         bgValue.match(/^[a-zA-Z]+$/))) {
      return bgValue;
    }
  }
  
  return null;
}

// IBColorAlternate의 background-color를 IBClassAlternate > td에 적용
function applyAlternateBackgroundColor(className, cssText) {

  // IBColorAlternate 클래스인지 확인
  if (!className.includes(`${prefixTheme}ColorAlternate`)) {
    return;
  }
  
  // background-color 추출
  const backgroundColor = extractBackgroundColor(cssText);
  if (!backgroundColor) {
    return;
  }
  
  // IBClassAlternate > td 요소들 찾기
  const alternateElements = document.querySelectorAll(`.${prefixTheme}ClassAlternate > td:not(.${prefixTheme}CellIndex)`);
  
  // 각 요소에 background-color 인라인 스타일 적용
  alternateElements.forEach(element => {
    element.style.backgroundColor = backgroundColor;
  });
  
  console.log(`IBClassAlternate > td 요소 ${alternateElements.length}개에 background-color: ${backgroundColor} 적용됨`);
}

function applyReadOnlyBackgroundColor(className, cssText) {

  // IBColorReadOnly 클래스인지 확인
  if (!className.includes(`${prefixTheme}ColorReadOnly`)) {
    return;
  }

  // background-color 추출
  const backgroundColor = extractBackgroundColor(cssText);
  if (!backgroundColor) {
    return;
  }

  // IBClassReadOnly > td 요소들 찾기
  const readOnlyElements = document.querySelectorAll(`td.${prefixTheme}ClassReadOnly`);

  // 각 요소에 background-color 인라인 스타일 적용
  readOnlyElements.forEach(element => {
    element.style.backgroundColor = backgroundColor;
  });

  console.log(`IBClassReadOnly > td 요소 ${readOnlyElements.length}개에 background-color: ${backgroundColor} 적용됨`);
}

// 커스텀 CSS 영역 렌더링 함수
function renderCustomCssEditor(cssText) {
  if (monacoLoaded) {
    return `
      <div id="custom-css-editor" style="width:100%;height:120px;border:1px solid #333;margin-bottom:8px;"></div>
      <div style="margin-bottom:16px;display:block;gap:8px;text-align:center;">
        <button id="custom-css-apply" style="padding:8px 16px;border:1px solid #007acc;background:#007acc;color:white;border-radius:4px;cursor:pointer;">수정 적용</button>
        <button id="custom-css-download" style="padding:8px 16px;border:1px solid #28a745;background:#28a745;color:white;border-radius:4px;cursor:pointer;">CSS 파일로 저장</button>
      </div>
    `;
  } else {
    // Monaco Editor 로드 실패 시 textarea fallback
    return `
      <textarea id="custom-css-area" style="width:100%;height:120px;font-family:monospace;background:#212121;color:#f8f8f2; margin-bottom:8px;">${cssText}</textarea>
      <div style="margin-bottom:16px;display:block;gap:8px;text-align:center;">
        <button id="custom-css-apply" style="padding:8px 16px;border:1px solid #007acc;background:#007acc;color:white;border-radius:4px;cursor:pointer;">수정 적용</button>
        <button id="custom-css-download" style="padding:8px 16px;border:1px solid #28a745;background:#28a745;color:white;border-radius:4px;cursor:pointer;">CSS 파일로 저장</button>
      </div>
    `;
  }
}

// 커스텀 스타일 태그 생성/가져오기
function ensureCustomStyleTag() {
  let styleElem = document.getElementById('custom-inspector-style');
  if (!styleElem) {
    styleElem = document.createElement('style');
    styleElem.id = 'custom-inspector-style';
    document.head.appendChild(styleElem);
  }
  return styleElem;
}

// 색상/이미지 속성을 가진 CSS 텍스트 중에서 가장 적절한 것을 선택하는 함수
function selectBestCssText(cssTextArray) {
  if (!cssTextArray || cssTextArray.length === 0) return '';
  
  // 문자열만 필터링
  const validCssTexts = cssTextArray.filter(cssText => 
    cssText && typeof cssText === 'string'
  );
  
  if (validCssTexts.length === 0) return '';
  
  // 색상이나 이미지 속성을 가진 CSS 텍스트들을 필터링
  const cssWithColorOrImage = validCssTexts.filter(cssText => hasColorOrImageProps(cssText));
  
  // 색상/이미지 속성을 가진 CSS가 있다면 그 중 첫 번째를 반환
  if (cssWithColorOrImage.length > 0) {
    return cssWithColorOrImage[0];
  }
  
  // 색상/이미지 속성이 없다면 첫 번째 CSS 반환
  return validCssTexts[0] || '';
}

// Inspector 패널 렌더링 및 이벤트 바인딩
async function showInspector(element) {
  const panel = document.getElementById("inspector-panel");
  
  // 패널 활성화 (가이드 숨김)
  // panel.classList.add('active');
  
  // 세로 스크롤 초기화
  panel.scrollTop = 0;
  
  // 기존 에디터들 정리
  disposeEditors();
  
  // Monaco Editor 로드 시도 (실패해도 계속 진행)
  if (!monacoLoaded) {
    try {
      await loadMonacoEditor();
    } catch (error) {
      console.warn('Monaco Editor loading failed, using textarea fallback:', error);
      monacoLoaded = false;
    }
  }
  
  const excludeClasses = ['infoArea'];
  let classNames_before = Array.from(element.classList).filter(cls => !excludeClasses.includes(cls));

  const newStyleArr = styleArr.map(cls => {
    return prefixTheme + cls;
  });

  if (element.classList.contains(`${prefixTheme}ClassAlternate`)) {
    classNames_before = [`${prefixTheme}ColorAlternate`]
  } else if (element.classList.contains(`${prefixTheme}ClassReadOnly`)) {
    classNames_before.push(`${prefixTheme}ColorReadOnly`);
  }

  const classNames = classNames_before.filter(cls => newStyleArr.includes(cls));
  const classCSS = getClassCSS(classNames, cssRules, true);

  const styleElem = ensureCustomStyleTag();
  const currentCustomCSS = styleElem.textContent || "";

  panel.innerHTML = `
    <div id="inspector-content" style="padding: 10px;">
      <div>
        <strong>현재 적용된 커스텀 CSS</strong>
        <div id="custom-css-edit-wrap">${renderCustomCssEditor(currentCustomCSS)}</div>
      </div>
      <div id='css-define-section'>
        <strong>CSS 정의</strong>
        ${classNames.length >= 2 ? '<div style="font-size:12px;color:#888;margin:4px 0;">💡 아래쪽에 출력되는 클래스일수록 우선순위가 높습니다</div>' : ''}
        <div id="css-define-edit-wrap" style="margin-top:8px;">
          
          ${classNames.map((cn, idx) => {
            // 전역 CSS에서 해당 클래스가 이미 정의되어 있는지 확인
            const customClassCSS = extractClassFromCustomCSS(currentCustomCSS, cn);
            let cssText;
            
            if (customClassCSS) {
              // 전역 CSS에 정의된 경우 해당 값 사용
              cssText = customClassCSS;
            } else {
              // 전역 CSS에 없는 경우 기존 로직 사용
              const bestCssText = selectBestCssText(classCSS[cn]);
              cssText = bestCssText || `.${cn} {\n\n}`;
            }
            
            // 인덱스가 3 이상인 경우 마지막 div에 더 큰 margin-bottom 적용
            const marginBottom = idx >= 2 && idx == classNames.length -1 ? '200px' : '16px';
            
            if (monacoLoaded) {
              return `
                <div style="margin-bottom:${marginBottom};">
                  <div class='css-class-name'>
                    ▷ ${cn}
                  </div>
                  <div id="css-edit-${idx}" style="width:100%;height:120px;border:1px solid #333;margin-bottom:4px;"></div>
                  <button class="css-apply-btn" data-idx="${idx}" data-classname="${cn}" style="margin-top:4px;">적용</button>
                </div>
              `;
            } else {
              return `
                <div style="margin-bottom:${marginBottom};">
                  <div class='css-class-name'>
                    ▷ ${cn}
                  </div>
                  <textarea id="css-edit-${idx}" style="width:100%;height:120px;font-family:monospace;background:#212121;color:#f8f8f2; margin-bottom:4px;">${cssText}</textarea>
                  <button class="css-apply-btn" data-idx="${idx}" data-classname="${cn}" style="margin-top:4px;">적용</button>
                </div>
              `;
            }
          }).join("")}
        </div>
      </div>
    </div>
  `;

  if (monacoLoaded) {
    // Monaco Editor 사용 - 순차적으로 생성
    setTimeout(() => {
      // 먼저 커스텀 CSS 에디터 생성
      setTimeout(() => {
        customCssEditor = createCustomCssEditor('custom-css-editor', currentCustomCSS);
      }, 0);
      
      // 클래스별 CSS Monaco Editor를 순차적으로 생성
      let editorIndex = 0;
      function createNextEditor() {
        if (editorIndex >= classNames.length) {
          // 모든 에디터 생성 완료 후 이벤트 바인딩
          setTimeout(() => {
            bindMonacoEditorEvents(panel, styleElem, classNames, classCSS, cssRules);
          }, 0);
          return;
        }
        
        const cn = classNames[editorIndex];
        const idx = editorIndex;
        
        // 전역 CSS에서 해당 클래스가 이미 정의되어 있는지 확인
        const customClassCSS = extractClassFromCustomCSS(currentCustomCSS, cn);
        let cssText;
        
        if (customClassCSS) {
          cssText = customClassCSS;
        } else {
          const bestCssText = selectBestCssText(classCSS[cn]);
          cssText = bestCssText || `.${cn} {\n\n}`;
        }
        
        // 에디터 생성 - 비동기적으로 실행
        setTimeout(() => {
          createClassCssEditor(`css-edit-${idx}`, cssText, cn);
          editorIndex++;
          // 다음 에디터 생성을 위해 더 긴 지연
          setTimeout(createNextEditor, 0);
        }, 50);
      }
      
      // 첫 번째 에디터 생성 시작 (커스텀 에디터 생성 후)
      setTimeout(createNextEditor, 0);
    }, 0);
  } else {
    // Textarea fallback용 이벤트 바인딩
    bindTextareaEvents(panel, styleElem, cssRules);
  }
}

let cssRules;

// Inspector 초기화 및 바인딩
window.addEventListener('DOMContentLoaded', async () => {
  // 전역 에러 핸들러 추가 - Monaco Editor 관련 오류 방지
  const originalConsoleError = console.error;
  console.error = function(...args) {
    // Monaco Editor의 _setTrackedRange 오류를 무시하지만 로그는 남김
    const errorMessage = args.join(' ');
    if (errorMessage.includes('_setTrackedRange') || errorMessage.includes('colorHoverParticipant')) {
      console.warn('Monaco Editor tracked range warning (handled):', ...args);
      return;
    }
    originalConsoleError.apply(console, args);
  };
  
  // Promise rejection 에러 핸들러 추가
  window.addEventListener('unhandledrejection', function(event) {
    const errorMessage = event.reason?.message || event.reason?.toString() || '';
    if (errorMessage.includes('_setTrackedRange') || errorMessage.includes('colorHoverParticipant')) {
      console.warn('Monaco Editor promise rejection (handled):', errorMessage);
      event.preventDefault(); // 기본 에러 처리 방지
      return;
    }
  });
  
  // Monaco Editor 미리 로드 (실패해도 계속 진행)
  try {
    await loadMonacoEditor();
    console.log('Monaco Editor loaded successfully');
  } catch (error) {
    console.warn('Monaco Editor failed to load, fallback to textarea:', error);
    monacoLoaded = false;
  }
  
  cssRules = await getCSSRules();
  const panel = document.getElementById("inspector-panel");

  document.body.addEventListener('click', e => {
    let highlightedElems = document.getElementsByClassName('inspected-element-highlight');
    Array.from(highlightedElems).forEach(elem => {
      elem.classList.remove('inspected-element-highlight');
    })

    let isParentElement = false;

    if (e.target.closest('#inspector-panel') || e.target.closest('#icon-content1') || e.target.closest('#icon-content2') || e.target.closest('#icon-content3')) {
      return;
    }
    
    if (e.target && e.target.nodeType === 1) {
      // console.log(e.target);
      // IB로 시작하는 클래스와 infoArea를 가진 가장 가까운 요소 찾기
      // let targetElement = e.target.closest('[class*="IB"]');
      let targetElement = e.target.closest('[class*="infoArea"]');
      // console.log('targetElement :', targetElement)
      if (targetElement && Array.from(targetElement.classList).includes(`${prefixTheme}SpaceWidthInner`)) {
        targetElement = e.target.parentElement;
      } else if (targetElement && e.target.parentElement && 
          (e.target.parentElement.classList.contains(`${prefixTheme}FormulaRow`) || e.target.parentElement.classList.contains(`${prefixTheme}ClassAlternate`))) {
        // targetElement.classList.add('IBFormulaRow');
        isParentElement = true;
        targetElement = e.target.parentElement;
        targetElement.classList.add('inspected-element-highlight');
      }

      if (targetElement && (Array.from(targetElement.classList).some(cn => cn.startsWith('IB')) || 
        (targetElement.tagName.toLowerCase() === 'button' && Array.from(e.target.parentElement.classList).some(cn => cn.startsWith('IB')))) ) {

        // console.log('showIspector for element:', targetElement);
        if (document.getElementById('subtotal-content') && 
          (document.getElementById('subtotal-content').querySelectorAll('.infoArea')[0] == targetElement || 
          document.getElementById('subtotal-content').querySelectorAll('.infoArea')[1] == targetElement)) { // 소계/누계 선택 금지
          return;
        } else if (document.getElementById('group-content') && document.getElementById('group-content').querySelectorAll('.infoArea')[6] == targetElement) { // GroupFormat 선택 금지
          return;
        }

        if (!isParentElement) {
          targetElement.classList.add('inspected-element-highlight');
        }
        showInspector(targetElement);
      }
    }
  });
});

const styleArr = [
  'InfoRow', 'HeaderText', 'CellHeader', 'Cell', 'Text', 'Lines', 'Enum', 'Button', 'Int', 'Float', 
  'Date', 'Link', 'Img', 'Pass', 'Radio', 'Check', 'BoolX', 'Bool0', 'Bool1', 'Radio0Left', 
  'Radio1Left', 'Radio0Right', 'Radio1Right', 'RadioChecked', 'EnumHeaderLeft', 'EnumHeaderRight', 'MenuItemText',
  'PickMyUp', 'PickMyDown', 'PickBL', 'PickBR', 'PickSa', 'PickSu', 'PickCell', 'PickWDN', 'PickWD', 'PickOM', 'PickOM', 'PickNow', 
  'PickSel', 'PickHover', 'Pick2BL', 'Pick2BR', 'Pick2YSel', 'Pick2YHover', 'Pick2M', 'Pick2MSel', 'Pick2MHover', 'Pick2Sep',
  'Sort3Right', 'Sort2Right', 'Sort1Right', 'Sort6Right', 'Sort5Right', 'Sort4Right', 
  'Sort3Left', 'Sort2Left', 'Sort1Left', 'Sort6Left', 'Sort5Left', 'Sort4Left', 
  'FilterDialog0Right', 'FilterDialogSearchIcon', 'FocusRowBackground', 'ClassFocusedCell',
  'HoverRowBackground', 'C', 'CL', 'E', 'EL', '1C', '0C', '1CL', '0CL', '1E', 
  '0E', '1EL', '0EL', 'FormulaRow', 'SolidRow', 'ClassReadOnly', 'ClassNoFocus', 
  'Filter0Left', 'Filter0Right', 'Filter0Menu', 'Filter1Menu', 'Filter2Menu',
  'Filter3Menu', 'Filter4Menu', 'Filter5Menu', 'Filter6Menu', 'Filter7Menu', 
  'Filter8Menu', 'Filter9Menu', 'Filter10Menu', 'Filter11Menu', 'Filter12Menu',
  'Filter13Menu', 'Filter14Menu', 'Filter15Menu', 'DataFilterDialogSideCheck0', 'DataFilterDialogSideCheck1',
  'MenuNextIcon', 'EnumLeft', 'EnumRight', 'EnumTop', 'EnumBottom', 'DateLeft', 
  'DatesLeft', 'DateRight', 'DatesRight', 'DateTop', 'DatesTop', 'DateBottom', 'DatesBottom', 'MenuFocus',
  'Check0Left', 'Check0Center', 'Check0Right', 'Check0Top', 'Check0Bottom', 'DialogButton', 'SheetButton',
  'DataFilterDialogTextFilterIcon', 'DataFilterDialogSearch', 'TextFilterDialogFilterCondition', 'FilterDialogHeaderCheckIcon0',
  'Width1', 'Width2', 'Width3', 'Width1T', 'Width2T', 'Width3T', 'Width4T',
  'HeaderGroup', 'GroupCancel', 'CL', '0EL', '00', '01',
  '11', '10', '111', '110', '101', '100', '011', '000', '0', '111T', '110T', '101T', '100T',
  '011T', '11T', '010T', '10T', '001T', '01T', '000T', '00T','0E','1EL', '0TL', '1TL', '000',
  'HeaderGroupCustom', 'FilterDialogResizingIcon', 'TextFilterDialogMultipleBox', 'Required', 'Bool', 'ColorAlternate', 'ColorReadOnly'
];

// Inspector 패널 초기화
// window.addEventListener('DOMContentLoaded', () => {
//   const panel = document.getElementById("inspector-panel");
//   if (panel) {
//     // 초기 상태에서는 가이드 표시 (active 클래스 없음)
//     panel.classList.remove('active');
//   }
// });
