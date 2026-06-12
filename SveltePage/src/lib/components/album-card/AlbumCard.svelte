<script lang="ts">
	import type { Album } from '$lib/types';

	interface Props {
		album: Album;
		showRank?: boolean;
	}

	let { album, showRank = true }: Props = $props();

	const rankString = $derived(album.rank.toString().padStart(2, '0'));

	const spotifySearchUrl = $derived(
		`https://open.spotify.com/search/${encodeURIComponent(`${album.artist} ${album.title}`)}`
	);
</script>

<article class="album-card">
	<div class="cover-wrap">
		<svg
			class="cover"
			viewBox="0 0 300 300"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Cover art for {album.title} by {album.artist}"
		>
			<rect width="300" height="300" fill={album.coverPalette.background} />

			{#if album.coverPalette.style === 'lines'}
				{#each Array(14) as _, i}
					<line
						x1="0"
						y1={30 + i * 18}
						x2="300"
						y2={30 + i * 18}
						stroke={album.coverPalette.accent}
						stroke-width="1"
						opacity={i % 3 === 0 ? 0.9 : 0.25}
					/>
				{/each}
			{:else if album.coverPalette.style === 'circle'}
				<circle cx="150" cy="150" r="90" fill="none" stroke={album.coverPalette.accent} stroke-width="1.5" />
				<circle cx="150" cy="150" r="60" fill="none" stroke={album.coverPalette.accent} stroke-width="0.8" opacity="0.5" />
				<circle cx="150" cy="150" r="6" fill={album.coverPalette.accent} />
			{:else if album.coverPalette.style === 'split'}
				<rect x="0" y="160" width="300" height="140" fill={album.coverPalette.accent} opacity="0.85" />
				<line x1="0" y1="160" x2="300" y2="160" stroke={album.coverPalette.foreground} stroke-width="0.6" opacity="0.4" />
			{:else if album.coverPalette.style === 'grid'}
				{#each Array(5) as _, row}
					{#each Array(5) as _, col}
						<rect
							x={30 + col * 50}
							y={30 + row * 50}
							width="46"
							height="46"
							fill="none"
							stroke={album.coverPalette.accent}
							stroke-width="0.6"
							opacity={(row + col) % 2 === 0 ? 0.8 : 0.3}
						/>
					{/each}
				{/each}
			{:else}
				<rect x="40" y="60" width="220" height="180" fill={album.coverPalette.accent} opacity="0.18" />
				<rect x="40" y="60" width="220" height="180" fill="none" stroke={album.coverPalette.accent} stroke-width="1" />
			{/if}

			<!-- Title block at the top -->
			<text
				x="24"
				y="42"
				font-family="DM Mono, monospace"
				font-size="9"
				letter-spacing="2"
				fill={album.coverPalette.foreground}
				opacity="0.6"
			>
				{album.year.toString().toUpperCase()} · {album.era.toUpperCase()}
			</text>

			<!-- Artist name at the bottom -->
			<text
				x="24"
				y="262"
				font-family="Fraunces, serif"
				font-size="18"
				font-weight="500"
				fill={album.coverPalette.foreground}
			>
				{album.artist}
			</text>

			<!-- Album title at the bottom, italicized -->
			<text
				x="24"
				y="282"
				font-family="Fraunces, serif"
				font-size="13"
				font-style="italic"
				fill={album.coverPalette.foreground}
				opacity="0.78"
			>
				{album.title}
			</text>
		</svg>
	</div>

	<div class="meta">
		{#if showRank}
			<span class="rank" aria-hidden="true">{rankString}</span>
		{/if}
		<div class="text">
			<h3 class="title">{album.title}</h3>
			<p class="artist">{album.artist}</p>
			<p class="info">
				<span class="year">{album.year}</span>
				<span class="dot" aria-hidden="true">·</span>
				<span class="era">{album.era}</span>
			</p>
			<p class="blurb">{album.blurb}</p>
			<p class="standout">
				<span class="standout-label">Standout track</span>
				<span class="standout-track">{album.standoutTrack}</span>
			</p>
			<a
				class="listen-link"
				href={spotifySearchUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Search for {album.title} by {album.artist} on Spotify"
			>
				<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
					<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.16a.75.75 0 0 1-.33-1.46c4.56-1.03 8.49-.58 11.65 1.34.36.22.47.69.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.99-8.16-2.56-11.98-1.4a.94.94 0 0 1-.55-1.8c4.37-1.32 9.81-.69 13.51 1.6.44.27.58.85.31 1.29zm.13-3.41C15.32 8.39 8.84 8.16 5.18 9.27a1.13 1.13 0 0 1-.66-2.17c4.19-1.27 11.34-1.03 15.79 1.62a1.13 1.13 0 0 1-1.18 1.94z"/>
				</svg>
				<span>Listen on Spotify</span>
				<span class="external-arrow" aria-hidden="true">↗</span>
			</a>
		</div>
	</div>
</article>

<style>
	.album-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.cover-wrap {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
		border: 1px solid var(--color-hairline);
		box-shadow:
			0 1px 0 rgba(245, 236, 217, 0.05) inset,
			0 20px 40px -20px rgba(0, 0, 0, 0.6);
		transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
	}

	.album-card:hover .cover-wrap {
		transform: translateY(-4px);
		box-shadow:
			0 1px 0 rgba(245, 236, 217, 0.08) inset,
			0 30px 60px -20px rgba(0, 0, 0, 0.8);
	}

	.cover {
		width: 100%;
		height: 100%;
		display: block;
	}

	.meta {
		display: flex;
		gap: var(--space-4);
		align-items: flex-start;
	}

	.rank {
		font-family: var(--font-display);
		font-size: 2.4rem;
		font-variation-settings: 'opsz' 144, 'SOFT' 60;
		color: var(--color-accent);
		line-height: 0.9;
		min-width: 2.2rem;
		font-variant-numeric: tabular-nums;
	}

	.text {
		flex: 1;
		min-width: 0;
	}

	.title {
		font-size: 1.4rem;
		font-weight: 500;
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
		color: var(--color-text);
		margin-bottom: 0.15rem;
	}

	.artist {
		font-family: var(--font-body);
		font-size: 1.05rem;
		color: var(--color-text);
		margin-bottom: var(--space-2);
	}

	.info {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-bottom: var(--space-3);
		display: flex;
		gap: 0.6em;
		align-items: center;
	}

	.dot {
		color: var(--color-text-faint);
	}

	.blurb {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.6;
		margin-bottom: var(--space-3);
	}

	.standout {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		padding-top: var(--space-3);
		border-top: 1px solid var(--color-hairline);
	}

	.standout-label {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-faint);
	}

	.standout-track {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1rem;
		color: var(--color-accent);
	}

	.listen-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		margin-top: var(--space-3);
		padding: 0.5rem 0.85rem;
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		align-self: flex-start;
		transition: all 0.25s var(--ease-out);
	}

	.listen-link:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.external-arrow {
		font-size: 0.85em;
		opacity: 0.7;
	}
</style>
