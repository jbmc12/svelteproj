<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Venue } from '$lib/types';
	import { venues } from '$lib/data/venues';

	interface Props {
		height?: string;
	}

	let { height = '480px' }: Props = $props();

	let mapContainer: HTMLDivElement;
	let mapInstance: any = null;
	let selectedVenue = $state<Venue | null>(null);

	onMount(async () => {
		const L = await import('leaflet');

		mapInstance = L.map(mapContainer, {
			center: [30, -10],
			zoom: 2,
			scrollWheelZoom: false,
			zoomControl: true,
			worldCopyJump: true
		});

		L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
				maxZoom: 19
			}
		).addTo(mapInstance);

		const accentColor = getComputedStyle(document.documentElement)
			.getPropertyValue('--color-accent')
			.trim();

		venues.forEach((venue) => {
			const customIcon = L.divIcon({
				className: 'venue-marker',
				html: `<span class="marker-dot" style="background:${accentColor}"></span>`,
				iconSize: [16, 16],
				iconAnchor: [8, 8]
			});

			const marker = L.marker([venue.latitude, venue.longitude], { icon: customIcon }).addTo(
				mapInstance
			);

			marker.bindPopup(
				`<div class="venue-popup">
					<h3>${venue.name}</h3>
					<p class="venue-location">${venue.city}, ${venue.country}</p>
					<p class="venue-founded">Since ${venue.founded}</p>
					<p class="venue-description">${venue.description}</p>
				</div>`,
				{ className: 'venue-popup-wrap', maxWidth: 280 }
			);

			marker.on('click', () => {
				selectedVenue = venue;
			});
		});
	});

	onDestroy(() => {
		if (mapInstance) {
			mapInstance.remove();
		}
	});

	function focusVenue(venue: Venue) {
		if (!mapInstance) return;
		mapInstance.flyTo([venue.latitude, venue.longitude], 5, { duration: 1.2 });
		selectedVenue = venue;
	}
</script>

<div class="map-section">
	<div class="map-wrapper">
		<div class="map" bind:this={mapContainer} style="height: {height};"></div>
		<div class="map-legend">
			<span class="legend-dot"></span>
			<span class="legend-text">Jazz venues</span>
		</div>
	</div>

	<aside class="venue-list" aria-label="Venue index">
		<h3 class="list-title">Eight rooms</h3>
		<p class="list-intro">
			Click a pin or a name below to fly the map to the venue.
		</p>
		<ul>
			{#each venues as venue (venue.id)}
				<li>
					<button
						class="venue-item"
						class:is-active={selectedVenue?.id === venue.id}
						onclick={() => focusVenue(venue)}
					>
						<span class="venue-name">{venue.name}</span>
						<span class="venue-meta">{venue.city} · {venue.founded}</span>
					</button>
				</li>
			{/each}
		</ul>
	</aside>
</div>

<style>
	.map-section {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-5);
	}

	.map-wrapper {
		position: relative;
		border: 1px solid var(--color-hairline);
		overflow: hidden;
		background: var(--color-bg-elevated);
	}

	.map {
		width: 100%;
		background: var(--color-bg-elevated);
	}

	.map-legend {
		position: absolute;
		bottom: var(--space-3);
		left: var(--space-3);
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: 0.4rem 0.7rem;
		background: rgba(14, 10, 6, 0.85);
		border: 1px solid var(--color-hairline);
		backdrop-filter: blur(8px);
		z-index: 400;
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-accent);
		box-shadow: 0 0 0 3px rgba(212, 162, 71, 0.2);
	}

	.legend-text {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.venue-list {
		padding-top: var(--space-3);
	}

	.list-title {
		font-size: 1.5rem;
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 50;
		margin-bottom: var(--space-2);
	}

	.list-intro {
		color: var(--color-text-muted);
		font-size: 0.9rem;
		margin-bottom: var(--space-4);
	}

	.venue-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.venue-item {
		width: 100%;
		text-align: left;
		padding: var(--space-3) var(--space-3) var(--space-3) 0;
		border-bottom: 1px solid var(--color-hairline);
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		transition: padding 0.25s var(--ease-out), border-color 0.25s var(--ease-out);
	}

	.venue-item:hover,
	.venue-item.is-active {
		padding-left: var(--space-3);
		border-color: var(--color-accent);
	}

	.venue-item:hover .venue-name,
	.venue-item.is-active .venue-name {
		color: var(--color-accent);
	}

	.venue-name {
		font-family: var(--font-display);
		font-size: 1.05rem;
		color: var(--color-text);
		transition: color 0.2s var(--ease-out);
	}

	.venue-meta {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-faint);
	}

	@media (min-width: 900px) {
		.map-section {
			grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
			gap: var(--space-6);
		}
	}

	/* Leaflet overrides — keep selectors broad since they're in shadowless layer */
	:global(.venue-marker .marker-dot) {
		display: block;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		box-shadow:
			0 0 0 3px rgba(212, 162, 71, 0.25),
			0 0 0 6px rgba(212, 162, 71, 0.1);
		cursor: pointer;
		transition: transform 0.2s ease-out;
	}

	:global(.venue-marker:hover .marker-dot) {
		transform: scale(1.25);
	}

	:global(.venue-popup-wrap .leaflet-popup-content-wrapper) {
		background: var(--color-bg-elevated);
		color: var(--color-text);
		border-radius: 0;
		border: 1px solid var(--color-hairline-strong);
		box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.8);
	}

	:global(.venue-popup-wrap .leaflet-popup-content) {
		margin: 14px 18px;
		font-family: var(--font-body);
	}

	:global(.venue-popup-wrap .leaflet-popup-tip) {
		background: var(--color-bg-elevated);
	}

	:global(.venue-popup h3) {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-style: italic;
		margin: 0 0 0.2rem;
		color: var(--color-text);
	}

	:global(.venue-popup .venue-location) {
		font-family: var(--font-body);
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin: 0 0 0.1rem;
	}

	:global(.venue-popup .venue-founded) {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0 0 0.6rem;
	}

	:global(.venue-popup .venue-description) {
		font-size: 0.85rem;
		line-height: 1.55;
		color: var(--color-text-muted);
		margin: 0;
	}

	:global(.leaflet-control-zoom a) {
		background: var(--color-bg-elevated) !important;
		color: var(--color-text) !important;
		border-color: var(--color-hairline) !important;
	}

	:global(.leaflet-control-attribution) {
		background: rgba(14, 10, 6, 0.7) !important;
		color: var(--color-text-faint) !important;
		font-size: 0.65rem !important;
	}

	:global(.leaflet-control-attribution a) {
		color: var(--color-text-muted) !important;
	}
</style>
