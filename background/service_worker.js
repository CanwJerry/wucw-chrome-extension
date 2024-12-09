// setInterval(() => {
// 通过模板创建内容丰富的通知
// chrome.notifications.create(
//   {
//     type: "basic",
//     title: "Notifications Title",
//     message: "Notifications message to display",
//     iconUrl: "../icons/candy.png"
//   },
//   (notificationId) => {
//     console.log('notificationId-->', notificationId)
//   }
// );
// }, 3000)

// chrome.notifications.create(
//   {
//     type: "basic",
//     title: "Notifications Title",
//     message: "Notifications message to display",
//     iconUrl: "../icons/candy.png"
//   },
//   (notificationId) => {
//     console.log('notificationId-->', notificationId)
//   }
// );

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "fromPopup") {
    chrome.notifications.create(
      {
        type: "basic",
        title: "Notifications Title",
        message: "尽请期待 & Copy",
        iconUrl: "../icons/candy.png"
      }
    );
  }

  if (message.action === "fromPopupQRCode") {
    chrome.notifications.create(
      {
        type: "basic",
        title: "Notifications Title",
        message: "尽请期待 & QRCode",
        iconUrl: "../icons/candy.png"
      }
    );
  }

  if (message.action === "fromPopupHome") {
  }
});
