<script lang="ts">
	import { onMount } from 'svelte';
	import ArticleSearch from '$lib/components/article-search/ArticleSearch.svelte';
	import ArticleGrid from '$lib/components/article-grid/ArticleGrid.svelte';
	import { fetchArticles } from '$lib/firebase/articles';
	import type { Article } from '$lib/types';

	let allArticles = $state<Article[]>([]);
	let filteredArticles = $state<Article[]>([]);
	let isLoading = $state(true);
	let hasError = $state(false);

	onMount(async () => {
		try {
			allArticles = await fetchArticles();
			filteredArticles = allArticles;
		} catch {
			hasError = true;
		} finally {
			isLoading = false;
		}
	});

	function handleResults(results: Article[]) {
		filteredArticles = results;
	}
</script>

<svelte:head>
	<title>Articles | MusBeetle</title>
	<meta
		name="description"
		content="Editorial articles about 2000s jazz: album reviews, musician profiles, scene histories, and listening guides. Powered by Firebase."
	/>
</svelte:head>

<div class="page">
	<header class="page-header">
		<p class="eyebrow">Long reads & quick takes</p>
		<h1 class="page-title">
			Articles, <em>live from Firebase.</em>
		</h1>
		<p class="page-lede">
			Every piece below gets fetched from a Firestore collection when the page loads. Search by
			title, author, or tag, and filter by category. Try clicking "Album Reviews" or typing the
			name of an artist.
		</p>
	</header>

	{#if isLoading}
		<div class="loading">
			<span class="spinner" aria-hidden="true"></span>
			<p>Loading…</p>
		</div>
	{:else if hasError}
		<div class="error-state" role="alert">
			<p class="error-title">Firebase isn't responding</p>
			<p class="error-text">
				The Firestore connection failed. Check the <code>.env</code> file and make sure the
				<code>articles</code> collection has been seeded.
			</p>
		</div>
	{:else}
		<ArticleSearch articles={allArticles} onResults={handleResults} />
		<ArticleGrid articles={filteredArticles} />
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

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		padding: var(--space-9) var(--space-4);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.spinner {
		width: 28px;
		height: 28px;
		border: 2px solid var(--color-hairline-strong);
		border-top-color: var(--color-accent);
		border-radius: 50%;
		animation: spin 0.85s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.error-state {
		padding: var(--space-6);
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-warn);
		border-left: 3px solid var(--color-warn);
	}

	.error-title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.4rem;
		color: var(--color-warn);
		margin: 0 0 var(--space-3);
	}

	.error-text {
		color: var(--color-text-muted);
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.65;
	}

	.error-text code {
		font-family: var(--font-mono);
		font-size: 0.85em;
		padding: 0.1em 0.4em;
		background: var(--color-bg);
		border: 1px solid var(--color-hairline);
		color: var(--color-accent);
	}

	@media (max-width: 640px) {
		.page {
			padding: var(--space-6) var(--space-4) var(--space-7);
		}
	}
</style>
