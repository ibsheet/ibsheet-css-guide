var FilternSortContent = document.getElementById('filternsort-content');

document.body.addEventListener('click', e => {
  if (!FilternSortContent || !FilternSortContent.contains(e.target)) {
    return;
  }

  const FilterDialogRight = document.getElementsByClassName(`${prefixTheme}FilterDialog0Right`);
  const FilterDivTag = document.getElementsByClassName('tabFilterDivTag');

  const isTargetFilterDialogRight =
    e.target &&
    e.target.nodeType === 1 &&
    Array.from(e.target.classList).some(cn => cn === `${prefixTheme}FilterDialog0Right`);

  function divTagHide() {
    Array.from(FilterDivTag).forEach(element => {
      element.style.display = 'none';
    });
  }

  // .filterDivTag 또는 그 하위 태그 클릭시 아무것도 숨기지 않음
  const isInFilterDivTag = Array.from(FilterDivTag).some(div => div.contains(e.target));

  if (isTargetFilterDialogRight) {
    // 클릭한 filter dialog right에 대응하는 div만 보여줌
    divTagHide();
    Array.from(FilterDialogRight).forEach((element, index) => {
      if (element === e.target) {
        const targetDiv = document.getElementById('tabFilterTag' + index);
        if (targetDiv) {
          targetDiv.style.display = 'block';
        }
      }
    });
  } else if (!isInFilterDivTag) {
    // filterDivTag 영역 밖 클릭시 숨김
    divTagHide();
  }
});

