(function () {
	globalThis.AntiSocialCSS = globalThis.AntiSocialCSS || {};
	globalThis.AntiSocialCSS.youtube = {
		suggestedCategories: `iron-selector`,
		shorts:              `ytd-rich-shelf-renderer`,
		views:               `yt-content-metadata-view-model, .ytd-watch-info-text, .ytd-video-meta-block, #metadata-container.ytd-grid-video-renderer, .shortsLockupViewModelHostOutsideMetadataSubhead, .shortsLockupViewModelHostMetadataSubhead, [class*="view-count"]`,
		subscribers:         `#owner-sub-count, [aria-label*="subscribers"], #subtitle.ytd-video-description-infocards-section-renderer, #thumbnail-attribution.ytd-grid-channel-renderer`,
		likes:               `segmented-like-dislike-button-view-model, [aria-label*="likes"]`,
		comments:            `.ytd-comments, #comments, [section-identifier*="comment"]`,
		posts:               `.ytd-post-renderer, #post`,
		newsWarnings:        `ytd-info-panel-content-renderer`,
		liveChat:            `ytd-live-chat-frame, yt-live-chat-app, yt-live-chat-renderer, .yt-live-chat-app, .yt-live-chat-renderer, #chat-container, #teaser-carousel`
	};
})();
