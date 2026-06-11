<script lang="ts">
	import { page } from '$app/state';
	import Logo from '$lib/components/logo/Logo.svelte';
	import type { NavLink } from '$lib/types';

	const navLinks: NavLink[] = [
		{ href: '/', label: 'Home' },
		{ href: '/albums', label: 'Albums' },
		{ href: '/contact', label: 'Contact' }
	];

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function isCurrent(href: string): boolean {
		const path = page.url.pathname;
		if (href === '/') {
			return path === '/' || path === '/home';
		}
		return path === href || path.startsWith(href + '/');
	}
</script>

<header class="site-header">
	<div class="header-inner">
		<a href="/" class="brand" onclick={closeMenu} aria-label="MusBeetle — home">
			<Logo size={32} />
			<span class="brand-text">
				<span class="brand-name">MusBeetle</span>
				<span class="brand-tagline">Jazz, 2000–2009</span>
			</span>
		</a>

		<button
			class="menu-toggle"
			class:is-open={isMenuOpen}
			onclick={toggleMenu}
			aria-expanded={isMenuOpen}
			aria-controls="primary-nav"
			aria-label="Toggle navigation"
		>
			<span></span>
			<span></span>
			<span></span>
		</button>

		<nav id="primary-nav" class="primary-nav" class:is-open={isMenuOpen} aria-label="Primary">
			<ul>
				{#each navLinks as link (link.href)}
					<li>
						<a
							href={link.href}
							onclick={closeMenu}
							aria-current={isCurrent(link.href) ? 'page' : undefined}
						>
							<span class="nav-label">{link.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(14, 10, 6, 0.78);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom: 1px solid var(--color-hairline);
	}

	.header-inner {
		max-width: var(--max-content);
		margin: 0 auto;
		padding: var(--space-4) var(--space-5);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-5);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		color: var(--color-text);
	}

	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1;
	}

	.brand-name {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 500;
		font-variation-settings: 'opsz' 144, 'SOFT' 50;
		letter-spacing: -0.01em;
	}

	.brand-tagline {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-top: 0.3rem;
	}

	.primary-nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: var(--space-6);
	}

	.primary-nav a {
		position: relative;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		padding: var(--space-3) 0;
		transition: color 0.25s var(--ease-out);
	}

	.primary-nav a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: calc(var(--space-3) - 4px);
		height: 1px;
		background: var(--color-accent);
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 0.3s var(--ease-out);
	}

	.primary-nav a:hover,
	.primary-nav a[aria-current='page'] {
		color: var(--color-text);
	}

	.primary-nav a:hover::after,
	.primary-nav a[aria-current='page']::after {
		transform: scaleX(1);
	}

	.menu-toggle {
		display: none;
		width: 36px;
		height: 36px;
		padding: 0;
		position: relative;
	}

	.menu-toggle span {
		display: block;
		position: absolute;
		left: 8px;
		right: 8px;
		height: 1.5px;
		background: var(--color-text);
		transition: transform 0.3s var(--ease-out), opacity 0.2s var(--ease-out), top 0.3s var(--ease-out);
	}

	.menu-toggle span:nth-child(1) { top: 11px; }
	.menu-toggle span:nth-child(2) { top: 17px; }
	.menu-toggle span:nth-child(3) { top: 23px; }

	.menu-toggle.is-open span:nth-child(1) {
		top: 17px;
		transform: rotate(45deg);
	}
	.menu-toggle.is-open span:nth-child(2) {
		opacity: 0;
	}
	.menu-toggle.is-open span:nth-child(3) {
		top: 17px;
		transform: rotate(-45deg);
	}

	@media (max-width: 640px) {
		.header-inner {
			padding: var(--space-3) var(--space-4);
		}

		.brand-tagline {
			display: none;
		}

		.menu-toggle {
			display: block;
		}

		.primary-nav {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: var(--color-bg);
			border-bottom: 1px solid var(--color-hairline);
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.35s var(--ease-out);
		}

		.primary-nav.is-open {
			max-height: 300px;
		}

		.primary-nav ul {
			flex-direction: column;
			gap: 0;
			padding: var(--space-3) var(--space-4) var(--space-5);
		}

		.primary-nav a {
			display: block;
			padding: var(--space-4) 0;
			border-bottom: 1px solid var(--color-hairline);
		}

		.primary-nav a::after {
			display: none;
		}
	}
</style>
