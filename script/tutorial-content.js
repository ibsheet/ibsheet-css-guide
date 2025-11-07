var tutorialContent = document.getElementById('tutorial-content');
var tutorialTippyInstances = [];

var tutorialDriverObj = null;

var doAreaToggleClick = false;
var doTipShowClick = false;
var waitEditor1Input = false;
var waitEditor2Input = false;

async function doEditor1Input() {
  // 커스텀 커서 생성
  customCursor = document.getElementById('customCursor');
  
  // 1. 커서를 화면 왼쪽 상단에서 시작
  customCursor.style.display = 'block';

  gsap.set(customCursor, { left: 50, top: 50 });

  const cssEdit = document.getElementById('css-edit-0');
  
  // 커서 이동
  await moveToEditor(cssEdit, {
    duration: 2,
    position: 'center',
    click: true
  });
  
  await sleep(500);
  
  const rect = cssEdit.getBoundingClientRect();
  let X = rect.left + rect.width / 2;
  let Y = rect.top + rect.height / 5;

  await elementClick(cssEdit, X, Y);

  const editorInstance = await findEditor(cssEdit);
  if (editorInstance) {
    await editorFocus(editorInstance);
    // await sleep(500);
    await doEditorInput(editorInstance, 'color: red;');
  }

  await sleep(500);
  
  waitEditor1Input = true;
  customCursor.style.display = 'none';
  removeHighlightFromElements();
}

async function doEditor2Input() {
  // 커스텀 커서 생성
  customCursor = document.getElementById('customCursor');

  // 1. 커서를 화면 왼쪽 상단에서 시작
  customCursor.style.display = 'block';

  gsap.set(customCursor, { left: 50, top: 50 });

  // await sleep(500);

  const cssEdit = document.getElementById('css-edit-1');
  
  // 커서 이동
  await moveToEditor(cssEdit, {
    duration: 2,
    position: 'center',
    click: true
  });
  
  await sleep(500);
  
  const rect = cssEdit.getBoundingClientRect();
  let X = rect.left + rect.width / 2;
  let Y = rect.top + rect.height / 5;

  await elementClick(cssEdit, X, Y);

  const editorInstance = await findEditor(cssEdit);
  if (editorInstance) {
    await editorFocus(editorInstance);
    await doEditorInput(editorInstance, 'background-color: skyblue;');
  }

  await sleep(500);
  
  waitEditor2Input = true;
  customCursor.style.display = 'none';
  removeHighlightFromElements();
}

