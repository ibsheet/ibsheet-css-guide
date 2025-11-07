
// GSAP 필터 데모 관련 변수
let demoTimeline = null;
let customCursor = null;

// 필터 데모 시작 함수
async function startFilterDemo() {
  // 데이터가 없으면 먼저 로드
  if (!sheet.getDataRows() || sheet.getDataRows().length === 0) {
    createData(10000);
    sheet.loadSearchData(data);
    await sleep(500);
  }
  
  await executeFilterDemo();
}

// 유틸리티: sleep 함수
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 유틸리티: GSAP 애니메이션을 Promise로 변환
// position: fixed 요소는 뷰포트 기준이므로 left, top 속성을 사용
function animateToPosition(element, x, y, duration = 1.5, ease = "power2.inOut") {
  return new Promise(resolve => {
    gsap.to(element, {
      duration: duration,
      left: x,
      top: y,
      ease: ease,
      onComplete: resolve
    });
  });
}

// 유틸리티: 스케일 애니메이션을 Promise로 변환
function animateScale(element, scale, duration = 0.15) {
  return new Promise(resolve => {
    gsap.to(element, {
      duration: duration,
      scale: scale,
      onComplete: resolve
    });
  });
}

/**
 * 범용 요소 이동 및 클릭 애니메이션 함수
 * 
 * 사용 예시:
 * 
 * // 1. CSS 셀렉터로 요소 찾아 이동 (중앙)
 * await moveToElement('.my-button');
 * 
 * // 2. HTMLElement 객체로 이동 (우측, 클릭 애니메이션)
 * await moveToElement(headerElement, { position: 'right', offsetX: -15 });
 * 
 * // 3. 입력 필드로 이동하고 포커스
 * await moveToElement('input[type="text"]', { focus: true });
 * 
 * // 4. 빠른 이동, 클릭 없음
 * await moveToElement('#myDiv', { duration: 0.5, click: false });
 * 
 * // 5. 커스텀 클릭 애니메이션
 * await moveToElement('.button', { clickScale: 0.5, clickDuration: 0.2 });
 * 
 * @param {HTMLElement|string} target - 대상 요소 또는 CSS 셀렉터
 * @param {Object} options - 옵션 객체
 * @param {number} options.duration - 이동 애니메이션 시간 (기본값: 1.5)
 * @param {string} options.ease - GSAP easing (기본값: "power2.inOut")
 * @param {boolean} options.click - 클릭 애니메이션 실행 여부 (기본값: true)
 * @param {number} options.clickScale - 클릭 시 스케일 (기본값: 0.7)
 * @param {number} options.clickDuration - 클릭 애니메이션 시간 (기본값: 0.1)
 * @param {boolean} options.focus - focus() 호출 여부 (기본값: false)
 * @param {string} options.position - 요소 내 위치 ("center"|"left"|"right"|"top"|"bottom") (기본값: "center")
 * @param {number} options.offsetX - X축 오프셋 (기본값: 0)
 * @param {number} options.offsetY - Y축 오프셋 (기본값: 0)
 * @returns {Promise<HTMLElement>} - 대상 요소 반환
 */
async function moveToElement(target, options = {}) {
  const {
    duration = 1.5,
    ease = "power2.inOut",
    click = true,
    clickScale = 0.7,
    clickDuration = 0.1,
    focus = false,
    position = "center",
    offsetX = 0,
    offsetY = 0
  } = options;

  // 대상 요소 찾기
  let targetElement;
  if (typeof target === 'string') {
    targetElement = document.querySelector(target);
    if (!targetElement) {
      console.error(`요소를 찾을 수 없음: ${target}`);
      return null;
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
  } else {
    console.error('유효하지 않은 target:', target);
    return null;
  }

  // 요소의 위치 계산
  const rect = targetElement.getBoundingClientRect();
  let targetX, targetY;

  // 위치에 따른 좌표 계산
  switch (position) {
    case 'left':
      targetX = rect.left + 10;
      targetY = rect.top + rect.height / 2;
      break;
    case 'right':
      targetX = rect.right - 10;
      targetY = rect.top + rect.height / 2;
      break;
    case 'top':
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + 10;
      break;
    case 'bottom':
      targetX = rect.left + rect.width / 2;
      targetY = rect.bottom - 10;
      break;
    case 'center':
    default:
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
      break;
  }

  // 오프셋 적용
  targetX += offsetX;
  targetY += offsetY;

  console.log(`이동 대상:`, targetElement);
  console.log(`목표 좌표: (${targetX}, ${targetY})`);

  // 커서 이동
  await animateToPosition(customCursor, targetX, targetY, duration, ease);

  // focus 호출
  if (focus && typeof targetElement.focus === 'function') {
    targetElement.focus();
  }

  // 클릭 애니메이션
  if (click) {
    await animateScale(customCursor, clickScale, clickDuration);
    await animateScale(customCursor, 1, clickDuration);
  }

  return targetElement;
}


// 필터 버튼 클릭 (async/await 방식)
async function elementClick(element, X, Y) {

  // MouseEvent 생성 (실제 마우스 클릭을 시뮬레이션)
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: X,
    clientY: Y,
    screenX: X,
    screenY: Y,
    button: 0, // 왼쪽 버튼
    buttons: 1
  });
  
  // mousedown, mouseup 이벤트도 함께 발생 (일부 라이브러리는 이것도 체크)
  const mouseDownEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: X,
    clientY: Y,
    screenX: X,
    screenY: Y,
    button: 0,
    buttons: 1
  });
  
  const mouseUpEvent = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: X,
    clientY: Y,
    screenX: X,
    screenY: Y,
    button: 0,
    buttons: 1
  });

  const mouseMoveEvent = new MouseEvent('mousemove', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: X,
    clientY: Y,
    screenX: X,
    screenY: Y,
    button: 0,
    buttons: 1
  }); 
  const mouseOverEvent = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: X,
    clientY: Y,
    screenX: X,
    screenY: Y,
    button: 0,
    buttons: 1
  }); 

  element.dispatchEvent(mouseMoveEvent);
  element.dispatchEvent(mouseOverEvent);
  
  // 이벤트 순서대로 발생 (실제 마우스 클릭 시뮬레이션)
  console.log('mousedown 이벤트 발생');
  element.dispatchEvent(mouseDownEvent);
  
  await sleep(50);
  
  console.log('mouseup 이벤트 발생');
  element.dispatchEvent(mouseUpEvent);
  
  await sleep(50);
  
  console.log('click 이벤트 발생');
  element.dispatchEvent(clickEvent);
  
  // 추가: 만약 위 방법이 안 되면 다른 이벤트도 시도
  await sleep(50);
}

