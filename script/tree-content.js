var TreeContent = document.getElementById('tree-content');
if (TreeContent) {
  const treeInfoAreas = TreeContent.querySelectorAll('.infoArea');

  const treeConfigs = [
    { index: 0, title: `.${prefixTheme}CL`, description: '1레벨에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}C, .${prefixTheme}CL`}, {selector: `.${prefixTheme}E, .${prefixTheme}EL`}, {selector: `.${prefixTheme}T, .${prefixTheme}E, .${prefixTheme}C, .${prefixTheme}D0, .${prefixTheme}D1, .${prefixTheme}D2, .${prefixTheme}D3, .${prefixTheme}D4, .${prefixTheme}TL, .${prefixTheme}EL, .${prefixTheme}CL, .${prefixTheme}D0L, .${prefixTheme}D1L, .${prefixTheme}D2L, .${prefixTheme}D3L, .${prefixTheme}D4L`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width1T`} ] },
    { index: 1, title: `.${prefixTheme}0CL`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, {selector: `.${prefixTheme}T, .${prefixTheme}E, .${prefixTheme}C, .${prefixTheme}D0, .${prefixTheme}D1, .${prefixTheme}D2, .${prefixTheme}D3, .${prefixTheme}D4, .${prefixTheme}TL, .${prefixTheme}EL, .${prefixTheme}CL, .${prefixTheme}D0L, .${prefixTheme}D1L, .${prefixTheme}D2L, .${prefixTheme}D3L, .${prefixTheme}D4L`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width2T`} ] },
    { index: 2, title: `.${prefixTheme}Width2`, description: '3레벨 이상에서 사용되는 Tree 여백 1단계 Class', classes: `.${prefixTheme}Width1`},
    { index: 3, title: `.${prefixTheme}Width2`, description: '3레벨 이상에서 사용되는 Tree 여백 2단계 Class', classes: `.${prefixTheme}Width2`},
    { index: 4, title: `.${prefixTheme}Width3`, description: '3레벨 이상에서 사용되는 Tree 여백 3단계 Class', classes: `.${prefixTheme}Width3`},
    { index: 5, title: `.${prefixTheme}0C`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, {selector: `.${prefixTheme}0T, .${prefixTheme}0E, .${prefixTheme}0C, .${prefixTheme}0TL, .${prefixTheme}0EL, .${prefixTheme}0CL`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width2T`} ] },
    { index: 6, title: `.${prefixTheme}1C`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, {selector: `.${prefixTheme}1T, .${prefixTheme}1E, .${prefixTheme}1C, .${prefixTheme}1TL, .${prefixTheme}1EL, .${prefixTheme}1CL`}, {selector: `.${prefixTheme}Width2T`} ] },
    { index: 7, title: `.${prefixTheme}1EL`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, {selector: `.${prefixTheme}1T, .${prefixTheme}1E, .${prefixTheme}1C, .${prefixTheme}1TL, .${prefixTheme}1EL, .${prefixTheme}1CL`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width2T`} ] },
    { index: 8, title: `.${prefixTheme}011T`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}011T, .${prefixTheme}11T`}, {selector: `.${prefixTheme}Width4T`}] },
    { index: 9, title: `.${prefixTheme}1TL`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}1T, .${prefixTheme}1E, .${prefixTheme}1C, .${prefixTheme}1TL, .${prefixTheme}1EL, .${prefixTheme}1CL`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width2T`}]},
    { index: 10, title: `.${prefixTheme}010T`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}010T, .${prefixTheme}10T`}, {selector: `.${prefixTheme}Width4T`}]},
    { index: 11, title: `.${prefixTheme}0TL`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [{selector: `.${prefixTheme}0T, .${prefixTheme}0E, .${prefixTheme}0C, .${prefixTheme}0TL, .${prefixTheme}0EL, .${prefixTheme}0CL`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width2T`}]},
    { index: 12, title: `.${prefixTheme}001T`, description: '2레벨 이상에서 사용되는 Tree Class', classes: [ {selector: `.${prefixTheme}001T, .${prefixTheme}01T`}, {selector: `.${prefixTheme}Width4T`}]}
  ];

  treeConfigs.forEach((config, index) => {
    if (treeInfoAreas[index]) {
      tippy(treeInfoAreas[index], {
        content: createTippyContent(config.title, config.description, config.classes),
        placement: index === 4 ? 'left' : 'right'
      });
    }
  });  
}
