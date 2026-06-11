<script lang="ts">
	import AlbumCard from '$lib/components/album-card/AlbumCard.svelte';
	import type { Album } from '$lib/types';

	interface Props {
		albums: Album[];
		limit?: number;
	}

	let { albums, limit }: Props = $props();

	const displayed = $derived(limit ? albums.slice(0, limit) : albums);
</script>

<div class="album-grid">
	{#each displayed as album (album.id)}
		<AlbumCard {album} />
	{/each}
</div>

<style>
	.album-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-7);
	}

	@media (min-width: 640px) {
		.album-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-7) var(--space-6);
		}
	}

	@media (min-width: 1024px) {
		.album-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
