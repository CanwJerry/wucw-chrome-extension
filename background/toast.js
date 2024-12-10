class Toast {
	constructor() {
    this.hideTime = null
  }
	
  init(html) {
    let chromeToastNode = document.createElement("section");
    chromeToastNode.innerHTML =`</p><p class="toast-text"></p><p class="toast-url">`;
    chromeToastNode.id = "chromeToastTips";
    chromeToastNode.setAttribute("class", "toast");
    chromeToastNode.style.display = "none";
    document.body.appendChild(chromeToastNode);
  }

	show(text, url, type, duration) {
    // 确保上一次已被清空
    if (this.hideTime) {
      clearTimeout(this.hideTime);
      this.hideTime = null;
    }
		
    if (!text) {
      console.error("Text cannot be empty!");
      return;
    }
		
    const chromeDomToastTips = document.getElementById("chromeToastTips");
    
    if (!chromeDomToastTips) {
      console.error("ChromeToastTips DOM inexistence!");
      return;
    }
		
    const chromeDomToastText = chromeDomToastTips.querySelector(".toast-text");
    const chromeDomToastUrl = chromeDomToastTips.querySelector(".toast-url");
		
    chromeDomToastText.innerHTML = text || "";
    chromeDomToastUrl.innerHTML = url || "";
		
    chromeDomToastTips.style.display = "flex";
		
    // const that = this;
    // this.hideTime = setTimeout(function () {
    //   chromeDomToastTips.style.display = "none";
    //   that.hideTime = null;
    // }, duration || 2000);
  }

	hide() {
    if (this.hideTime) {
      clearTimeout(this.hideTime);
      this.hideTime = null;
    }
		
    const chromeDomToastTips = document.getElementById("chromeToastTips");
    if (chromeDomToastTips) {
      chromeDomToastTips.style.display = "none";
      document.body.removeChild(chromeDomToastTips);
    }
  }
}