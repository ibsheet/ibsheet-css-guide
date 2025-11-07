var styleContent = document.getElementById('style-content');
if (styleContent) {
  // showInspector(null, true);
  // function setBaseTheme() {
  //   const sheetEX = styleContent.querySelector('#sheetDivEX');
  //   if (sheetEX) {
  //     // 해당 화면의 시트의 테마가 IB 즉, 기본 테마가 아닌 경우 기본 테마로 강제 변경
  //     if (prefixTheme != 'IB') {
  //       const allElements = sheetEX.querySelectorAll('*');
  //       // 현재 요소와 모든 하위 요소들에 대해 클래스 교체
  //       allElements.forEach(el => {
  //         if (el.className && typeof el.className === 'string') {
  //           if (el.className.indexOf(`${prefixTheme}`) !== -1) {
  //             el.className = el.className.replaceAll(`${prefixTheme}`, 'IB');
  //           }
  //         }
  //       });
  //     }
  //   }
  // }

  let opt = {
    Cfg: {
      IgnoreFocused: true,
      CanSort: false,
      InfoRowConfig: {
        Visible: false,
      },
      // InfoRowConfig: {
      //   Layout: ['Paging2', 'Count'],
      //   // Space: 'Bottom',
      // },
      // NoVScroll: true,
      // NoHScroll: true,
      Alternate: 2,
      // Style: 'IBBL',
      // Style: 'IBJR',
      // SearchMode: 1,
      // PageLength: 5,

      // SearchMode: 0,
      // AutoRowHeight: true,
      SelFocusColor: true,
      Weeks: true,
      // ColorState: 0,
      // UseFilterDialog: true,
      ShowFilter: true,
      "Export": {
        "FilePath": "https://api.ibsheet.com/ibsheet/v8/samples/customer/files/"
      },
    },
    Def: {
      // Header: {
      //   Height: 50,
      // },
      Row: {
        Height: 50,
        // Color: '#ffff29',
        // AlternateColor: 'skyblue',
      }
    },
    "LeftCols": [
      {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
    ],
    //중앙(메인) 컬럼 설정
    "Cols": [
      {"Header": "Text","Type": "Text","Name": "TextData","Width": 100,"Align": "Center","CanEdit": 1, Required: true},
      {"Header": "Lines","Type": "Lines","Name": "LinesData","Width": 200,"Align": "Center","CanEdit": 1},
      {"Header": "Enum","Type": "Enum","Name": "ComboData","Width": 100,"Align": "Right","Enum": "|대기|진행중|완료","EnumKeys": "|01|02|03"},
      {"Header": "Button","Type": "Button","Name": "ISO","Width": 80,"Align": "Left","CanEdit": 0,"Button": "Button"},
      {"Header": "Int","Type": "Int","Name": "IntData","Width": 80,"Align": "Right","CanEdit": 1},
      {"Header": "Float","Type": "Float","Name": "FloatData","Width": 80,"Align": "Right","CanEdit": 1},
      {"Header": "Date","Type": "Date","Name": "DateData","Width": 150,"Align": "Center","CanEdit": 1,"EmptyValue": "날짜를 입력해주세요", Range: true},
      {"Header": "Link","Type": "Link","Name": "LinkData","Width": 60,"CanEdit": 0},
      {"Header": "Img","Type": "Img","Name": "ImageData","Width": 70,"Align": "Center","CanEdit": 1},
      {"Header": "Pass","Type": "Pass","Name": "PassData","Width": 80,"Align": "Left","CanEdit": 1},
      {"Header": "Radio","Type": "Radio","Name": "RadioData","Width": 200,"Align": "Center","CanEdit": 1,"Enum": "|상|중|하","EnumKeys": "|H:1|M:1|L:1"},
      {"Header": {"Value": "Bool","HeaderCheck": 1},"Type": "Bool","Name": "CheckData","Width": 80,"Align": "Center","CanEdit": 1},
      {"Header": "File", "Type": "File", "Name": "lblist", "Width": 300, "Align": "Center"},

    ],
    // Cols: [
    //   {"Header": "No","Type": "Int","Width": 100,"Align": "Center","Name": "SEQ","RelWidth": 0,"CanMove": 0,"CanFocus": 0},
    //   {"Header": "이름","Name": "sName","Type": "Text","Width": 170, Align: "Center"},
    //   {"Header": "급여","Name": "sMoney","Type": "Int","Align": "Right","Format": "$  #,##0","Width": 175},
    //   {"Header": "전화번호","Name": "sPhone","Type": "Text","CustomFormat": "PhoneNo","Width": 300,"Align": "Center"},
    //   {"Header": "주민/사업자 번호","Name": "sId","Type": "Text","Width": 350,"CustomFormat": ["IdNo","SaupNo"],"Align": "Center"},
    //   {"Header": "우편번호","Name": "sPostNo","Type": "Text","Width": 250,"Format": "PostNo","Align": "Center"},
    // ],
    // "Solid": [
    //   {
    //     "Kind": "Search",
    //     "Space": 1,
    //     "id": "searchZone",
    //     "Cells": "Expression,Sep1,Counts,Filter,Select,Mark,FindPrev,Find,Clear,Sep2",
    //     "Expression": {
    //       "Action": "Last",
    //       "NoColor": 0,
    //       "CanFocus": 1,
    //       "Left": "5",
    //       "MinWidth": "90",
    //       "EmptyValue": "<s>검색어를 입력해 주세요</s>"
    //     },
    //     "Sep1": {
    //       "Width": "10",
    //       "Type": "Html"
    //     },
    //     "Counts": {
    //       "Width": "50",
    //       "CanFocus": 0,
    //       "Type": "Html",
    //       "Formula": "(Sheet.SearchCount ? Sheet.SearchCount : (Sheet.FilterCount ? Sheet.FilterCount : count(7))) +'개'"
    //     },
    //     "Filter": {
    //       "ButtonText": "필터"
    //     },
    //     "Select": {
    //       "ButtonText": "선택"
    //     },
    //     "Mark": {
    //       "ButtonText": "마킹"
    //     },
    //     "FindPrev": {
    //       "ButtonText": "(위로)찾기",
    //       "Width": "70"
    //     },
    //     "Find": {
    //       "ButtonText": "(아래로)찾기",
    //       "Width": "70"
    //     },
    //     "Clear": {
    //       "ButtonText": "클리어",
    //       "Width": "50"
    //     },
    //     "Sep2": {
    //       "Width": "5",
    //       "Type": "Html"
    //     }
    //   }
    // ],
    Events: {
      onRenderFirstFinish: function (evtParam) {
        // evtParam.sheet.loadSearchData(data);
      },
      onSearchFinish: function (evtParam) {
        // setBaseTheme(styleContent.querySelector('#sheetDivEX'));
        // evtParam.sheet.setAttribute(evtParam.sheet.getRowById('Header'), 'LinesData', 'HtmlPostfix', `<span style='color:#ED8A19;'>*</span>`, true);
      },
      onAfterClick: function (evtParam) {
        // console.log('## onAfterClick');
        var cell = evtParam.sheet.getCell(evtParam.row, evtParam.col);
        // debugger;
        showInspector(cell, true);
      }
    }
  }

  const data = [
    {"TextData":"장순연","ComboData":"01","ISO":"AUD","Currency":"호주 달러","IntData":0,"FloatData":15.25,"DateData":"","PhoneNo":"01075116521","IDNO":"7801221384251","LinkData":"|./confirm.do|확정|_self ","LinesData":"남부내륙은 오후 한때 소나기가 오는 곳이 있겠습니다.","Userformat":"1234567890","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/am.jpg|||||./nt/gripInTran.do|_self","PassData":123456,"RadioData":"H:1","CheckData":1, "lblist": "seoul_gangnamgu_library.xlsx", "lblistPath": "https://api.ibsheet.com/ibsheet/v8/samples/customer/files/gangnamgu/"},
    {"TextData":"김정호","ComboData":"02","ISO":"ALL","Currency":"알바니아 렉","IntData":0,"FloatData":234,"DateData":"20100120","PhoneNo":"","IDNO":"6807151852148","LinkData":"|./delayCos.do|재고|_self ","LinesData":"중부지방은 장마전선의 영향을 받겠고, 남부지방은 북태평양 고기압의 가장자리에 들겠습니다.","Userformat":"1111155555","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/am.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0, "lblist": "seoul_gangdonggu_library.xlsx"},
    {"TextData":"정상호","ComboData":"01","ISO":"DZD","Currency":"알제리 디나르","IntData":65,"FloatData":123,"DateData":"20020815","PhoneNo":"025815421","IDNO":"1138206820","LinesData":"중부지방은 장마전선의 영향을 받겠고, 남부지방은 북태평양 고기압의 가장자리에 들겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ca.jpg|||||","PassData":"4564","RadioData":"L:1","CheckData":1, "lblist": "seoul_gangbukgu_library.xlsx"},
    {"TextData":"안수현","ComboData":"02","ISO":"ARS","Currency":"아르헨티나 페소","IntData":190,"FloatData":0,"DateData":"20110526","PhoneNo":"","IDNO":"6098204963","LinesData":"일본 남쪽해상에 위치한 고기압의 가장자리에 들겠으나, 제주도는 약한 기압골의 영향을 받다가 점차 벗어나겠습니다.","LinkData":"|./acceptCos.do|확정|_self ","Userformat":"9898554321","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ca.jpg|||||","PassData":"123456","RadioData":"L:1","CheckData":1},
    {"TextData":"박만우","ComboData":"02","ISO":"AWG","Currency":"아루바 플로린","IntData":1120,"FloatData":115.25,"DateData":"20100922","PhoneNo":"0425741245","IDNO":"","LinesData":"서해상에 위치한 고기압의 영향을 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0},
    {"TextData":"최호건","ComboData":"01","ISO":"GBP","Currency":"영국 파운드","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"6405142384211","LinesData":"","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ch.jpg|||||","PassData":"4564","RadioData":"H:1","CheckData":0},
    {"TextData":"이민후","ComboData":"01","ISO":"BSD","Currency":"바하마 달러","IntData":0,"FloatData":0,"DateData":"","PhoneNo":"01022116587","IDNO":"7801221384251","LinkData":"|./rejectCos.do|반려|_self ","LinesData":"전국이 흐리고 오전에 전라남도와 제주도에 비가 그치기 시작해 늦은 오후에는 대부분 지역에서 그치겠으나, 강원영동과 경북북부동해안은 늦은 밤까지 이어지겠습니다.","Userformat":"5552221230","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"","RadioData":"H:1","CheckData":1},
    {"TextData":"김호정","ComboData":"02","ISO":"BHD","Currency":"바레인 디나르","IntData":1120,"FloatData":0,"DateData":"20100922","PhoneNo":"0557256541","IDNO":"8506243051223","LinesData":"전국이 흐리고 새벽에 제주도에 비가 시작되어 오전에 남부지방, 오후에는 전국으로 확대되겠으나, 동풍의 영향을 받는 강원영동은 새벽부터 비가 오겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"75646","RadioData":"M:1","CheckData":0},
    {"TextData":"김호수","ComboData":"01","ISO":"BDT","Currency":"방글라데시 타카","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"","LinkData":"|./rejectCos.do|반려|_self ","LinesData":"전국에 구름이 많은 가운데, 대기불안정으로 전남과 경남내륙, 제주도에는 오후 한때 소나기가 오겠습니다.","Userformat":"8949598981","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"4564","RadioData":"L:1","CheckData":1},
    {"TextData":"오미려","ComboData":"01","ISO":"BBD","Currency":"바베이도스 달러","IntData":190,"FloatData":15.25,"DateData":"20110526","PhoneNo":"0262642080","IDNO":"2118204825","LinesData":"중북부지방은 동해상에 위치한 고기압의 가장자리에 들겠고, 충청이남지방은 장마전선의 영향을 받다가 제 5호 태풍 ‘다나스‘의 영향을 점차 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ru.jpg|||||","PassData":"123456","RadioData":"H:1","CheckData":1},
    {"TextData":"차수식","ComboData":"02","ISO":"BYR","Currency":"벨라루스 루블","IntData":1120,"FloatData":115.25,"DateData":"20100922","PhoneNo":"0261254045","IDNO":"","LinesData":"","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/ko.jpg|||||","PassData":"75646","RadioData":"L:1","CheckData":0},
    {"TextData":"맹인주","ComboData":"01","ISO":"BZD","Currency":"벨리즈 달러","IntData":65,"FloatData":154.36,"DateData":"","PhoneNo":"","IDNO":"1298261319","LinesData":"중북부지방은 동해상에 위치한 고기압의 가장자리에 들겠으나, 충청이남지방은 장마전선의 영향을 점차 받겠습니다.","Userformat":"","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/er.jpg|||||","PassData":"4564","RadioData":"H:1","CheckData":0},
    {"TextData":"전명준","ComboData":"01","ISO":"BMD","Currency":"버뮤다 달러","IntData":190,"FloatData":15.25,"DateData":"20110526","PhoneNo":"022222222","IDNO":"7507142063425","LinesData":"중부지방은 동해상에 위치한 고기압의 가장자리에 들겠으나, 남부지방은 장마전선의 영향을 받겠습니다.","Userformat":"5415554321","ImageData":"|https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/imgs/fe.jpg|||||","PassData":"123456","RadioData":"M:1","CheckData":1}
  ]

  // const data = [
  //   {"sName":"황정열","sMoney":"5000","sPhone":"01015368874","sId":"801221384251","sAddr":"서울","sPostNo":"137765","sCard":"1234123412341234","sCustom":"1012220"},
  //   {"sName":"강대호","sMoney":"4700","sPhone":"021231234","sId":"807151852148","sAddr":"경기","sPostNo":"142571","sCard":"546125847896665","sCustom":"675617"},
  //   {"sName":"김미경","sMoney":"3900","sPhone":"04321525555","sId":"138206820","sAddr":"강원","sPostNo":"570154","sCard":"8547955425411567","sCustom":"4180951"},
  //   {"sName":"김선희","sMoney":"3400","sPhone":"01011112222","sId":"6098204963","sAddr":"경기","sPostNo":"843521","sCard":"1234123412341234","sCustom":"321700"},
  //   {"sName":"최세희","sMoney":"3200","sPhone":"01674856874","sId":"405142384211","sAddr":"경기","sPostNo":"235552","sCard":"4587998856552145","sCustom":"2750801"},
  //   {"sName":"이명희","sMoney":"2900","sPhone":"0101538874","sId":"801221384251","sAddr":"서울","sPostNo":"615252","sCard":"1234123412341234","sCustom":"2571901"},
  //   {"sName":"노효일","sMoney":"2300","sPhone":"0215368874","sId":"506243051223","sAddr":"서울","sPostNo":"736566","sCard":"8585666185411125","sCustom":"1520201"},
  //   {"sName":"원영국","sMoney":"2800","sPhone":"01075116521","sId":"2118204825","sAddr":"경기","sPostNo":"951137","sCard":"7514441556512533","sCustom":"2557001"},
  //   {"sName":"이지선","sMoney":"2400","sPhone":"025815421","sId":"1298261319","sAddr":"서울","sPostNo":"515426","sCard":"6841563125655524","sCustom":"2007501"},
  //   {"sName":"김상도","sMoney":"4000","sPhone":"0425741245","sId":"507142063425","sAddr":"경기","sPostNo":"751123","sCard":"6666555522223333","sCustom":"4290851"}
  // ];

  if (!window.hasOwnProperty('sheetEX')) {
    IBSheet.create({
      id: 'sheetEX',
      el: 'sheetDivEX',
      options: opt,
      data: data
    })
  }

  // setBaseTheme()
  // setBaseTheme(styleContent.querySelector('#sheetDivEX'));

//   const CS1 = styleContent.querySelector('.CS1');
//   if (CS1) {
//     CS1.addEventListener('click', function() {
//       if (customCssEditor) {
//         customCssEditor.setValue(
// `.IBCellBase {
//     font-size: 15px;
//     font-family: 'Malgun Gothic', 'Nanum Gothic', 'Dotum';
//     color: black;
//     border-right: 1px solid transparent !important;
//     border-bottom: 1px solid transparent !important;
// }

// .IBCellHeader {
//     background-color: #fafafb;
//     color: black;
//     font-weight: bold;
//     font-size: 15px;
// }

// .IBHeadLeft, .IBHeadMid, .IBHeadRight {
//     border-bottom: 1px solid #cfd1d6;
//     border-top: 1px solid #cfd1d6;
// }

// tr.IBDataRow:nth-child(odd) {
//     background-color: #dee2e6;
// }

// .IBHeaderRow td.IBCellHeader:nth-child(2) {  
//     background-color: #f4f4f4;
// }`
//           );
//         const styleElem = ensureCustomStyleTag();
//         const newStyle = customCssEditor.getValue();
//         styleElem.textContent = newStyle;
//       }
//     });
//   }

//   const CS2 = styleContent.querySelector('.CS2');
//   if (CS2) {
//     CS2.addEventListener('click', function() {
//       if (customCssEditor) {
//         customCssEditor.setValue(
// `.IBCellBase {
//     font-size: 15px;
//     font-family: 'Malgun Gothic', 'Nanum Gothic', 'Dotum';
//     color: white !important;
//     border-bottom: 1px solid transparent !important;
//     border-right: 1px solid transparent !important;
// }

// .IBCellBase {
//     border-right: 1px solid white;
// }

// .IBCellHeader {
//     background-color: #2f3744;
//     font-weight: bold;
//     font-size: 15px;
// }

// .IBHeadLeft, .IBHeadMid, .IBHeadRight {
//     border-bottom: 1px solid #1f2836;
//     border-top: 1px solid #1f2836;
// }

// .IBHScrollLeft, .IBHScrollMid, .IBHScrollRight {
//     border-bottom: 1px solid #1f2836;
//     border-top: 1px solid #1f2836;
// }

// .IBIndexText {
// 	background-color: #434343 !important;
// }

// .IBDataRow {
//     background-color: #1f2836;
// }

// .IBHeaderRow td.IBCellHeader:nth-child(2) {  
//     background-color: #434343;
// }

// tr.IBDataRow:nth-child(odd) {
//     background-color: #1F354C !important;
// }`
//           );
//         const styleElem = ensureCustomStyleTag();
//         const newStyle = customCssEditor.getValue();
//         styleElem.textContent = newStyle;
//       }
//     });
//   }

//   const CS3 = styleContent.querySelector('.CS3');
//   if (CS3) {
//     CS3.addEventListener('click', function() {
//       if (customCssEditor) {
//         customCssEditor.setValue(
// `.IBCellBase {
//     font-size: 15px;
//     font-family: 'Malgun Gothic', 'Nanum Gothic', 'Dotum';
//     border-bottom: 1px solid #cacaca !important;
//     border-right: 1px solid #cacaca !important;
//     color: black;
// }

// .IBCellHeader {
//     background-color: #fafafb;
//     color: black;
//     font-weight: bold;
//     font-size: 15px;
// }

// .IBHeadLeft, .IBHeadMid, .IBHeadRight {
//     border-bottom: 1px solid #cfd1d6;
//     border-top: 1px solid #cfd1d6;
// }

// .IBHeaderRow td.IBCellHeader:nth-child(2) {
//     background-color: #f4f4f4;
// }`
//           );
//         const styleElem = ensureCustomStyleTag();
//         const newStyle = customCssEditor.getValue();
//         styleElem.textContent = newStyle;
//       }
//     });
//   }

//   const CS4 = styleContent.querySelector('.CS4');
//   if (CS4) {
//     CS4.addEventListener('click', function() {
//       if (customCssEditor) {
//         customCssEditor.setValue(
// `.IBCellBase {
//     font-size: 15px;
//     font-family: 'Malgun Gothic', 'Nanum Gothic', 'Dotum';
//     color: white !important;
//     border-bottom: 1px solid #888888 !important;
//     border-right: 1px solid #888888 !important;
// }

// .IBCellBase {
//     border-right: 1px solid white;
// }

// .IBCellHeader {
//     background-color: #2f3744;
//     font-weight: bold;
//     font-size: 15px;
// }

// .IBHeadLeft, .IBHeadMid, .IBHeadRight {
//     border-bottom: 1px solid #1f2836;
//     border-top: 1px solid #1f2836;
// }

// .IBHScrollLeft, .IBHScrollMid, .IBHScrollRight {
//     border-bottom: 1px solid #1f2836;
//     border-top: 1px solid #1f2836;
// }

// .IBIndexText {
// 	background-color: #434343 !important;
// }

// .IBHeaderRow td.IBCellHeader:nth-child(2) {  
//     background-color: #434343;
// }

// .IBDataRow {
//     background-color: #1f2836;
// }`
//           );
//         const styleElem = ensureCustomStyleTag();
//         const newStyle = customCssEditor.getValue();
//         styleElem.textContent = newStyle;
//       }
//     });
//   }
}