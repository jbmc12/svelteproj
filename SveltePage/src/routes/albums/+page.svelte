<script lang="ts">
	import AlbumGrid from '$lib/components/album-grid/AlbumGrid.svelte';
	import { albums } from '$lib/data/albums';

	let activeEra = $state<string>('all');

	const eras = $derived(['all', ...new Set(albums.map((a) => a.era))]);
	const filtered = $derived(
		activeEra === 'all' ? albums : albums.filter((a) => a.era === activeEra)
	);

	function setEra(era: string) {
		activeEra = era;
	}
</script>

<svelte:head>
	<title>The Albums | MusBeetle</title>
	<meta
		name="description"
		content="Twelve jazz albums from 2000 to 2009 with editorial notes, standout tracks, and era tags. The full MusBeetle list."
	/>
</svelte:head>

<div class="page">
	<header class="page-header">
		<p class="eyebrow">The full guide</p>
		<h1 class="page-title">
			Twelve <em>records.</em>
		</h1>
		<p class="page-lede">
			Filter by era or read straight through. Each entry comes with a short blurb and a single
			track to start with. Built for the listener who wants a way in, not a syllabus.
		</p>
	</header>

	<div class="filters" role="tablist" aria-label="Filter by era">
		{#each eras as era (era)}
			<button
				class="filter-btn"
				class:is-active={activeEra === era}
				onclick={() => setEra(era)}
				role="tab"
				aria-selected={activeEra === era}
			>
				{era === 'all' ? 'All eras' : era}
				<span class="count">{era === 'all' ? albums.length : albums.filter((a) => a.era === era).length}</span>
			</button>
		{/each}
	</div>

	<div class="grid-wrap">
		<AlbumGrid albums={filtered} />
	</div>

	{#if filtered.length === 0}
		<p class="empty">No albums in this era yet.</p>
	{/if}
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

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-7);
		padding-bottom: var(--space-5);
		border-bottom: 1px solid var(--color-hairline);
	}

	.filter-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		transition: all 0.25s var(--ease-out);
	}

	.filter-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.filter-btn.is-active {
		background: var(--color-accent);
		color: var(--color-bg);
		border-color: var(--color-accent);
	}

	.count {
		font-size: 0.65rem;
		opacity: 0.7;
	}

	.empty {
		text-align: center;
		color: var(--color-text-muted);
		padding: var(--space-8) 0;
		font-style: italic;
	}

	@media (max-width: 640px) {
		.page {
			padding: var(--space-6) var(--space-4) var(--space-7);
		}
	}
</style>
