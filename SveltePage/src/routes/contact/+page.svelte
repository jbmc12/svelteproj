<script lang="ts">
	import JazzMap from '$lib/components/jazz-map/JazzMap.svelte';
	import ContactForm from '$lib/components/contact-form/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact & Venues — MusBeetle</title>
	<meta
		name="description"
		content="A map of legendary jazz venues across four continents, plus a way to reach the MusBeetle editors."
	/>
</svelte:head>

<div class="page">
	<header class="page-header">
		<p class="eyebrow">Get in touch</p>
		<h1 class="page-title">
			Where the music <em>is.</em>
		</h1>
		<p class="page-lede">
			These eight rooms have shaped the way jazz sounds — and gets recorded — for decades. Many of
			the albums in our list passed through them. Below the map, a form to send us a suggestion,
			a correction, or just say hello.
		</p>
	</header>

	<section class="map-block" aria-labelledby="map-heading">
		<div class="block-header">
			<h2 id="map-heading" class="block-title">The Venues</h2>
			<p class="block-meta">
				<span>8 rooms · 4 continents</span>
			</p>
		</div>
		<JazzMap height="520px" />
	</section>

	<section class="contact-block" aria-labelledby="contact-heading">
		<div class="contact-grid">
			<div class="contact-intro">
				<p class="eyebrow">Reach the editors</p>
				<h2 id="contact-heading" class="block-title">
					Tell us <em>what we missed.</em>
				</h2>
				<p class="contact-text">
					Twelve picks for ten years of jazz is necessarily a thin slice. If you think a record
					belongs here that doesn't, tell us why. If you spotted an error, we'd rather know.
				</p>
				<div class="direct-contact">
					<div class="contact-item">
						<span class="contact-label">Editorial</span>
						<a href="mailto:editors@musbeetle.example">editors@musbeetle.example</a>
					</div>
					<div class="contact-item">
						<span class="contact-label">Partnerships</span>
						<a href="mailto:hello@musbeetle.example">hello@musbeetle.example</a>
					</div>
					<div class="contact-item">
						<span class="contact-label">Based in</span>
						<span>Brooklyn, New York</span>
					</div>
				</div>
			</div>
			<div class="form-wrap">
				<ContactForm />
			</div>
		</div>
	</section>
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

	.map-block {
		margin-bottom: var(--space-9);
	}

	.block-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-bottom: var(--space-4);
		margin-bottom: var(--space-5);
		border-bottom: 1px solid var(--color-hairline);
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.block-title {
		font-size: clamp(1.8rem, 3vw, 2.4rem);
		margin: 0;
	}

	.block-title em {
		font-style: italic;
		color: var(--color-accent);
	}

	.block-meta {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-faint);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-7);
	}

	.contact-intro .eyebrow {
		margin-bottom: var(--space-3);
	}

	.contact-text {
		color: var(--color-text-muted);
		font-size: 1.05rem;
		line-height: 1.65;
		max-width: 30rem;
		margin: var(--space-4) 0 var(--space-6);
	}

	.direct-contact {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-hairline);
	}

	.contact-item {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.contact-label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-faint);
	}

	.contact-item a {
		color: var(--color-accent);
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-style: italic;
		transition: color 0.2s var(--ease-out);
	}

	.contact-item a:hover {
		color: var(--color-text);
	}

	@media (min-width: 900px) {
		.contact-grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
			gap: var(--space-7);
			align-items: start;
		}
	}

	@media (max-width: 640px) {
		.page {
			padding: var(--space-6) var(--space-4) var(--space-7);
		}
	}
</style>
