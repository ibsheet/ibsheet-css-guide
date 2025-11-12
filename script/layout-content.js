var layoutContent = document.getElementById('layout-content');
var layoutTippyInstances = [];
var layoutDriverObj = null;

function layoutSet() {
  layoutDriverObj = driverJs({
    showProgress: true,
    popoverClass: 'popover-center-screen',
    steps: [
      { element: '#layoutInfo1', popover: { title: 'Header 영역', description: 'Header 영역은 시트의 가장 상단에 위치하며, 시트의 제목과 주요 기능 버튼들을 포함하고 있습니다.<br>이 영역은 사용자가 시트를 쉽게 인식하고, 필요한 기능에 빠르게 접근할 수 있도록 도와줍니다.', side: "bottom", align: 'center' }},
      { element: '#layoutInfo2', popover: { title: 'Data 영역', description: 'Data 영역은 시트의 주요 데이터가 표시되는 부분으로, 사용자가 데이터를 보고, 편집하고, 상호작용할 수 있는 공간입니다.<br>이 영역은 시트의 핵심 기능을 수행하며, 다양한 데이터 형식과 스타일을 지원합니다.', side: "right", align: 'center' }},
      { element: '#layoutInfo3', popover: { title: 'Data 영역 중 여백 영역', description: 'Data 영역 중 여백 영역은 시트의 데이터가 표시되는 부분에서, 실제 데이터가 없는 빈 공간을 의미합니다.<br>이 영역은 사용자가 시트를 스크롤하거나 탐색할 때, 시각적인 구분을 제공하며, 데이터가 부족한 경우에도 시트의 구조를 유지하는 역할을 합니다.<br>여백 영역은 사용자가 데이터를 추가하거나 편집할 때, 시트의 레이아웃을 깨뜨리지 않고, 일관된 사용자 경험을 제공합니다.<br>(Cfg) NoDataMessage 설정을 통해, 데이터가 바인딩이 되지 않은 경우에 대한 안내 메시지를 출력하실 수 있습니다.</p><p>(Cfg) NoVScroll 설정을 통해 여백 영역이 출력되지 않도록 제어하실 수 있습니다.', side: "right", align: 'center' }},
      { element: '#layoutInfo4', popover: { title: 'Footer 영역', description: 'Footer 영역은 시트의 가장 하단에 위치하며, 시트의 상태 정보 및 추가 기능 버튼들을 포함하고 있습니다.<br>이 영역은 사용자가 시트의 전체적인 정보를 파악하고, 필요한 작업을 수행할 수 있도록 도와줍니다.', side: "top", align: 'center' }},
      { element: '#layoutInfo5', popover: { title: 'InfoRow', description: 'InfoRow는 시트의 상단 또는 하단에 위치할 수 있는 특별한 행으로, 시트에 대한 추가 정보를 제공하거나, 특정 기능(페이지네이션 등)을 수행하는 데 사용됩니다. InfoRow는 일반 데이터 행과 구분되며, 시트의 상태나 요약 정보를 표시하는 데 유용합니다.<br>InfoRow는 Cfg의 InfoRowConfig 설정을 통해 출력 위치(Space)와 표시할 항목(Layout)을 지정할 수 있습니다.', side: "top", align: 'center' }}

    ]
  });
  layoutDriverObj.drive();
}

