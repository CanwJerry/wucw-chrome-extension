const copyCurrentPage = document.querySelector(".copy-current-page");
// const copySomePage = document.querySelector(".copy-some-page");
const generateUrlQrcode = document.querySelector(".generate-url-qrcode");
const openEnv = document.querySelector(".open-env");
const openHome = document.querySelector(".open-home");
const pro = document.getElementById("pro");
const dev = document.getElementById("dev");
let currentEnv = 'pro';
const handleButtonClick = async (data) => {
  try {
    switch(data) {
      case 'pro':
        currentEnv = 'pro';
        break;
        
      case 'dev':
        currentEnv = 'dev';
        break;

      case 'current_page':
        //向 Service Worker 发送消息
        chrome.runtime.sendMessage({
          action: 'fromPopup',
          data: currentEnv
        });
        break;

      case 'some_page':
        //TODO: 获取 tab 数据
        const [tab] = await chrome.tabs.query({
          url: ["https://www.andaseat.com/*"],
          active: true,
          currentWindow: true
        });

        if(tab) {
          //TODO: 使用 chrome.tabs.sendMessage 发送消息
          chrome.tabs.sendMessage(tab.id, {
            action: 'fromPopup2Content'
          })
        }
        break;

      case 'url_qrcode':
        console.log("Url qrcode", currentEnv);
        chrome.runtime.sendMessage({
          action: 'fromPopupQRCode',
          data: currentEnv
        });
        break;

      case 'open_home':
        const env = currentEnv === 'pro' ? '?key=d3f8ea580ef6dbee2771397f87c1d0adb19203f2c5de85f913e986630e8b4160&preview_theme_id=' : '?_ab=0&_fd=0&_sc=1&preview_theme_id=127730122811'
        window.open(`https://www.andaseat.com/${env}`, '_blank');
        break;

      case 'open_env':
        const themeId = currentEnv === 'pro' ? '127755092027' : '127730122811';
        window.open(`https://admin.shopify.com/store/andaseatglobal/themes/${themeId}/editor`, '_blank');
        break;
    }
  } catch (e) {
    console.error("An error occurred:", e);
  }
};

pro.addEventListener("click", () => handleButtonClick('pro'));

dev.addEventListener("click", () => handleButtonClick('dev'));

copyCurrentPage.addEventListener("click", () => handleButtonClick('current_page'));

// copySomePage.addEventListener("click", () => handleButtonClick('some_page'));

generateUrlQrcode.addEventListener("click", () => handleButtonClick('url_qrcode'));

openEnv.addEventListener("click", () => handleButtonClick('open_env'));

openHome.addEventListener("click", () => handleButtonClick('open_home'));