if (FilternSortContent) {
  const filterSheetArea = FilternSortContent.querySelector('#sheetDiv5');
  if (filterSheetArea) {
    const filterSheetInfoAreas = filterSheetArea.querySelectorAll('.infoArea');
    const filterConfigs = [
      { title: `.${prefixTheme}FilterDialog0Right`, description: '헤더의 필터 아이콘을 클릭하여 문자형 필터 다이얼로그를 호출합니다.', classes: [{selector: `.${prefixTheme}FilterDialog0Right`}, {selector: `.${prefixTheme}FilterDialog1Right` }] },
      { title: `.${prefixTheme}FilterDialog0Right`, description: '헤더의 필터 아이콘을 클릭하여 숫자형 필터 다이얼로그를 호출합니다.', classes: [{selector: `.${prefixTheme}FilterDialog0Right`}, {selector: `.${prefixTheme}FilterDialog1Right` }] },
      { title: `.${prefixTheme}FilterDialog0Right`, description: '헤더의 필터 아이콘을 클릭하여 날짜형 필터 다이얼로그를 호출합니다.', classes: [{selector: `.${prefixTheme}FilterDialog0Right`}, {selector: `.${prefixTheme}FilterDialog1Right` }] },
      { title: `.${prefixTheme}FilterDialog0Right`, description: '헤더의 필터 아이콘을 클릭하여 필터 다이얼로그를 호출합니다.', classes: [{selector: `.${prefixTheme}FilterDialog0Right`}, {selector: `.${prefixTheme}FilterDialog1Right` }] }
    ];
    
    filterConfigs.forEach((config, index) => {
      if (filterSheetInfoAreas[index]) {
        tippy(filterSheetInfoAreas[index], {
          content: createTippyContent(config.title, config.description || '', config.classes),
          placement: 'bottom'
        });
      }
    });

    const sort1SheetArea = FilternSortContent.querySelector('#sheetDiv2');
    if (sort1SheetArea) {
      const sort1SheetInfoAreas = sort1SheetArea.querySelectorAll('.infoArea');
      const sort1Configs = [
        { title: `.${prefixTheme}Sort3Right`, description: '정렬 기능 사용 시 3순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort3Left, .${prefixTheme}Sort3Right` },
        { title: `.${prefixTheme}Sort2Right`, description: '정렬 기능 사용 시 2순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort2Left, .${prefixTheme}Sort2Right` },
        { title: `.${prefixTheme}Sort1Right`, description: '정렬 기능 사용 시 1순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort1Left, .${prefixTheme}Sort1Right` },
      ];

      sort1Configs.forEach((config, index) => {
        tippy(sort1SheetInfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes),
          placement: 'top'
        });
      });
    }

    const sort2SheetArea = FilternSortContent.querySelector('#sheetDiv3');
    if (sort2SheetArea) {
      const sort2SheetInfoAreas = sort2SheetArea.querySelectorAll('.infoArea');
      const sort2Configs = [
        { title: `.${prefixTheme}Sort6Right`, description: '정렬 기능 사용 시 3순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort6Left, .${prefixTheme}Sort6Right` },
        { title: `.${prefixTheme}Sort5Right`, description: '정렬 기능 사용 시 2순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort5Left, .${prefixTheme}Sort5Right` },
        { title: `.${prefixTheme}Sort4Right`, description: '정렬 기능 사용 시 1순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort4Left, .${prefixTheme}Sort4Right` },
      ];

      sort2Configs.forEach((config, index) => {
        tippy(sort2SheetInfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes),
          placement: 'top'
        });
      });
    }

    const reqSheetArea = FilternSortContent.querySelector('#sheetDiv4');
    if (reqSheetArea) {
      const reqSheetInfoAreas = reqSheetArea.querySelectorAll('.infoArea');
      const reqConfigs = [
        { title: `.${prefixTheme}Required`, description: '필수 값 기능 시 출력되는 아이콘입니다.', classes: `.${prefixTheme}Required` }
      ];

      reqConfigs.forEach((config, index) => {
        tippy(reqSheetInfoAreas[index], {
          content: createTippyContent(config.title, config.description || '', config.classes),
          placement: 'top'
        });
      });
    }
  }
  
  // 탭별 tippy 설정
  const filterTab0Area = FilternSortContent.querySelector('#tabFilterTag0');
  if (filterTab0Area) {
    const filterTab0InfoAreas = filterTab0Area.querySelectorAll('.infoArea');
    const tab0Configs = [
      { title: `.${prefixTheme}MenuNextIcon`, description: '컬럼 타입에 따라 어떤 필터인지 출력하며, 필터에서 조건 값을 입력할 수 있도록 창을 출력시킵니다.', classes: `.${prefixTheme}MenuNextIcon` },
      { title: `.${prefixTheme}FilterDialogSearchIcon`, description: '컬럼의 값 들에서 해당 영역에 입력한 값을 포함한 문자열을 찾는 기능입니다.', classes: `.${prefixTheme}FilterDialogSearchIcon` },
      { title: `.${prefixTheme}FilterDialogHeaderCheckIcon0`, description: '컬럼의 값들을 모두 선택하거나, 선택 해제 기능입니다.', classes: [{selector: `.${prefixTheme}FilterDialogHeaderCheckIcon0`}, {selector: `.${prefixTheme}FilterDialogHeaderCheckIcon1`}] },
      { title: `.${prefixTheme}DataFilterDialogSideCheck0`, description: '컬럼의 값들 중에서 필터링 대상이 아닌 값에 출력되는 아이콘입니다.', classes: `.${prefixTheme}DataFilterDialogSideCheck0` },
      { title: `.${prefixTheme}DataFilterDialogSideCheck1`, description: '컬럼의 값들 중에서 필터링 대상인 값에 출력되는 아이콘입니다.', classes: `.${prefixTheme}DataFilterDialogSideCheck1` },
      { title: `.${prefixTheme}FilterDialogFooterButtons`, description: '필터 다이얼로그 바닥에 출력되는 버튼입니다.', classes: `.${prefixTheme}FilterDialogFooterButtons > button` },
      { title: `.${prefixTheme}FilterDialogResizingIcon`, description: '필터 다이얼로그 리사이즈 기능이 사용 가능한 영역에 출력되는 아이콘입니다.', classes: `.${prefixTheme}FilterDialogResizingIcon` },
      { title: `.${prefixTheme}TextFilterDialogFilterCondition`, description: '문자형 컬럼일 때 필터 조건을 설정하는 영역입니다.', classes: `.${prefixTheme}TextFilterDialogFilterCondition` },
      { title: `.${prefixTheme}FilterDialogSearchIcon`, description: '필터링 조건에 해당하는 문자열을 입력하는 영역입니다.', classes: `.${prefixTheme}FilterDialogSearchIcon` },
      { title: `.${prefixTheme}TextFilterDialogMultipleBox`, description: '필터링 조건에 and, or 조건을 추가할 수 있는 영역입니다. 선택 시 조건에 해당하는 문자열을 추가로 입력할 수 있게 영역이 표시됩니다.', classes: `.${prefixTheme}TextFilterDialogMultipleBox` }
    ];
    
    tab0Configs.forEach((config, index) => {
      if (filterTab0InfoAreas[index]) {
        tippy(filterTab0InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }
  
  const filterTab1Area = FilternSortContent.querySelector('#tabFilterTag1');
  if (filterTab1Area) {
    const filterTab1InfoAreas = filterTab1Area.querySelectorAll('.infoArea');
    if (filterTab1InfoAreas[0]) {
      tippy(filterTab1InfoAreas[0], {
        content: createTippyContent(`.${prefixTheme}TextFilterDialogFilterCondition`, '숫자형 컬럼일 때 필터 조건을 설정하는 영역입니다.', `.${prefixTheme}TextFilterDialogFilterCondition`)
      });
    }
  }
  
  const filterTab2Area = FilternSortContent.querySelector('#tabFilterTag2');
  if (filterTab2Area) {
    const filterTab2InfoAreas = filterTab2Area.querySelectorAll('.infoArea');
    if (filterTab2InfoAreas[0]) {
      tippy(filterTab2InfoAreas[0], {
        content: createTippyContent(`.${prefixTheme}TextFilterDialogFilterCondition`, '날짜형 컬럼일 때 필터 조건을 설정하는 영역입니다.', `.${prefixTheme}TextFilterDialogFilterCondition`)
      });
    }
  }
  
  const filterTab3Area = FilternSortContent.querySelector('#tabFilterTag3');
  if (filterTab3Area) {
    const filterTab3InfoAreas = filterTab3Area.querySelectorAll('.infoArea');
    if (filterTab3InfoAreas[0]) {
      tippy(filterTab3InfoAreas[0], {
        content: createTippyContent(`.${prefixTheme}TextFilterDialogFilterCondition`, '문자형, 숫자형, 날짜형 외의 컬럼일 때 필터 조건을 설정하는 영역입니다.', `.${prefixTheme}TextFilterDialogFilterCondition`)
      });
    }
  }
}

