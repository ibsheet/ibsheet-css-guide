var FocusContent = document.getElementById('focus-content');
if (FocusContent) {
  const tabFocusCursorTag = document.getElementsByClassName('tabFocusCursorTag');
  const tabFocusDivTag = document.getElementsByClassName('tabFocusDivTag');

  if (tabFocusCursorTag[0]) {
    tabFocusCursorTag[0].style.display = 'block';
  }

  document.body.addEventListener('click', e => {
    if (!FocusContent || !FocusContent.contains(e.target)) {
      return;
    }
  
    const isTargetFilter = 
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${prefixTheme}Filter0Value`) &&
      e.target.classList.contains(`${prefixTheme}CellFilter`);
  
    const isTargetEnumType =
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${prefixTheme}EnumLeft`) &&
      e.target.classList.contains(`${prefixTheme}Cell`);
  
    function divTagHide() {
      Array.from(tabFocusDivTag).forEach(element => {
        element.style.display = 'none';
      });
    }
    function divTagTagHide() {
      Array.from(tabFocusCursorTag).forEach(element => {
        element.style.display = 'none';
      });
    }
  
    const isTargetIBEditText =
      e.target &&
      e.target.nodeType === 1 &&
      Array.from(e.target.classList).some(cn => cn === `${prefixTheme}EditText`);
  
    const isTargetTabFocusDiv = Array.from(tabFocusDivTag).some(element => element.contains(e.target));
    
    if (!isTargetIBEditText && !isTargetTabFocusDiv) {
      divTagHide();
      divTagTagHide();
      tabFocusCursorTag[0].style.display = 'block';
  
      if (isTargetFilter) {
        const tabFilterTag = FocusContent.querySelectorAll(`[class*="${prefixTheme}Filter0Value"][class*="${prefixTheme}CellFilter"]`);
        if (e.target == tabFilterTag[5]) {
          const tabFocusTag = document.getElementById('tabFocusTag1');
          if (tabFocusTag) {
            tabFocusTag.style.display = 'block';
          }
        } 
        // else if (e.target == tabFilterTag[7]) {
        //   const tabFocusTag = document.getElementById('tabFocusTag2');
        //   if (tabFocusTag) {
        //     tabFocusTag.style.display = 'block';
        //   }
        // } 
        else if (e.target == tabFilterTag[8]) {
          const tabFocusTag = document.getElementById('tabFocusTag3');
          if (tabFocusTag) {
            tabFocusTag.style.display = 'block';
          }
        }
      }
  
    }
  });
      
  document.body.addEventListener('dblclick', e => {
    if (!FocusContent || !FocusContent.contains(e.target)) {
      return;
    }
  
    function divTagHide() {
      Array.from(tabFocusDivTag).forEach(element => {
        element.style.display = 'none';
      });
    }
    function divTagTagHide() {
      Array.from(tabFocusCursorTag).forEach(element => {
        element.style.display = 'none';
      });
    }
  
    const isTargetFocusedCell =
      e.target &&
      e.target.nodeType === 1 &&
      Array.from(e.target.classList).some(cn => cn === `${prefixTheme}ClassFocusedCell`);
      
    if (isTargetFocusedCell) {
      divTagTagHide();
      divTagHide();
      if (tabFocusCursorTag[1]) {
        tabFocusCursorTag[1].style.display = 'block';
      }
      const tabFocusTag = document.getElementById('tabFocusTag0');
      if (tabFocusTag) {
        tabFocusTag.style.display = 'block';
      }
    }
  });

  const focusSheetArea = FocusContent.querySelector('#sheetDiv6');
  if (focusSheetArea) {
    const focusSheetInfoAreas = focusSheetArea.querySelectorAll('.infoArea');
    
    // 간단한 tippy 설정들 - 이제 스타일시트에서 자동으로 CSS 속성을 가져옵니다
    const focusConfigs = [
      { index: 0, title: `.${prefixTheme}BoolX`, description: 'Bool Type의 컬럼의 필터행에서 아무 조건도 선택되지 않을 때 출력되는 아이콘', classes: `.${prefixTheme}BoolX, .${prefixTheme}BoolXRO` },
      { index: 1, title: `.${prefixTheme}Bool0`, description: 'Bool Type의 컬럼의 필터행에서 선택되지 않은 값들에 대한 필터링 사용 시 출력되는 아이콘', classes: `.${prefixTheme}Bool0, .${prefixTheme}Bool0RO` },
      { index: 2, title: `.${prefixTheme}Bool1`, description: 'Bool Type의 컬럼의 필터행에서 선택된 값들에 대한 필터링 사용 시 출력되는 아이콘', classes: `.${prefixTheme}Bool1, .${prefixTheme}Bool1RO` },
      { index: 3, title: `.${prefixTheme}Filter0Left`, description: '문자형 컬럼에서 사용되는 필터행, 아이콘을 클릭하여 필터 조건을 선택할 수 있습니다.', classes: `.${prefixTheme}Filter0Left, .${prefixTheme}Filter0Right, .${prefixTheme}Filter0Menu` },
      { index: 4, title: `.${prefixTheme}Filter0Left`, description: '숫자형 컬럼에서 사용되는 필터행. 아이콘을 클릭하여 필터 조건을 선택할 수 있습니다.', classes: `.${prefixTheme}Filter0Left, .${prefixTheme}Filter0Right, .${prefixTheme}Filter0Menu` },
      { index: 5, title: `.${prefixTheme}ClassFocusedCell`, description: '포커스 된 셀에 적용 되는 Class. 영역을 더블 클릭하여 EditMode 활성화 시 설정된 Suggest기능을 확인하실 수 있습니다.', classes: `.${prefixTheme}ClassFocusedCell, .${prefixTheme}ClassFocusedCell *` },
      { index: 6, title: 'HoverCell', description: 'Hover된 셀에 inline으로 .IBColorHoveredCell의 배경색이 적용됩니다.', classes: `.${prefixTheme}ColorHoveredCell` },
      { index: 7, title: `.${prefixTheme}ClassNoFocus`, description: 'CanFocus: 0인 영역에 적용 되는 Class', classes: `.${prefixTheme}ClassNoFocus` },
      { index: 8, title: `.${prefixTheme}ClassReadOnly`, description: 'CanEdit: 0인 영역에 적용 되는 Class<br>(Cfg) ColorState의 영향을 받으며, 설정에 따라 .IBColorReadOnly의 영향을 받습니다.', classes: [{selector: `.${prefixTheme}ClassReadOnly`}, {selector: `.${prefixTheme}ColorReadOnly`}] },
      { index: 9, title: `.${prefixTheme}FormulaRow`, description: 'Formula행에 적용 되는 Class', classes: `.${prefixTheme}FormulaRow, .${prefixTheme}FormulaRow *` },
      { index: 10, title: `.${prefixTheme}FocusRowBackground`, description: 'Focus 된 행에 출력되는 Class', classes: `.${prefixTheme}FocusRowBackground` },
      { index: 11, title: `.${prefixTheme}HoverRowBackground`, description: '마우스가 Hover된 행에 출력되는 Class', classes: `.${prefixTheme}HoverRowBackground` }
    ];
    
    focusConfigs.forEach(config => {
      if (focusSheetInfoAreas[config.index]) {
        tippy(focusSheetInfoAreas[config.index], {
          content: createTippyContent(config.title, config.description || '', config.classes)
        });
      }
    });
  }
  
  // 탭별 tippy 설정
  const focusTab1Area = FocusContent.querySelector('#tabFocusTag1');
  if (focusTab1Area) {
    const focusTab1InfoAreas = focusTab1Area.querySelectorAll('.infoArea');
    const tab1Configs = [
      { title: `.${prefixTheme}Filter0Menu`, description: '필터링 사용안함에 적용 되는 Class', classes: `.${prefixTheme}Filter0Left, .${prefixTheme}Filter0Right, .${prefixTheme}Filter0Menu` },
      { title: `.${prefixTheme}Filter1Menu`, description: '필터링 같음에 적용 되는 Class', classes: `.${prefixTheme}Filter1Left, .${prefixTheme}Filter1Right, .${prefixTheme}Filter1Menu` },
      { title: `.${prefixTheme}Filter2Menu`, description: '필터링 같지 않음에 적용 되는 Class', classes: `.${prefixTheme}Filter2Left, .${prefixTheme}Filter2Right, .${prefixTheme}Filter2Menu` },
      { title: `.${prefixTheme}Filter7Menu`, description: '필터링 단어로 시작함에 적용 되는 Class', classes: `.${prefixTheme}Filter7Left, .${prefixTheme}Filter7Right, .${prefixTheme}Filter7Menu` },
      { title: `.${prefixTheme}Filter8Menu`, description: '필터링 단어로 시작하지 않음에 적용 되는 Class', classes: `.${prefixTheme}Filter8Left, .${prefixTheme}Filter8Right, .${prefixTheme}Filter8Menu` },
      { title: `.${prefixTheme}Filter9Menu`, description: '필터링 단어로 끝남에 적용 되는 Class', classes: `.${prefixTheme}Filter9Left, .${prefixTheme}Filter9Right, .${prefixTheme}Filter9Menu` },
      { title: `.${prefixTheme}Filter10Menu`, description: '필터링 단어로 끝나지 않음에 적용 되는 Class', classes: `.${prefixTheme}Filter10Left, .${prefixTheme}Filter10Right, .${prefixTheme}Filter10Menu` },
      { title: `.${prefixTheme}Filter11Menu`, description: '필터링 포함함에 적용 되는 Class', classes: `.${prefixTheme}Filter11Left, .${prefixTheme}Filter11Right, .${prefixTheme}Filter11Menu` },
      { title: `.${prefixTheme}Filter12Menu`, description: '필터링 포함하지 않음에 적용 되는 Class', classes: `.${prefixTheme}Filter12Left, .${prefixTheme}Filter12Right, .${prefixTheme}Filter12Menu` },
      { title: `.${prefixTheme}Filter14Menu`, description: '필터링 값 있음에 적용 되는 Class', classes: `.${prefixTheme}Filter14Left, .${prefixTheme}Filter14Right, .${prefixTheme}Filter14Menu` },
      { title: `.${prefixTheme}Filter15Menu`, description: '필터링 값 없음에 적용 되는 Class', classes: `.${prefixTheme}Filter15Left, .${prefixTheme}Filter15Right, .${prefixTheme}Filter15Menu` }
    ];
    
    tab1Configs.forEach((config, index) => {
      if (focusTab1InfoAreas[index]) {
        tippy(focusTab1InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }
  
  const focusTab3Area = FocusContent.querySelector('#tabFocusTag3');
  if (focusTab3Area) {
    const focusTab3InfoAreas = focusTab3Area.querySelectorAll('.infoArea');
    const tab3Configs = [
      { title: `.${prefixTheme}Filter3Menu`, description: '필터링 작음에 적용 되는 Class', classes: `.${prefixTheme}Filter3Left, .${prefixTheme}Filter3Right, .${prefixTheme}Filter3Menu` },
      { title: `.${prefixTheme}Filter4Menu`, description: '필터링 같거나 작음에 적용 되는 Class', classes: `.${prefixTheme}Filter4Left, .${prefixTheme}Filter4Right, .${prefixTheme}Filter4Menu` },
      { title: `.${prefixTheme}Filter5Menu`, description: '필터링 큼에 적용 되는 Class', classes: `.${prefixTheme}Filter5Left, .${prefixTheme}Filter5Right, .${prefixTheme}Filter5Menu` },
      { title: `.${prefixTheme}Filter6Menu`, description: '필터링 같거나 큼에 적용 되는 Class', classes: `.${prefixTheme}Filter6Left, .${prefixTheme}Filter6Right, .${prefixTheme}Filter6Menu` },
      { title: `.${prefixTheme}Filter13Menu`, description: '필터링 상위 10에 적용 되는 Class', classes: `.${prefixTheme}Filter13Left, .${prefixTheme}Filter13Right, .${prefixTheme}Filter13Menu` }
    ];
    
    tab3Configs.forEach((config, index) => {
      if (focusTab3InfoAreas[index]) {
        tippy(focusTab3InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }

  // 행, 열 배경색 적용
  const focusSheetMidBody = FocusContent.querySelectorAll(`.${prefixTheme}BodyMid`)[0];
  const focusSheetRows = focusSheetMidBody.querySelectorAll(`.${prefixTheme}DataRow`);
  focusSheetRows.forEach((row, rowIndex) => {
    const tds = row.querySelectorAll('td');
    tds.forEach((td, tdIndex) => {
      if (tdIndex === 7) {
        td.style.backgroundColor = '#eaeafd';
      }
      if (rowIndex === 3) {
        td.style.backgroundColor = '#eaeafd';
      }
    });
  });

  // 필터행에서 특정 컬럼 배경색 적용
  const focusSheetMidHead = FocusContent.querySelectorAll(`.${prefixTheme}HeadMid`)[0];
  const focusSheetFilterRows = focusSheetMidHead.querySelectorAll(`.${prefixTheme}FilterRow`);
  focusSheetFilterRows.forEach((row, rowIndex) => {
    const tds = row.querySelectorAll('td');
    tds.forEach((td, tdIndex) => {
      if (tdIndex === 7) {
        td.style.backgroundColor = '#eaeafd';
      }
    });
  });
}
