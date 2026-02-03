document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('options-form');
	const githubToggle = document.getElementById('github-toggle');
	const githubOptions = document.getElementById('github-options');
	const youtubeToggle = document.getElementById('youtube-toggle');
	const youtubeOptions = document.getElementById('youtube-options');

	const githubOptionIds = [
		'feed',
		'stars',
		'forks',
		'watches',
		'followers',
		'reactions',
		'contributions'
	];

	const youtubeOptionIds = [
		'suggestedCategories',
		'shorts',
		'views',
		'subscribers',
		'likes',
		'comments',
		'posts',
		'newsWarnings',
		'liveChat'
	];

	function setSectionEnabled(sectionOptionsEl, enabled) {
		sectionOptionsEl.classList.toggle('is-disabled', !enabled);
		sectionOptionsEl
			.querySelectorAll('input[type="checkbox"]')
			.forEach(cb => { cb.disabled = !enabled; });
	}

	// Prevent clicking the "Enabled" checkbox from toggling the <details> open/close state
	document.querySelectorAll('summary input[type="checkbox"]').forEach(cb => {
		cb.addEventListener('click', (e) => e.stopPropagation());
		cb.addEventListener('keydown', (e) => e.stopPropagation());
	});

	// Helper to update toggle label
	function updateToggleLabel(id) {
		const checkbox = document.getElementById(id);
		const label = document.getElementById('label-' + id);
		if (checkbox && label) {
			label.textContent = checkbox.checked ? 'Show' : 'Hide';
		}
	}

	// Load saved preferences
	browser.storage.sync.get(['github', 'youtube']).then((data) => {
		const github = data.github || {};

		// Accept old boolean shape, but normalize to object
		const youtube =
			typeof data.youtube === 'boolean'
				? { enabled: data.youtube }
				: (data.youtube || {});

		githubToggle.checked = github.enabled !== undefined ? github.enabled : true;
		youtubeToggle.checked = youtube.enabled !== undefined ? youtube.enabled : true;

		setSectionEnabled(githubOptions, githubToggle.checked);
		setSectionEnabled(youtubeOptions, youtubeToggle.checked);

		// GitHub inner options (inverted checkbox semantics)
		githubOptionIds.forEach(id => {
			const el = document.getElementById('github-' + id);
			if (!el) return;

			el.checked = github[id] !== undefined ? !github[id] : false;
			updateToggleLabel('github-' + id);

			el.addEventListener('change', () => {
				updateToggleLabel('github-' + id);
				saveOptions();
			});
		});

		// YouTube inner options (same behavior as GitHub)
		youtubeOptionIds.forEach(id => {
			const el = document.getElementById('youtube-' + id);
			if (!el) return;

			el.checked = youtube[id] !== undefined ? !youtube[id] : false;
			updateToggleLabel('youtube-' + id);

			el.addEventListener('change', () => {
				updateToggleLabel('youtube-' + id);
				saveOptions();
			});
		});
	});

	githubToggle.addEventListener('change', () => {
		setSectionEnabled(githubOptions, githubToggle.checked);
		saveOptions();
	});

	youtubeToggle.addEventListener('change', () => {
		setSectionEnabled(youtubeOptions, youtubeToggle.checked);
		saveOptions();
	});

	form.addEventListener('change', saveOptions);

	function saveOptions() {
		const github = { enabled: githubToggle.checked };
		githubOptionIds.forEach(id => {
			const el = document.getElementById('github-' + id);
			if (el) github[id] = !el.checked; // checked=Show => store false; unchecked=Hide => store true
		});

		const youtube = { enabled: youtubeToggle.checked };
		youtubeOptionIds.forEach(id => {
			const el = document.getElementById('youtube-' + id);
			if (el) youtube[id] = !el.checked; // same inverted semantics
		});

		browser.storage.sync.set({ github, youtube });
	}
});