function tutorialSet() {
  doAreaToggleClick = false;
  doTipShowClick = false;
  waitEditor1Input = false;
  waitEditor2Input = false;
  // const 
  tutorialDriverObj = driverJs({
    showProgress: true,
    popoverClass: 'popover-center-screen',
    steps: [
      { element: '.theme-bar', element2: '#sheetDivTuto', popover: { title: '테마 선택', description: '다양한 테마를 빠르게 적용할 수 있는 테마 바입니다.<br>테마를 선택하면 해당 테마로 즉시 적용됩니다.', side: "bottom", align: 'center' }},
      { element: '#areaToggle', element2: '#tutoInfo1', popover: { title: '선택 영역 표시/미표시', description: '선택 영역 미표시 버튼을 클릭하여 선택 가능한 영역의 회색 테두리를 숨길 수 있습니다.<br><b>버튼을 Click하셔서 동작을 확인하여 보세요.</b>', side: "bottom", align: 'end'
        , onNextClick: function(element, step, options) {
          if (!doAreaToggleClick) {
            alert('선택 영역 미표시/표시 버튼을 클릭하여 선택 가능한 영역의 회색 테두리가 숨겨 지거나 표시되는 것을 확인해 주세요.');
          } else {
            tutorialDriverObj.moveNext();
          }
        }
      }},
      { element: '#tipShow', element2: '#tutoInfo1', popover: { title: '안내 보기/숨기기', description: '안내 보기 버튼을 클릭하여 각 선택 영역에 대한 설명을 확인할 수 있습니다.<br><b>버튼을 Click하셔서 동작을 확인하여 보세요.</b>', side: "bottom", align: 'end'
        , onNextClick: function(element, step, options) {
          if (!doTipShowClick) {
            alert('안내 보기/숨기기 버튼을 클릭하여 각 선택 영역에 대한 설명이 표시되거나 숨겨지는 것을 확인해 주세요.');
          } else {
            // document.querySelector('.driver-overlay path').setAttribute('d', driverOverlay);
            tutorialDriverObj.setDefaultOverlay();
            tutorialDriverObj.moveNext();
          }
        }
     }},
      { element: '#tutoInfo1', popover: { title: '선택 영역', description: '선택 혹은 안내가 제공되는 영역은 회색 테두리로 표시됩니다.<br>마우스 Hover 시, 선택 영역의 스타일 정보를 확인할 수 있으며, Click 시 해당 영역의 ClassList가 Editor에 출력됩니다. <br><b>영역을 Click하셔야 다음으로 진행됩니다.</b>', side: "bottom", align: 'center'
        , onNextClick: function(element, step, options) {
        alert('영역을 Click 하여 주셔야 다음으로 진행됩니다.');
       } 
      }},
      { element: '#css-edit-0', popover: { title: 'CSS Editor', description: '클릭한 Element의 ClassList를 Editor를 통해 수정하실 수 있습니다.<br>입력/수정 후 0.5초 대기 후 적용됩니다.<br><br>Editor 선택 시 해당 Class가 적용되는 영역이 화면에 표시됩니다.<br>해당 Class는 Text Type의 Cell에 적용되는 Class입니다.<br><br><b>Text Type의 Cell에 글자색을 붉은 색으로 변경하는 예제입니다.</b>', side: "top", align: 'center'
        , onNextClick: function(element, step, options) {
          if (!waitEditor1Input) {
            alert(''+ 'Editor에 "color: red;"를 입력하여 Text Type의 Cell에 빨간색 글자가 적용되는 것을 기다려 주세요.');
          } else {
            tutorialDriverObj.moveNext();
          }
        }
      }},
      { element: '#css-edit-1', popover: { title: 'CSS Editor', description: '클릭한 Element의 ClassList를 Editor를 통해 수정하실 수 있습니다.<br>입력/수정 후 0.5초 대기 후 적용됩니다.<br><br>Editor 선택 시 해당 Class가 적용되는 영역이 화면에 표시됩니다.<br>해당 Class는 모든 데이터 Cell에 적용되는 Class입니다.<br><br><b>Alternate 행외의 나머지 행의 Cell의 배경색을 하늘색으로 적용하는 예제입니다.</b>', side: "top", align: 'center',
        onNextClick: function(element, step, options) {
          if (!waitEditor2Input) {
            alert(''+ 'Editor에 "background-color: skyblue;"를 입력하여 Alternate로 지정된 행외의 나머지 행의 데이터 Cell의 배경색이 하늘색으로 적용되는 것을 기다려 주세요.');
          } else {
            tutorialDriverObj.moveNext();
          }
        }
      }},
      { element: '#custom-css-editor', popover: { title: '전역 CSS Editor', description: '여기에서 사용자 정의 CSS를 편집할 수 있습니다.<br>입력/수정 후 0.5초 대기 후 적용됩니다.<br><br>앞서 CSS EDITOR를 입력한 내용들이 이곳에 반영됩니다.<br>이 영역에 적용된 CSS는 다른 화면으로 되어도 유지됩니다.', side: "bottom", align: 'center' }},
      { element: '#custom-css-download', popover: { title: 'CSS 파일로 저장 버튼', description: '수정한 CSS를 파일로 저장할 수 있는 버튼입니다.', side: "top", align: 'center' }},
    ],
    onHighlighted: function(popover, step, options) {
      console.log('activeIndex:', options.state.activeIndex);
      if (options.state.activeIndex === 4) {
        doEditor1Input();
      }
      if (options.state.activeIndex === 5) {
        doEditor2Input()
      }
    },
  });

  tutorialDriverObj.drive();
}

