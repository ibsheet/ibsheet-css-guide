var SortContent = document.getElementById('sort-content');
if (SortContent) {
  const sortInfoAreas = SortContent.querySelectorAll('.infoArea');

  // 정렬 기능 관련 설정 배열
  const sortConfigs = [
    { selector: `.${prefixTheme}Sort3Right`, description: '정렬 기능 사용 시 3순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort3Left, .${prefixTheme}Sort3Right` },
    { selector: `.${prefixTheme}Sort2Right`, description: '정렬 기능 사용 시 2순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort2Left, .${prefixTheme}Sort2Right` },
    { selector: `.${prefixTheme}Sort1Right`, description: '정렬 기능 사용 시 1순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort1Left, .${prefixTheme}Sort1Right` },
    { selector: `.${prefixTheme}Sort6Right`, description: '정렬 기능 사용 시 3순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort6Left, .${prefixTheme}Sort6Right` },
    { selector: `.${prefixTheme}Sort5Right`, description: '정렬 기능 사용 시 2순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort5Left, .${prefixTheme}Sort5Right` },
    { selector: `.${prefixTheme}Sort4Right`, description: '정렬 기능 사용 시 1순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort4Left, .${prefixTheme}Sort4Right` },
    { selector: `.${prefixTheme}Required`, description: '필수 값 기능 시 출력되는 아이콘입니다.', classes: `.${prefixTheme}Required` }
  ];

  // 설정 배열을 사용하여 툴팁 생성
  sortConfigs.forEach((config, index) => {
    tippy(sortInfoAreas[index], {
      content: createTippyContent(config.selector, config.description, config.classes
      )
    });
  });
}