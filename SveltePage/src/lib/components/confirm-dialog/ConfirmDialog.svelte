<script lang="ts">
	interface Props {
		title: string;
		message: string;
		confirmLabel?: string;
		cancelLabel?: string;
		onConfirm: () => Promise<void> | void;
		onCancel: () => void;
	}

	let {
		title,
		message,
		confirmLabel = 'Confirm',
		cancelLabel = 'Cancel',
		onConfirm,
		onCancel
	}: Props = $props();

	let isWorking = $state(false);

	async function handleConfirm() {
		if (isWorking) return;
		isWorking = true;
		try {
			await onConfirm();
		} finally {
			isWorking = false;
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget && !isWorking) {
			onCancel();
		}
	}

	function handleBackdropKey(event: KeyboardEvent) {
		if (event.key === 'Escape' && !isWorking) {
			onCancel();
		}
	}
</script>

<svelte:window onkeydown={handleBackdropKey} />

<div
	class="backdrop"
	role="alertdialog"
	tabindex="-1"
	aria-modal="true"
	aria-labelledby="confirm-title"
	onclick={handleBackdropClick}
	onkeydown={handleBackdropKey}
>
	<div class="dialog">
		<h2 id="confirm-title" class="dialog-title">{title}</h2>
		<p class="dialog-message">{message}</p>
		<div class="dialog-actions">
			<button class="btn-secondary" onclick={onCancel} disabled={isWorking}>
				{cancelLabel}
			</button>
			<button class="btn-danger" onclick={handleConfirm} disabled={isWorking}>
				{isWorking ? 'Working…' : confirmLabel}
			</button>
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(14, 10, 6, 0.82);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 110;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-5) var(--space-4);
	}

	.dialog {
		width: 100%;
		max-width: 28rem;
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline-strong);
		padding: var(--space-6);
	}

	.dialog-title {
		font-family: var(--font-display);
		font-size: 1.6rem;
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 40;
		color: var(--color-text);
		margin: 0 0 var(--space-3);
	}

	.dialog-message {
		color: var(--color-text-muted);
		font-size: 0.98rem;
		line-height: 1.6;
		margin: 0 0 var(--space-5);
	}

	.dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--space-3);
	}

	.btn-secondary,
	.btn-danger {
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: all 0.2s var(--ease-out);
		border: 1px solid;
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

	.btn-danger {
		background: var(--color-warn);
		border-color: var(--color-warn);
		color: var(--color-bg);
	}

	.btn-danger:not(:disabled):hover {
		background: transparent;
		color: var(--color-warn);
	}

	.btn-secondary:disabled,
	.btn-danger:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
</style>
