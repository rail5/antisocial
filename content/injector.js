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

const STYLE_ID_PREFIX = 'antisocial-style-';

function buildCSS(selectors) {
	return selectors
		.map(sel => `${sel} { display: none !important; }`)
		.join('\n');
}

function upsertStyleTag(id, rules) {
	let style = document.getElementById(id);
	if (!style) {
		style = document.createElement('style');
		style.type = 'text/css';
		style.id = id;
		(document.head || document.documentElement).appendChild(style);
	}
	style.textContent = rules;
}

function removeStyleTag(id) {
	const style = document.getElementById(id);
	if (style) style.remove();
}

function loadUserPreferences() {
	const api = globalThis.browser ?? globalThis.chrome;
	return api.storage.sync.get(DEFAULT_SETTINGS);
}

function currentSites() {
	const host = location.hostname;
	if (host === 'github.com') return ['github'];
	if (host === 'youtube.com' || host.endsWith('.youtube.com')) return ['youtube'];
	return [];
}

function applyCSS() {
	const selectorsBySite = globalThis.AntiSocialCSS || {};

	loadUserPreferences().then((preferences) => {
		for (const site of currentSites()) {
			const siteMap = selectorsBySite[site];
			const sitePrefs = preferences[site];
			const styleId = STYLE_ID_PREFIX + site;

			// If site disabled (or we can't resolve selectors), ensure old CSS is removed.
			if (!siteMap || !sitePrefs || !sitePrefs.enabled) {
				removeStyleTag(styleId);
				continue;
			}

			const selectors = Object.keys(siteMap)
				.filter(key => sitePrefs[key] !== false)
				.map(key => siteMap[key]);

			if (!selectors.length) {
				removeStyleTag(styleId);
				continue;
			}

			upsertStyleTag(styleId, buildCSS(selectors));
		}
	});
}

// Initial run
applyCSS();

// Live refresh when settings change
(() => {
	const api = globalThis.browser ?? globalThis.chrome;
	if (!api?.storage?.onChanged) return;

	api.storage.onChanged.addListener((changes, areaName) => {
		if (areaName !== 'sync') return;

		// Only refresh if the current site’s settings changed.
		const sites = currentSites();
		const shouldRefresh = sites.some(site => Object.prototype.hasOwnProperty.call(changes, site));
		if (shouldRefresh) applyCSS();
	});
})();
