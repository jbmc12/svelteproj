<script lang="ts">
	let name = $state('');
	let email = $state('');
	let subject = $state('album-suggestion');
	let message = $state('');
	let hasSubmitted = $state(false);
	let isSubmitting = $state(false);

	const subjects = [
		{ value: 'album-suggestion', label: 'Album suggestion' },
		{ value: 'editorial-feedback', label: 'Editorial feedback' },
		{ value: 'collaboration', label: 'Collaboration' },
		{ value: 'general', label: 'Something else' }
	];

	const isEmailValid = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
	const isFormValid = $derived(
		name.trim().length > 1 && isEmailValid && message.trim().length > 5
	);

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (!isFormValid) return;

		isSubmitting = true;
		// Simulated submission — would post to an endpoint in production
		setTimeout(() => {
			isSubmitting = false;
			hasSubmitted = true;
		}, 700);
	}

	function resetForm() {
		name = '';
		email = '';
		subject = 'album-suggestion';
		message = '';
		hasSubmitted = false;
	}
</script>

<div class="contact-form-wrap">
	{#if hasSubmitted}
		<div class="success" role="status" aria-live="polite">
			<p class="eyebrow">Message received</p>
			<h3>Thanks, {name.split(' ')[0]}.</h3>
			<p class="success-body">
				We read every note. If your message asks for a reply, expect one within a week or so —
				we're a small editorial outfit.
			</p>
			<button class="reset-btn" onclick={resetForm}>Send another message</button>
		</div>
	{:else}
		<form class="contact-form" onsubmit={handleSubmit} novalidate>
			<div class="field-row">
				<div class="field">
					<label for="name">Your name</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						placeholder="e.g. Miles D."
						autocomplete="name"
						required
					/>
				</div>
				<div class="field">
					<label for="email">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="you@example.com"
						autocomplete="email"
						required
					/>
					{#if email && !isEmailValid}
						<p class="hint">That email doesn't look quite right.</p>
					{/if}
				</div>
			</div>

			<div class="field">
				<label for="subject">Subject</label>
				<select id="subject" bind:value={subject}>
					{#each subjects as option (option.value)}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<div class="field">
				<label for="message">Message</label>
				<textarea
					id="message"
					rows="6"
					bind:value={message}
					placeholder="Tell us about an album we missed, a venue we should add to the map, or anything else."
					required
				></textarea>
			</div>

			<button class="submit-btn" type="submit" disabled={!isFormValid || isSubmitting}>
				{isSubmitting ? 'Sending…' : 'Send Message'}
				<span class="arrow" aria-hidden="true">→</span>
			</button>
		</form>
	{/if}
</div>

<style>
	.contact-form-wrap {
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		padding: var(--space-6);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.field-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-5);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	label {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	input,
	select,
	textarea {
		font-family: var(--font-body);
		font-size: 1rem;
		background: transparent;
		border: 0;
		border-bottom: 1px solid var(--color-hairline-strong);
		color: var(--color-text);
		padding: var(--space-3) 0;
		transition: border-color 0.2s var(--ease-out);
		resize: vertical;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-accent);
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--color-text-faint);
	}

	select {
		appearance: none;
		background-image: linear-gradient(45deg, transparent 50%, var(--color-text-muted) 50%),
			linear-gradient(135deg, var(--color-text-muted) 50%, transparent 50%);
		background-position:
			calc(100% - 16px) 50%,
			calc(100% - 11px) 50%;
		background-size:
			5px 5px,
			5px 5px;
		background-repeat: no-repeat;
		padding-right: var(--space-6);
	}

	select option {
		background: var(--color-bg-elevated);
		color: var(--color-text);
	}

	.hint {
		font-size: 0.8rem;
		color: var(--color-warn);
	}

	.submit-btn {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-6);
		border: 1px solid var(--color-accent);
		color: var(--color-accent);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: all 0.3s var(--ease-out);
		margin-top: var(--space-2);
	}

	.submit-btn:not(:disabled):hover {
		background: var(--color-accent);
		color: var(--color-bg);
	}

	.submit-btn:not(:disabled):hover .arrow {
		transform: translateX(4px);
	}

	.submit-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.arrow {
		transition: transform 0.3s var(--ease-out);
	}

	.success {
		text-align: center;
		padding: var(--space-5) var(--space-3);
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: var(--space-3);
	}

	.success h3 {
		font-size: 2.2rem;
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
		margin-bottom: var(--space-4);
	}

	.success-body {
		color: var(--color-text-muted);
		max-width: 32rem;
		margin: 0 auto var(--space-5);
		font-size: 1.05rem;
		line-height: 1.65;
	}

	.reset-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		border-bottom: 1px solid var(--color-hairline-strong);
		padding-bottom: 0.3rem;
		transition: color 0.2s var(--ease-out), border-color 0.2s var(--ease-out);
	}

	.reset-btn:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}

	@media (min-width: 700px) {
		.field-row {
			grid-template-columns: 1fr 1fr;
		}

		.contact-form-wrap {
			padding: var(--space-7);
		}
	}
</style>
