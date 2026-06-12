<script lang="ts">
	import type { Article, ArticleCategory } from '$lib/types';

	interface Props {
		article?: Article | null;
		onSave: (article: Article) => Promise<void> | void;
		onCancel: () => void;
	}

	let { article = null, onSave, onCancel }: Props = $props();

	// Snapshot the incoming article once so the form's initial values stay stable
	// even if the parent's reference changes.
	const source = article;
	const isEditMode = source !== null;

	const categories: Array<{ value: ArticleCategory; label: string }> = [
		{ value: 'album-review', label: 'Album Review' },
		{ value: 'musician-profile', label: 'Musician Profile' },
		{ value: 'scene-history', label: 'Scene History' },
		{ value: 'listening-guide', label: 'Listening Guide' }
	];

	let title = $state(source?.title ?? '');
	let excerpt = $state(source?.excerpt ?? '');
	let body = $state(source?.body ?? '');
	let category = $state<ArticleCategory>(source?.category ?? 'album-review');
	let author = $state(source?.author ?? '');
	let tagsText = $state(source?.tags.join(', ') ?? '');
	let readingTimeMinutes = $state(source?.readingTimeMinutes ?? 5);
	let accentHue = $state(source?.accentHue ?? 200);

	let isSaving = $state(false);
	let errorMessage = $state('');

	const isTitleValid = $derived(title.trim().length >= 3);
	const isExcerptValid = $derived(excerpt.trim().length >= 10);
	const isAuthorValid = $derived(author.trim().length >= 2);
	const isFormValid = $derived(isTitleValid && isExcerptValid && isAuthorValid);

	function slugify(value: string): string {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '')
			.slice(0, 60);
	}

	function buildArticle(): Article {
		const slug = isEditMode ? source!.slug : slugify(title);
		const id = isEditMode ? source!.id : slug || `article-${Date.now()}`;
		const tags = tagsText
			.split(',')
			.map((t) => t.trim().toLowerCase())
			.filter((t) => t.length > 0);

		return {
			id,
			slug,
			title: title.trim(),
			excerpt: excerpt.trim(),
			body: body.trim(),
			category,
			author: author.trim(),
			publishedAt: isEditMode ? source!.publishedAt : new Date().toISOString(),
			readingTimeMinutes: Math.max(1, Math.round(readingTimeMinutes)),
			tags,
			accentHue: Math.max(0, Math.min(360, Math.round(accentHue)))
		};
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!isFormValid || isSaving) return;

		isSaving = true;
		errorMessage = '';
		try {
			await onSave(buildArticle());
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Could not save the article.';
		} finally {
			isSaving = false;
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget && !isSaving) {
			onCancel();
		}
	}

	function handleBackdropKey(event: KeyboardEvent) {
		if (event.key === 'Escape' && !isSaving) {
			onCancel();
		}
	}
</script>

<svelte:window onkeydown={handleBackdropKey} />

<div
	class="backdrop"
	role="dialog"
	tabindex="-1"
	aria-modal="true"
	aria-labelledby="editor-title"
	onclick={handleBackdropClick}
	onkeydown={handleBackdropKey}
