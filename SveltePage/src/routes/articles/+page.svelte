<script lang="ts">
	import { onMount } from 'svelte';
	import ArticleSearch from '$lib/components/article-search/ArticleSearch.svelte';
	import ArticleGrid from '$lib/components/article-grid/ArticleGrid.svelte';
	import ArticleEditor from '$lib/components/article-editor/ArticleEditor.svelte';
	import ConfirmDialog from '$lib/components/confirm-dialog/ConfirmDialog.svelte';
	import {
		fetchArticles,
		createArticle,
		updateArticle,
		deleteArticle
	} from '$lib/firebase/articles';
	import type { Article } from '$lib/types';

	let allArticles = $state<Article[]>([]);
	let filteredArticles = $state<Article[]>([]);
	let isLoading = $state(true);
	let hasError = $state(false);

	let editingArticle = $state<Article | null>(null);
	let isEditorOpen = $state(false);
	let articleToDelete = $state<Article | null>(null);

	let statusMessage = $state('');
	let statusTimer: ReturnType<typeof setTimeout> | null = null;

	onMount(async () => {
		await loadArticles();
	});

	async function loadArticles() {
		isLoading = true;
		hasError = false;
		try {
			allArticles = await fetchArticles();
			filteredArticles = allArticles;
		} catch {
			hasError = true;
		} finally {
			isLoading = false;
		}
	}

	function handleResults(results: Article[]) {
		filteredArticles = results;
	}

	function flashStatus(message: string) {
		statusMessage = message;
		if (statusTimer) clearTimeout(statusTimer);
		statusTimer = setTimeout(() => {
			statusMessage = '';
		}, 3500);
	}

	function openNewEditor() {
		editingArticle = null;
		isEditorOpen = true;
	}

	function openEditEditor(article: Article) {
		editingArticle = article;
		isEditorOpen = true;
	}

	function closeEditor() {
		isEditorOpen = false;
		editingArticle = null;
	}

	async function handleSave(article: Article) {
		const isEdit = editingArticle !== null;
		if (isEdit) {
			await updateArticle(article);
			flashStatus(`Updated "${article.title}".`);
		} else {
			await createArticle(article);
			flashStatus(`Published "${article.title}".`);
		}
		closeEditor();
		await loadArticles();
	}

	function requestDelete(article: Article) {
		articleToDelete = article;
	}

	async function confirmDelete() {
		if (!articleToDelete) return;
		const target = articleToDelete;
		await deleteArticle(target.id);
		articleToDelete = null;
		flashStatus(`Deleted "${target.title}".`);
		await loadArticles();
	}

	function cancelDelete() {
		articleToDelete = null;
	}
</script>

<svelte:head>
	<title>Articles | MusBeetle</title>
	<meta
		name="description"
		content="Editorial articles about 2000s jazz: album reviews, musician profiles, scene histories, and listening guides. Powered by Firebase."
	/>
</svelte:head>

<div class="page">
	<header class="page-header">
		<p class="eyebrow">Long reads & quick takes</p>
		<h1 class="page-title">
			Articles, <em>live from Firebase.</em>
		</h1>
		<p class="page-lede">
			Every piece below gets fetched from a Firestore collection when the page loads. Search by
			title, author, or tag, and filter by category. You can also publish new articles, edit
			existing ones, or delete them. Everything writes back to Firestore in real time.
		</p>
	</header>

	{#if isLoading}
		<div class="loading">
			<span class="spinner" aria-hidden="true"></span>
			<p>Loading…</p>
		</div>
	{:else if hasError}
		<div class="error-state" role="alert">
			<p class="error-title">Firebase isn't responding</p>
			<p class="error-text">
				The Firestore connection failed. Check the <code>.env</code> file and make sure the
				<code>articles</code> collection has been seeded.
			</p>
		</div>
	{:else}
		<div class="toolbar">
			<button class="new-btn" onclick={openNewEditor}>
				<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
					<line x1="8" y1="3" x2="8" y2="13"/>
					<line x1="3" y1="8" x2="13" y2="8"/>
				</svg>
				<span>New article</span>
			</button>
			{#if statusMessage}
				<p class="status" role="status">{statusMessage}</p>
			{/if}
		</div>

		<ArticleSearch articles={allArticles} onResults={handleResults} />
		<ArticleGrid
			articles={filteredArticles}
			onEdit={openEditEditor}
			onDelete={requestDelete}
		/>
	{/if}
</div>

{#if isEditorOpen}
	<ArticleEditor
		article={editingArticle}
		onSave={handleSave}
		onCancel={closeEditor}
	/>
{/if}

{#if articleToDelete}
	<ConfirmDialog
		title="Delete this article?"
		message={`This removes "${articleToDelete.title}" from Firestore. It cannot be undone.`}
		confirmLabel="Delete"
		cancelLabel="Keep it"
		onConfirm={confirmDelete}
		onCancel={cancelDelete}
	/>
{/if}

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

	.toolbar {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
		margin-bottom: var(--space-5);
	}

	.new-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		background: var(--color-accent);
		border: 1px solid var(--color-accent);
		color: var(--color-bg);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: all 0.25s var(--ease-out);
	}

	.new-btn:hover {
		background: transparent;
		color: var(--color-accent);
	}

	.status {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin: 0;
		padding: 0.4rem 0.8rem;
		border-left: 2px solid var(--color-accent);
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		padding: var(--space-9) var(--space-4);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.spinner {
		width: 28px;
		height: 28px;
		border: 2px solid var(--color-hairline-strong);
		border-top-color: var(--color-accent);
		border-radius: 50%;
		animation: spin 0.85s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.error-state {
		padding: var(--space-6);
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-warn);
		border-left: 3px solid var(--color-warn);
	}

	.error-title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.4rem;
		color: var(--color-warn);
		margin: 0 0 var(--space-3);
	}

	.error-text {
		color: var(--color-text-muted);
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.65;
	}

	.error-text code {
		font-family: var(--font-mono);
		font-size: 0.85em;
		padding: 0.1em 0.4em;
		background: var(--color-bg);
		border: 1px solid var(--color-hairline);
		color: var(--color-accent);
	}

	@media (max-width: 640px) {
		.page {
			padding: var(--space-6) var(--space-4) var(--space-7);
		}
	}
</style>
