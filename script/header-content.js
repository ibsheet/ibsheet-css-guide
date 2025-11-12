var headerContent = document.getElementById('header-content');
var headerTippyInstances = [];
if (headerContent) {
  // var opt = {
  //   Cfg: {
  //     IgnoreFocused: true,
  //     CanSort: true,
  //     InfoRowConfig: {
  //       Visible: false,
  //     },
  //     HeaderMerge: 5,
  //     Style: 'IBGY',
  //     // NoVScroll: true,
  //     NoDataMessage: 3,
  //     NoDataMiddle: true,
  //   },
  //   // LeftCols: [
  //   // ],
  //   Cols: [
  //     {Header: ["No", "No"], Type: "Int", Width: 100, Align: "Center", Name: "SEQ"},
  //     {Header: [{HeaderCheck: true, Value: '선택'}, '선택'], Type: 'Bool', Width: 70, Align: 'Center', Name: 'chk' },
  //     {Header: ['개인정보', '이름'], Name: 'sName', Type: 'Text', Width: 170, Align: 'Center' },
  //     {Header: ['개인정보', '주민번호'], Name: 'sId', Type: 'Text', Width: 200, Align: 'Center' },
  //     {Header: ['개인정보', '전화번호'], Name: 'sPhone', Type: 'Text', Width: 150, Align: 'Center' },
  //     {Header: ['개인정보', '성별'], Name: 'sGender', Type: 'Text', Width: 100, Align: 'Center' },
  //     {Header: ['내부 업무정보', '부서명'], Name: 'sDept', Type: 'Text', Align: 'Center', Width: 150 },
  //     {Header: ['내부 업무정보', '팀명'], Name: 'sTeam', Type: 'Text', Align: 'Center', Width: 150 },
  //     {Header: ['내부 업무정보', '직급'], Name: 'sPosition', Type: 'Text', Align: 'Center', Width: 150 },
  //     {Header: ['내부 업무정보', '근속기간(년)'], Name: "sPeriod", Type: "Int", Align: "Right", Width: 105},
  //   ]
  // }

  // IBSheet.create({
  //   id: 'sheetHeader',
  //   el: 'sheetDivHeader',
  //   options: opt,
  //   data: []
  // });

  const headerSheetArea = headerContent.querySelector('#sheetDivHeader');
  if (headerSheetArea) {
    const headerInfoAreas = headerContent.querySelectorAll('.infoArea');
    const headerConfigs = [
      {
        title: 'Header 영역',
        placement: 'top',
        customContent: `<div class="guide-content"><h4>Header 영역</h4><p>Header 영역은 시트의 가장 상단에 위치하며, 시트의 제목과 주요 기능 버튼들을 포함하고 있습니다. 이 영역은 사용자가 시트를 쉽게 인식하고, 필요한 기능에 빠르게 접근할 수 있도록 도와줍니다.</p><br><p>HeaderRow, FilterRow, CustromRow중 Head에 설정된 행 정보 등이 Header 영역에 속합니다.</p></p></div>`
      },
    ];
  
    headerConfigs.forEach((config, index) => {
      if (headerInfoAreas[index]) {
        let tp = tippy(headerInfoAreas[index], {
          content: config.customContent,
          placement: config.placement || undefined,
          popperOptions: config.popperOptions ? config.popperOptions : undefined
        });
        headerTippyInstances.push(tp);
      }
    });
  }

  function tipShowClick(tipShow) {
    if (tipShow.textContent == '안내 보기') {
      headerTippyInstances.forEach(instance => {
        if (instance) {
          instance.show();
        }
      });
      tipShow.textContent = '안내 숨기기';
    } else {
      headerTippyInstances.forEach(instance => {
        if (instance) {
          instance.hide();
        }
      });
      tipShow.textContent = '안내 보기';
    }
  }

  const tipShow = headerContent.querySelector('#tipShow');
  if (tipShow) {
    if (!tipShow.classList.contains('oncl')) {
      tipShow.classList.add('oncl');
      tipShow.addEventListener('click', () => {tipShowClick(tipShow);});
    }
  }

  function setTdOpacity(rows, opacity) {
    if (rows && rows.length > 0) {
      rows.forEach(row => {
        const tds = row.querySelectorAll('td');
        if (tds && tds.length > 0) {
          tds.forEach(td => {
            console.log('td.style.opacity :', td.style.opacity);
            if (td.style.opacity !== undefined && td.style.opacity != '') {
              td.style.opacity = opacity;
            }
          });
        } 
      });
    }
  }

  function setRowOpacity(sheetArea, className, opacity) {
    if (sheetArea) {
      const headerRows = sheetArea.querySelectorAll(`.${className}HeaderRow`);
      setTdOpacity(headerRows, opacity);
      const dataRows = sheetArea.querySelectorAll(`.${className}DataRow`);
      setTdOpacity(dataRows, opacity);
    }
  }

  function areaToggleClick(areaToggle) {
    const infoAreas = headerContent.querySelectorAll('.infoArea');
    infoAreas.forEach(area => {
      if (area.classList.contains('infoAreaClear')) {
        area.classList.remove('infoAreaClear');
        areaToggle.textContent = '선택 영역 미표시';
        setRowOpacity(headerSheetArea, `${prefixTheme}`, '0.5');
        setRowOpacity(headerSheetArea, 'IB', '0.5');
      } else {
        area.classList.add('infoAreaClear');
        areaToggle.textContent = '선택 영역 표시';
        setRowOpacity(headerSheetArea, `${prefixTheme}`, '1');
        setRowOpacity(headerSheetArea, 'IB', '1');
      }
    });
  }

  const areaToggle = headerContent.querySelector('#areaToggle');
  if (areaToggle) {
    if (!areaToggle.classList.contains('oncl')) {
      areaToggle.classList.add('oncl');
      areaToggle.addEventListener('click', () => {areaToggleClick(areaToggle);});
    }
  }
}