if (layoutContent) {
  const layoutSheetArea = layoutContent.querySelector('#sheetDiv0');
  if (layoutSheetArea) {
    const layoutInfoAreas = layoutContent.querySelectorAll('.infoArea');
    const layoutConfigs = [
      {
        title: 'Header 영역',
        placement: 'top',
        customContent: `<div class="guide-content"><h4>Header 영역</h4><p>Header 영역은 시트의 가장 상단에 위치하며, 시트의 제목과 주요 기능 버튼들을 포함하고 있습니다. 이 영역은 사용자가 시트를 쉽게 인식하고, 필요한 기능에 빠르게 접근할 수 있도록 도와줍니다.</p><br><p>HeaderRow, FilterRow, CustromRow중 Head에 설정된 행 정보 등이 Header 영역에 속합니다.</p></p></div>`
      },
      {
        title: 'Data 영역',
        placement: 'left',
        customContent: `<div class="guide-content"><h4>Data 영역</h4><p>Data 영역은 시트의 주요 데이터가 표시되는 부분으로, 사용자가 데이터를 보고, 편집하고, 상호작용할 수 있는 공간입니다. 이 영역은 시트의 핵심 기능을 수행하며, 다양한 데이터 형식과 스타일을 지원합니다.</p><p>Data 영역은 실제 데이터가 표시되는 행들로 구성되어 있으며, 사용자는 이 영역에서 데이터를 직접 편집하거나 선택할 수 있습니다.</p></div>`
      },
      {
        title: 'Data 영역 중 여백 영역',
        placement: 'right',
        customContent: `<div class="guide-content"><h4>Data 영역 중 여백 영역</h4><p>Data 영역 중 여백 영역은 시트의 데이터가 표시되는 부분에서, 실제 데이터가 없는 빈 공간을 의미합니다. 이 영역은 사용자가 시트를 스크롤하거나 탐색할 때, 시각적인 구분을 제공하며, 데이터가 부족한 경우에도 시트의 구조를 유지하는 역할을 합니다.</p><p>여백 영역은 사용자가 데이터를 추가하거나 편집할 때, 시트의 레이아웃을 깨뜨리지 않고, 일관된 사용자 경험을 제공합니다.</p><br><p>(Cfg) NoDataMessage 설정을 통해, 데이터가 바인딩이 되지 않은 경우에 대한 안내 메시지를 출력하실 수 있습니다.</p><p>(Cfg) NoVScroll 설정을 통해 여백 영역이 출력되지 않도록 제어하실 수 있습니다.</p></div>`,
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [0, -400] }
            }
          ]
        }
      },
      {
        title: 'Bottom 영역',
        placement: 'left',
        customContent: `<div class="guide-content"><h4>Bottom 영역</h4><p>Bottom 영역은 시트의 가장 하단에 위치하며, 주로 FormulaRow를 출력합니다.</p></div>`
      },
      {
        title: 'InfoRow',
        placement: 'bottom',
        customContent: `<div class="guide-content"><h4>InfoRow</h4><p>InfoRow는 시트의 상단 또는 하단에 위치할 수 있는 특별한 행으로, 시트에 대한 추가 정보를 제공하거나, 특정 기능(페이지네이션 등)을 수행하는 데 사용됩니다. InfoRow는 일반 데이터 행과 구분되며, 시트의 상태나 요약 정보를 표시하는 데 유용합니다.</p><br><p>InfoRow는 Cfg의 InfoRowConfig 설정을 통해 출력 위치(Space)와 표시할 항목(Layout)을 지정할 수 있습니다.</p></div>`
      }
    ];
  
    layoutConfigs.forEach((config, index) => {
      if (layoutInfoAreas[index]) {
        let tp = tippy(layoutInfoAreas[index], {
          content: config.customContent,
          placement: config.placement || undefined,
          popperOptions: config.popperOptions ? config.popperOptions : undefined
        });
        layoutTippyInstances.push(tp);
      }
    });
  }

  function tipShowClick(tipShow) {
    if (tipShow.textContent == '안내 보기') {
      layoutTippyInstances.forEach(instance => {
        if (instance) {
          instance.show();
        }
      });
      tipShow.textContent = '안내 숨기기';
    } else {
      layoutTippyInstances.forEach(instance => {
        if (instance) {
          instance.hide();
        }
      });
      tipShow.textContent = '안내 보기';
    }
  }

  const tipShow = layoutContent.querySelector('#tipShow');
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
            if (td.style.opacity !== undefined && td.style.opacity != '') {
              td.style.opacity = opacity;
            }
          });
        } 
      });
    }
  }

  function setAllTrTdOpacity(opacity) {
    const allTrs = layoutSheetArea.querySelectorAll('tr');
    if (allTrs && allTrs.length > 0) {
      allTrs.forEach(tr => {
        if (tr.style.opacity !== undefined && tr.style.opacity != '') {
          tr.style.opacity = opacity;
        }
      });
    }
    const allTds = layoutSheetArea.querySelectorAll('td');
    if (allTds && allTds.length > 0) {
      allTds.forEach(td => {
        if (td.style.opacity !== undefined && td.style.opacity != '') {
          td.style.opacity = opacity;
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
      setAllTrTdOpacity(opacity);
    }
  }

  function areaToggleClick(areaToggle) {
    const infoAreas = layoutContent.querySelectorAll('.infoArea');
    infoAreas.forEach(area => {
      if (area.classList.contains('infoAreaClear')) {
        area.classList.remove('infoAreaClear');
        areaToggle.textContent = '선택 영역 미표시';
        setRowOpacity(layoutSheetArea, `${prefixTheme}`, '0.5');
        setRowOpacity(layoutSheetArea, 'IB', '0.5');
      } else {
        area.classList.add('infoAreaClear');
        areaToggle.textContent = '선택 영역 표시';
        setRowOpacity(layoutSheetArea, `${prefixTheme}`, '1');
        setRowOpacity(layoutSheetArea, 'IB', '1');
      }
    });
  }

  const areaToggle = layoutContent.querySelector('#areaToggle');
  if (areaToggle) {
    if (!areaToggle.classList.contains('oncl')) {
      areaToggle.classList.add('oncl');
      areaToggle.addEventListener('click', () => {areaToggleClick(areaToggle);});
    }
  }

  // if (layoutContent && layoutDriverObj) {

  // }
  if (layoutContent && layoutContent.classList.contains('active')) layoutSet();
}
