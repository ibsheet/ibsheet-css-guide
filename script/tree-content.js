var treeContent = document.getElementById('tree-content');
var treeTippyInstances = [];
if (treeContent) {
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
  //     SearchMode: 0,
  //     MainCol: "Cls",
  //   },
  //   Cols: [
  //     {"Header": "No","Type": "Int","Width": 50,"Align": "Center","Name": "SEQ","CanMove": 0,"CanFocus": 0},
  //     {"Header": "생산자물가지수","Type": "Text","Name": "Cls","Width": 330,"Align": "Left","CanEdit": 1},
  //     {"Header": "2023년 1월","Type": "Float","Name": "Y202301","Width": "120","Align": "Right","Format": "#,##0.00","FormulaRow": "Sum","CanEdit": 1},
  //     {"Header": "2023년 2월","Type": "Float","Name": "Y202302","Width": "120","Align": "Right","Format": "#,##0.00","FormulaRow": "Sum","CanEdit": 1},
  //     {"Header": "2023년 3월","Type": "Float","Name": "Y202303","Width": "120","Align": "Right","Format": "#,##0.00","FormulaRow": "Sum","CanEdit": 1},
  //     {"Header": "2023년 4월","Type": "Float","Name": "Y202304","Width": "120","Align": "Right","Format": "#,##0.00","FormulaRow": "Sum","CanEdit": 1},
  //     {"Header": "2023년 5월","Type": "Float","Name": "Y202305","Width": "120","Align": "Right","Format": "#,##0.00","FormulaRow": "Sum","CanEdit": 1},
  //     {"Header": "2023년 6월","Type": "Float","Name": "Y202306","Width": "120","Align": "Right","Format": "#,##0.00","FormulaRow": "Sum","CanEdit": 1},
  //     {"Header": "2023년 7월","Type": "Float","Name": "Y202307","Width": "120","Align": "Right","Format": "#,##0.00","FormulaRow": "Sum","CanEdit": 1},
  //     {"Header": "2023년 8월","Type": "Float","Name": "Y202308","Width": "120","Align": "Right","Format": "#,##0.00","FormulaRow": "Sum","CanEdit": 1}
  //   ],
  //   Events: {
  //     onRenderFirstFinish: function (evtParam) {
  //       evtParam.sheet.loadSearchData(data);
  //     }
  //   }
  // };

  // let data = [
  //   {"Cls":"농산물","Y201208":121.01,"Y201209":127.95,"Y201210":117.55,"Y201211":107.34,"Y201212":113,"Y202301":118.8,"Y202302":122.67,"Y202303":114.81,"Y202304":111.81,"Y202305":105.61,"Y202306":102.1,"Y202307":103.12,"Y202308":112.19,
  //     "Items":[
  //       {"Cls":"식량작물","Y201208":126.05,"Y201209":125.9,"Y201210":124.39,"Y201211":129.98,"Y201212":130.63,"Y202301":131.05,"Y202302":131.65,"Y202303":131,"Y202304":130.21,"Y202305":130.68,"Y202306":131.27,"Y202307":131.05,"Y202308":132.3,
  //         "Items":[
  //           {"Cls":"곡류","Y201208":126.9,"Y201209":126.41,"Y201210":126.41,"Y201211":133.03,"Y201212":133.34,"Y202301":133.34,"Y202302":133.45,"Y202303":133.41,"Y202304":133.59,"Y202305":133.73,"Y202306":134.05,"Y202307":134.11,"Y202308":134.19,
  //           "Items":[
  //             {"Cls":"콩류","Y201208":115.27,"Y201209":115.27,"Y201210":116.5,"Y201211":123.18,"Y201212":127.39,"Y202301":128.93,"Y202302":130.71,"Y202303":130.78,"Y202304":130.8,"Y202305":131.34,"Y202306":131.33,"Y202307":131.56,"Y202308":130.49},
  //             {"Cls":"감자류","Y201208":125.61,"Y201209":129.54,"Y201210":104.94,"Y201211":95.84,"Y201212":96.02,"Y202301":101,"Y202302":107.46,"Y202303":96.37,"Y202304":79.59,"Y202305":85.08,"Y202306":90.49,"Y202307":85.53,"Y202308":108.04}
  //           ]}
  //         ]
  //       },
  //       {"Cls":"채소및과실","Y201208":125.33,"Y201209":141.47,"Y201210":123.21,"Y201211":98.71,"Y201212":108,"Y202301":117.39,"Y202302":121.85,"Y202303":111.54,"Y202304":108.03,"Y202305":94.55,"Y202306":87.83,"Y202307":90.12,"Y202308":104.75,
  //         "Items":[
  //           {"Cls":"채소","Y201208":102.43,"Y201209":123.36,"Y201210":101.57,"Y201211":98.16,"Y201212":108.71,"Y202301":120.76,"Y202302":122.65,"Y202303":109.06,"Y202304":105.17,"Y202305":86.84,"Y202306":78.15,"Y202307":81.38,"Y202308":101.9},
  //           {"Cls":"과실","Y201208":205.35,"Y201209":206.79,"Y201210":199.05,"Y201211":105.25,"Y201212":110.92,"Y202301":113.8,"Y202302":125.13,"Y202303":122.89,"Y202304":120.22,"Y202305":118.68,"Y202306":116.74,"Y202307":116.72,"Y202308":116.72},
  //         ]
  //       },
  //       {"Cls":"비식용작물","Y201208":56.51,"Y201209":45.53,"Y201210":39.64,"Y201211":43.78,"Y201212":50.54,"Y202301":62.9,"Y202302":83.62,"Y202303":54.71,"Y202304":42.05,"Y202305":44.06,"Y202306":39.35,"Y202307":41.09,"Y202308":55.3,
  //         "Items":[
  //           {"Cls":"잎담배","Y201208":104.67,"Y201209":104.67,"Y201210":104.67,"Y201211":104.67,"Y201212":104.67,"Y202301":104.67,"Y202302":112.24,"Y202303":112.24,"Y202304":112.24,"Y202305":112.24,"Y202306":112.24,"Y202307":112.24,"Y202308":112.24},
  //           {"Cls":"화훼작물","Y201208":52.71,"Y201209":40.91,"Y201210":34.58,"Y201211":39.03,"Y201212":46.3,"Y202301":59.89,"Y202302":82,"Y202303":50.22,"Y202304":36.3,"Y202305":38.5,"Y202306":33.33,"Y202307":35.24,"Y202308":50.87}
  //         ]
  //       }
  //     ]
  //   },
  //   {"Cls":"축산물","Y201208":97.29,"Y201209":92.19,"Y201210":85.37,"Y201211":89.76,"Y201212":87.86,"Y202301":86.16,"Y202302":85.69,"Y202303":87.49,"Y202304":90.61,"Y202305":90.29,"Y202306":96.02,"Y202307":94.45,"Y202308":97.23,
  //     "Items":[
  //       {"Cls":"낙농및육류","Y201208":98.62,"Y201209":91.1,"Y201210":83.93,"Y201211":89.61,"Y201212":86.82,"Y202301":85.22,"Y202302":84.9,"Y202303":86.54,"Y202304":88.04,"Y202305":87.37,"Y202306":95.3,"Y202307":92.98,"Y202308":95.48,
  //         "Items":[
  //           {"Cls":"낙농","Y201208":114.36,"Y201209":114.69,"Y201210":116.71,"Y201211":117.86,"Y201212":118.33,"Y202301":117.87,"Y202302":117.61,"Y202303":117.4,"Y202304":117.1,"Y202305":116.28,"Y202306":115.62,"Y202307":114.85,"Y202308":127.11},
  //           {"Cls":"육류","Y201208":96.18,"Y201209":87.5,"Y201210":78.97,"Y201211":85.32,"Y201212":82.05,"Y202301":80.29,"Y202302":79.95,"Y202303":81.87,"Y202304":83.63,"Y202305":82.99,"Y202306":92.17,"Y202307":89.62,"Y202308":90.68}
  //         ]
  //       },
  //       {"Cls":"기타축산","Y201208":87.2,"Y201209":100.94,"Y201210":96.87,"Y201211":91.13,"Y201212":96.23,"Y202301":93.71,"Y202302":92.24,"Y202303":95.17,"Y202304":110.44,"Y202305":112.74,"Y202306":102.06,"Y202307":106.09,"Y202308":111.02,
  //         "Items":[
  //           {"Cls":"기타축산","Y201208":87.2,"Y201209":100.94,"Y201210":96.87,"Y201211":91.13,"Y201212":96.23,"Y202301":93.71,"Y202302":92.24,"Y202303":95.17,"Y202304":110.44,"Y202305":112.74,"Y202306":102.06,"Y202307":106.09,"Y202308":111.02}
  //         ]
  //       }
  //     ]
  //   }
  // ]

  // IBSheet.create({
  //   id: 'sheet7',
  //   el: 'sheetDiv7',
  //   options: opt
  // })

  const treeInfoAreas = treeContent.querySelectorAll('.infoArea');
  const treeConfigs = [
    { 
      title: `.${prefixTheme}C`, 
      description: '1레벨에서 사용되는 Tree Class', 
      classes: [
        {selector: `.${prefixTheme}C, .${prefixTheme}CL`}, 
        // {selector: `.${prefixTheme}E, .${prefixTheme}EL`}, 
        // {selector: `.${prefixTheme}T, .${prefixTheme}E, .${prefixTheme}C, .${prefixTheme}D0, .${prefixTheme}D1, .${prefixTheme}D2, .${prefixTheme}D3, .${prefixTheme}D4, .${prefixTheme}TL, .${prefixTheme}EL, .${prefixTheme}CL, .${prefixTheme}D0L, .${prefixTheme}D1L, .${prefixTheme}D2L, .${prefixTheme}D3L, .${prefixTheme}D4L`}, 
        // {selector: `.${prefixTheme}Width1T`}
      ],
      placement: 'top',
    },
    { 
      title: `.${prefixTheme}1C`, 
      description: '2레벨 이상에서 사용되는 Tree Class', 
      classes: [
        {selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, 
        // {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, 
        // {selector: `.${prefixTheme}1T, .${prefixTheme}1E, .${prefixTheme}1C, .${prefixTheme}1TL, .${prefixTheme}1EL, .${prefixTheme}1CL`}, 
        // {selector: `.${prefixTheme}Width2T`}
      ],
      placement: 'right',
      popperOptions: {
        modifiers: [
          { 
            name: 'offset',
            options: { offset: [50, 0] }
          }
        ]
      }
    },
    { 
      title: `.${prefixTheme}1EL`, 
      description: '2레벨 이상에서 사용되는 Tree Class', 
      classes: [
        // {selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, 
        {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, 
        // {selector: `.${prefixTheme}1T, .${prefixTheme}1E, .${prefixTheme}1C, .${prefixTheme}1TL, .${prefixTheme}1EL, .${prefixTheme}1CL`}, 
        // {selector: `.${prefixTheme}TreeL`}, 
        // {selector: `.${prefixTheme}Width2T`}
      ],
      placement: 'left',
      popperOptions: {
        modifiers: [
          { 
            name: 'offset',
            options: { offset: [0, 20] }
          }
        ]
      }
    },
    // { 
    //   title: `.${prefixTheme}11T`, 
    //   description: '2레벨 이상에서 사용되는 Tree Class', 
    //   classes: [
    //     {selector: `.${prefixTheme}011T, .${prefixTheme}11T`}, 
    //     // {selector: `.${prefixTheme}Width3T`}
    //   ],
    //   placement: 'right',
    //   popperOptions: {
    //     modifiers: [
    //       { 
    //         name: 'offset',
    //         options: { offset: [0, 0] }
    //       }
    //     ]
    //   }
    // },
    { 
      title: `.${prefixTheme}1TL`, 
      description: '2레벨 이상에서 사용되는 Tree Class', 
      classes: [
        {selector: `.${prefixTheme}1T, .${prefixTheme}1E, .${prefixTheme}1C, .${prefixTheme}1TL, .${prefixTheme}1EL, .${prefixTheme}1CL`}, 
        // {selector: `.${prefixTheme}TreeL`}, 
        // {selector: `.${prefixTheme}Width2T`}
      ],
      placement: 'left',
      popperOptions: {
        modifiers: [
          { 
            name: 'offset',
            options: { offset: [50, 0] }
          }
        ]
      }
    },
    { 
      title: `.${prefixTheme}1CL`, 
      description: '2레벨 이상에서 사용되는 Tree Class', 
      classes: [
        {selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, 
        // {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, 
        // {selector: `.${prefixTheme}TreeL`}, 
        // {selector: `.${prefixTheme}Width2T`}
      ],
      placement: 'right'
    },
    // { 
    //   title: `.${prefixTheme}10T`, 
    //   description: '2레벨 이상에서 사용되는 Tree Class', 
    //   classes: [
    //     {selector: `.${prefixTheme}010T, .${prefixTheme}10T`}, 
    //     // {selector: `.${prefixTheme}Width3T`}
    //   ],
    //   placement: 'left',
    // },
    { 
      title: `.${prefixTheme}0TL`, 
      description: '2레벨 이상에서 사용되는 Tree Class', 
      classes: [
        {selector: `.${prefixTheme}0T, .${prefixTheme}0E, .${prefixTheme}0C, .${prefixTheme}0TL, .${prefixTheme}0EL, .${prefixTheme}0CL`}, 
        // {selector: `.${prefixTheme}TreeL`}, 
        // {selector: `.${prefixTheme}Width2T`}
      ],
      placement: 'bottom',
      popperOptions: {
        modifiers: [
          { 
            name: 'offset',
            options: { offset: [0, 0] }
          }
        ]
      }
    },
    { 
      title: `.${prefixTheme}0C`, 
      description: '2레벨 이상에서 사용되는 Tree Class', 
      classes: [
        {selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, 
        // {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, 
        // {selector: `.${prefixTheme}0T, .${prefixTheme}0E, .${prefixTheme}0C, .${prefixTheme}0TL, .${prefixTheme}0EL, .${prefixTheme}0CL`}, 
        // {selector: `.${prefixTheme}Width2T`}
      ],
      placement: 'bottom',
      popperOptions: {
        modifiers: [
          { 
            name: 'offset',
            options: { offset: [-250, 0] }
          }
        ]
      }
    },
    // { 
    //   title: `.${prefixTheme}01T`, 
    //   description: '2레벨 이상에서 사용되는 Tree Class', 
    //   classes: [
    //     {selector: `.${prefixTheme}001T, .${prefixTheme}01T`}, 
    //     // {selector: `.${prefixTheme}Width3T`}
    //   ],
    //   placement: 'right',
    //   popperOptions: {
    //     modifiers: [
    //       { 
    //         name: 'offset',
    //         options: { offset: [0, 0] }
    //       }
    //     ]
    //   }
    // },
    { 
      title: `.${prefixTheme}0CL`, 
      description: '2레벨 이상에서 사용되는 Tree Class', 
      classes: [
        {selector: `.${prefixTheme}1C, .${prefixTheme}0C, .${prefixTheme}1CL, .${prefixTheme}0CL`}, 
        // {selector: `.${prefixTheme}1E, .${prefixTheme}0E, .${prefixTheme}1EL, .${prefixTheme}0EL`}, 
        // {selector: `.${prefixTheme}TreeL`}, 
        // {selector: `.${prefixTheme}Width2T`}
      ],
      placement: 'bottom',
      popperOptions: {
        modifiers: [
          { 
            name: 'offset',
            options: { offset: [240, 0] }
          }
        ]
      }
    },
  ];

  treeConfigs.forEach((config, index) => {
    if (treeInfoAreas[index]) {
      const tp = tippy(treeInfoAreas[index], {
        content: createTippyContent(config.title, config.description, config.classes),
        placement: config.placement ? config.placement : undefined,
        popperOptions: config.popperOptions ? config.popperOptions : undefined,
        onShow(instance) {
          // show 후 popperInstance 업데이트
          requestAnimationFrame(() => {
            instance.popperInstance.update();
          });
        }
      });
      treeTippyInstances.push(tp);
      // 현재 탭의 tippy 인스턴스로 등록
      if (typeof window.registerCurrentTabTippy === 'function') {
        window.registerCurrentTabTippy(tp);
      }
    }
  });

  function tipShowClick(tipShow) {
    if (tipShow.textContent == '안내 보기') {
      treeTippyInstances.forEach(instance => {
        if (instance) {
          instance.show();
        }
      });
      tipShow.textContent = '안내 숨기기';
    } else {
      treeTippyInstances.forEach(instance => {
        if (instance) {
          instance.hide();
        }
      });
      tipShow.textContent = '안내 보기';
    }
  }
  
  const tipShow = treeContent.querySelector('#tipShow');
  if (tipShow) {
    if (!tipShow.classList.contains('oncl')) {
      tipShow.classList.add('oncl');
      tipShow.addEventListener('click', () => {tipShowClick(tipShow);});
    }
  }

  function areaToggleClick(areaToggle) {
    const infoAreas = treeContent.querySelectorAll('.infoArea');
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

  const areaToggle = treeContent.querySelector('#areaToggle');
  if (areaToggle) {
    if (!areaToggle.classList.contains('oncl')) {
      areaToggle.classList.add('oncl');
      areaToggle.addEventListener('click', () => {areaToggleClick(areaToggle);});
    }
  }
}
