<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { fetchArticleBySlug } from '$lib/firebase/articles';
	import type { Article, ArticleCategory } from '$lib/types';

	let article = $state<Article | null>(null);
	let isLoading = $state(true);
	let isNotFound = $state(false);
	let hasError = $state(false);

	const categoryLabels: Record<ArticleCategory, string> = {
		'album-review': 'Album Review',
		'musician-profile': 'Musician Profile',
		'scene-history': 'Scene History',
		'listening-guide': 'Listening Guide'
	};

	const formattedDate = $derived(
		article
			? new Date(article.publishedAt).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
			  })
			: ''
	);

	const swatchStyle = $derived(
		article
			? `background: hsl(${article.accentHue}, 45%, 30%); color: hsl(${article.accentHue}, 70%, 88%);`
			: ''
	);

	// Body uses literal "\n\n" between paragraphs in seed data.
	const paragraphs = $derived(
		article ? article.body.split(/\\n\\n|\n\n/).filter((p) => p.trim().length > 0) : []
	);

	onMount(async () => {
		const slug = page.params.slug;
		if (!slug) {
			isNotFound = true;
			isLoading = false;
			return;
		}
		try {
			const result = await fetchArticleBySlug(slug);
			if (result === null) {
				isNotFound = true;
			} else {
				article = result;
			}
		} catch {
			hasError = true;
		} finally {
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>{article ? `${article.title} | MusBeetle` : 'Article | MusBeetle'}</title>
	{#if article}
		<meta name="description" content={article.excerpt} />
	{/if}
</svelte:head>

<div class="page">
	{#if isLoading}
		<div class="state">
			<span class="spinner" aria-hidden="true"></span>
			<p>Loading article…</p>
		</div>
	{:else if isNotFound}
		<div class="state">
			<h1 class="state-title">Not found</h1>
			<p class="state-text">
				No article matches that URL. It may have been deleted, or the link might be wrong.
			</p>
			<a class="back-link" href="/articles">
				<span class="arrow" aria-hidden="true">←</span>
				<span>Back to all articles</span>
			</a>
		</div>
	{:else if hasError}
		<div class="state error">
			<h1 class="state-title">Couldn't load this article</h1>
			<p class="state-text">
				The Firestore request failed. Check the connection and try refreshing.
			</p>
			<a class="back-link" href="/articles">
				<span class="arrow" aria-hidden="true">←</span>
				<span>Back to all articles</span>
			</a>
		</div>
	{:else if article}
		<a class="back-link top" href="/articles">
			<span class="arrow" aria-hidden="true">←</span>
			<span>All articles</span>
		</a>

		<header class="article-header">
			<p class="category">{categoryLabels[article.category]}</p>
			<h1 class="article-title">{article.title}</h1>
			<p class="article-excerpt">{article.excerpt}</p>
			<div class="byline-row">
				<div class="byline-item">
					<span class="byline-label">Written by</span>
					<span class="byline-value">{article.author}</span>
				</div>
				<div class="byline-item">
					<span class="byline-label">Published</span>
					<span class="byline-value">{formattedDate}</span>
				</div>
				<div class="byline-item">
					<span class="byline-label">Reading time</span>
					<span class="byline-value">{article.readingTimeMinutes} min</span>
				</div>
			</div>
		</header>

		<div class="banner" style={swatchStyle} aria-hidden="true">
			<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
				<circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
				<circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.6"/>
				<circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.8"/>
				<circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" stroke-width="1"/>
				<circle cx="100" cy="100" r="5" fill="currentColor"/>
			</svg>
		</div>

		<article class="article-body">
			{#each paragraphs as paragraph, i (i)}
				<p>{paragraph}</p>
			{/each}
		</article>

		{#if article.tags.length > 0}
			<footer class="article-footer">
				<p class="tags-label">Tagged</p>
				<ul class="tag-list">
					{#each article.tags as tag (tag)}
						<li class="tag-chip">#{tag}</li>
					{/each}
				</ul>
			</footer>
		{/if}

		<a class="back-link bottom" href="/articles">
			<span class="arrow" aria-hidden="true">←</span>
			<span>Back to all articles</span>
		</a>
	{/if}
</div>

<style>
	.page {
		max-width: 48rem;
		margin: 0 auto;
		padding: var(--space-6) var(--space-5) var(--space-9);
	}

	.state {
		text-align: center;
		padding: var(--space-9) var(--space-4);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
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

	.state-title {
		font-family: var(--font-display);
		font-size: 2.4rem;
		font-style: italic;
		margin: 0;
	}

	.state.error .state-title {
		color: var(--color-warn);
	}

	.state-text {
		color: var(--color-text-muted);
		max-width: 32rem;
		margin: 0;
		line-height: 1.6;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		transition: color 0.2s var(--ease-out);
	}

	.back-link:hover {
		color: var(--color-accent);
	}

	.back-link.top {
		margin-bottom: var(--space-6);
	}

	.back-link.bottom {
		margin-top: var(--space-7);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-hairline);
		width: 100%;
		padding-bottom: 0;
	}

	.arrow {
		transition: transform 0.2s var(--ease-out);
	}

	.back-link:hover .arrow {
		transform: translateX(-3px);
	}

	.article-header {
		margin-bottom: var(--space-6);
	}

	.category {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0 0 var(--space-4);
	}

	.article-title {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		line-height: 1.1;
		margin: 0 0 var(--space-4);
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
	}

	.article-excerpt {
		color: var(--color-text);
		font-size: clamp(1.05rem, 1.6vw, 1.2rem);
		line-height: 1.6;
		margin: 0 0 var(--space-5);
		font-family: var(--font-display);
		font-style: italic;
		font-variation-settings: 'opsz' 36;
	}

	.byline-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-5);
		padding: var(--space-4) 0;
		border-top: 1px solid var(--color-hairline);
		border-bottom: 1px solid var(--color-hairline);
	}

	.byline-item {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.byline-label {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-faint);
	}

	.byline-value {
		font-family: var(--font-display);
		font-size: 1rem;
		color: var(--color-text);
	}

	.banner {
		aspect-ratio: 21 / 9;
		max-height: 280px;
		margin: var(--space-6) 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.banner svg {
		width: 60%;
		height: 60%;
	}

	.article-body {
		font-size: 1.05rem;
		line-height: 1.75;
		color: var(--color-text);
	}

	.article-body p {
		margin: 0 0 var(--space-5);
	}

	.article-body p:first-child::first-letter {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 3.6rem;
		line-height: 0.9;
		float: left;
		padding: 0.2rem var(--space-3) 0 0;
		color: var(--color-accent);
		font-variation-settings: 'opsz' 144, 'SOFT' 80;
	}

	.article-footer {
		margin-top: var(--space-7);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-hairline);
	}

	.tags-label {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-faint);
		margin: 0 0 var(--space-3);
	}

	.tag-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tag-chip {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--color-text-muted);
		padding: 0.3rem 0.7rem;
		border: 1px solid var(--color-hairline);
		letter-spacing: 0.05em;
	}

	@media (max-width: 640px) {
		.page {
			padding: var(--space-5) var(--space-4) var(--space-7);
		}

		.byline-row {
			gap: var(--space-4);
		}
	}
</style>
