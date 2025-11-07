var type2Content = document.getElementById('type2-content');

function type2ClickSetting(theme) {
  // console.log('type2ClickSetting called');
  let style = theme ? theme : `${prefixTheme}`;
  // console.log('style:', style);

  document.body.addEventListener('click', e => {
    if (!type2Content || !type2Content.contains(e.target)) {
      return;
    }

    const tabType2Tag0 = type2Content.querySelector('#tabType2Tag0');

    const timepickerRight = type2Content.getElementsByClassName(`${style}TimePickerRight ${style}Cell`);

    // console.log('e.target:', e.target);

    if (timepickerRight && timepickerRight.length > 0) {
      if (e.target == timepickerRight[0]) {
        if (tabType2Tag0) {
          tabType2Tag0.style.display = 'block';
        }
      } else {
        if (tabType2Tag0) {
          tabType2Tag0.style.display = 'none';
        }
      }
    }
  });
}

if (type2Content) {
  // var opt = {
  //   //공통기능 설정 부분
  //   "Cfg": {
  //     "SearchMode": 2,
  //     "HeaderMerge": 3,
  //     "MessageWidth": 300,
  //     IgnoreFocused: true,
  //     InfoRowConfig: {
  //       Visible: false
  //     },
  //     Style: 'IBGY',
  //     CanSort: false,
  //   },
  //   "Def": {
  //     "Row": {
  //       "CanFormula": true
  //     }
  //   },
  //   //틀고정 좌측 컬럼 설정
  //   "LeftCols": [
  //     {"Type": "Int","Width": 50,"Align": "Center","Name": "SEQ"}
  //   ],
  //   //중앙(메인) 컬럼 설정
  //   "Cols": [
  //     {Header: 'File', Type: 'File', Name: 'lblist', MinWidth: 300, RelWidth: 1},
  //     {Header: 'TimePicker', Type: 'Date', Name: 'timeData', Format: 'HH:mm:ss', TimePicker: true, MinWidth: 200, RelWidth: 1}
  //   ],
  //   Events: {
  //     onRenderFirstFinish: function(evt) {
  //       evt.sheet.loadSearchData(data);
  //       // evt.sheet.setTheme('IB');
  //     }
  //   }
  // }

  // var data = [
  //   {"lblist": "seoul_gangnamgu_library.xlsx", "lblistPath": "https://api.ibsheet.com/ibsheet/v8/samples/customer/files/gangnamgu/", "timeData": '14:30:45'}, 
  //   {}
  // ];

  // IBSheet.create({
  //   id: 'sheetType2',
  //   el: 'sheetDivType2',
  //   options: opt,
  // });

  type2ClickSetting();

  function areaToggleClick(areaToggle) {
    const infoAreas = type2Content.querySelectorAll('.infoArea');
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

  const areaToggle = type2Content.querySelector('#areaToggle');
  if (areaToggle) {
    if (!areaToggle.classList.contains('oncl')) {
      areaToggle.classList.add('oncl');
      areaToggle.addEventListener('click', () => {areaToggleClick(areaToggle);});
    }
  }
}