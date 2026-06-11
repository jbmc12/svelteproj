<script lang="ts">
	import RssFeedList from '$lib/components/rss-feed-list/RssFeedList.svelte';
	import { rssFeeds } from '$lib/data/rss-feeds';

	const houseFeeds = rssFeeds.filter((f) => f.category === 'House feed');
	const externalFeeds = rssFeeds.filter((f) => f.category !== 'House feed');
</script>

<svelte:head>
	<title>RSS Feeds | MusBeetle</title>
	<meta
		name="description"
		content="A curated list of jazz-related RSS feeds, plus the MusBeetle editorial feed. Subscribe in any RSS reader to keep up with the music."
	/>
</svelte:head>

<div class="page">
	<header class="page-header">
		<p class="eyebrow">Subscribe & follow</p>
		<h1 class="page-title">
			Jazz, <em>via RSS.</em>
		</h1>
		<p class="page-lede">
			RSS is the quiet, durable way to follow what people write about music. No algorithm, no ads,
			no sign-up. Open any of the feeds below in a reader like Feedly, NetNewsWire, Reeder, or
			Inoreader, and the writing comes to you.
		</p>
	</header>

	<section class="house-section" aria-labelledby="house-heading">
		<div class="section-meta">
			<h2 id="house-heading" class="section-title">
				Our own <em>feed.</em>
			</h2>
			<p class="section-text">
				Every article published on MusBeetle shows up in this feed automatically.
			</p>
		</div>
		<RssFeedList feeds={houseFeeds} />
	</section>

	<section class="external-section" aria-labelledby="external-heading">
		<div class="section-meta">
			<h2 id="external-heading" class="section-title">
				Recommended <em>elsewhere.</em>
			</h2>
			<p class="section-text">
				Seven external feeds worth reading. They cover reviews, profiles, podcasts, the European
				scene, and a player's-eye view of the music.
			</p>
		</div>
		<RssFeedList feeds={externalFeeds} />
	</section>

	<aside class="rss-help">
		<h2 class="help-title">New to RSS?</h2>
		<p>
			An RSS feed is a small text file that lists a site's recent posts in a machine-readable
			format. A reader app collects feeds from many sites and shows them in one place, in the
			order they were published. It works a bit like email for websites: subscribe once, and
			updates arrive on their own.
		</p>
		<p class="help-suggestion">
			Free readers worth trying: <a href="https://feedly.com" target="_blank" rel="noopener noreferrer">Feedly</a> (web), <a href="https://netnewswire.com" target="_blank" rel="noopener noreferrer">NetNewsWire</a> (macOS and iOS, open source), <a href="https://inoreader.com" target="_blank" rel="noopener noreferrer">Inoreader</a> (web, generous free tier).
		</p>
	</aside>
</div>

<style>
	.page {
		max-width: var(--max-content);
		margin: 0 auto;
		padding: var(--space-8) var(--space-5) var(--space-9);
	}

	.page-header {
		max-width: 44rem;
		margin-bottom: var(--space-7);
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: var(--space-4);
	}

	.page-title {
		font-size: clamp(2.6rem, 7vw, 5rem);
		margin-bottom: var(--space-5);
		line-height: 0.95;
	}

	.page-title em {
		font-style: italic;
		color: var(--color-accent);
	}

	.page-lede {
		color: var(--color-text-muted);
		font-size: 1.1rem;
		line-height: 1.65;
	}

	.house-section,
	.external-section {
		margin-bottom: var(--space-8);
	}

	.section-meta {
		max-width: 38rem;
		margin-bottom: var(--space-5);
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--color-hairline);
	}

	.section-title {
		font-size: clamp(1.7rem, 3vw, 2.2rem);
		margin: 0 0 var(--space-3);
	}

	.section-title em {
		font-style: italic;
		color: var(--color-accent);
	}

	.section-text {
		color: var(--color-text-muted);
		margin: 0;
		font-size: 1rem;
		line-height: 1.6;
	}

	.rss-help {
		margin-top: var(--space-7);
		padding: var(--space-6);
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		max-width: 48rem;
	}

	.help-title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
		margin: 0 0 var(--space-3);
		color: var(--color-text);
	}

	.rss-help p {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.65;
		margin: 0 0 var(--space-3);
	}

	.rss-help p:last-child {
		margin-bottom: 0;
	}

	.help-suggestion a {
		color: var(--color-accent);
		border-bottom: 1px solid var(--color-hairline-strong);
		transition: border-color 0.2s var(--ease-out);
	}

	.help-suggestion a:hover {
		border-color: var(--color-accent);
	}

	@media (max-width: 640px) {
		.page {
			padding: var(--space-6) var(--space-4) var(--space-7);
		}

		.rss-help {
			padding: var(--space-5);
		}
	}
</style>
