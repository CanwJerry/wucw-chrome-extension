class Toast {
	constructor() {
    this.hideTime = null;
    this.qrcode = null;
  }
	
  init(html) {
    this.hide();

    let chromeToastNode = document.createElement("section");
    chromeToastNode.innerHTML =`
      <span class="close-btn">x</span>
      <p class="toast-text"></p>
      <p class="toast-url"></p>
      <div id="qrcode"></div>
    `;
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
    const chromeDomToastClose = chromeDomToastTips.querySelector(".close-btn");
    const chromeDomToastQR = chromeDomToastTips.querySelector("#qrcode");
		
    chromeDomToastText.innerHTML = text || "";
    chromeDomToastUrl.innerHTML = url || "";

    if(text === "QRCode") {
      chromeDomToastQR.style.display = "flex";
      chromeDomToastQR.innerHTML = "";

      const qrcode = new QRCode("qrcode", {
        text: url,
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });

      qrcode.makeCode(url);
    } else {
      chromeDomToastQR.innerHTML = "";
      chromeDomToastQR.style.display = "none";
    }
		
    chromeDomToastTips.style.display = "flex";

    chromeDomToastClose.addEventListener("click", () => {
      this.hide();
    })
		
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