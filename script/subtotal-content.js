var SubTotalContent = document.getElementById('subtotal-content');
if (SubTotalContent) {
  const subTotalInfoAreas = SubTotalContent.querySelectorAll('.infoArea');
  
  // 간단한 tippy 설정들 - 이제 스타일시트에서 자동으로 CSS 속성을 가져옵니다
  const subTotalConfigs = [
    { 
      index: 0, 
      title: '소계행', 
      description: '소계행과 누계행의 제어는 Def.SubSum과 makeSubTotal() 함수를 통해 이루어집니다. 또한, 소계/누계행이 생성 된 이후 getSubTotalRows()를 통해 생성된 소계/누계행 정보를 통해 setAttribute()를 이용하여 속성을 적용하실 수 있습니다.',
      placement: 'top',
      customContent: `<div class="guide-content"><h4>소계행</h4><p>소계행과 누계행의 제어는 Def.SubSum과 makeSubTotal() 함수를 통해 이루어집니다.</p><p>또한, 소계/누계행이 생성 된 이후 getSubTotalRows()를 통해 생성된 소계/누계행 정보를 통해 setAttribute()를 이용하여 속성을 적용하실 수 있습니다.</p></div>`
    },
    { 
      index: 1, 
      title: '누계행', 
      description: '소계행과 누계행의 제어는 Def.SubSum과 makeSubTotal() 함수를 통해 이루어집니다. 또한, 소계/누계행이 생성 된 이후 getSubTotalRows()를 통해 생성된 소계/누계행 정보를 통해 setAttribute()를 이용하여 속성을 적용하실 수 있습니다.',
      placement: 'bottom',
      customContent: `<div class="guide-content"><h4>누계행</h4><p>소계행과 누계행의 제어는 Def.SubSum과 makeSubTotal() 함수를 통해 이루어집니다.</p><p>또한, 소계/누계행이 생성 된 이후 getSubTotalRows()를 통해 생성된 소계/누계행 정보를 통해 setAttribute()를 이용하여 속성을 적용하실 수 있습니다.</p></div>`
    }
  ];
  
  subTotalConfigs.forEach(config => {
    if (subTotalInfoAreas[config.index]) {
      if (config.customContent) {
        tippy(subTotalInfoAreas[config.index], {
          content: config.customContent,
          placement: config.placement || undefined
        });
      } else {
        tippy(subTotalInfoAreas[config.index], {
          content: createTippyContent(config.title, config.description || '', config.classes),
          placement: config.placement || undefined
        });
      }
    }
  });
}
