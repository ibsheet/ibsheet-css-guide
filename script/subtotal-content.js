var subTotalContent = document.getElementById('subtotal-content');
var subtotalTippyInstances = [];
if (subTotalContent) {
  // let opt = {
  //   Cfg: {
  //     Style: 'IBGY',
  //     IgnoreFocused: true,
  //     InfoRowConfig: {
  //       Visible: false,
  //     },
  //     NoVScroll: true,
  //     CanSort: false,
  //     Alternate: 0,
  //   },
  //   Cols: [
  //     {"Header": "No","Type": "Int","Width": 50,"Align": "Center","Name": "SEQ","CanMove": 0,"CanFocus": 0},
  //     {"Header": "정책 사업","Name": "sPolicy","Type": "Text","Width": 250,"CanMove": 0},
  //     {"Header": "단위 사업","Name": "sUnit","Type": "Text","Width": 225},
  //     {"Header": "세부사업","Name": "sDetail","Type": "Text","Width": 225},
  //     {"Header": "A","Name": "A","Width": 150,"Type": "Int"},
  //     {"Header": "B","Name": "B","Width": 150,"Type": "Int"},
  //     {"Header": "C","Name": "C","Width": 150,"Type": "Int"},
  //     {"Header": "D","Name": "D","Width": 150,"Type": "Int"},
  //   ],
  //   Events: {
  //     onRenderFirstFinish: function (evtParam) {
  //       evtParam.sheet.loadSearchData(data);
  //     },
  //     onSearchFinish: function (evtParam) {
  //       const sheet = evtParam.sheet;
  //       sheet.makeSubTotal([
  //         {
  //           stdCol: 'sPolicy',
  //           sumCols: 'A|B|C|D',
  //           color: '#dbe2eb',
  //           cumulateColor: '#b2c4d9',
  //           captionCol: [
  //             {
  //               col: 'sPolicy',
  //               val: '%s: %col',
  //               cumVal: '%s: %col',
  //               span: 3
  //             }
  //           ],
  //           showCumulate: 1,
  //           position: 'bottom'
  //         }
  //       ]);
  //     }
  //   }
  // };

  // let data = [
  //   {"sPolicy":"정적자원운용","sUnit":"정규직인건비","sDetail":"교원인건비","A":"3530855848000","B":"1904204573440","C":"19847770130","D":"1924052343569.9998","E":"54.49252"},
  //   {"sPolicy":"인적자원운용","sUnit":"정규직인건비","sDetail":"지방공무원인건비","A":"461430193000","B":"247492523010","C":"2628843840","D":"250121366850","E":"54.205678"},
  //   {"sPolicy":"인적자원운용","sUnit":"비정규직인건비","sDetail":"계약제교원인건비","A":"194234361000","B":"110681334570","C":"1160516120","D":"111841850690","E":"57.580878"},
  //   {"sPolicy":"인적자원운용","sUnit":"비정규직인건비","sDetail":"계약제직원인건비","A":"7018400000","B":"3443668820","C":"2340000","D":"3446008820","E":"49.099636"},
  //   {"sPolicy":"인적자원운용","sUnit":"교원역량강화","sDetail":"교원연수지원","A":"2971246000","B":"2346726550","C":"0","D":"2346726550","E":"78.981227"},
  //   {"sPolicy":"인적자원운용","sUnit":"교원역량강화","sDetail":"교원연수운영","A":"2739113250","B":"1502240580","C":"0","D":"1502240580","E":"54.844048"},
  //   {"sPolicy":"인적자원운용","sUnit":"지방공무원역량강화","sDetail":"지방공무원연수지원","A":"442570000","B":"283276930","C":"0","D":"283276930","E":"64.00726"},
  //   {"sPolicy":"인적자원운용","sUnit":"지방공무원역량강화","sDetail":"지방공무원연수운영","A":"1169109000","B":"485450400","C":"0","D":"485450400","E":"41.523109"},
  //   {"sPolicy":"인적자원운용","sUnit":"교원인사관리","sDetail":"교원임용관리","A":"3215238000","B":"1153427870","C":"0","D":"1153427870","E":"35.873794"}
  // ];

  // IBSheet.create({
  //   id: 'sheet8',
  //   el: 'sheetDiv8',
  //   options: opt
  // })

  const subTotalInfoAreas = subTotalContent.querySelectorAll('.infoArea');
  const subTotalConfigs = [
    { 
      title: '소계행', 
      description: '소계행과 누계행의 제어는 Def.SubSum과 makeSubTotal() 함수를 통해 이루어집니다. 또한, 소계/누계행이 생성 된 이후 getSubTotalRows()를 통해 생성된 소계/누계행 정보를 통해 setAttribute()를 이용하여 속성을 적용하실 수 있습니다.',
      placement: 'top',
      customContent: `<div class="guide-content"><h4>소계행</h4><p>소계행과 누계행의 제어는 Def.SubSum과 makeSubTotal() 함수를 통해 이루어집니다.</p><p>소계행의 배경색은 makeSubTotal() 함수의 color 속성을 통해 설정할 수 있습니다.</p><p>또한, 소계/누계행이 생성 된 이후 getSubTotalRows()를 통해 생성된 소계/누계행 정보를 통해 setAttribute()를 이용하여 속성을 적용하실 수 있습니다.</p></div>`
    },
    { 
      title: '누계행', 
      description: '소계행과 누계행의 제어는 Def.SubSum과 makeSubTotal() 함수를 통해 이루어집니다. 또한, 소계/누계행이 생성 된 이후 getSubTotalRows()를 통해 생성된 소계/누계행 정보를 통해 setAttribute()를 이용하여 속성을 적용하실 수 있습니다.',
      placement: 'bottom',
      customContent: `<div class="guide-content"><h4>누계행</h4><p>소계행과 누계행의 제어는 Def.SubSum과 makeSubTotal() 함수를 통해 이루어집니다.</p><p>누계행의 배경색은 makeSubTotal() 함수의 cumulateColor 속성을 통해 설정할 수 있습니다.</p><p>또한, 소계/누계행이 생성 된 이후 getSubTotalRows()를 통해 생성된 소계/누계행 정보를 통해 setAttribute()를 이용하여 속성을 적용하실 수 있습니다.</p></div>`
    }
  ];
  
  subTotalConfigs.forEach((config, index) => {
    if (subTotalInfoAreas[index]) {
      let tp;
      if (config.customContent) {
        tp = tippy(subTotalInfoAreas[index], {
          content: config.customContent,
          placement: config.placement || undefined
        });
      } else {
        tp = tippy(subTotalInfoAreas[index], {
          content: createTippyContent(config.title, config.description || '', config.classes),
          placement: config.placement || undefined
        });
      }
      subtotalTippyInstances.push(tp);
      // 현재 탭의 tippy 인스턴스로 등록
      if (typeof window.registerCurrentTabTippy === 'function') {
        window.registerCurrentTabTippy(tp);
      }
    }
  });

  function tipShowClick(tipShow) {
    if (tipShow.textContent == '안내 보기') {
      subtotalTippyInstances.forEach(instance => {
        if (instance) {
          instance.show();
        }
      });
      tipShow.textContent = '안내 숨기기';
    } else {
      subtotalTippyInstances.forEach(instance => {
        if (instance) {
          instance.hide();
        }
      });
      tipShow.textContent = '안내 보기';
    }
  }
  
  const tipShow = subTotalContent.querySelector('#tipShow');
  if (tipShow) {
    if (!tipShow.classList.contains('oncl')) {
      tipShow.classList.add('oncl');
      tipShow.addEventListener('click', () => {tipShowClick(tipShow);});
    }
  }

  function areaToggleClick(areaToggle) {
    const infoAreas = subTotalContent.querySelectorAll('.infoArea');
    infoAreas.forEach(area => {
      if (area.classList.contains('infoAreaClear')) {
        area.classList.remove('infoAreaClear');
        areaToggle.textContent = '선택 영역 미표시';
      } else {
        area.classList.add('infoAreaClear');
        areaToggle.textContent = '선택 영역 표시';
      }
    });
  }

  const areaToggle = subTotalContent.querySelector('#areaToggle');
  if (areaToggle) {
    if (!areaToggle.classList.contains('oncl')) {
      areaToggle.classList.add('oncl');
      areaToggle.addEventListener('click', () => {areaToggleClick(areaToggle);});
    }
  }
}