/**
 * 더블클릭 이벤트 발생
 */
async function elementDoubleClick(element, X, Y) {
  
  const mouseMoveEvent = new MouseEvent('mousemove', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: X,
    clientY: Y,
    screenX: X,
    screenY: Y,
    button: 0,
    buttons: 1
  }); 
  const mouseOverEvent = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: X,
    clientY: Y,
    screenX: X,
    screenY: Y,
    button: 0,
    buttons: 1
  }); 

  element.dispatchEvent(mouseMoveEvent);
  element.dispatchEvent(mouseOverEvent);

  
  // dblclick 이벤트
  const dblClickEvent = new MouseEvent('dblclick', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: X,
    clientY: Y,
    screenX: X,
    screenY: Y,
    button: 0,
    buttons: 1
  });
  
  console.log('dblclick 이벤트 발생:', { x: X, y: Y });
  element.dispatchEvent(dblClickEvent);
}

async function moveToEditor(target, options = {}) {
  const {
    duration = 1.5,
    ease = "power2.inOut",
    click = true,
    clickScale = 0.7,
    clickDuration = 0.1,
    focus = false,
    position = "center",
    offsetX = 0,
    offsetY = 0
  } = options;

  // 대상 요소 찾기
  let targetElement;
  if (typeof target === 'string') {
    targetElement = document.querySelector(target);
    if (!targetElement) {
      console.error(`요소를 찾을 수 없음: ${target}`);
      return null;
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
  } else {
    console.error('유효하지 않은 target:', target);
    return null;
  }
  // 요소의 위치 계산
  const rect = targetElement.getBoundingClientRect();
  let targetX, targetY;

  // 위치에 따른 좌표 계산
  switch (position) {
    case 'left':
      targetX = rect.left + 10;
      targetY = rect.top + rect.height / 5;
      break;
    case 'right':
      targetX = rect.right - 10;
      targetY = rect.top + rect.height / 5;
      break;
    case 'top':
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + 10;
      break;
    case 'bottom':
      targetX = rect.left + rect.width / 2;
      targetY = rect.bottom - 10;
      break;
    case 'center':
    default:
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 5;
      break;
  }

  // 오프셋 적용
  targetX += offsetX;
  targetY += offsetY;

  console.log(`이동 대상:`, targetElement);
  console.log(`목표 좌표: (${targetX}, ${targetY})`);

  // 커서 이동
  await animateToPosition(customCursor, targetX, targetY, duration, ease);

  // focus 호출
  if (focus && typeof targetElement.focus === 'function') {
    targetElement.focus();
  }

  // 클릭 애니메이션
  if (click) {
    await animateScale(customCursor, clickScale, clickDuration);
    await animateScale(customCursor, 1, clickDuration);
  }

  return targetElement;
}

async function findEditor (element) {
  const parent = element.parentElement;
  // console.log('parent element :', parent);
  if (parent) {
    const classNameElement = parent.querySelector('.css-class-name');
    // console.log('classNameElement :', classNameElement);
    if (classNameElement) {
      const text = classNameElement.innerText || classNameElement.textContent || '';
      // console.log('editor key text :', text);
      const editorKey = text.replace(/^▷\s*/, '').trim().slice(1);
      // console.log('editor key :', editorKey);
      if (cssClassEditors && cssClassEditors.has(editorKey)) {
        const editorInstance = cssClassEditors.get(editorKey);
        return editorInstance;
      }
    }
  }
  return;
}

async function editorFocus (editorInstance) {
  if (editorInstance) {
    editorInstance.focus();
    await sleep(50);
    editorInstance.setPosition({column: 1, lineNumber: 2});
    await sleep(50);
  }
}

async function doEditorInput (editorInstance, text) {
  if (editorInstance) {
    const chars = text.split('');
    // console.log('chars :', chars);
    let currentText = '';

    let val = editorInstance.getValue();
    // console.log('initial editor value :', val);
    const firstNewLineIdx = val.indexOf('\n');
    const st = val.slice(0, firstNewLineIdx + 1);
    const lastNewLineIdx = val.lastIndexOf('\n');
    const ed = val.slice(lastNewLineIdx);
    // console.log('st :', st);
    // console.log('ed :', ed);
    
    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];
      // console.log('currentText :', currentText);
      // console.log('st :', val.slice(0, lastNewLineIdx));
      // console.log('ed :', val.slice(lastNewLineIdx + 1));
      let newVal = st + currentText + ed;
      // console.log('newVal :', newVal);
      editorInstance.setValue(newVal);
      editorInstance.setPosition({column: currentText.length, lineNumber: 2});
      // val = newVal;

      // 각 글자 입력 후 대기 (타이핑 효과)
      await sleep(200);
    }
  }
}

//------------------------ 공통 함수 끝 ------------------------

