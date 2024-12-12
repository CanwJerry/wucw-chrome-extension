const copyCurrentPage = document.querySelector(".copy-current-page");
const generateUrlQrcode = document.querySelector(".generate-url-qrcode");
const openEnv = document.querySelector(".open-env");
const openHome = document.querySelector(".open-home");
const openBackFile = document.querySelector(".open-back-file");
const openBackPage = document.querySelector(".open-back-page");
const openBackProduct = document.querySelector(".open-back-product");
const getPdId = document.querySelector(".get-pd-id");

const pro = document.getElementById("pro");
const dev = document.getElementById("dev");

let currentEnv = 'pro';
const handleButtonClick = async (data) => {
  try {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  
    switch(data) {
      case 'pro':
        currentEnv = 'pro';
        break;
        
      case 'dev':
        currentEnv = 'dev';
        break;

      case 'current_page':
        //向 content script 发送消息
        await chrome.tabs.sendMessage(tab.id, { msg: "currentPage", data: currentEnv });
        break;

      case 'url_qrcode':
        await chrome.tabs.sendMessage(tab.id, { msg: "QRCode", data: currentEnv });
        break;

      case 'get_pd_id':
        await chrome.tabs.sendMessage(tab.id, { msg: "getPdId", data: currentEnv });
        break;

      case 'open_back_file':
        window.open(`https://admin.shopify.com/store/andaseatglobal/content/files?selectedView=all`, '_blank');
        break;
        
      case 'open_back_page':
        window.open(`https://admin.shopify.com/store/andaseatglobal/pages`, '_blank');
        break;

      case 'open_back_product':
        window.open(`https://admin.shopify.com/store/andaseatglobal/products?selectedView=all`, '_blank');
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
  } catch (error) {
    console.log(error);
  }
  
};

pro.addEventListener("click", () => handleButtonClick('pro'));

dev.addEventListener("click", () => handleButtonClick('dev'));

copyCurrentPage.addEventListener("click", () => handleButtonClick('current_page'));

generateUrlQrcode.addEventListener("click", () => handleButtonClick('url_qrcode'));

openEnv.addEventListener("click", () => handleButtonClick('open_env'));

openHome.addEventListener("click", () => handleButtonClick('open_home'));

openBackFile.addEventListener("click", () => handleButtonClick('open_back_file'));

openBackPage.addEventListener("click", () => handleButtonClick('open_back_page'));

openBackProduct.addEventListener("click", () => handleButtonClick('open_back_product'));

getPdId.addEventListener("click", () => handleButtonClick('get_pd_id'));
