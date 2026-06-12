<script lang="ts">
	import ArticleCard from '$lib/components/article-card/ArticleCard.svelte';
	import type { Article } from '$lib/types';

	interface Props {
		articles: Article[];
		onEdit?: (article: Article) => void;
		onDelete?: (article: Article) => void;
	}

	let { articles, onEdit, onDelete }: Props = $props();
</script>

{#if articles.length === 0}
	<div class="empty">
		<p class="empty-title">No articles match</p>
		<p class="empty-text">Try a different category or search term.</p>
	</div>
{:else}
	<div class="article-grid">
		{#each articles as article (article.id)}
			<ArticleCard {article} {onEdit} {onDelete} />
		{/each}
	</div>
{/if}

<style>
	.article-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-5);
	}

	.empty {
		text-align: center;
		padding: var(--space-8) var(--space-5);
		border: 1px dashed var(--color-hairline);
	}

	.empty-title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-style: italic;
		color: var(--color-text);
		margin: 0 0 var(--space-2);
	}

	.empty-text {
		color: var(--color-text-muted);
		margin: 0;
	}

	@media (min-width: 640px) {
		.article-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.article-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
