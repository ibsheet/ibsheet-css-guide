var SortContent = document.getElementById('sort-content');
if (SortContent) {
  const sortInfoAreas = SortContent.querySelectorAll('.infoArea');
  const sortConfigs = [
    { title: `.${prefixTheme}Sort3Right`, description: '정렬 기능 사용 시 3순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort3Left, .${prefixTheme}Sort3Right` },
    { title: `.${prefixTheme}Sort2Right`, description: '정렬 기능 사용 시 2순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort2Left, .${prefixTheme}Sort2Right` },
    { title: `.${prefixTheme}Sort1Right`, description: '정렬 기능 사용 시 1순위이며, 오름차 정렬 표시입니다.', classes: `.${prefixTheme}Sort1Left, .${prefixTheme}Sort1Right` },
    { title: `.${prefixTheme}Sort6Right`, description: '정렬 기능 사용 시 3순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort6Left, .${prefixTheme}Sort6Right` },
    { title: `.${prefixTheme}Sort5Right`, description: '정렬 기능 사용 시 2순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort5Left, .${prefixTheme}Sort5Right` },
    { title: `.${prefixTheme}Sort4Right`, description: '정렬 기능 사용 시 1순위이며, 내림차 정렬 표시입니다.', classes: `.${prefixTheme}Sort4Left, .${prefixTheme}Sort4Right` },
    { title: `.${prefixTheme}Required`, description: '필수 값 기능 시 출력되는 아이콘입니다.', classes: `.${prefixTheme}Required` }
  ];
  
  sortConfigs.forEach((config, index) => {
    tippy(sortInfoAreas[index], {
      content: createTippyContent(config.title, config.description, config.classes)
    });
  });
}