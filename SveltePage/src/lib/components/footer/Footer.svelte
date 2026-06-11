<script lang="ts">
	import Logo from '$lib/components/logo/Logo.svelte';
	import type { NavLink, SocialLink } from '$lib/types';

	const projectLinks: NavLink[] = [
		{ href: '/', label: 'Home' },
		{ href: '/albums', label: 'The Albums' },
		{ href: '/articles', label: 'Articles' },
		{ href: '/rss', label: 'RSS Feeds' },
		{ href: '/contact', label: 'Contact' }
	];

	const externalLinks: NavLink[] = [
		{ href: 'https://github.com/', label: 'GitHub Repository' },
		{ href: 'https://www.figma.com/', label: 'Figma Design Reference' },
		{ href: 'https://kit.svelte.dev/', label: 'Built with SvelteKit' }
	];

	const socialLinks: SocialLink[] = [
		{ platform: 'instagram', label: 'Instagram', href: 'https://instagram.com/' },
		{ platform: 'x', label: 'X (Twitter)', href: 'https://x.com/' },
		{ platform: 'youtube', label: 'YouTube', href: 'https://youtube.com/' },
		{ platform: 'bandcamp', label: 'Bandcamp', href: 'https://bandcamp.com/' },
		{ platform: 'github', label: 'GitHub', href: 'https://github.com/' }
	];

	const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="footer-inner">
		<div class="footer-grid">
			<div class="footer-brand">
				<a href="/" class="footer-logo" aria-label="MusBeetle home">
					<Logo size={36} />
					<span>MusBeetle</span>
				</a>
				<p class="footer-description">
					A curated guide to twelve jazz albums that defined the 2000s. Editorial notes, listening
					recommendations, and a map of the rooms where this music gets played.
				</p>
			</div>

			<nav class="footer-section" aria-label="Site navigation">
				<h2 class="footer-heading">Explore</h2>
				<ul>
					{#each projectLinks as link (link.href)}
						<li><a href={link.href}>{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<nav class="footer-section" aria-label="External resources">
				<h2 class="footer-heading">Resources</h2>
				<ul>
					{#each externalLinks as link (link.href)}
						<li>
							<a href={link.href} target="_blank" rel="noopener noreferrer">
								{link.label}
								<span class="external-mark" aria-hidden="true">↗</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="footer-section">
				<h2 class="footer-heading">Follow</h2>
				<ul class="social-list">
					{#each socialLinks as social (social.platform)}
						<li>
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.label}
								class="social-link"
							>
								{#if social.platform === 'instagram'}
									<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
										<rect x="3" y="3" width="18" height="18" rx="5"/>
										<circle cx="12" cy="12" r="4"/>
										<circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
									</svg>
								{:else if social.platform === 'x'}
									<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
									</svg>
								{:else if social.platform === 'youtube'}
									<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
										<rect x="2" y="5" width="20" height="14" rx="3"/>
										<path d="M10 9l5 3-5 3z" fill="currentColor"/>
									</svg>
								{:else if social.platform === 'bandcamp'}
									<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
										<path d="M2 18l4-12h16l-4 12z"/>
									</svg>
								{:else if social.platform === 'github'}
									<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
										<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.74-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
									</svg>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="footer-bottom">
			<p class="copyright">
				© {currentYear} MusBeetle. All rights reserved.
			</p>
			<ul class="legal-links">
				<li><a href="/contact">Privacy and Cookies Policy</a></li>
				<li><a href="/contact">Terms of Use</a></li>
				<li><a href="/contact">Editorial Standards</a></li>
			</ul>
			<p class="colophon">
				Set in <span class="font-name">Fraunces</span> and <span class="font-name">DM Sans</span>.
			</p>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: var(--space-10);
		border-top: 1px solid var(--color-hairline);
		background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-elevated) 100%);
	}

	.footer-inner {
		max-width: var(--max-content);
		margin: 0 auto;
		padding: var(--space-8) var(--space-5) var(--space-5);
	}

	.footer-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-7);
		padding-bottom: var(--space-7);
		border-bottom: 1px solid var(--color-hairline);
	}

	.footer-brand {
		flex: 1 1 22rem;
		min-width: 0;
	}

	.footer-logo {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		font-family: var(--font-display);
		font-size: 1.5rem;
		color: var(--color-text);
		margin-bottom: var(--space-4);
	}

	.footer-description {
		color: var(--color-text-muted);
		max-width: 32rem;
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.footer-section {
		flex: 1 1 10rem;
		min-width: 8rem;
	}

	.footer-heading {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-text-faint);
		margin-bottom: var(--space-4);
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.footer-section a {
		color: var(--color-text-muted);
		font-size: 0.92rem;
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		transition: color 0.2s var(--ease-out);
	}

	.footer-section a:hover {
		color: var(--color-accent);
	}

	.external-mark {
		font-size: 0.8em;
		color: var(--color-text-faint);
	}

	.social-list {
		flex-direction: row !important;
		flex-wrap: wrap;
		gap: var(--space-3) !important;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border: 1px solid var(--color-hairline);
		border-radius: 50%;
		color: var(--color-text-muted);
		transition: color 0.2s var(--ease-out), border-color 0.2s var(--ease-out), transform 0.2s var(--ease-out);
	}

	.social-link:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
		transform: translateY(-2px);
	}

	.footer-bottom {
		padding-top: var(--space-5);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		color: var(--color-text-faint);
		font-size: 0.82rem;
	}

	.copyright {
		font-family: var(--font-mono);
		letter-spacing: 0.05em;
	}

	.legal-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.legal-links a {
		color: var(--color-text-muted);
		transition: color 0.2s var(--ease-out);
	}

	.legal-links a:hover {
		color: var(--color-accent);
	}

	.colophon {
		font-style: italic;
		font-family: var(--font-display);
		font-variation-settings: 'opsz' 14;
	}

	.font-name {
		color: var(--color-text-muted);
	}

	@media (max-width: 640px) {
		.footer-inner {
			padding: var(--space-6) var(--space-4) var(--space-4);
		}

		.footer-grid {
			flex-direction: column;
			gap: var(--space-5);
		}

		.footer-bottom {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
