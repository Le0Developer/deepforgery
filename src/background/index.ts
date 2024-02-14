const badNames = ["_vid_t", "_iidt"];

chrome.cookies.onChanged.addListener((changeInfo) => {
	if (!changeInfo.removed) return;
	if (badNames.includes(changeInfo.cookie.name)) {
		chrome.cookies.remove({
			name: changeInfo.cookie.name,
			storeId: changeInfo.cookie.storeId,
			url:
				(changeInfo.cookie.secure ? "https://" : "http://") +
				changeInfo.cookie.domain +
				changeInfo.cookie.path,
		});
	}
});
