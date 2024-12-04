const copyBtn = document.querySelector('.copy');
const handleButtonClick = async () => {
	try {
		let [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true
		});

		alert(JSON.stringify(tab));
	} catch (e) {
		console.error("An error occurred:", e);
	}
}

copyBtn.addEventListener('click', handleButtonClick);
