<script lang="ts">
	import type { Album } from '$lib/types';

	interface Props {
		album: Album;
		eyebrow?: string;
	}

	let { album, eyebrow = 'Album of the Decade' }: Props = $props();
</script>

<section class="featured" aria-labelledby="featured-title">
	<div class="cover-side">
		<svg
			class="cover"
			viewBox="0 0 400 400"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Cover art for {album.title}"
		>
			<rect width="400" height="400" fill={album.coverPalette.background} />

			<!-- Layered rings -->
			<circle cx="200" cy="200" r="160" fill="none" stroke={album.coverPalette.accent} stroke-width="1" opacity="0.4" />
			<circle cx="200" cy="200" r="120" fill="none" stroke={album.coverPalette.accent} stroke-width="1" opacity="0.6" />
			<circle cx="200" cy="200" r="80" fill="none" stroke={album.coverPalette.accent} stroke-width="1.5" />
			<circle cx="200" cy="200" r="10" fill={album.coverPalette.accent} />

			<!-- Decorative tick marks around the disc -->
			{#each Array(24) as _, i}
				<line
					x1={200 + Math.cos((i * Math.PI) / 12) * 175}
					y1={200 + Math.sin((i * Math.PI) / 12) * 175}
					x2={200 + Math.cos((i * Math.PI) / 12) * 185}
					y2={200 + Math.sin((i * Math.PI) / 12) * 185}
					stroke={album.coverPalette.accent}
					stroke-width={i % 6 === 0 ? 1.5 : 0.6}
					opacity={i % 6 === 0 ? 0.9 : 0.4}
				/>
			{/each}

			<text
				x="30"
				y="50"
				font-family="DM Mono, monospace"
				font-size="10"
				letter-spacing="3"
				fill={album.coverPalette.foreground}
				opacity="0.65"
			>
				NO. {album.rank.toString().padStart(2, '0')} · {album.year}
			</text>

			<text
				x="30"
				y="355"
				font-family="Fraunces, serif"
				font-size="26"
				font-weight="500"
				fill={album.coverPalette.foreground}
			>
				{album.artist}
			</text>
			<text
				x="30"
				y="380"
				font-family="Fraunces, serif"
				font-size="17"
				font-style="italic"
				fill={album.coverPalette.foreground}
				opacity="0.78"
			>
				{album.title}
			</text>
		</svg>
	</div>

	<div class="text-side">
		<p class="eyebrow">{eyebrow}</p>
		<h2 id="featured-title" class="title">{album.title}</h2>
		<p class="artist">
			<span>by</span> {album.artist}
		</p>
		<dl class="info-grid">
			<div>
				<dt>Released</dt>
				<dd>{album.year}</dd>
			</div>
			<div>
				<dt>Era</dt>
				<dd>{album.era}</dd>
			</div>
			<div>
				<dt>Listen first to</dt>
				<dd class="track-title">{album.standoutTrack}</dd>
			</div>
		</dl>
		<p class="blurb">{album.blurb}</p>
		<a class="cta" href="/albums">
			<span>See the full list</span>
			<span class="arrow" aria-hidden="true">→</span>
		</a>
	</div>
</section>

<style>
	.featured {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
		align-items: center;
		padding: var(--space-7) 0;
	}

	.cover-side {
		position: relative;
	}

	.cover {
		width: 100%;
		height: auto;
		display: block;
		border: 1px solid var(--color-hairline);
		box-shadow:
			0 1px 0 rgba(245, 236, 217, 0.06) inset,
			0 40px 80px -30px rgba(0, 0, 0, 0.8);
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: var(--space-4);
	}

	.title {
		font-size: clamp(2.4rem, 6vw, 4rem);
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 50;
		margin-bottom: var(--space-3);
	}

	.artist {
		font-family: var(--font-display);
		font-size: 1.4rem;
		font-variation-settings: 'opsz' 36;
		color: var(--color-text);
		margin-bottom: var(--space-5);
	}

	.artist span {
		color: var(--color-text-muted);
		font-style: italic;
		font-size: 0.9em;
	}

	.info-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-5);
		padding: var(--space-4) 0;
		margin-bottom: var(--space-5);
		border-top: 1px solid var(--color-hairline);
		border-bottom: 1px solid var(--color-hairline);
	}

	.info-grid div {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.info-grid dt {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-faint);
	}

	.info-grid dd {
		font-family: var(--font-display);
		font-size: 1.05rem;
		margin: 0;
		color: var(--color-text);
	}

	.track-title {
		font-style: italic;
		color: var(--color-accent) !important;
	}

	.blurb {
		color: var(--color-text-muted);
		font-size: 1.1rem;
		line-height: 1.65;
		margin-bottom: var(--space-5);
		max-width: 36rem;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-5);
		border: 1px solid var(--color-accent);
		color: var(--color-accent);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: background 0.3s var(--ease-out), color 0.3s var(--ease-out);
	}

	.cta:hover {
		background: var(--color-accent);
		color: var(--color-bg);
	}

	.cta .arrow {
		transition: transform 0.3s var(--ease-out);
	}

	.cta:hover .arrow {
		transform: translateX(4px);
	}

	@media (min-width: 900px) {
		.featured {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
			gap: var(--space-8);
			padding: var(--space-9) 0;
		}
	}
</style>
