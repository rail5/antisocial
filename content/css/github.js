(function () {
	globalThis.AntiSocialCSS = globalThis.AntiSocialCSS || {};
	globalThis.AntiSocialCSS.github = {
		feed:          `feed-container`,
		stars:         `#repo-stars-counter-star, .js-social-count, [aria-label*="stars"], .Link.Link--muted, .Link--muted.mr-3, .pinned-item-meta.Link--muted`,
		forks:         `#repo-network-counter, [aria-label*="forks"],                      .Link.Link--muted, .Link--muted.mr-3, .pinned-item-meta.Link--muted`,
		watches:       `.NotificationsSubscriptionsMenu-module__watchCounter__wM7O0kI,     .Link.Link--muted`,
		followers:     `[aria-label*="followers"], .flex-order-1.flex-md-order-none.mt-2.mt-md-0`,
		reactions:     `[aria-label*="Reaction"], [aria-label*="reaction"], [class*="reaction"], [id*="reaction"]`,
		contributions: `.js-yearly-contributions`
	};
})();
