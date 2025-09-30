var GroupContent = document.getElementById('group-content');
if (GroupContent) {
  const groupInfoAreas = GroupContent.querySelectorAll('.infoArea');
  const groupConfigs = [
    { title: `.${prefixTheme}HeaderGroup`, description: 'Grouping된 Header 정보를 확인하실 수 있습니다.', classes: `.${prefixTheme}HeaderGroup` },
    { title: `.${prefixTheme}GroupCancel`, description: 'Grouping된 Header 정보를 제거합니다.', classes: `.${prefixTheme}GroupCancel` },
    { title: `.${prefixTheme}HeaderGroupCustom`, description: 'Grouping된 Header를 정보를 출력하거나, Group할 Header를 Drop하는 영역입니다.', classes: [{selector: `.${prefixTheme}HeaderGroupCustom`}, {selector: `.${prefixTheme}HeaderGroupCustom:hover`}] },
    { title: `u.${prefixTheme}SheetButton`, description: 'Group Row에 추가한 커스텀 Button입니다.', classes: `.${prefixTheme}DialogButton, u.${prefixTheme}SheetButton` },
    { title: `.${prefixTheme}C`, description: 'Group 된 행에 출력되는 1레벨의 Class. Tree기능과 동일한 Class를 사용합니다.', classes: [{selector: `.${prefixTheme}C, .${prefixTheme}CL`}, {selector: `.${prefixTheme}E, .${prefixTheme}EL`}, {selector: `.${prefixTheme}T, .${prefixTheme}E, .${prefixTheme}C, .${prefixTheme}D0, .${prefixTheme}D1, .${prefixTheme}D2, .${prefixTheme}D3, .${prefixTheme}D4, .${prefixTheme}TL, .${prefixTheme}EL, .${prefixTheme}CL, .${prefixTheme}D0L, .${prefixTheme}D1L, .${prefixTheme}D2L, .${prefixTheme}D3L, .${prefixTheme}D4L`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width1T`}] },
    { title: `.${prefixTheme}1CL`, description: 'Group 된 행에 출력되는 2레벨이상일 때 사용되는 Class. Tree기능과 동일한 Class를 사용합니다.', classes: [{selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, {selector: `.${prefixTheme}1T, .${prefixTheme}1E, .${prefixTheme}1C, .${prefixTheme}1TL, .${prefixTheme}1EL, .${prefixTheme}1CL`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width2T`}] },
    { title: `.${prefixTheme}E`, description: 'Group 된 행에 출력되는 1레벨의 Class. Tree기능과 동일한 Class를 사용합니다.', classes: [{selector: `.${prefixTheme}C, .${prefixTheme}CL`}, {selector: `.${prefixTheme}E, .${prefixTheme}EL`}, {selector: `.${prefixTheme}T, .${prefixTheme}E, .${prefixTheme}C, .${prefixTheme}D0, .${prefixTheme}D1, .${prefixTheme}D2, .${prefixTheme}D3, .${prefixTheme}D4, .${prefixTheme}TL, .${prefixTheme}EL, .${prefixTheme}CL, .${prefixTheme}D0L, .${prefixTheme}D1L, .${prefixTheme}D2L, .${prefixTheme}D3L, .${prefixTheme}D4L`}, {selector: `.${prefixTheme}Width1T`}] },
    { title: `.${prefixTheme}1EL`, description: 'Group 된 행에 출력되는 2레벨이상일 때 사용되는 Class. Tree기능과 동일한 Class를 사용합니다.', classes: [{selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, {selector: `.${prefixTheme}1T, .${prefixTheme}1E, .${prefixTheme}1C, .${prefixTheme}1TL, .${prefixTheme}1EL, .${prefixTheme}1CL`}, {selector: `.${prefixTheme}TreeL`}, {selector: `.${prefixTheme}Width2T`}] },
    { title: 'GroupFormat', description: 'Group 기능 사용 시, (Cfg) GroupFormat에 적용된 Format에 맞춰 Group 정보를 출력합니다.', classes: '', customContent: `<div class="guide-content"><h4>GroupFormat</h4><p>Group 기능 사용 시, (Cfg) GroupFormat에 적용된 Format에 맞춰 Group 정보를 출력합니다.</p><p>해당 Sample에 적용된 GroupFormat은 다음과 같습니다.</p><p>"GroupFormat": "&lt;span&gt; style='color: black;display:inline'&gt;{%s}&lt;/span&gt; &lt;span style='color: red'&gt;({%c}건)&lt;/span&gt;"</p></div>` }
  ];
  
  groupConfigs.forEach((config, index) => {
    if (groupInfoAreas[index]) {
      if (config.customContent) {
        tippy(groupInfoAreas[index], {
          content: config.customContent,
          placement: index === 6 ? 'right' : undefined
        });
      } else {
        tippy(groupInfoAreas[index], {
          content: createTippyContent(config.title, config.description || '', config.classes),
          placement: (index === 4 || index === 5) ? 'right' : undefined
        });
      }
    }
  });
}
