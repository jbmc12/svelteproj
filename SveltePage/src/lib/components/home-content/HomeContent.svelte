<script lang="ts">
	import FeaturedAlbum from '$lib/components/featured-album/FeaturedAlbum.svelte';
	import AlbumGrid from '$lib/components/album-grid/AlbumGrid.svelte';
	import { albums } from '$lib/data/albums';

	// The decade's featured album — "Kind of Blue of the 2000s" pick.
	const featured = albums.find((a) => a.id === 'historicity') ?? albums[0];
	const previewAlbums = albums.filter((a) => a.id !== featured.id).slice(0, 6);
</script>

<div class="home">
	<section class="hero">
		<div class="hero-inner">
			<p class="hero-eyebrow">A guide to the decade</p>
			<h1 class="hero-title">
				The 2000s in <em>jazz.</em>
			</h1>
			<p class="hero-lede">
				Twelve albums from 2000 to 2009, picked for what they captured and what they pushed
				forward. Not a ranking. A listening list — for anyone who has wondered where to start
				with a decade jazz never quite stopped having.
			</p>
			<div class="hero-stats">
				<div>
					<span class="stat-num">12</span>
					<span class="stat-label">Essential records</span>
				</div>
				<div>
					<span class="stat-num">10</span>
					<span class="stat-label">Years covered</span>
				</div>
				<div>
					<span class="stat-num">08</span>
					<span class="stat-label">Venues on the map</span>
				</div>
			</div>
		</div>
		<div class="hero-decoration" aria-hidden="true">
			<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
				<circle cx="100" cy="100" r="90" fill="none" stroke="var(--color-accent)" stroke-width="0.5" opacity="0.4" />
				<circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-accent)" stroke-width="0.5" opacity="0.6" />
				<circle cx="100" cy="100" r="50" fill="none" stroke="var(--color-accent)" stroke-width="0.5" opacity="0.8" />
				<circle cx="100" cy="100" r="30" fill="none" stroke="var(--color-accent)" stroke-width="1" />
				<circle cx="100" cy="100" r="4" fill="var(--color-accent)" />
			</svg>
		</div>
	</section>

	<div class="divider">
		<span class="divider-label">No. 01</span>
	</div>

	<FeaturedAlbum album={featured} eyebrow="Album of the Decade" />

	<div class="divider">
		<span class="divider-label">Preview · Six of Twelve</span>
	</div>

	<section class="preview">
		<header class="preview-header">
			<h2 class="preview-title">
				The shortlist, <em>part one.</em>
			</h2>
			<p class="preview-lede">
				Six entries from our twelve-album guide. Each pick has a paragraph of context, a standout
				track to start with, and an era tag to give it shape.
			</p>
		</header>

		<AlbumGrid albums={previewAlbums} />

		<a class="see-all" href="/albums">
			<span>See all twelve</span>
			<span class="arrow" aria-hidden="true">→</span>
		</a>
	</section>
</div>

<style>
	.home {
		padding: 0 var(--space-5);
	}

	.hero {
		max-width: var(--max-content);
		margin: 0 auto;
		padding: var(--space-9) 0 var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		position: relative;
	}

	.hero-inner {
		max-width: 44rem;
	}

	.hero-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: var(--space-4);
	}

	.hero-title {
		font-size: clamp(3rem, 9vw, 7rem);
		line-height: 0.95;
		font-variation-settings: 'opsz' 144, 'SOFT' 50;
		margin-bottom: var(--space-5);
		letter-spacing: -0.02em;
	}

	.hero-title em {
		font-style: italic;
		color: var(--color-accent);
		font-variation-settings: 'opsz' 144, 'SOFT' 100;
	}

	.hero-lede {
		font-size: clamp(1.05rem, 1.4vw, 1.25rem);
		color: var(--color-text-muted);
		line-height: 1.65;
		max-width: 36rem;
		margin-bottom: var(--space-6);
	}

	.hero-stats {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-hairline);
	}

	.hero-stats > div {
		display: flex;
		flex-direction: column;
	}

	.stat-num {
		font-family: var(--font-display);
		font-size: 2.2rem;
		font-variation-settings: 'opsz' 144, 'SOFT' 50;
		color: var(--color-text);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-text-faint);
		margin-top: 0.4rem;
	}

	.hero-decoration {
		position: absolute;
		top: var(--space-6);
		right: -2rem;
		width: 220px;
		opacity: 0.4;
		display: none;
		animation: rotate 80s linear infinite;
	}

	@keyframes rotate {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.divider {
		max-width: var(--max-content);
		margin: var(--space-7) auto;
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--color-hairline);
	}

	.divider-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--color-text-faint);
	}

	.preview {
		max-width: var(--max-content);
		margin: 0 auto var(--space-8);
	}

	.preview-header {
		max-width: 42rem;
		margin-bottom: var(--space-7);
	}

	.preview-title {
		font-size: clamp(2rem, 4vw, 3rem);
		margin-bottom: var(--space-4);
	}

	.preview-title em {
		font-style: italic;
		color: var(--color-accent);
	}

	.preview-lede {
		color: var(--color-text-muted);
		font-size: 1.05rem;
		line-height: 1.65;
	}

	.see-all {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		margin-top: var(--space-7);
		padding: var(--space-4) var(--space-5);
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: all 0.3s var(--ease-out);
	}

	.see-all:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.see-all:hover .arrow {
		transform: translateX(4px);
	}

	.arrow {
		transition: transform 0.3s var(--ease-out);
	}

	@media (min-width: 900px) {
		.hero-decoration {
			display: block;
		}
	}

	@media (max-width: 640px) {
		.home {
			padding: 0 var(--space-4);
		}

		.hero {
			padding: var(--space-7) 0 var(--space-6);
		}

		.hero-stats {
			gap: var(--space-5);
		}
	}
</style>
