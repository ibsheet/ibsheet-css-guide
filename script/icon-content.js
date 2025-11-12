document.getElementById('btn1').addEventListener('click', () => { loadContent('html/tab-icon1.html'); });
document.getElementById('btn2').addEventListener('click', () => { loadContent('html/tab-icon2.html'); });
document.getElementById('btn3').addEventListener('click', () => { loadContent('html/tab-icon3.html'); });
document.getElementById('btn4').addEventListener('click', () => { loadContent('html/tab-icon4.html'); });
document.getElementById('btn5').addEventListener('click', () => { loadContent('html/tab-icon5.html'); });
document.getElementById('btn6').addEventListener('click', () => { loadContent('html/tab-icon6.html'); });
document.getElementById('btn7').addEventListener('click', () => { loadContent('html/tab-icon7.html'); });
document.getElementById('btn8').addEventListener('click', () => { loadContent('html/tab-icon8.html'); });

document.getElementById('btn1').click();

function loadContent(filename) {
  fetch(filename)
    .then(response => response.text())
    .then(html => {
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = html;

      // 테마 적용
      replaceThemeInElement(contentArea, `${prefixTheme}`, themes);
        
      // 해당 탭에 맞는 JavaScript 파일 로드
      const tabNumber = filename.match(/tab-icon(\d+)\.html$/)?.[1];
      contentArea.className = `icon${tabNumber}-content`;
      if (tabNumber) {
        const scriptPath = `script/icon${tabNumber}-content.js`;
        loadScript(scriptPath);
      }
    })
    .catch(error => {
      console.error('Error loading content:', error);
      document.getElementById('content-area').innerHTML = '<p>콘텐츠를 로드할 수 없습니다.</p>';
    });
}

function loadScript(src) {
  // 기존 동일한 스크립트가 있다면 제거
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.src = src;
  script.onerror = () => console.log(`Script not found: ${src}`);
  document.head.appendChild(script);
}