var focusContent = document.getElementById('focus-content');
var focusTippyInstances = [];
if (focusContent) {
  // let opt = {
  //   Cfg: {
  //     Style: 'IBGY',
  //     IgnoreFocused: true,
  //     InfoRowConfig: {
  //       Visible: false,
  //     },
  //     NoVScroll: true,
  //     ShowFilter: true,
  //     CanSort: false,
  //   },
  //   Cols: [
  //     {"Header": "No","Type": "Int","Width": 50,"Align": "Center","Name": "SEQ","CanMove": 0,"CanFocus": 0},
  //     {"Header": "선택1","Type": "Bool","Name": "CHK","Width": "50","Align": "Center","CanEdit": 1},
  //     {"Header": "선택2","Type": "Bool","Name": "CHK1","Width": "50","Align": "Center","CanEdit": 1},
  //     {"Header": "선택3","Type": "Bool","Name": "CHK2","Width": "50","Align": "Center","CanEdit": 1},
  //     {"Header": "대차계약번호","Type": "Text","Name": "CONTRACTNO","Width": "150","Align": "Center","CanEdit": 0},
  //     {"Header": "대차지점","Type": "Text","Name": "DELIVERYDEPTNAME","Width": "150","Align": "Center","CanEdit": 0,"TextColor": "BLUE"},
  //     {"Header": "차량번호","Type": "Text","Name": "CARNO","Width": "120","Align": "Center","CanEdit": 1,"Tip": 1},
  //     {"Header": "차명(FULL차명)","Type": "Text","Name": "CARNAMEMSTNAME","Width": "210","Align": "Left","CanEdit": 1,"Suggest": "|싼타페 현대|포터2 현대|그랜저 현대|카니발 기아|더_뉴_아반떼 현대|쏘렌토 기아|봉고3_트럭_기아|모닝 기아|그랜드_스타렉스 현대|쏘나타_뉴_라이즈 현대|K5 기아|투싼 현대|티볼리 쌍용|렉스턴_스포츠 쌍용|스파크 GM|QM6 르노삼성|K7 기아|K3 기아|스포티지 기아|E-class BENZ|코나_electric 현대|G80 현대|코나 현대|그랜저_hybrid 현대|레이 기아|SM6 르노삼성|니로_(하이브리드) 기아|말리부 GM|G70 현대|CLS BENZ|ES 렉서스|G4_렉스턴 쌍용|스토닉 기아|트랙스 GM|GLC BENZ|K9 기아|Camry 토요타|K7_하이브리드 기아|Accord 혼다|EQ900 현대|Tiguan 폭스바겐|3-series BMW|Passat 폭스바겐|QM3 르노삼성|5-series BMW|모하비 기아|SM5 르노삼성|Explorer FORD|아이오닉_hybrid 현대|니로_EV_(전기차) 기아|엑센트 현대|A4 아우디|SM3 르노삼성|GLE BENZ|K5 하이브리드 기아|쏘나타_뉴_라이즈_hybrid 현대|라보 GM|스팅어 기아|Altima 닛산|SM7 르노삼성|GLA BENZ|Passat GT 폭스바겐|클리오 르노삼성|다마스 GM|코란도_C 싸용|XC60 볼보|i30 현대|Hatch MINI|All_New_Avalon 닛산|Panamera 포르쉐|Discovery_Sport 랜드로버|Prius 토요타|이쿼녹스 GM|K3_GT 기아|임팔라 GM|RX 렉서스|코란도_투리스모 쌍용|RAV4 토요타|벨로스터 현대|아이오닉_electric 현대|Clubman MINI|New_Cherokee 지프|NX 렉서스|All_New_Wrangler 지프|XC90 볼보|넥쏘 현대|A6 아우디|7-series BMW|X1 BMW|Renegade 지프|S-class BENZ|트위지 르노삼성|Discovery 랜드로버|Grand_Cherokee 지프|CT6 캐딜락|4-series BMW|GLS BENZ|Grand_C4_Picasso 씨트로앵|All_New_Compass 지프|X5 BMW|CLA BENZ|Prius_C 토요타|Countryman MINI|New_Range_Rover 랜드로버|MKX 링컨|X3 BMW|X6 BMW|Range_Rover_Velar 랜드로버|S90 볼보|벨로스터-N 현대|6-series BMW|MKZ 링컨|Odyssey 혼다|C-class BENZ|V40_Cross_Country 볼보|Q30 인피니티|CT 렉서스|Continental 링컨|XC40 볼보|E-Pace 재규어|M BMW|1-series BMW|Ghibli 마세라티|V90_Cross_Country 폴보|X4 BMW|LS 렉서스|Mustang FORD|New_Range_Rover_Sport 랜드로버|Levante 마세라티|니로_플러그인_하이브리드 기아|쏠라티 현대|5008 푸조|New_Sienna 토요타|XE 재규어|SM3_Z.E. 르노삼성|718_Boxster 포르쉐|Macan 포르쉐|Range_Rover_Evoque 랜드로버|QX60 인피니티|CTS 캐딜락|Q50 인피니티|i40 현대|Maxima 닛산|쏘울 기아|911 포르쉐|MKC 링컨|XT5 캐딜락|508 푸조|Mondeo FORD|Quattroporte 마세라티|XF 재규어|XJ 재규어|Q70 인피니티|308 푸조|카마로_SS GM|C4_Cactus 씨트로앵|마스터 르노|맥스크루즈 현대|Taurus FORD|Convertible MINI|ATS 캐딜락|DS3 씨트로앵|캡티바 GM|Kuga FORD|X2 BMW|Escalade 캐딜락|쏘나타_뉴라이즈plug-in 현대|볼트(플러그인하이브리드) GM|F-Type 재규어|Ghost_Series II 롤스로이스|아베오 아베오|718 Cayman 718 Cayman|Prius_Prime 토요타|New_i3 BMW|Pathfinder 닛산|B-class BENZ|F-Pace 재규어|Q60 인피니티|Arteon 폭스바겐|코란도_스포츠 쌍용|C4_Picasso 씨트로앵|Murano Murano|SL BENZ|볼트EV(전기차) GM|ES 렉서스|A-class BENZ|3008 푸조|크루즈 GM|Huracan 람보르니기|208 푸조|투싼(2017) 현대|SLC BENZ|Cherokee 지프|Civic 혼다|370Z 닛산|IS 렉서스|Wraith 롤스로이스|CLS BENZ|Grancabrio 마세라티|Phantom 롤스로이스|AMG GT BENZ|Dawn 롤스로이스|Pilot 혼다","SuggestType": "Start,Empty,Complete"},
  //     {"Header": {"Value": "24시간기본요금\n포커스 불가 열","TextColor": "RED"},"Type": "Float","Name": "RENTFEE","Width": "120","Align": "Right","CanEmpty": 1,"Format": ",#.##","CanFocus": 0,"Color": "#FFEEEE"},
  //     {"Header": "출고일자","Type": "Date","Name": "RENTDATE","Width": "100","Align": "Center","Format": "yyyy/MM/dd","DataFormat": "yyyyMMdd","CanEdit": 0},
  //     {"Header": "순매출","Type": "Int","FormulaRow": "Sum","Name": "NETSALEAMT","Width": "100","Align": "Right","Format": "#,##0","CanEdit": 0},
  //     {"Header": "부가세","Type": "Int","FormulaRow": "Sum","Name": "SALEVATAMT","Width": "100","Align": "Right","Format": "#,##0","CanEdit": 0},
  //     {"Header": "총매출","Type": "Int","FormulaRow": "Sum","Name": "SALEAMT","Width": "100","Align": "Right","Format": "#,##0","CanEdit": 0},
  //   ],
  //   Events: {
  //     onRenderFirstFinish: function (evtParam) {
  //       evtParam.sheet.loadSearchData(data);
  //     }
  //   }
  // }

  // const data = [
  //   {"NO":"001","CARNAMEMSTNAME2":"K5렌터카 2000 LPI 스마트 AT LPG","RETURNDATE":"20120109","ACCNO":"201112171742","REPAIRNO":"","DISCOUNTRATE":"60","OBJCONTRACTNO":"LS1410101163627","CONTRACTNO":"ss1180111242361","RENTFEE":"165000.123","OBJCARNO":"63허6557","CARNO":"56허9740","ACCPERSONNAME":"박수호","DATA_KEY":"1","CARNAMEMSTNAME":"소나타 Y20 렌터카 2000 LPI Luxury AT LPG","RENTDATE":"20111217","UNIT24":"165000","TERMTYPE":"S","NETSALEAMT":"877091","ENDDATE":"","ISTATUS":"1","DELIVERYDEPTNAME":"천안아산지점","SALEVATAMT":"87709","REPAIRPERSONNAME":"","PROMOCODE":"수리대차","TERMTYPE2":"L","DEPTNAME":"부천지점","ACCDATE":"20111217","SALEAMT":"964800","STARTDATE":""},
  //   {"NO":"002","CARNAMEMSTNAME2":"투싼 ix 4WD 2000 E-VGT X20 Luxury AT 디젤","RETURNDATE":"20120104","ACCNO":"201112191858","REPAIRNO":"","DISCOUNTRATE":"60","OBJCONTRACTNO":"LE1240100353144","CONTRACTNO":"SS1476111242830","RENTFEE":"199000","OBJCARNO":"16허7603","CARNO":"26허6321","ACCPERSONNAME":"김대윤","DATA_KEY":"2","CARNAMEMSTNAME":"","RENTDATE":"20111219","UNIT24":"190000","TERMTYPE":"S","NETSALEAMT":"795927","ENDDATE":"","ISTATUS":"1","DELIVERYDEPTNAME":"MT기획팀","SALEVATAMT":"79593","REPAIRPERSONNAME":"","PROMOCODE":"사고대차","TERMTYPE2":"L","DEPTNAME":"대구지점(동대구역)","ACCDATE":"20111219","SALEAMT":"875520","STARTDATE":""},
  //   {"NO":"003","CARNAMEMSTNAME2":"NEW 다마스코치 800 LPG 5P DLX MT LPG","RETURNDATE":"20120105","ACCNO":"201112212217","REPAIRNO":"","DISCOUNTRATE":"60","OBJCONTRACTNO":"LS1470080525542","CONTRACTNO":"SS1903111243975","RENTFEE":"99000","OBJCARNO":"72허6161","CARNO":"41허2835","ACCPERSONNAME":"김현철","DATA_KEY":"3","CARNAMEMSTNAME":"뉴프라이드 1400 DOHC LX AT 휘발유/LPG","RENTDATE":"20111221","UNIT24":"0","TERMTYPE":"S","NETSALEAMT":"347458","ENDDATE":"","ISTATUS":"1","DELIVERYDEPTNAME":"구로현주예약소","SALEVATAMT":"34746","REPAIRPERSONNAME":"","PROMOCODE":"리스대차","TERMTYPE2":"L","DEPTNAME":"SU6팀","ACCDATE":"20111221","SALEAMT":"382204","STARTDATE":""},
  //   {"NO":"004","CARNAMEMSTNAME2":"뉴카렌스 2000 LPI GX 최고급형 AT LPG","RETURNDATE":"20120102","ACCNO":"201111232662","REPAIRNO":"","DISCOUNTRATE":"0","OBJCONTRACTNO":"LS1100091147985","CONTRACTNO":"","RENTFEE":"165000","OBJCARNO":"04허2246","CARNO":"62허5910","ACCPERSONNAME":"윤원재","DATA_KEY":"4","CARNAMEMSTNAME":"소나타 Y20 렌터카 2000 LPI Luxury AT LPG","RENTDATE":"20111123","UNIT24":"165000","TERMTYPE":"M","NETSALEAMT":"288970","ENDDATE":"","ISTATUS":"1","DELIVERYDEPTNAME":"포커스 불가 행","SALEVATAMT":"28897","REPAIRPERSONNAME":"","PROMOCODE":"리스대차","TERMTYPE2":"L","DEPTNAME":"인천지점","ACCDATE":"20111123","SALEAMT":"317867","STARTDATE":"","CanFocus":0,"Color":"#FFEEEE","DELIVERYDEPTNAMETextColor":"#FF0000"},
  //   {"NO":"005","CARNAMEMSTNAME2":"체어맨 W 3600 XGi CW 700 Luxury AT 휘발유","RETURNDATE":"20120104","ACCNO":"201112101052","REPAIRNO":"","DISCOUNTRATE":"60","OBJCONTRACTNO":"LS1340100455093","CONTRACTNO":"SS1944111234933","RENTFEE":"292000","OBJCARNO":"27허7417","CARNO":"52허5711","ACCPERSONNAME":"박수호","DATA_KEY":"5","CARNAMEMSTNAME":"5G 그랜져 3000 LPI HG300 렌터카 Prime AT LPG","RENTDATE":"20111210","UNIT24":"447000","TERMTYPE":"S","NETSALEAMT":"1338182","ENDDATE":"","ISTATUS":"1","DELIVERYDEPTNAME":"대전태화예약소","SALEVATAMT":"133818","REPAIRPERSONNAME":"","PROMOCODE":"수리대차","TERMTYPE2":"L","DEPTNAME":"거제지점","ACCDATE":"20111210","SALEAMT":"1472000","STARTDATE":""},{"NO":"006","CARNAMEMSTNAME2":"액티언스포츠 2000 XVT AX7(4WD) PASSION AT 디젤","RETURNDATE":"20120105","ACCNO":"","REPAIRNO":"","DISCOUNTRATE":"50","OBJCONTRACTNO":"","CONTRACTNO":"SS1926111237887","RENTFEE":"199000","OBJCARNO":"86수8594","CARNO":"32허5870","ACCPERSONNAME":"","DATA_KEY":"6","CARNAMEMSTNAME":"SORENTO R 2WD 2200 E-VGT TLX 고급형 AT 디젤","RENTDATE":"20111212","UNIT24":"190000","TERMTYPE":"S","NETSALEAMT":"1702273","ENDDATE":"","ISTATUS":"1","DELIVERYDEPTNAME":"익산신동예약소","SALEVATAMT":"170227","REPAIRPERSONNAME":"","PROMOCODE":"리스대차","TERMTYPE2":"","DEPTNAME":"AJ캐피탈","ACCDATE":"","SALEAMT":"1872500","STARTDATE":""},{"NO":"007","CARNAMEMSTNAME2":"New SM5  2000 CVTC Ⅱ SE AT 휘발유","RETURNDATE":"20120107","ACCNO":"201112090956","REPAIRNO":"","DISCOUNTRATE":"60","OBJCONTRACTNO":"LS1450100353394","CONTRACTNO":"SS1240111237791","RENTFEE":"160000","OBJCARNO":"04허3223","CARNO":"68허3128","ACCPERSONNAME":"박수호","DATA_KEY":"7","CARNAMEMSTNAME":"New SM5  2000 CVTC Ⅱ XE AT 휘발유","RENTDATE":"20111215","UNIT24":"160000","TERMTYPE":"S","NETSALEAMT":"773818","ENDDATE":"","ISTATUS":"1","DELIVERYDEPTNAME":"대구지점(동대구역)","SALEVATAMT":"77382","REPAIRPERSONNAME":"","PROMOCODE":"사고대차","TERMTYPE2":"L","DEPTNAME":"영업2팀","ACCDATE":"20111209","SALEAMT":"851200","STARTDATE":""}
  // ];

  // IBSheet.create({
  //   id: 'sheet6',
  //   el: 'sheetDiv6',
  //   options: opt
  // })

  const tabFocusCursorTag = document.getElementsByClassName('tabFocusCursorTag');
  const tabFocusDivTag = document.getElementsByClassName('tabFocusDivTag');

  if (tabFocusCursorTag && tabFocusCursorTag.length > 0) {
    if (tabFocusCursorTag[0]) {
      tabFocusCursorTag[0].style.display = 'block';
    }
  }

  document.body.addEventListener('click', e => {
    if (!focusContent || !focusContent.contains(e.target)) {
      return;
    }
  
    const isTargetFilter = 
      e.target &&
      e.target.nodeType === 1 &&
      e.target.classList.contains(`${prefixTheme}Filter0Value`) &&
      e.target.classList.contains(`${prefixTheme}CellFilter`);
  
    function divTagHide() {
      Array.from(tabFocusDivTag).forEach(element => {
        element.style.display = 'none';
      });
    }
    function divTagTagHide() {
      Array.from(tabFocusCursorTag).forEach(element => {
        element.style.display = 'none';
      });
    }
  
    const isTargetIBEditText =
      e.target &&
      e.target.nodeType === 1 &&
      Array.from(e.target.classList).some(cn => cn === `${prefixTheme}EditText`);
  
    const isTargetTabFocusDiv = Array.from(tabFocusDivTag).some(element => element.contains(e.target));
    
    if (!isTargetIBEditText && !isTargetTabFocusDiv) {
      divTagHide();
      divTagTagHide();
      if (tabFocusCursorTag && tabFocusCursorTag.length > 0) {
        tabFocusCursorTag[0].style.display = 'block';
      }
  
      if (isTargetFilter) {
        const tabFilterTag = focusContent.querySelectorAll(`[class*="${prefixTheme}Filter0Value"][class*="${prefixTheme}CellFilter"]`);
        if (e.target == tabFilterTag[6]) {
          const tabFocusTag = document.getElementById('tabFocusTag1');
          if (tabFocusTag) {
            tabFocusTag.style.display = 'block';
          }
        } 
        // else if (e.target == tabFilterTag[8]) {
        //   const tabFocusTag = document.getElementById('tabFocusTag2');
        //   if (tabFocusTag) {
        //     tabFocusTag.style.display = 'block';
        //   }
        // }
        else if (e.target == tabFilterTag[9]) {
          const tabFocusTag = document.getElementById('tabFocusTag3');
          if (tabFocusTag) {
            tabFocusTag.style.display = 'block';
          }
        }
      }
  
    }
  });
      
  document.body.addEventListener('dblclick', e => {
    if (!focusContent || !focusContent.contains(e.target)) {
      return;
    }
  
    function divTagHide() {
      Array.from(tabFocusDivTag).forEach(element => {
        element.style.display = 'none';
      });
    }
    function divTagTagHide() {
      Array.from(tabFocusCursorTag).forEach(element => {
        element.style.display = 'none';
      });
    }
  
    const isTargetFocusedCell =
      e.target &&
      e.target.nodeType === 1 &&
      Array.from(e.target.classList).some(cn => cn === `${prefixTheme}ClassFocusedCell`);
      
    if (isTargetFocusedCell) {
      divTagTagHide();
      divTagHide();
      if (tabFocusCursorTag && tabFocusCursorTag.length > 0) {
        if (tabFocusCursorTag[1]) {
          tabFocusCursorTag[1].style.display = 'block';
        }
      }
      const tabFocusTag = document.getElementById('tabFocusTag0');
      if (tabFocusTag) {
        tabFocusTag.style.display = 'block';
      }
    }
  });

  const focusSheetArea = focusContent.querySelector('#sheetDiv6');
  if (focusSheetArea) {
    const focusSheetInfoAreas = focusSheetArea.querySelectorAll('.infoArea');
    const focusConfigs = [
      { 
        title: `.${prefixTheme}BoolX`, 
        description: 'Bool Type의 컬럼의 필터행에서 아무 조건도 선택되지 않을 때 출력되는 아이콘', 
        classes: `.${prefixTheme}BoolX, .${prefixTheme}BoolXRO`,
        placement: 'left'
      },
      { 
        title: `.${prefixTheme}Bool0`, 
        description: 'Bool Type의 컬럼의 필터행에서 선택되지 않은 값들에 대한 필터링 사용 시 출력되는 아이콘', 
        classes: `.${prefixTheme}Bool0, .${prefixTheme}Bool0RO`,
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [0, -10] }
            }
          ]
        }
      },
      { 
        title: `.${prefixTheme}Bool1`, 
        description: 'Bool Type의 컬럼의 필터행에서 선택된 값들에 대한 필터링 사용 시 출력되는 아이콘', 
        classes: `.${prefixTheme}Bool1, .${prefixTheme}Bool1RO`,
        placement: 'top'
      },
      { 
        title: `.${prefixTheme}Filter0Left`, 
        description: '문자형 컬럼에서 사용되는 필터행, 아이콘을 클릭하여 필터 조건을 선택할 수 있습니다.', 
        classes: `.${prefixTheme}Filter0Left, .${prefixTheme}Filter0Right, .${prefixTheme}Filter0Menu`,
        placement: 'top',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [-100, 0] }
            }
          ]
        }
      },
      { 
        title: `.${prefixTheme}Filter0Left`, 
        description: '숫자형 컬럼에서 사용되는 필터행. 아이콘을 클릭하여 필터 조건을 선택할 수 있습니다.', 
        classes: `.${prefixTheme}Filter0Left, .${prefixTheme}Filter0Right, .${prefixTheme}Filter0Menu`,
        placement: 'top'
      },
      { 
        title: `.${prefixTheme}ClassFocusedCell`, 
        description: '포커스 된 셀에 적용 되는 Class. 영역을 더블 클릭하여 EditMode 활성화 시 설정된 Suggest기능을 확인하실 수 있습니다.', 
        classes: `.${prefixTheme}ClassFocusedCell, .${prefixTheme}ClassFocusedCell *`,
        placement: 'right',
      },
      { 
        title: `.${prefixTheme}ClassNoFocus`, 
        description: 'CanFocus: 0인 영역에 적용 되는 Class', 
        classes: `.${prefixTheme}ClassNoFocus`
      },
      { 
        title: `.${prefixTheme}ClassReadOnly`, 
        description: 'CanEdit: 0인 영역에 적용 되는 Class<br>(Cfg) ColorState의 영향을 받으며, 설정에 따라 .IBColorReadOnly의 영향을 받습니다.', 
        classes: [{selector: `.${prefixTheme}ClassReadOnly`}, {selector: `.${prefixTheme}ColorReadOnly`}],
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [50, 30] }
            }
          ]
        }
      },
      { 
        title: 'HoverCell', 
        description: 'Hover된 셀에 inline으로 .IBColorHoveredCell의 배경색이 적용됩니다.', 
        classes: `.${prefixTheme}ColorHoveredCell`,
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [200, 0] }
            }
          ]
        }
      },
      { 
        title: `.${prefixTheme}FormulaRow`, 
        description: 'Formula행에 적용 되는 Class', 
        classes: `.${prefixTheme}FormulaRow, .${prefixTheme}FormulaRow *`,
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [200, 0] }
            }
          ]
        }
      },
      { 
        title: `.${prefixTheme}FocusRowBackground`, 
        description: 'Focus 된 행에 출력되는 Class', 
        classes: `.${prefixTheme}FocusRowBackground`,
        placement: 'left',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [100, 100] }
            }
          ]
        }
      },
      { 
        title: `.${prefixTheme}HoverRowBackground`, 
        description: '마우스가 Hover된 행에 출력되는 Class', 
        classes: `.${prefixTheme}HoverRowBackground`,
        placement: 'bottom',
        popperOptions: {
          modifiers: [
            { 
              name: 'offset',
              options: { offset: [-500, 20] }
            }
          ]
        }
      }
    ];

    focusConfigs.forEach((config, index) => {
      if (focusSheetInfoAreas[index]) {
        const tp = tippy(focusSheetInfoAreas[index], {
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
        focusTippyInstances.push(tp);
      }
    });
  }
  
  // 탭별 tippy 설정
  const focusTab1Area = focusContent.querySelector('#tabFocusTag1');
  if (focusTab1Area) {
    const focusTab1InfoAreas = focusTab1Area.querySelectorAll('.infoArea');
    const tab1Configs = [
      { title: `.${prefixTheme}Filter0Menu`, description: '필터링 사용안함에 적용 되는 Class', classes: `.${prefixTheme}Filter0Left, .${prefixTheme}Filter0Right, .${prefixTheme}Filter0Menu` },
      { title: `.${prefixTheme}Filter1Menu`, description: '필터링 같음에 적용 되는 Class', classes: `.${prefixTheme}Filter1Left, .${prefixTheme}Filter1Right, .${prefixTheme}Filter1Menu` },
      { title: `.${prefixTheme}Filter2Menu`, description: '필터링 같지 않음에 적용 되는 Class', classes: `.${prefixTheme}Filter2Left, .${prefixTheme}Filter2Right, .${prefixTheme}Filter2Menu` },
      { title: `.${prefixTheme}Filter7Menu`, description: '필터링 단어로 시작함에 적용 되는 Class', classes: `.${prefixTheme}Filter7Left, .${prefixTheme}Filter7Right, .${prefixTheme}Filter7Menu` },
      { title: `.${prefixTheme}Filter8Menu`, description: '필터링 단어로 시작하지 않음에 적용 되는 Class', classes: `.${prefixTheme}Filter8Left, .${prefixTheme}Filter8Right, .${prefixTheme}Filter8Menu` },
      { title: `.${prefixTheme}Filter9Menu`, description: '필터링 단어로 끝남에 적용 되는 Class', classes: `.${prefixTheme}Filter9Left, .${prefixTheme}Filter9Right, .${prefixTheme}Filter9Menu` },
      { title: `.${prefixTheme}Filter10Menu`, description: '필터링 단어로 끝나지 않음에 적용 되는 Class', classes: `.${prefixTheme}Filter10Left, .${prefixTheme}Filter10Right, .${prefixTheme}Filter10Menu` },
      { title: `.${prefixTheme}Filter11Menu`, description: '필터링 포함함에 적용 되는 Class', classes: `.${prefixTheme}Filter11Left, .${prefixTheme}Filter11Right, .${prefixTheme}Filter11Menu` },
      { title: `.${prefixTheme}Filter12Menu`, description: '필터링 포함하지 않음에 적용 되는 Class', classes: `.${prefixTheme}Filter12Left, .${prefixTheme}Filter12Right, .${prefixTheme}Filter12Menu` },
      { title: `.${prefixTheme}Filter14Menu`, description: '필터링 값 있음에 적용 되는 Class', classes: `.${prefixTheme}Filter14Left, .${prefixTheme}Filter14Right, .${prefixTheme}Filter14Menu` },
      { title: `.${prefixTheme}Filter15Menu`, description: '필터링 값 없음에 적용 되는 Class', classes: `.${prefixTheme}Filter15Left, .${prefixTheme}Filter15Right, .${prefixTheme}Filter15Menu` }
    ];
    
    tab1Configs.forEach((config, index) => {
      if (focusTab1InfoAreas[index]) {
        const tp = tippy(focusTab1InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }
  
  const focusTab3Area = focusContent.querySelector('#tabFocusTag3');
  if (focusTab3Area) {
    const focusTab3InfoAreas = focusTab3Area.querySelectorAll('.infoArea');
    const tab3Configs = [
      { title: `.${prefixTheme}Filter3Menu`, description: '필터링 작음에 적용 되는 Class', classes: `.${prefixTheme}Filter3Left, .${prefixTheme}Filter3Right, .${prefixTheme}Filter3Menu` },
      { title: `.${prefixTheme}Filter4Menu`, description: '필터링 같거나 작음에 적용 되는 Class', classes: `.${prefixTheme}Filter4Left, .${prefixTheme}Filter4Right, .${prefixTheme}Filter4Menu` },
      { title: `.${prefixTheme}Filter5Menu`, description: '필터링 큼에 적용 되는 Class', classes: `.${prefixTheme}Filter5Left, .${prefixTheme}Filter5Right, .${prefixTheme}Filter5Menu` },
      { title: `.${prefixTheme}Filter6Menu`, description: '필터링 같거나 큼에 적용 되는 Class', classes: `.${prefixTheme}Filter6Left, .${prefixTheme}Filter6Right, .${prefixTheme}Filter6Menu` },
      { title: `.${prefixTheme}Filter13Menu`, description: '필터링 상위 10에 적용 되는 Class', classes: `.${prefixTheme}Filter13Left, .${prefixTheme}Filter13Right, .${prefixTheme}Filter13Menu` }
    ];
    
    tab3Configs.forEach((config, index) => {
      if (focusTab3InfoAreas[index]) {
        const tp = tippy(focusTab3InfoAreas[index], {
          content: createTippyContent(config.title, config.description, config.classes)
        });
      }
    });
  }

  // 행, 열 배경색 적용
  const focusSheetMidBody = focusContent.querySelectorAll(`.${prefixTheme}BodyMid`)[0];
  if (focusSheetMidBody) {
    const focusSheetRows = focusSheetMidBody.querySelectorAll(`.${prefixTheme}DataRow`);
    focusSheetRows.forEach((row, rowIndex) => {
      const tds = row.querySelectorAll('td');
      tds.forEach((td, tdIndex) => {
        if (tdIndex === 9) {
          td.style.backgroundColor = '#FFEEEE';
        }
        if (rowIndex === 3) {
          td.style.backgroundColor = '#FFEEEE';
        }
      });
    });
  }

  // 필터행에서 특정 컬럼 배경색 적용
  const focusSheetMidHead = focusContent.querySelectorAll(`.${prefixTheme}HeadMid`)[0];
  if (focusSheetMidHead) {
    const focusSheetFilterRows = focusSheetMidHead.querySelectorAll(`.${prefixTheme}FilterRow`);
    focusSheetFilterRows.forEach((row, rowIndex) => {
      const tds = row.querySelectorAll('td');
      tds.forEach((td, tdIndex) => {
        if (tdIndex === 9) {
          td.style.backgroundColor = '#FFEEEE';
        }
      });
    });
  }

  function tipShowClick(tipShow) {
    if (tipShow.textContent == '안내 보기') {
      focusTippyInstances.forEach(instance => {
        if (instance) {
          instance.show();
        }
      });
      tipShow.textContent = '안내 숨기기';
    } else {
      focusTippyInstances.forEach(instance => {
        if (instance) {
          instance.hide();
        }
      });
      tipShow.textContent = '안내 보기';
    }
  }
  
  const tipShow = focusContent.querySelector('#tipShow');
  if (tipShow) {
    if (!tipShow.classList.contains('oncl')) {
      tipShow.classList.add('oncl');
      tipShow.addEventListener('click', () => {tipShowClick(tipShow);});
    }
  }

  function areaToggleClick(areaToggle) {
    const infoAreas = focusContent.querySelectorAll('.infoArea');
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

  const areaToggle = focusContent.querySelector('#areaToggle');
  if (areaToggle) {
    if (!areaToggle.classList.contains('oncl')) {
      areaToggle.classList.add('oncl');
      areaToggle.addEventListener('click', () => {areaToggleClick(areaToggle);});
    }
  }
}
