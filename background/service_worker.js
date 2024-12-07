import './module_1.js';
import './module_2.js';

chrome.runtime.onInstalled.addListener(function () {
  console.log("插件已被安装");
});

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

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'fromPopup') {
    chrome.notifications.create(
      {
        type: "basic",
        title: "Notifications Title",
        message: "Notifications message to display",
        iconUrl: "../icons/candy.png"
      },
      (notificationId) => {
        console.log('notificationId-->', notificationId)
      }
    );
  }
});