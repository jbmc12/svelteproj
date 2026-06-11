<script lang="ts">
	import type { Article, ArticleCategory } from '$lib/types';

	interface Props {
		articles: Article[];
		onResults: (filtered: Article[]) => void;
	}

	let { articles, onResults }: Props = $props();

	let searchQuery = $state('');
	let activeCategory = $state<ArticleCategory | 'all'>('all');

	const categories: Array<{ value: ArticleCategory | 'all'; label: string }> = [
		{ value: 'all', label: 'All Articles' },
		{ value: 'album-review', label: 'Album Reviews' },
		{ value: 'musician-profile', label: 'Musician Profiles' },
		{ value: 'scene-history', label: 'Scene History' },
		{ value: 'listening-guide', label: 'Listening Guides' }
	];

	const filtered = $derived.by(() => {
		const queryLower = searchQuery.trim().toLowerCase();
		return articles.filter((article) => {
			const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
			if (!queryLower) return matchesCategory;
			const haystack =
				article.title.toLowerCase() +
				' ' +
				article.excerpt.toLowerCase() +
				' ' +
				article.author.toLowerCase() +
				' ' +
				article.tags.join(' ');
			return matchesCategory && haystack.includes(queryLower);
		});
	});

	const hasActiveFilter = $derived(searchQuery.trim().length > 0 || activeCategory !== 'all');

	$effect(() => {
		onResults(filtered);
	});

	function setCategory(category: ArticleCategory | 'all') {
		activeCategory = category;
	}

	function clearFilters() {
		searchQuery = '';
		activeCategory = 'all';
	}

	function categoryCount(category: ArticleCategory | 'all'): number {
		if (category === 'all') return articles.length;
		return articles.filter((a) => a.category === category).length;
	}
</script>

<div class="search-bar">
	<div class="search-row">
		<div class="search-input-wrap">
			<svg
				class="search-icon"
				viewBox="0 0 20 20"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
				<circle cx="9" cy="9" r="6.5" />
				<line x1="13.5" y1="13.5" x2="17" y2="17" stroke-linecap="round" />
			</svg>
			<input
				type="search"
				placeholder="Search by title, author, or tag…"
				bind:value={searchQuery}
				aria-label="Search articles"
			/>
		</div>
		{#if hasActiveFilter}
			<button class="clear-btn" onclick={clearFilters} aria-label="Clear all filters">
				Clear
			</button>
		{/if}
	</div>

	<div class="category-row" role="tablist" aria-label="Filter by category">
		{#each categories as cat (cat.value)}
			<button
				class="category-btn"
				class:is-active={activeCategory === cat.value}
				onclick={() => setCategory(cat.value)}
				role="tab"
				aria-selected={activeCategory === cat.value}
			>
				{cat.label}
				<span class="count">{categoryCount(cat.value)}</span>
			</button>
		{/each}
	</div>

	<p class="result-count" aria-live="polite">
		{#if hasActiveFilter}
			<span class="result-num">{filtered.length}</span>
			<span>of</span>
			<span class="result-num">{articles.length}</span>
			<span>articles match</span>
		{:else}
			<span class="result-num">{articles.length}</span>
			<span>articles total</span>
		{/if}
	</p>
</div>

<style>
	.search-bar {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		margin-bottom: var(--space-6);
	}

	.search-row {
		display: flex;
		gap: var(--space-3);
		align-items: stretch;
	}

	.search-input-wrap {
		position: relative;
		flex: 1;
	}

	.search-icon {
		position: absolute;
		left: var(--space-3);
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		color: var(--color-text-faint);
		pointer-events: none;
	}

	input[type='search'] {
		width: 100%;
		padding: var(--space-3) var(--space-4) var(--space-3) var(--space-7);
		background: var(--color-bg);
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text);
		font-family: var(--font-body);
		font-size: 0.95rem;
		transition: border-color 0.2s var(--ease-out);
	}

	input[type='search']:focus {
		outline: none;
		border-color: var(--color-accent);
	}

	input[type='search']::placeholder {
		color: var(--color-text-faint);
	}

	.clear-btn {
		padding: 0 var(--space-4);
		background: transparent;
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		transition: all 0.2s var(--ease-out);
	}

	.clear-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.category-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.category-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: transparent;
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		transition: all 0.2s var(--ease-out);
	}

	.category-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.category-btn.is-active {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-bg);
	}

	.count {
		font-size: 0.65rem;
		opacity: 0.7;
	}

	.result-count {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-text-faint);
		display: flex;
		gap: 0.4em;
		align-items: baseline;
		margin: 0;
		padding-top: var(--space-3);
		border-top: 1px solid var(--color-hairline);
	}

	.result-num {
		font-family: var(--font-display);
		font-size: 1.1rem;
		color: var(--color-accent);
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 540px) {
		.search-bar {
			padding: var(--space-4);
		}
	}
</style>
