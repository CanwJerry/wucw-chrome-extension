chrome.action.onClicked.addListener(async (tab) => {
	if (window.Shopify) {
		chrome.scripting.executeScript({
      target: {
				tabId: tab.id,
			},
      files: ['content-script.js'],
			// func: function
			world: 'MAIN'
    },)
	} else {
    chrome.notifications.create(
      {
        type: "basic",
        title: "Notifications",
        message: "This is not shopify page",
        iconUrl: "../icons/candy.png"
      }
    );
	}
});
