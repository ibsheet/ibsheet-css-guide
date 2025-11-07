var typeContent = document.getElementById('type-content');
var typeTippyInstances = [];

function typeClickSetting(theme) {

  let style = theme ? theme : `${prefixTheme}`;

  document.body.addEventListener('click', e => {
    if (!typeContent || !typeContent.contains(e.target)) {
      return;
    }
  
    const TypeDivTag = typeContent.getElementsByClassName('tabTypeDivTag');
    const DataEnum = typeContent.getElementsByClassName(`${style}EnumLeft ${style}Cell`);
    const IBDateRight = typeContent.getElementsByClassName(`${style}DateRight ${style}Cell`);
  
    function divTagHide() {
      Array.from(TypeDivTag).forEach(element => {
        element.style.display = 'none';
      });
    }
  
    const isTargetEnumType =
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${style}EnumLeft`) &&
      e.target.classList.contains(`${style}Cell`);
  
    const isTargetDateRight =
      e.target &&
      e.target.nodeType === 1 &&
      Array.from(e.target.classList).some(cn => cn === `${style}DateRight`);
  
    const isTargetPickMYDown =
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${style}PickMYDown`);
  
    const isTargetPickMYUp =
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${style}PickMYUp`);
  
    const isInTypeDivTag = Array.from(TypeDivTag).some(div => div.contains(e.target));
  
    if (isTargetEnumType) {
      divTagHide();
      if (DataEnum[0] == e.target) {
        const targetDiv = typeContent.querySelector('#tabTypeTag0');
        if (targetDiv) {
          targetDiv.style.display = 'block';
        }
      }
    }
    else if (isTargetDateRight) {
      divTagHide();
      if (IBDateRight[0] == e.target) {
        const targetDiv = typeContent.querySelector('#tabTypeTag1');
        if (targetDiv) {
          targetDiv.style.display = 'block';
        }
      }
    } else if (isTargetPickMYDown) {
      divTagHide();
      const targetDiv = typeContent.querySelector('#tabTypeTag2');
      if (targetDiv) {
        targetDiv.style.display = 'block';
      }
    } else if (isTargetPickMYUp) {
      divTagHide();
      const targetDiv = typeContent.querySelector('#tabTypeTag1');
      if (targetDiv) {
        targetDiv.style.display = 'block';
      }
    } else if (!isInTypeDivTag) {
      divTagHide();
    }
  });
}

if (typeContent) {
  // let opt = {
  //   Cfg: {
  //     Style: "IBGY",
  //     IgnoreFocused: true,
  //     CanSort: false,
  //   },
  //   Cols: [
  //     {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"},
  //     {"Header": "Text","Type": "Text","Name": "TextData","Width": 100,"Align": "Center","CanEdit": 1},
  //     {"Header": "Lines","Type": "Lines","Name": "LinesData","Width": 155,"Align": "Center","CanEdit": 1},
  //     {"Header": "Enum","Type": "Enum","Name": "ComboData","Width": 100,"Align": "Right","Enum": "|대기|진행중|완료","EnumKeys": "|01|02|03"},
  //     {"Header": "Button","Type": "Button","Name": "ISO","Width": 90,"Align": "Left","CanEdit": 0,"Button": "Button"},
  //     {"Header": "Int","Type": "Int","Name": "IntData","Width": 80,"Align": "Right","CanEdit": 1},
  //     {"Header": "Float","Type": "Float","Name": "FloatData","Width": 80,"Align": "Right","CanEdit": 1},
  //     {"Header": "Date","Type": "Date","Name": "DateData","Width": 170,"Align": "Center","CanEdit": 1,"EmptyValue": "날짜를 입력해주세요"},
  //     {"Header": "Link","Type": "Link","Name": "LinkData","Width": 70,"CanEdit": 0},
  //     {"Header": "Img","Type": "Img","Name": "ImageData","Width": 70,"Align": "Center","CanEdit": 1},
  //     {"Header": "Pass","Type": "Pass","Name": "PassData","Width": 80,"Align": "Left","CanEdit": 1},
  //     {"Header": "Radio1","Type": "Radio","Name": "RadioData1","Width": 80,"Align": "Center","CanEdit": 1},
  //     {"Header": "Radio2","Type": "Radio","Name": "RadioData2","Width": 140,"Align": "Center","CanEdit": 1,"Enum": "|상|중|하","EnumKeys": "|H:1|M:1|L:1"},
  //     {"Header": {"Value": "Bool","HeaderCheck": 1},"Type": "Bool","Name": "CheckData","Width": 80,"Align": "Center","CanEdit": 1}
  //   ],
  //   Events: {
  //     onRenderFirstFinish: function (evtParam) {
  //       const sheet = evtParam.sheet;
  //       sheet.loadSearchData(data);
  //     }
  //   }
  // }

  // IBSheet.create(
  //   {
  //     id: 'sheet1',
  //     el: 'sheetDiv1',
  //     options: opt,
  //   }
  // )

  // let data = [
  //   {"TextData":"장순연","ComboData":"01","ISO":"AUD","Currency":"호주 달러","IntData":0,"FloatData":15.25,"DateData":"","PhoneNo":"01075116521","IDNO":"7801221384251","LinkData":"|./confirm.do|확정|_self ","LinesData":"남부내륙은 오후 한때 소나기가 오는 곳이 있겠습니다.","Userformat":"1234567890","ImageData":"|./assets/imgs/am.jpg|||||./nt/gripInTran.do|_self","PassData":123456,"RadioData1":true,"RadioData2":"H:1","CheckData":1},
  //   {"TextData":"김정호","ComboData":"02","ISO":"ALL","Currency":"알바니아 렉","IntData":0,"FloatData":234,"DateData":"20100120","PhoneNo":"","IDNO":"6807151852148","LinkData":"|./delayCos.do|재고|_self ","LinesData":"남부지방은 북태평양 고기압의 가장자리에 들겠습니다.","Userformat":"1111155555","ImageData":"|./assets/imgs/am.jpg|||||","PassData":"75646","RadioData2":"M:1","CheckData":0},
  //   {"TextData":"정상호","ComboData":"01","ISO":"DZD","Currency":"알제리 디나르","IntData":65,"FloatData":123,"DateData":"20020815","PhoneNo":"025815421","IDNO":"1138206820","LinesData":"중부지방은 장마전선의 영향을 받겠습니다.","Userformat":"","ImageData":"|./assets/imgs/ca.jpg|||||","PassData":"4564","RadioData1":true,"RadioData2":"L:1","CheckData":1},
  //   {"TextData":"안수현","ComboData":"02","ISO":"ARS","Currency":"아르헨티나 페소","IntData":190,"FloatData":0,"DateData":"20110526","PhoneNo":"","IDNO":"6098204963","LinesData":"제주도는 약한 기압골의 영향을 받다가 점차 벗어나겠습니다.","LinkData":"|./acceptCos.do|확정|_self ","Userformat":"9898554321","ImageData":"|./assets/imgs/ca.jpg|||||","PassData":"123456","RadioData2":"L:1","CheckData":1},
  //   {"TextData":"박만우","ComboData":"02","ISO":"AWG","Currency":"아루바 플로린","IntData":1120,"FloatData":115.25,"DateData":"20100922","PhoneNo":"0425741245","IDNO":"","LinesData":"서해상에 위치한 고기압의 영향을 받겠습니다.","Userformat":"","ImageData":"|./assets/imgs/fe.jpg|||||","PassData":"75646","RadioData2":"M:1","CheckData":0}
  // ];

  typeClickSetting();

  const typeSheetArea = typeContent.querySelector('#sheetDiv1');
  if (typeSheetArea) {
    const typeSheetInfoAreas = typeSheetArea.querySelectorAll('.infoArea');
    const configs = [
      {
        title: `.${prefixTheme}InfoRow`,
        description: '조회된 데이터의 개수나 페이지 네비게이션을 출력합니다.',
        classes: `.${prefixTheme}InfoRow, .${prefixTheme}InfoRow *`,
        placement: 'top',
      }, 
      {
        title: 'Header Cell',
        description: '각 컬럼의 헤더 정보를 출력하는 영역입니다.',
        classes: [
          {
            selector: `.${prefixTheme}HeaderText`
          }, 
          {
            selector: `.${prefixTheme}CellHeader`
          }
        ],
        placement: 'left',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [0, 100] }
            },
          ]
        }
      }, 
      {
        title: 'Bool Header Cell',
        description: 'Header Check를 사용하는 Header Cell입니다.',
        classes: [
          {
            selector: `.${prefixTheme}Check0Left, .${prefixTheme}Check0Center, .${prefixTheme}Check0Right, .${prefixTheme}Check0Top, .${prefixTheme}Check0Bottom`
          }, 
          // {
          //   selector: `.${prefixTheme}Check1Left, .${prefixTheme}Check1Center, .${prefixTheme}Check1Right, .${prefixTheme}Check1Top, .${prefixTheme}Check1Bottom`
          // }, 
          // {
          //   selector: `.${prefixTheme}Check2Left, .${prefixTheme}Check2Center, .${prefixTheme}Check2Right, .${prefixTheme}Check2Top, .${prefixTheme}Check2Bottom`
          // }
        ],
        placement: 'top',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [-250, 0] }
            },
          ]
        }
      }, 
      {
        title: 'Enum Type',
        description: 'Enum Type의 컬럼에서 사용되는 Class',
        classes: [
          {
            selector: `.${prefixTheme}EnumLeft, .${prefixTheme}EnumRight, .${prefixTheme}EnumTop, .${prefixTheme}EnumBottom`
          }, 
          {
            selector: `.${prefixTheme}Enum`
          }
        ],
        placement: 'left',
      }, 
      {
        title: 'Date Type',
        description: 'Date Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Int, .${prefixTheme}Float, .${prefixTheme}Date`
      }, 
      {
        title: '달력 이미지',
        description: '클릭하여 달력을 실행하실 수 있습니다.',
        classes: `.${prefixTheme}Main .${prefixTheme}DateLeft, .${prefixTheme}Main .${prefixTheme}DatesLeft, .${prefixTheme}Main .${prefixTheme}DateRight, .${prefixTheme}Main .${prefixTheme}DatesRight, .${prefixTheme}Main .${prefixTheme}DateTop, .${prefixTheme}Main .${prefixTheme}DatesTop, .${prefixTheme}Main .${prefixTheme}DateBottom, .${prefixTheme}Main .${prefixTheme}DatesBottom`,
        placement: 'right',
      }, 
      {
        title: 'Radio Type',
        description: 'Radio Type의 컬럼에서 사용되는 Class',
        classes: [
          {
            selector: `.${prefixTheme}Lines, .${prefixTheme}Radio, .${prefixTheme}Html, .${prefixTheme}List`
          }, 
          // {
          //   selector: `.${prefixTheme}Radio0Left, .${prefixTheme}Radio0Right`
          // }, 
          // {
          //   selector: `.${prefixTheme}Radio1Left, .${prefixTheme}Radio1Right`
          // }, 
          // {
          //   selector: `.${prefixTheme}Radio2Left, .${prefixTheme}Radio2Right`
          // }, 
          // {
          //   selector: `.${prefixTheme}Radio3Left, .${prefixTheme}Radio3Right`
          // }
        ],
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [0, -10] }
            },
          ]
        },
      }, 
      {
        title: 'Alternate',
        description: '홀수, 짝수 행에 대하여 번갈아 가며 배경색을 다르게 설정하여 가독성을 높일 수 있는 기능<br>CSS 파일에서 .IBColorAlternate Class를 찾아 수정하시거나 시트 생성 시 Def.Row.AlternateColor를 통해 배경색을 지정할 수 있습니다.<br>Sample에서는 (Cfg) Alternate: 2로 설정되어 짝수행 마다 Alternate 배경색이 적용되고 있습니다.<br>※ AlternateColor는 inline-style로 적용되어 Class로 제어할 수 없습니다.',
        classes: `.${prefixTheme}ColorAlternate`,
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [300, 300] }
            },
          ]
        },
      }, 
      {
        title: 'Text Type',
        description: 'Text Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Text`,
        placement: 'left',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [90, 0] }
            },
          ]
        }
      }, 
      {
        title: 'Int Type',
        description: 'Int Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Int, .${prefixTheme}Float, .${prefixTheme}Date`,
        placement: 'left'
      }, 
      {
        title: 'Img Type',
        description: 'Img Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Img, .${prefixTheme}Html`
      }, 
      {
        title: 'Lines Type',
        description: 'Lines Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Lines, .${prefixTheme}Radio, .${prefixTheme}Html, .${prefixTheme}List`
      }, 
      {
        title: 'Button Type',
        description: 'Button Type의 컬럼에서 사용되는 Class',
        classes: [
          {
            selector: `.${prefixTheme}Button`
          }, 
          {
            selector: `.${prefixTheme}DialogButton, u.${prefixTheme}SheetButton`
          }
        ],
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [-200, 0] }
            },
          ]
        }
      }, 
      {
        title: 'Float Type',
        description: 'Float Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Int, .${prefixTheme}Float, .${prefixTheme}Date`,
        placement: 'bottom',
      }, 
      {
        title: 'Link Type',
        description: 'Link Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Link`,
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [100, 0] }
            },
          ]
        },
      }, 
      {
        title: 'Pass Type',
        description: 'Pass Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Pass`,
        placement: 'right',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [-50, 0] }
            },
          ]
        }
      }, 
      {
        title: 'Bool Type',
        description: 'Bool Type의 컬럼에서 사용되는 Class',
        classes: [
          {
            selector: `.${prefixTheme}Bool`
          }, 
          // {
          //   selector: `.${prefixTheme}Bool0, .${prefixTheme}Bool0RO`
          // }, 
          // {
          //   selector: `.${prefixTheme}Bool1, .${prefixTheme}Bool1RO`
          // }, 
          // {
          //   selector: `.${prefixTheme}BoolX, .${prefixTheme}BoolXRO`
          // }, 
          // {
          //   selector: `.${prefixTheme}Bool2, .${prefixTheme}Bool2RO`
          // }, 
          // {
          //   selector: `.${prefixTheme}Bool3, .${prefixTheme}Bool3RO`
          // }
        ],
        placement: 'bottom',
      }, 
      {
        title: 'SolidRow',
        description: 'Header나 Footer에 출력되는 고정 행',
        classes: `.${prefixTheme}SolidRow`,
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [-700, 0] }
            },
          ]
        },
        onShow(instance) {
          // show 후 popperInstance 업데이트
          requestAnimationFrame(() => {
            instance.popperInstance.update();
          });
        }
      }
    ];

    configs.forEach((config, index) => {
      if (typeSheetInfoAreas[index]) {
        const tp = tippy(typeSheetInfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes),
          placement: config.placement ? config.placement : undefined,
          popperOptions: config.popperOptions ? config.popperOptions : undefined
        });
        typeTippyInstances.push(tp);
      }
    });
  }
  
  // 탭별 tippy 설정
  const typeTab0Area = typeContent.querySelector('#tabTypeTag');
  if (typeTab0Area) {
    const typeTab0InfoAreas = typeTab0Area.querySelectorAll('.infoArea');
    const tab0Configs = [
      { title: `Enum Edit Menu`, description: 'Enum Type Edit 시 Enum속성에 설정한 메뉴가 출력됩니다.', classes: [{selector: `.${prefixTheme}MenuItemText`}, {selector: `.${prefixTheme}MenuItem`}, {selector: `.${prefixTheme}MenuFocus`} ] },
      { title: `Enum Edit`, description: 'Enum Type에서 Edit Mode 활성화 시 노출되는 형태', classes: `.${prefixTheme}EnumHeaderLeft, .${prefixTheme}EnumHeaderRight` }
    ];
  
    tab0Configs.forEach((config, index) => {
      if (typeTab0InfoAreas[index]) {
        const tp = tippy(typeTab0InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }

  const typeTab1Area = typeContent.querySelector('#tabTypeTag1');
  if (typeTab1Area) {
    const typeTab1InfoAreas = typeTab1Area.querySelectorAll('.infoArea');
    const tab1Configs = [
      { title: `.${prefixTheme}PickBL`, description: '이전 달로 이동', classes: `.${prefixTheme}PickBL` },
      { title: `.${prefixTheme}PickBR`, description: '다음 달로 이동', classes: `.${prefixTheme}PickBR`, placement: 'right' },
      { title: `.${prefixTheme}PickMYDown`, description: '년/월 달력 닫힘, 클릭 시 월 달력에서 년/월 달력으로 전환합니다.', classes: `.${prefixTheme}PickMYDown`, placement: 'top' },
      { title: `.${prefixTheme}PickSu`, description: '일요일 표시', classes: `.${prefixTheme}PickWDN.${prefixTheme}PickSu` },
      { title: `.${prefixTheme}PickWDN`, description: '요일 표시', classes: `.${prefixTheme}PickWDN` },
      { title: `.${prefixTheme}PickSa`, description: '토요일 표시', classes: `.${prefixTheme}PickWDN.${prefixTheme}PickSa`, placement: 'right' },
      { title: `.${prefixTheme}PickOM`, description: '주간 표기 시 지난 달 혹은 다음 달 표시', classes: `.${prefixTheme}PickOM, .${prefixTheme}PickOMNE, .${prefixTheme}PickOM button` },
      { title: `.${prefixTheme}PickSel`, description: '선택 된 날짜', classes: `.${prefixTheme}PickSel, .${prefixTheme}Pick2MSel, .${prefixTheme}Pick2YSel` },
      { title: `.${prefixTheme}PickHover`, description: 'Hover 상태인 날짜', classes: `.${prefixTheme}PickHover, .${prefixTheme}Pick2MHover, .${prefixTheme}Pick2YHover`, placement: 'right' },
      { title: `.${prefixTheme}PickWD`, description: '이번 달 날짜 표시', classes: `.${prefixTheme}PickHover, .${prefixTheme}PickSelHover, .${prefixTheme}PickWD, .${prefixTheme}PickSa, .${prefixTheme}PickSu, .${prefixTheme}PickSel, .${prefixTheme}PickNow, .${prefixTheme}PickWDNE, .${prefixTheme}PickSaNE, .${prefixTheme}PickSuNE, .${prefixTheme}PickSelNE, .${prefixTheme}PickNowNE, .${prefixTheme}PickOM, .${prefixTheme}PickOMNE` },
      { title: `.${prefixTheme}PickNow`, description: '오늘 날짜 표시', classes: `.${prefixTheme}PickNow` },
    ];
    
    tab1Configs.forEach((config, index) => {
      if (typeTab1InfoAreas[index]) {
        const tp = tippy(typeTab1InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes),
          placement: config.placement ? config.placement : undefined
        });
      }
    });
  }

  const typeTab2Area = typeContent.querySelector('#tabTypeTag2');
  if (typeTab2Area) {
    const typeTab2InfoAreas = typeTab2Area.querySelectorAll('.infoArea');
    const tab2Configs = [
      { title: `.${prefixTheme}PickBL`, description: '이전 달로 이동', classes: `.${prefixTheme}PickBL` },
      { title: `.${prefixTheme}PickBR`, description: '다음 달로 이동', classes: `.${prefixTheme}PickBR` },
      { title: `.${prefixTheme}PickMYUp`, description: '년/월 달력 열림. 클릭 시 년/월 달력에서 월 달력으로 전환합니다.', classes: `.${prefixTheme}PickMYUp`, placement: 'top' },
      { title: `.${prefixTheme}Pick2BL`, description: '이전 년도로 이동', classes: `.${prefixTheme}Pick2BL` },
      { title: `.${prefixTheme}Pick2BR`, description: '다음 년도로 이동', classes: `.${prefixTheme}Pick2BR`, placement: 'right' },
      { title: `.${prefixTheme}Pick2YHover`, description: '년월 달력에서 Hover 상태인 년도', classes: `.${prefixTheme}PickHover, .${prefixTheme}Pick2MHover, .${prefixTheme}Pick2YHover` },
      { title: `.${prefixTheme}IBPick2YSel`, description: '년월 달력에서 선택된 년도', classes: `.${prefixTheme}PickSel, .${prefixTheme}Pick2MSel, .${prefixTheme}Pick2YSel` },
      { title: `.${prefixTheme}IBPick2MHover`, description: '년월 달력에서 Hover 상태인 월', classes: `.${prefixTheme}PickHover, .${prefixTheme}Pick2MHover, .${prefixTheme}Pick2YHover`, placement: 'right' },
      { title: `.${prefixTheme}Pick2MSel`, description: '년월 달력에서 선택된 월', classes: `.${prefixTheme}PickSel, .${prefixTheme}Pick2MSel, .${prefixTheme}Pick2YSel`, placement: 'right' },
      { title: `.${prefixTheme}Pick2Y`, description: '년월 달력에서 년도 출력 공통', classes: `.${prefixTheme}Pick2M, .${prefixTheme}Pick2Y` },
      { title: `.${prefixTheme}Pick2M`, description: '년월 달력에서 월 출력 공통', classes: `.${prefixTheme}Pick2M, .${prefixTheme}Pick2Y`, placement: 'right' },
      { title: `.${prefixTheme}DialogButton`, description: '확인 버튼', classes: `.${prefixTheme}DialogButton, u.${prefixTheme}SheetButton`, placement: 'bottom' }
    ];
    
    tab2Configs.forEach((config, index) => {
      if (typeTab2InfoAreas[index]) {
        const tp = tippy(typeTab2InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes),
          placement: config.placement ? config.placement : undefined
        });
      }
    });
  }

  function tipShowClick(tipShow) {
    if (tipShow.textContent == '안내 보기') {
      typeTippyInstances.forEach(instance => {
        if (instance) {
          instance.show();
        }
      });
      tipShow.textContent = '안내 숨기기';
    } else {
      typeTippyInstances.forEach(instance => {
        if (instance) {
          instance.hide();
        }
      });
      tipShow.textContent = '안내 보기';
    }
  }

  const tipShow = typeContent.querySelector('#tipShow');
  if (tipShow) {
    if (!tipShow.classList.contains('oncl')) {
      tipShow.classList.add('oncl');
      tipShow.addEventListener('click', () => {tipShowClick(tipShow);});
    }
  }

  function areaToggleClick(areaToggle) {
    const infoAreas = typeContent.querySelectorAll('.infoArea');
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

  const areaToggle = typeContent.querySelector('#areaToggle');
  if (areaToggle) {
    if (!areaToggle.classList.contains('oncl')) {
      areaToggle.classList.add('oncl');
      areaToggle.addEventListener('click', () => {areaToggleClick(areaToggle);});
    }
  }
}
