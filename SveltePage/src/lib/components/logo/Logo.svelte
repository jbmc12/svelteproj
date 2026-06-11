<script lang="ts">
	interface Props {
		size?: number;
		mono?: boolean;
	}

	let { size = 28, mono = false }: Props = $props();

	const accentColor = $derived(mono ? 'currentColor' : 'var(--color-accent)');
	const bodyColor = 'currentColor';
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 40 40"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	aria-label="MusBeetle logo"
	role="img"
>
	<!-- Outer ring, record disc reference -->
	<circle cx="20" cy="20" r="18.5" stroke={bodyColor} stroke-width="1" opacity="0.55" />

	<!-- Beetle body, oval -->
	<ellipse cx="20" cy="21" rx="8" ry="10" fill={bodyColor} />

	<!-- Vertical center line, wing case division -->
	<line x1="20" y1="13" x2="20" y2="31" stroke={accentColor} stroke-width="0.8" />

	<!-- Head -->
	<circle cx="20" cy="11.5" r="3" fill={bodyColor} />

	<!-- Antennae -->
	<line x1="18.5" y1="9.5" x2="16" y2="6.5" stroke={bodyColor} stroke-width="1" stroke-linecap="round" />
	<line x1="21.5" y1="9.5" x2="24" y2="6.5" stroke={bodyColor} stroke-width="1" stroke-linecap="round" />
	<circle cx="16" cy="6.5" r="1" fill={accentColor} />
	<circle cx="24" cy="6.5" r="1" fill={accentColor} />

	<!-- Center accent, record label -->
	<circle cx="20" cy="20" r="1.6" fill={accentColor} />
</svg>
