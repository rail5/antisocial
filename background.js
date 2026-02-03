// This file contains the background script that manages the overall functionality of the add-on, 
// including listening for messages from the options page and injecting CSS based on user preferences.

const DEFAULT_SETTINGS = {
	github: {
		enabled: true,
		feed: true,
		stars: true,
		forks: true,
		watches: true,
		followers: true,
		reactions: true,
		contributions: true
	},
	youtube: {
		enabled: true,
		suggestedCategories: true,
		shorts: true,
		views: true,
		subscribers: true,
		likes: true,
		comments: true,
		posts: true,
		newsWarnings: true,
		liveChat: true
	}
};

function loadSettings() {
	return new Promise((resolve) => {
		browser.storage.sync.get(DEFAULT_SETTINGS).then((settings) => {
			resolve(settings);
		});
	});
}

function saveSettings(settings) {
	return browser.storage.sync.set(settings);
}

browser.runtime.onMessage.addListener((message, sender) => {
	if (message.type === 'getSettings') {
		loadSettings().then((settings) => {
			browser.tabs.sendMessage(sender.tab.id, { type: 'settings', settings });
		});
	} else if (message.type === 'saveSettings') {
		saveSettings(message.settings);
	}
});
