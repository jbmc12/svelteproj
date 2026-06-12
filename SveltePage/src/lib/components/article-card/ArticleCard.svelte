<script lang="ts">
	import type { Article, ArticleCategory } from '$lib/types';

	interface Props {
		article: Article;
		onEdit?: (article: Article) => void;
		onDelete?: (article: Article) => void;
	}

	let { article, onEdit, onDelete }: Props = $props();

	const categoryLabels: Record<ArticleCategory, string> = {
		'album-review': 'Album Review',
		'musician-profile': 'Musician Profile',
		'scene-history': 'Scene History',
		'listening-guide': 'Listening Guide'
	};

	const formattedDate = $derived(
		new Date(article.publishedAt).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);

	const swatchStyle = $derived(
		`background: hsl(${article.accentHue}, 45%, 35%); color: hsl(${article.accentHue}, 70%, 88%);`
	);

	const hasActions = $derived(onEdit !== undefined || onDelete !== undefined);
</script>

<article class="article-card">
	<a href="/articles/{article.slug}" class="card-link" aria-label="Read {article.title}">
		<div class="art" style={swatchStyle}>
			<span class="category-tag">{categoryLabels[article.category]}</span>
			<span class="article-mark" aria-hidden="true">
				<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
					<circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.6"/>
					<circle cx="40" cy="40" r="22" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.5"/>
					<circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.9"/>
					<circle cx="40" cy="40" r="3" fill="currentColor"/>
				</svg>
			</span>
		</div>
		<div class="text">
			<p class="meta">
				<span>{formattedDate}</span>
				<span class="dot" aria-hidden="true">·</span>
				<span>{article.readingTimeMinutes} min read</span>
			</p>
			<h3 class="title">{article.title}</h3>
			<p class="excerpt">{article.excerpt}</p>
			<div class="byline">
				<span class="by-label">By</span>
				<span class="author">{article.author}</span>
			</div>
			<div class="tags">
				{#each article.tags.slice(0, 3) as tag (tag)}
					<span class="tag">#{tag}</span>
				{/each}
			</div>
		</div>
	</a>
	{#if hasActions}
		<div class="actions">
			{#if onEdit}
				<button
					class="action-btn"
					onclick={() => onEdit?.(article)}
					aria-label="Edit {article.title}"
				>
					<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
						<path d="M11 2L14 5L5 14H2V11L11 2Z" stroke-linejoin="round"/>
					</svg>
					<span>Edit</span>
				</button>
			{/if}
			{#if onDelete}
				<button
					class="action-btn action-danger"
					onclick={() => onDelete?.(article)}
					aria-label="Delete {article.title}"
				>
					<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
						<path d="M3 5h10M6 5V3h4v2M5 5l1 9h4l1-9" stroke-linejoin="round"/>
					</svg>
					<span>Delete</span>
				</button>
			{/if}
		</div>
	{/if}
</article>

<style>
	.article-card {
		display: flex;
		flex-direction: column;
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		transition: transform 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
	}

	.article-card:hover {
		transform: translateY(-3px);
		border-color: var(--color-hairline-strong);
	}

	.card-link {
		display: flex;
		flex-direction: column;
		color: inherit;
		text-decoration: none;
		flex: 1;
	}

	.article-card:hover .title {
		color: var(--color-accent);
	}

	.title {
		transition: color 0.25s var(--ease-out);
	}

	.art {
		position: relative;
		aspect-ratio: 16 / 9;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: var(--space-4);
		overflow: hidden;
	}

	.category-tag {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 0.4rem 0.65rem;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		position: relative;
		z-index: 1;
	}

	.article-mark {
		position: absolute;
		right: -10px;
		top: -10px;
		width: 110px;
		opacity: 0.65;
	}

	.article-mark svg {
		width: 100%;
		display: block;
	}

	.text {
		padding: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		flex: 1;
	}

	.meta {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-faint);
		display: flex;
		gap: 0.6em;
		align-items: center;
		margin: 0;
	}

	.dot {
		opacity: 0.7;
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 500;
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
		line-height: 1.15;
		color: var(--color-text);
	}

	.excerpt {
		color: var(--color-text-muted);
		font-size: 0.94rem;
		line-height: 1.6;
		flex: 1;
	}

	.byline {
		padding-top: var(--space-3);
		border-top: 1px solid var(--color-hairline);
		display: flex;
		align-items: baseline;
		gap: 0.4em;
	}

	.by-label {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-faint);
	}

	.author {
		font-family: var(--font-display);
		font-style: italic;
		color: var(--color-accent);
		font-size: 0.95rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-text-faint);
		letter-spacing: 0.05em;
	}

	.actions {
		display: flex;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		border-top: 1px solid var(--color-hairline);
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 0.5rem 0.8rem;
		background: transparent;
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		transition: all 0.2s var(--ease-out);
	}

	.action-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.action-danger:hover {
		border-color: var(--color-warn);
		color: var(--color-warn);
	}
</style>
