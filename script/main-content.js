var MainContent = document.getElementById('main-content');
if (MainContent) {
  document.body.addEventListener('click', e => {
    if (!MainContent || !MainContent.contains(e.target)) {
      return;
    }
  
    const MainDivTag = document.getElementsByClassName('tabMainDivTag');
    const DataEnum = document.getElementsByClassName(`${prefixTheme}EnumLeft ${prefixTheme}Cell`);
    const IBDateRight = document.getElementsByClassName(`${prefixTheme}DateRight ${prefixTheme}Cell`);
  
    function divTagHide() {
      Array.from(MainDivTag).forEach(element => {
        element.style.display = 'none';
      });
    }
  
    const isTargetEnumType =
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${prefixTheme}EnumLeft`) &&
      e.target.classList.contains(`${prefixTheme}Cell`);
  
    const isTargetDateRight =
      e.target &&
      e.target.nodeType === 1 &&
      Array.from(e.target.classList).some(cn => cn === `${prefixTheme}DateRight`);
  
    const isTargetPickMYDown =
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${prefixTheme}PickMYDown`);
  
    const isTargetPickMYUp =
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${prefixTheme}PickMYUp`);
  
    const isInMainDivTag = Array.from(MainDivTag).some(div => div.contains(e.target));
  
    if (isTargetEnumType) {
      divTagHide();
      if (DataEnum[0] == e.target) {
        const targetDiv = document.getElementById('tabMainTag0');
        if (targetDiv) {
          targetDiv.style.display = 'block';
        }
      }
    }
    else if (isTargetDateRight) {
      divTagHide();
      if (IBDateRight[0] == e.target) {
        const targetDiv = document.getElementById('tabMainTag1');
        if (targetDiv) {
          targetDiv.style.display = 'block';
        }
      }
    } else if (isTargetPickMYDown) {
      divTagHide();
      const targetDiv = document.getElementById('tabMainTag2');
      if (targetDiv) {
        targetDiv.style.display = 'block';
      }
    } else if (isTargetPickMYUp) {
      divTagHide();
      const targetDiv = document.getElementById('tabMainTag1');
      if (targetDiv) {
        targetDiv.style.display = 'block';
      }
    } else if (!isInMainDivTag) {
      divTagHide();
    }
  });

  const mainSheetArea = MainContent.querySelector('#sheetDiv1');
  if (mainSheetArea) {
    const mainSheetInfoAreas = mainSheetArea.querySelectorAll('.infoArea');
    
    // 간단한 tippy 설정들 - 이제 스타일시트에서 자동으로 CSS 속성을 가져옵니다
    const configs = [
      { index: 0, title: `.${prefixTheme}InfoRow`, description: '조회된 데이터의 개수나 페이지 네비게이션을 출력합니다.', classes: `.${prefixTheme}InfoRow, .${prefixTheme}InfoRow *`  },
      { index: 1, title: 'Header Cell', description: '각 컬럼의 헤더 정보를 출력하는 영역입니다.', classes: [{selector: `.${prefixTheme}HeaderText`}, {selector: `.${prefixTheme}CellHeader`}] },
      { index: 2, title: 'Bool Header Cell', description: 'Header Check를 사용하는 Header Cell입니다.', classes: [{selector: `.${prefixTheme}Check0Left, .${prefixTheme}Check0Center, .${prefixTheme}Check0Right, .${prefixTheme}Check0Top, .${prefixTheme}Check0Bottom`}, {selector: `.${prefixTheme}Check1Left, .${prefixTheme}Check1Center, .${prefixTheme}Check1Right, .${prefixTheme}Check1Top, .${prefixTheme}Check1Bottom`}, {selector: `.${prefixTheme}Check2Left, .${prefixTheme}Check2Center, .${prefixTheme}Check2Right, .${prefixTheme}Check2Top, .${prefixTheme}Check2Bottom`}] },
      { index: 3, title: 'Text Type', description: 'Text Type의 컬럼에서 사용되는 Class', classes: `.${prefixTheme}Text` },
      { index: 4, title: 'Lines Type', description: 'Lines Type의 컬럼에서 사용되는 Class', classes: `.${prefixTheme}Lines, .${prefixTheme}Radio, .${prefixTheme}Html, .${prefixTheme}List` },
      { index: 5, title: 'Enum Type', description: 'Enum Type의 컬럼에서 사용되는 Class', classes: [{selector: `.${prefixTheme}EnumLeft, .${prefixTheme}EnumRight, .${prefixTheme}EnumTop, .${prefixTheme}EnumBottom`}, {selector: `.${prefixTheme}Enum`}] },
      { index: 6, title: 'Button Type', description: 'Button Type의 컬럼에서 사용되는 Class', classes: [{selector: `.${prefixTheme}Button`}, {selector: `.${prefixTheme}DialogButton, u.${prefixTheme}SheetButton`}] },
      { index: 7, title: 'Int Type', description: 'Int Type의 컬럼에서 사용되는 Class', classes: `.${prefixTheme}Int, .${prefixTheme}Float, .${prefixTheme}Date` },
      { index: 8, title: 'Float Type', description: 'Float Type의 컬럼에서 사용되는 Class', classes: `.${prefixTheme}Int, .${prefixTheme}Float, .${prefixTheme}Date` },
      { index: 9, title: 'Date Type', description: 'Date Type의 컬럼에서 사용되는 Class', classes: `.${prefixTheme}Int, .${prefixTheme}Float, .${prefixTheme}Date` },
      { index: 10, title: '달력 이미지', description: '클릭하여 달력을 실행하실 수 있습니다.', classes: `.${prefixTheme}Main .${prefixTheme}DateLeft, .${prefixTheme}Main .${prefixTheme}DatesLeft, .${prefixTheme}Main .${prefixTheme}DateRight, .${prefixTheme}Main .${prefixTheme}DatesRight, .${prefixTheme}Main .${prefixTheme}DateTop, .${prefixTheme}Main .${prefixTheme}DatesTop, .${prefixTheme}Main .${prefixTheme}DateBottom, .${prefixTheme}Main .${prefixTheme}DatesBottom` },
      { index: 11, title: 'Link Type', description: 'Link Type의 컬럼에서 사용되는 Class', classes: `.${prefixTheme}Link` },
      { index: 12, title: 'Img Type', description: 'Img Type의 컬럼에서 사용되는 Class', classes: `.${prefixTheme}Img, .${prefixTheme}Html` },
      { index: 13, title: 'Pass Type', description: 'Pass Type의 컬럼에서 사용되는 Class', classes: `.${prefixTheme}Pass` },
      { index: 14, title: 'Radio Type', description: 'Radio Type의 컬럼에서 사용되는 Class', classes: [{selector: `.${prefixTheme}Lines, .${prefixTheme}Radio, .${prefixTheme}Html, .${prefixTheme}List`}, {selector: `.${prefixTheme}Radio0Left, .${prefixTheme}Radio0Right`}, {selector: `.${prefixTheme}Radio1Left, .${prefixTheme}Radio1Right`}, {selector: `.${prefixTheme}Radio2Left, .${prefixTheme}Radio2Right`}, {selector: `.${prefixTheme}Radio3Left, .${prefixTheme}Radio3Right`} ] },
      { index: 15, title: 'Bool Type', description: 'Bool Type의 컬럼에서 사용되는 Class', classes: [{selector: `.${prefixTheme}Bool`}, {selector: `.${prefixTheme}Bool0, .${prefixTheme}Bool0RO`}, {selector: `.${prefixTheme}Bool1, .${prefixTheme}Bool1RO`}, {selector: `.${prefixTheme}BoolX, .${prefixTheme}BoolXRO`}, {selector: `.${prefixTheme}Bool2, .${prefixTheme}Bool2RO`}, {selector: `.${prefixTheme}Bool3, .${prefixTheme}Bool3RO`} ] },
      { index: 16, title: 'Alternate', description: '홀수, 짝수 행에 대하여 번갈아 가며 배경색을 다르게 설정하여 가독성을 높일 수 있는 기능<br>CSS 파일에서 .IBColorAlternate Class를 찾아 수정하시거나 시트 생성 시 Def.Row.AlternateColor를 통해 배경색을 지정할 수 있습니다.<br>Sample에서는 (Cfg) Alternate: 2로 설정되어 짝수행 마다 Alternate 배경색이 적용되고 있습니다.<br>※ AlternateColor는 inline-style로 적용되어 Class로 제어할 수 없습니다.', classes: `.${prefixTheme}ColorAlternate` },
      { index: 17, title: 'SolidRow', description: 'Header나 Footer에 출력되는 고정 행', classes: `.${prefixTheme}SolidRow` }
    ];
    
    configs.forEach(config => {
      if (mainSheetInfoAreas[config.index]) {
        tippy(mainSheetInfoAreas[config.index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }
  
  // 탭별 tippy 설정
  const mainTab0Area = MainContent.querySelector('#tabMainTag0');
  if (mainTab0Area) {
    const mainTab0InfoAreas = mainTab0Area.querySelectorAll('.infoArea');
    const tab0Configs = [
      { title: `Enum Edit Menu`, description: 'Enum Type Edit 시 Enum속성에 설정한 메뉴가 출력됩니다.', classes: [{selector: `.${prefixTheme}MenuItemText`}, {selector: `.${prefixTheme}MenuItem`}, {selector: `.${prefixTheme}MenuFocus`} ] },
      { title: `Enum Edit`, description: 'Enum Type에서 Edit Mode 활성화 시 노출되는 형태', classes: `.${prefixTheme}EnumHeaderLeft, .${prefixTheme}EnumHeaderRight` }
    ];
  
    tab0Configs.forEach((config, index) => {
      if (mainTab0InfoAreas[index]) {
        tippy(mainTab0InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }
  
  const mainTab1Area = MainContent.querySelector('#tabMainTag1');
  if (mainTab1Area) {
    const mainTab1InfoAreas = mainTab1Area.querySelectorAll('.infoArea');
    const tab1Configs = [
      { title: `.${prefixTheme}PickBL`, description: '이전 달로 이동', classes: `.${prefixTheme}PickBL` },
      { title: `.${prefixTheme}PickBR`, description: '다음 달로 이동', classes: `.${prefixTheme}PickBR` },
      { title: `.${prefixTheme}PickMYDown`, description: '년/월 달력 닫힘, 클릭 시 월 달력에서 년/월 달력으로 전환합니다.', classes: `.${prefixTheme}PickMYDown` },
      { title: `.${prefixTheme}PickSu`, description: '일요일 표시', classes: `.${prefixTheme}PickWDN.${prefixTheme}PickSu` },
      { title: `.${prefixTheme}PickWDN`, description: '요일 표시', classes: `.${prefixTheme}PickWDN` },
      { title: `.${prefixTheme}PickSa`, description: '토요일 표시', classes: `.${prefixTheme}PickWDN.${prefixTheme}PickSa` },
      { title: `.${prefixTheme}PickOM`, description: '주간 표기 시 지난 달 혹은 다음 달 표시', classes: `.${prefixTheme}PickOM, .${prefixTheme}PickOMNE, .${prefixTheme}PickOM button` },
      { title: `.${prefixTheme}PickSel`, description: '선택 된 날짜', classes: `.${prefixTheme}PickSel, .${prefixTheme}Pick2MSel, .${prefixTheme}Pick2YSel` },
      { title: `.${prefixTheme}PickHover`, description: 'Hover 상태인 날짜', classes: `.${prefixTheme}PickHover, .${prefixTheme}Pick2MHover, .${prefixTheme}Pick2YHover` },
      { title: `.${prefixTheme}PickWD`, description: '이번 달 날짜 표시', classes: `.${prefixTheme}PickHover, .${prefixTheme}PickSelHover, .${prefixTheme}PickWD, .${prefixTheme}PickSa, .${prefixTheme}PickSu, .${prefixTheme}PickSel, .${prefixTheme}PickNow, .${prefixTheme}PickWDNE, .${prefixTheme}PickSaNE, .${prefixTheme}PickSuNE, .${prefixTheme}PickSelNE, .${prefixTheme}PickNowNE, .${prefixTheme}PickOM, .${prefixTheme}PickOMNE` },
      { title: `.${prefixTheme}PickNow`, description: '오늘 날짜 표시', classes: `.${prefixTheme}PickNow` },
    ];
    
    tab1Configs.forEach((config, index) => {
      if (mainTab1InfoAreas[index]) {
        tippy(mainTab1InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }
  
  const mainTab2Area = MainContent.querySelector('#tabMainTag2');
  if (mainTab2Area) {
    const mainTab2InfoAreas = mainTab2Area.querySelectorAll('.infoArea');
    const tab2Configs = [
      { title: `.${prefixTheme}PickBL`, description: '이전 달로 이동', classes: `.${prefixTheme}PickBL` },
      { title: `.${prefixTheme}PickBR`, description: '다음 달로 이동', classes: `.${prefixTheme}PickBR` },
      { title: `.${prefixTheme}PickMYUp`, description: '년/월 달력 열림. 클릭 시 년/월 달력에서 월 달력으로 전환합니다.', classes: `.${prefixTheme}PickMYUp` },
      { title: `.${prefixTheme}Pick2BL`, description: '이전 년도로 이동', classes: `.${prefixTheme}Pick2BL` },
      { title: `.${prefixTheme}Pick2BR`, description: '다음 년도로 이동', classes: `.${prefixTheme}Pick2BR` },
      { title: `.${prefixTheme}Pick2YHover`, description: '년월 달력에서 Hover 상태인 년도', classes: `.${prefixTheme}PickHover, .${prefixTheme}Pick2MHover, .${prefixTheme}Pick2YHover` },
      { title: `.${prefixTheme}IBPick2YSel`, description: '년월 달력에서 선택된 년도', classes: `.${prefixTheme}PickSel, .${prefixTheme}Pick2MSel, .${prefixTheme}Pick2YSel` },
      { title: `.${prefixTheme}IBPick2MHover`, description: '년월 달력에서 Hover 상태인 월', classes: `.${prefixTheme}PickHover, .${prefixTheme}Pick2MHover, .${prefixTheme}Pick2YHover` },
      { title: `.${prefixTheme}Pick2MSel`, description: '년월 달력에서 선택된 월', classes: `.${prefixTheme}PickSel, .${prefixTheme}Pick2MSel, .${prefixTheme}Pick2YSel` },
      { title: `.${prefixTheme}Pick2Y`, description: '년월 달력에서 년도 출력 공통', classes: `.${prefixTheme}Pick2M, .${prefixTheme}Pick2Y` },
      { title: `.${prefixTheme}Pick2M`, description: '년월 달력에서 월 출력 공통', classes: `.${prefixTheme}Pick2M, .${prefixTheme}Pick2Y` },
      { title: `.${prefixTheme}DialogButton`, description: '확인 버튼', classes: `.${prefixTheme}DialogButton, u.${prefixTheme}SheetButton` }
    ];
    
    tab2Configs.forEach((config, index) => {
      if (mainTab2InfoAreas[index]) {
        tippy(mainTab2InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }
}