if (tutorialContent) {
  // const init = {
  //   Cfg: {
  //     SearchMode: 2,
  //     Style: "IBGY",
  //     IgnoreFocused: true,
  //     NoVScroll: true,
  //   },
  //   LeftCols: [
  //     {"Header": "No","Type": "Int","Width": 100,"Align": "Center","Name": "SEQ","RelWidth": 0,"CanMove": 0,"CanFocus": 0}
  //   ],
  //   Cols: [
  //     {"Header": "이름","Name": "sName","Type": "Text","Width": 200,"Align": "Center"},
  //     {"Header": "급여","Name": "sMoney","Type": "Int","Align": "Right","Format": "$  #,##0","Width": 200},
  //     {"Header": "전화번호","Name": "sPhone","Type": "Text","Width": 300,"CustomFormat": "PhoneNo"},
  //     {"Header": "주민/사업자 번호","Name": "sId","Type": "Text","Width": 350,"CustomFormat": ["IdNo","SaupNo"]},
  //     {"Header": "우편번호","Name": "sPostNo","Type": "Text","Width": 250,"Format": "PostNo", "Align": "Center"},
  //   ],
  //   Events: {
  //     // onBeforeDataLoad: function (evtParam) {
  //     //   console.log('onBeforeDataLoad', evtParam);
  //     //   console.log(evtParam.data);
  //     //   //return data;
  //     //   evtParam.data = data;
  //     // },
  //     onRenderFirstFinish: function (evtParam) {
  //       evtParam.sheet.loadSearchData(data);
  //     }
  //   }
  // }

  // const data = [{"sName":"황정열",'sNameClass':'infoArea',"sMoney":"5000","sPhone":"01015368874","sId":"801221384251","sAddr":"서울","sPostNo":"137765","sCard":"1234123412341234","sCustom":"1012220"},{"sName":"강대호","sMoney":"4700","sPhone":"021231234","sId":"807151852148","sAddr":"경기","sPostNo":"142571","sCard":"546125847896665","sCustom":"675617"},{"sName":"김미경","sMoney":"3900","sPhone":"04321525555","sId":"138206820","sAddr":"강원","sPostNo":"570154","sCard":"8547955425411567","sCustom":"4180951"},{"sName":"김선희","sMoney":"3400","sPhone":"01011112222","sId":"6098204963","sAddr":"경기","sPostNo":"843521","sCard":"1234123412341234","sCustom":"321700"},{"sName":"최세희","sMoney":"3200","sPhone":"01674856874","sId":"405142384211","sAddr":"경기","sPostNo":"235552","sCard":"4587998856552145","sCustom":"2750801"},{"sName":"이명희","sMoney":"2900","sPhone":"0101538874","sId":"801221384251","sAddr":"서울","sPostNo":"615252","sCard":"1234123412341234","sCustom":"2571901"},{"sName":"노효일","sMoney":"2300","sPhone":"0215368874","sId":"506243051223","sAddr":"서울","sPostNo":"736566","sCard":"8585666185411125","sCustom":"1520201"},{"sName":"원영국","sMoney":"2800","sPhone":"01075116521","sId":"2118204825","sAddr":"경기","sPostNo":"951137","sCard":"7514441556512533","sCustom":"2557001"},{"sName":"이지선","sMoney":"2400","sPhone":"025815421","sId":"1298261319","sAddr":"서울","sPostNo":"515426","sCard":"6841563125655524","sCustom":"2007501"},{"sName":"김상도","sMoney":"4000","sPhone":"0425741245","sId":"507142063425","sAddr":"경기","sPostNo":"751123","sCard":"6666555522223333","sCustom":"4290851"}];

  // IBSheet.create({
  //   id: 'sheetTuto',
  //   el: 'sheetDivTuto',
  //   options: init
  // });

  // tutoHideAll();

  // const tuto1_box = document.getElementById('tuto1_box');
  // if (tuto1) {
    // tuto1Show();
    // gsap.to(tuto1_box, {x: 1090, y: 60, duration: 1.5, delay: 0.5});
    // gsap.to(tuto1_box, {
    //   duration: 2,
    //   text: "선택 영역 미표시 클릭 시, 선택 가능한 영역에 출력되는 회색 테두리를 숨길 수 있습니다.",
    //   ease: "none",
    // });
    // tuto1_box.innerText = '';
    // driver 함수가 전역에서 사용 가능한지 확인
  // }

  if (tutorialContent && tutorialContent.classList.contains('active')) tutorialSet();

  const tutoInfoArea = tutorialContent.querySelector('.infoArea:nth-child(2)');
  if (tutoInfoArea) {
    if (!tutoInfoArea.classList.contains('oncl')) {
      tutoInfoArea.classList.add('oncl');
      tutorialContent.querySelector('.infoArea:nth-child(2)').addEventListener('click', function() {
        // console.log('@@ infoArea clicked');
        // console.log('active idx:', tutorialDriverObj.getActiveIndex());
        // console.log('active step:', tutorialDriverObj.getActiveStep());
        // turorial에서 DriverObject가 2번 째 step에 도달했을 때 다음으로 이동 조건
        if (driverJs && tutorialDriverObj && tutorialDriverObj.getActiveIndex() == 3) {
          setTimeout(function() {
            // console.log('driver move next called');
            // editor가 활성화 될 때까지 약간의 딜레이를 줌
            tutorialDriverObj.moveNext();
          }, 300);
        }
      });
    }
  }

  const tutoSheetArea = tutorialContent.querySelector('#sheetDivTuto');
  if (tutoSheetArea) {
    const tutoSheetInfoAreas = tutoSheetArea.querySelectorAll('.infoArea');
    const configs = [
      {
        // title: 'Header Cell',
        // description: '각 컬럼의 헤더 정보를 출력하는 영역입니다.',
        // classes: [
        //   {
        //     selector: `.${prefixTheme}HeaderText`
        //   }, 
        //   {
        //     selector: `.${prefixTheme}CellHeader`
        //   }
        // ],
        title: 'Text Type',
        description: 'Text Type의 컬럼에서 사용되는 Class',
        classes: `.${prefixTheme}Text`,
        placement: 'left',
        onTrigger(instace, event) {
          // console.log('onTrigger', instace, event);
          // if (tuto1) {
          //   tuto1Hide();
          // }
        }
      },

    ];

    configs.forEach((config, index) => {
      if (tutoSheetInfoAreas[index]) {
        const tp = tippy(tutoSheetInfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes),
          placement: config.placement ? config.placement : undefined,
          onTrigger: config.onTrigger ? config.onTrigger : undefined,
          // popperOptions: config.popperOptions ? config.popperOptions : undefined
        });
        tutorialTippyInstances.push(tp);
      }
    });

    // if (tutoSheetInfoAreas && tutoSheetInfoAreas.length > 0) {
    //   tutoSheetInfoAreas[0].addEventListener('click', function() {
    //     if (tuto2) {
    //       tuto2Hide();
    //     }
    //   });
    // }
  }

  function tipShowClick(tipShow) {
    doTipShowClick = true;
    // console.log('@@ tipShowClick clicked');
    // console.log('tutorialDriverObj:', tutorialDriverObj);
    // console.log('active idx:', tutorialDriverObj.getActiveIndex());
    // console.log('active step:', tutorialDriverObj.getActiveStep());

    if (tipShow.textContent == '안내 보기') {
      tutorialTippyInstances.forEach(instance => {
        if (instance) {
          // console.log('instance:', instance);
          instance.show();
          if (tutorialDriverObj && tutorialDriverObj.isActive() && tutorialDriverObj.getActiveIndex() == 2) {
            // document.querySelector('.driver-overlay path').setAttribute('d', driverOverlay + 'M330,198 h250 a5,5 0 0 1 5,5 v180 a5,5 0 0 1 -5,5 h-250 a5,5 0 0 1 -5,-5 v-180 a5,5 0 0 1 5,-5 z');
            setTimeout(() => {
              // console.log('popper:', instance.popper);
              tutorialDriverObj.addOverlay(instance.popper);
            }, 100);
          }
        }
      });
      tipShow.textContent = '안내 숨기기';

    } else {
      tutorialTippyInstances.forEach(instance => {
        if (instance) {
          instance.hide();
          if (tutorialDriverObj && tutorialDriverObj.isActive()) {
            // document.querySelector('.driver-overlay path').setAttribute('d', driverOverlay);
            tutorialDriverObj.setDefaultOverlay();
          }
        }
      });
      tipShow.textContent = '안내 보기';

    }
  }

  const tipShow = tutorialContent.querySelector('#tipShow');
  if (tipShow) {
    if (!tipShow.classList.contains('oncl')) {
      tipShow.classList.add('oncl');
      tipShow.addEventListener('click', () => {tipShowClick(tipShow);});
    }
  }

  function areaToggleClick(areaToggle) {
    doAreaToggleClick = true;
    const infoAreas = tutorialContent.querySelectorAll('.infoArea');
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

  const areaToggle = tutorialContent.querySelector('#areaToggle');
  if (areaToggle) {
    if (!areaToggle.classList.contains('oncl')) {
      areaToggle.classList.add('oncl');
      areaToggle.addEventListener('click', () => {areaToggleClick(areaToggle);});
    }
  }
}