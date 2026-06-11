<script lang="ts">
	import type { RssFeed } from '$lib/types';

	interface Props {
		feeds: RssFeed[];
	}

	let { feeds }: Props = $props();
</script>

<ul class="feed-list">
	{#each feeds as feed (feed.id)}
		<li class="feed-item">
			<div class="feed-content">
				<div class="feed-header">
					<span class="feed-category">{feed.category}</span>
					<h3 class="feed-name">{feed.name}</h3>
					<p class="feed-publisher">{feed.publisher}</p>
				</div>
				<p class="feed-description">{feed.description}</p>
			</div>
			<a class="feed-link" href={feed.url} target="_blank" rel="noopener noreferrer">
				<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
					<path d="M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44zm0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1zm2 6.6a2 2 0 11-2 2 2 2 0 012-2z"/>
				</svg>
				<span class="link-label">
					<span>Open feed</span>
					<span class="link-arrow">↗</span>
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.feed-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.feed-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		transition: border-color 0.25s var(--ease-out);
	}

	.feed-item:hover {
		border-color: var(--color-hairline-strong);
	}

	.feed-header {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		margin-bottom: var(--space-3);
	}

	.feed-category {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.feed-name {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
		color: var(--color-text);
		margin: 0;
	}

	.feed-publisher {
		font-family: var(--font-body);
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin: 0;
	}

	.feed-description {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 0;
	}

	.feed-link {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		transition: all 0.25s var(--ease-out);
	}

	.feed-link:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
		background: rgba(212, 162, 71, 0.06);
	}

	.feed-link svg {
		flex-shrink: 0;
	}

	.link-label {
		display: inline-flex;
		gap: 0.4em;
	}

	.link-arrow {
		opacity: 0.7;
	}

	@media (min-width: 700px) {
		.feed-item {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-5);
		}

		.feed-content {
			flex: 1;
		}

		.feed-link {
			flex-shrink: 0;
		}
	}
</style>
