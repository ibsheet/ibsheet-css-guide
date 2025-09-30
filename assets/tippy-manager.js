// Tippy 인스턴스 관리 유틸리티
(function() {
  // 전역 tippy 관리 함수들이 이미 정의되어 있지 않다면 정의
  // if (!window.globalTippyInstances) {
  //   window.globalTippyInstances = [];
  // }
  
  // if (!window.registerTippy) {
  //   window.registerTippy = function(instance) {
  //     if (instance && window.globalTippyInstances.indexOf(instance) === -1) {
  //       window.globalTippyInstances.push(instance);
  //     }
  //   };
  // }
  
  // if (!window.destroyAllTippies) {
  //   window.destroyAllTippies = function() {
  //     window.globalTippyInstances.forEach(instance => {
  //       if (instance && typeof instance.destroy === 'function') {
  //         instance.destroy();
  //       }
  //     });
  //     window.globalTippyInstances = [];
  //   };
  // }
  
  // // 기존 tippy 함수를 래핑하여 자동으로 등록되도록 함
  // if (typeof tippy !== 'undefined' && !window.originalTippy) {
  //   window.originalTippy = tippy;
    
  //   window.tippy = function(targets, options) {
  //     const instance = window.originalTippy(targets, options);
  //     // 인스턴스가 배열인 경우 각각 등록
  //     if (Array.isArray(instance)) {
  //       instance.forEach(inst => window.registerTippy(inst));
  //     } else {
  //       window.registerTippy(instance);
  //     }
  //     return instance;
  //   };
    
  //   // tippy의 정적 메서드들 복사
  //   Object.keys(window.originalTippy).forEach(key => {
  //     window.tippy[key] = window.originalTippy[key];
  //   });
  // }
})();