>
	<form class="editor" onsubmit={handleSubmit}>
		<header class="editor-header">
			<p class="eyebrow">{isEditMode ? 'Edit' : 'New'} article</p>
			<h2 id="editor-title">
				{#if isEditMode}
					Update <em>"{source?.title}"</em>
				{:else}
					Write something <em>new.</em>
				{/if}
			</h2>
		</header>

		<div class="grid">
			<div class="field span-2">
				<label for="ed-title">Title</label>
				<input
					id="ed-title"
					type="text"
					bind:value={title}
					placeholder="The thing you're calling this piece"
					required
				/>
			</div>

			<div class="field span-2">
				<label for="ed-excerpt">Excerpt</label>
				<textarea
					id="ed-excerpt"
					rows="2"
					bind:value={excerpt}
					placeholder="One or two sentences that show up under the title"
					required
				></textarea>
			</div>

			<div class="field span-2">
				<label for="ed-body">Body</label>
				<textarea
					id="ed-body"
					rows="5"
					bind:value={body}
					placeholder="The article itself"
				></textarea>
			</div>

			<div class="field">
				<label for="ed-author">Author</label>
				<input
					id="ed-author"
					type="text"
					bind:value={author}
					placeholder="Your name"
					autocomplete="name"
					required
				/>
			</div>

			<div class="field">
				<label for="ed-category">Category</label>
				<select id="ed-category" bind:value={category}>
					{#each categories as cat (cat.value)}
						<option value={cat.value}>{cat.label}</option>
					{/each}
				</select>
			</div>

			<div class="field">
				<label for="ed-reading-time">Reading time (minutes)</label>
				<input
					id="ed-reading-time"
					type="number"
					min="1"
					max="60"
					bind:value={readingTimeMinutes}
				/>
			</div>

			<div class="field">
				<label for="ed-hue">Accent color (hue 0 to 360)</label>
				<div class="hue-row">
					<input
						id="ed-hue"
						type="range"
						min="0"
						max="360"
						bind:value={accentHue}
					/>
					<span class="hue-swatch" style="background: hsl({accentHue}, 45%, 35%);"></span>
					<span class="hue-value">{accentHue}</span>
				</div>
			</div>

			<div class="field span-2">
				<label for="ed-tags">Tags (comma-separated)</label>
				<input
					id="ed-tags"
					type="text"
					bind:value={tagsText}
					placeholder="brad-mehldau, 2002, piano-trio"
				/>
			</div>
		</div>

		{#if errorMessage}
			<p class="error" role="alert">{errorMessage}</p>
		{/if}

		<footer class="editor-footer">
			<button
				type="button"
				class="btn-secondary"
				onclick={onCancel}
				disabled={isSaving}
			>
				Cancel
			</button>
			<button
				type="submit"
				class="btn-primary"
				disabled={!isFormValid || isSaving}
			>
				{#if isSaving}
					Saving…
				{:else if isEditMode}
					Save changes
				{:else}
					Publish
				{/if}
			</button>
		</footer>
	</form>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(14, 10, 6, 0.78);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 100;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: var(--space-5) var(--space-4);
		overflow-y: auto;
	}

	.editor {
		width: 100%;
		max-width: 44rem;
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline-strong);
		padding: var(--space-6);
		margin-top: var(--space-5);
		margin-bottom: var(--space-5);
	}

	.editor-header {
		margin-bottom: var(--space-5);
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--color-hairline);
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0 0 var(--space-3);
	}

	h2 {
		font-size: clamp(1.6rem, 3.5vw, 2.1rem);
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
		margin: 0;
		line-height: 1.15;
	}

	h2 em {
		font-style: italic;
		color: var(--color-accent);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
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
		font-size: 0.95rem;
		background: var(--color-bg);
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text);
		padding: var(--space-3) var(--space-3);
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

	select option {
		background: var(--color-bg-elevated);
		color: var(--color-text);
	}

	.hue-row {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.hue-row input[type='range'] {
		flex: 1;
		padding: 0;
		border: 0;
		background: transparent;
	}

	.hue-swatch {
		display: inline-block;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid var(--color-hairline-strong);
		flex-shrink: 0;
	}

	.hue-value {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
		min-width: 2.5em;
		text-align: right;
	}

	.error {
		color: var(--color-warn);
		font-size: 0.9rem;
		margin: var(--space-4) 0 0;
	}

	.editor-footer {
		display: flex;
		justify-content: flex-end;
		gap: var(--space-3);
		margin-top: var(--space-5);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-hairline);
	}

	.btn-primary,
	.btn-secondary {
		padding: var(--space-3) var(--space-5);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: all 0.25s var(--ease-out);
		border: 1px solid;
	}

	.btn-primary {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-bg);
	}

	.btn-primary:not(:disabled):hover {
		background: transparent;
		color: var(--color-accent);
	}

	.btn-primary:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.btn-secondary {
		background: transparent;
		border-color: var(--color-hairline-strong);
		color: var(--color-text-muted);
	}

	.btn-secondary:not(:disabled):hover {
		border-color: var(--color-text);
		color: var(--color-text);
	}

	.btn-secondary:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	@media (min-width: 640px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}

		.span-2 {
			grid-column: span 2;
		}

		.editor {
			padding: var(--space-7);
		}
	}
</style>
