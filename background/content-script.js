chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    if (request.msg === "currentPage") {
      request.data === "pro" && pro("currentPage");
      request.data === "dev" && dev("currentPage");
    } else if (request.msg === "QRCode") {
      request.data === "pro" && pro("QRCode");
      request.data === "dev" && dev("QRCode");
    } else if (request.msg === "getPdId") {
      request.data === "pro" && pro("getPdId");
      request.data === "dev" && dev("getPdId");
    }
  })();

  return true;
});

function pro(data) {
  let proUrl;
  if(window.location.href.indexOf('/?_ab=0&_fd=0&_sc=1') > -1) {
    proUrl = window.location.href.replace('/?_ab=0&_fd=0&_sc=1', '');
  } else {
    proUrl = window.location.href;
  }

  switch (data) {
    case "currentPage":
      copyFunc("生产环境链接复制成功", proUrl);
      break;
    case "QRCode":
			copyFunc("QRCode", proUrl);
      break;
    case "getPdId":
			getProductInfo();
      break;
  }
}

function dev(data) {
  if (window.document.getElementById("preview-bar-iframe")) {
    const iframeBox = window.document.getElementById("preview-bar-iframe");
    const iframeDoc = iframeBox.contentWindow.document;
    const url = iframeDoc.getElementById("share_theme_url").value;
    const pathName = window.location.pathname;
    const search = window.location.search;
    const devUrl = `${url}${pathName}${search}` || '';

    switch (data) {
      case "currentPage":
        copyFunc("开发环境链接复制成功", devUrl);
        break;
      case "QRCode":
        copyFunc("QRCode", devUrl);
        break;
      case "getPdId":
        getProductInfo();
        break;
    }
  } else {
    tips('当前不是测试环境', '');
	}
}

function copyFunc(msg, url) {
  tips(msg, url);

  const input = window.document.createElement("input");

  window.document.body.appendChild(input);

  input.setAttribute("value", url);

  input.select();

  if (window.document.execCommand("copy")) {
    window.document.execCommand("copy");
  }

  window.document.body.removeChild(input);
}

function getProductInfo() {
	if(window.location.pathname.indexOf('/products') > -1) {
    tips('加载中..✨✨');
		fetch(`${window.location.href.split('?')[0]}.json`)
			.then(response => response.json())
			.then(data => {
				const title = data.product.title;
				const length = data.product.variants.length;
				const str = title.concat('<br/>VARIANTS: ' + length);
				copyFunc(str, 'ID: ' + data.product.id);
			})
			.catch(error => {
				tips('出错了~😱');
			})
	} else {
		tips('当前不在产品页面 😰');
	}
}

function tips(msg, url) {
  new Toast().init();
      
  new Toast().show(msg, url, null, null);
}