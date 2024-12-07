const copyCurrentPage = document.querySelector(".copy-current-page");
const copySomePage = document.querySelector(".copy-some-page");
const generateUrlQrcode = document.querySelector(".generate-url-qrcode");
const openEnv = document.querySelector(".open-env");
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
        // console.log("Current page", currentEnv);

        //TODO: 向 Service Worker 发送消息
        chrome.runtime.sendMessage({
          action: 'fromPopup',
          message: 'Hello from Popup!'
        });
        break;

      case 'some_page':
        console.log("Some page", currentEnv);

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
        break;

      case 'open_env':
        console.log("Open env", currentEnv);
        break;
    }
  } catch (e) {
    console.error("An error occurred:", e);
  }
};

pro.addEventListener("click", () => handleButtonClick('pro'));

dev.addEventListener("click", () => handleButtonClick('dev'));

copyCurrentPage.addEventListener("click", () => handleButtonClick('current_page'));

copySomePage.addEventListener("click", () => handleButtonClick('some_page'));

generateUrlQrcode.addEventListener("click", () => handleButtonClick('url_qrcode'));

openEnv.addEventListener("click", () => handleButtonClick('open_env'));
