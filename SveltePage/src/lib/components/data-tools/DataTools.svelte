<script lang="ts">
	import { exportArticles, type ExportFormat } from '$lib/services/export-service';
	import { importFromFile, type ImportResult } from '$lib/services/import-service';
	import type { Article } from '$lib/types';

	interface Props {
		articles: Article[];
		onImportComplete: () => Promise<void> | void;
	}

	let { articles, onImportComplete }: Props = $props();

	let fileInput: HTMLInputElement;
	let isImporting = $state(false);
	let lastResult = $state<ImportResult | null>(null);
	let lastError = $state('');

	function handleExport(format: ExportFormat) {
		exportArticles(articles, format);
	}

	function openFilePicker() {
		fileInput?.click();
	}

	async function handleFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		isImporting = true;
		lastResult = null;
		lastError = '';

		try {
			const result = await importFromFile(file);
			lastResult = result;
			if (result.imported > 0) {
				await onImportComplete();
			}
		} catch (error) {
			lastError = error instanceof Error ? error.message : 'Import failed.';
		} finally {
			isImporting = false;
			input.value = '';
		}
	}

	function dismissResult() {
		lastResult = null;
		lastError = '';
	}
</script>

<section class="data-tools" aria-labelledby="data-tools-heading">
	<div class="header">
		<div>
			<h3 id="data-tools-heading">Import & Export</h3>
			<p class="lede">
				Download the article collection as a file, or upload a file to add articles in bulk.
			</p>
		</div>
		<span class="count">{articles.length} record{articles.length === 1 ? '' : 's'}</span>
	</div>

	<div class="actions">
		<div class="group">
			<p class="group-label">Export</p>
			<div class="buttons">
				<button class="format-btn" onclick={() => handleExport('json')}>
					<span class="format-name">JSON</span>
					<span class="format-ext">data.json</span>
				</button>
				<button class="format-btn" onclick={() => handleExport('csv')}>
					<span class="format-name">CSV</span>
					<span class="format-ext">data.csv</span>
				</button>
				<button class="format-btn" onclick={() => handleExport('xml')}>
					<span class="format-name">XML</span>
					<span class="format-ext">data.xml</span>
				</button>
			</div>
		</div>

		<div class="group">
			<p class="group-label">Import</p>
			<div class="buttons">
				<button class="import-btn" onclick={openFilePicker} disabled={isImporting}>
					{#if isImporting}
						<span>Importing…</span>
					{:else}
						<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
							<path d="M8 1v9M4 6l4 4 4-4M2 12v2h12v-2" stroke-linejoin="round" stroke-linecap="round"/>
						</svg>
						<span>Pick a .json, .csv, or .xml file</span>
					{/if}
				</button>
				<input
					type="file"
					accept=".json,.csv,.xml,application/json,text/csv,application/xml,text/xml"
					bind:this={fileInput}
					onchange={handleFileSelected}
					class="hidden-input"
				/>
			</div>
		</div>
	</div>

	{#if lastResult}
		<div class="result" role="status" class:has-errors={lastResult.errors.length > 0}>
			<button class="dismiss" onclick={dismissResult} aria-label="Dismiss">×</button>
			<p class="result-summary">
				<strong>{lastResult.imported}</strong> imported,
				<strong>{lastResult.skipped}</strong> skipped.
			</p>
			{#if lastResult.errors.length > 0}
				<ul class="error-list">
					{#each lastResult.errors.slice(0, 5) as message (message)}
						<li>{message}</li>
					{/each}
					{#if lastResult.errors.length > 5}
						<li>… and {lastResult.errors.length - 5} more.</li>
					{/if}
				</ul>
			{/if}
		</div>
	{/if}

	{#if lastError}
		<div class="result error" role="alert">
			<button class="dismiss" onclick={dismissResult} aria-label="Dismiss">×</button>
			<p class="result-summary"><strong>Import failed:</strong> {lastError}</p>
		</div>
	{/if}
</section>

<style>
	.data-tools {
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		padding: var(--space-5);
		margin-bottom: var(--space-5);
	}

	.header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-4);
		padding-bottom: var(--space-4);
		margin-bottom: var(--space-4);
		border-bottom: 1px solid var(--color-hairline);
	}

	h3 {
		font-family: var(--font-display);
		font-size: 1.4rem;
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
		color: var(--color-text);
		margin: 0 0 var(--space-2);
	}

	.lede {
		color: var(--color-text-muted);
		font-size: 0.92rem;
		margin: 0;
		line-height: 1.5;
		max-width: 36rem;
	}

	.count {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-text-faint);
		padding: 0.4rem 0.7rem;
		border: 1px solid var(--color-hairline);
		white-space: nowrap;
	}

	.actions {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-5);
	}

	.group-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-text-faint);
		margin: 0 0 var(--space-3);
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.format-btn {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.2rem;
		padding: var(--space-3) var(--space-4);
		background: transparent;
		border: 1px solid var(--color-hairline-strong);
		color: var(--color-text-muted);
		transition: all 0.2s var(--ease-out);
		min-width: 7rem;
	}

	.format-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.format-name {
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-style: italic;
		font-variation-settings: 'opsz' 36;
	}

	.format-ext {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.12em;
		opacity: 0.7;
	}

	.import-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		background: transparent;
		border: 1px dashed var(--color-hairline-strong);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		transition: all 0.2s var(--ease-out);
		flex: 1;
		min-width: 16rem;
	}

	.import-btn:not(:disabled):hover {
		border-color: var(--color-accent);
		border-style: solid;
		color: var(--color-accent);
	}

	.import-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.hidden-input {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	.result {
		position: relative;
		margin-top: var(--space-4);
		padding: var(--space-4);
		padding-right: var(--space-6);
		background: var(--color-bg);
		border: 1px solid var(--color-accent);
		border-left: 3px solid var(--color-accent);
	}

	.result.has-errors,
	.result.error {
		border-color: var(--color-warn);
		border-left-color: var(--color-warn);
	}

	.result-summary {
		margin: 0;
		font-size: 0.95rem;
		color: var(--color-text);
	}

	.result-summary strong {
		color: var(--color-accent);
		font-variant-numeric: tabular-nums;
	}

	.error-list {
		margin: var(--space-3) 0 0;
		padding-left: var(--space-5);
		color: var(--color-text-muted);
		font-size: 0.88rem;
	}

	.error-list li {
		margin-bottom: 0.3rem;
	}

	.dismiss {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		background: transparent;
		border: 0;
		color: var(--color-text-muted);
		font-size: 1.3rem;
		line-height: 1;
		padding: 0.2rem 0.5rem;
		cursor: pointer;
		transition: color 0.2s var(--ease-out);
	}

	.dismiss:hover {
		color: var(--color-text);
	}

	@media (min-width: 700px) {
		.actions {
			grid-template-columns: auto 1fr;
			gap: var(--space-6);
			align-items: start;
		}
	}
</style>
