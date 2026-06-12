import type { Article, ArticleCategory } from '$lib/types';
import { createArticle } from './articles-service';

export type ImportFormat = 'json' | 'csv' | 'xml';

export interface ImportResult {
	imported: number;
	skipped: number;
	errors: string[];
}

const validCategories: ArticleCategory[] = [
	'album-review',
	'musician-profile',
	'scene-history',
	'listening-guide'
];

function detectFormatFromFilename(filename: string): ImportFormat | null {
	const lower = filename.toLowerCase();
	if (lower.endsWith('.json')) return 'json';
	if (lower.endsWith('.csv')) return 'csv';
	if (lower.endsWith('.xml')) return 'xml';
	return null;
}

function normalizeRecord(record: Record<string, unknown>): Article | string {
	const id = String(record.id ?? '').trim();
	const slug = String(record.slug ?? id).trim();
	const title = String(record.title ?? '').trim();
	const excerpt = String(record.excerpt ?? '').trim();
	const body = String(record.body ?? '').trim();
	const category = String(record.category ?? '').trim() as ArticleCategory;
	const author = String(record.author ?? '').trim();
	const publishedAt = String(record.publishedAt ?? new Date().toISOString()).trim();
	const readingTimeMinutes = Number(record.readingTimeMinutes ?? 5);
	const accentHue = Number(record.accentHue ?? 200);

	let tags: string[] = [];
	const rawTags = record.tags;
	if (Array.isArray(rawTags)) {
		tags = rawTags.map((t) => String(t).trim()).filter((t) => t.length > 0);
	} else if (typeof rawTags === 'string' && rawTags.length > 0) {
		tags = rawTags
			.split(/[;,]/)
			.map((t) => t.trim().toLowerCase())
			.filter((t) => t.length > 0);
	}

	if (!id) return 'Missing id';
	if (!title) return `Record "${id}" missing title`;
	if (!validCategories.includes(category)) return `Record "${id}" has invalid category "${category}"`;

	return {
		id,
		slug: slug || id,
		title,
		excerpt,
		body,
		category,
		author,
		publishedAt,
		readingTimeMinutes: Number.isFinite(readingTimeMinutes) ? Math.max(1, Math.round(readingTimeMinutes)) : 5,
		tags,
		accentHue: Number.isFinite(accentHue) ? Math.max(0, Math.min(360, Math.round(accentHue))) : 200
	};
}

function parseJson(text: string): Record<string, unknown>[] {
	const parsed = JSON.parse(text);
	if (!Array.isArray(parsed)) {
		throw new Error('JSON root must be an array of article objects.');
	}
	return parsed as Record<string, unknown>[];
}

/**
 * Minimal CSV parser that handles quoted fields with commas and newlines,
 * and escaped double quotes per RFC 4180.
 */
function parseCsv(text: string): Record<string, unknown>[] {
	const rows: string[][] = [];
	let currentRow: string[] = [];
	let currentField = '';
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (inQuotes) {
			if (ch === '"' && text[i + 1] === '"') {
				currentField += '"';
				i++;
			} else if (ch === '"') {
				inQuotes = false;
			} else {
				currentField += ch;
			}
		} else {
			if (ch === '"') {
				inQuotes = true;
			} else if (ch === ',') {
				currentRow.push(currentField);
				currentField = '';
			} else if (ch === '\n' || ch === '\r') {
				if (ch === '\r' && text[i + 1] === '\n') i++;
				currentRow.push(currentField);
				rows.push(currentRow);
				currentRow = [];
				currentField = '';
			} else {
				currentField += ch;
			}
		}
	}
	if (currentField.length > 0 || currentRow.length > 0) {
		currentRow.push(currentField);
		rows.push(currentRow);
	}

	const nonEmptyRows = rows.filter((r) => r.length > 1 || (r.length === 1 && r[0].length > 0));
	if (nonEmptyRows.length < 2) return [];

	const headers = nonEmptyRows[0];
	return nonEmptyRows.slice(1).map((row) => {
		const obj: Record<string, unknown> = {};
		headers.forEach((header, i) => {
			obj[header.trim()] = row[i] ?? '';
		});
		return obj;
	});
}

function parseXml(text: string): Record<string, unknown>[] {
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, 'application/xml');
	const errorNode = doc.querySelector('parsererror');
	if (errorNode) throw new Error('Invalid XML');

	const articleNodes = Array.from(doc.querySelectorAll('article'));
	return articleNodes.map((node) => {
		const get = (tag: string) => node.querySelector(`:scope > ${tag}`)?.textContent ?? '';
		const tagNodes = Array.from(node.querySelectorAll(':scope > tags > tag'));
		const tags = tagNodes.map((n) => n.textContent ?? '').filter((t) => t.length > 0);

		return {
			id: get('id'),
			slug: get('slug'),
			title: get('title'),
			excerpt: get('excerpt'),
			body: get('body'),
			category: get('category'),
			author: get('author'),
			publishedAt: get('publishedAt'),
			readingTimeMinutes: get('readingTimeMinutes'),
			accentHue: get('accentHue'),
			tags
		};
	});
}

function parseByFormat(text: string, format: ImportFormat): Record<string, unknown>[] {
	if (format === 'json') return parseJson(text);
	if (format === 'csv') return parseCsv(text);
	return parseXml(text);
}

/**
 * Parse a file and upload each article to Firestore.
 * Returns counts plus any per-record errors so the UI can show them.
 */
export async function importFromFile(file: File): Promise<ImportResult> {
	const format = detectFormatFromFilename(file.name);
	if (!format) {
		throw new Error('Unsupported file type. Use .json, .csv, or .xml.');
	}

	const text = await file.text();
	const rawRecords = parseByFormat(text, format);

	const result: ImportResult = { imported: 0, skipped: 0, errors: [] };

	for (const raw of rawRecords) {
		const normalized = normalizeRecord(raw);
		if (typeof normalized === 'string') {
			result.skipped++;
			result.errors.push(normalized);
			continue;
		}
		try {
			await createArticle(normalized);
			result.imported++;
		} catch (error) {
			result.skipped++;
			result.errors.push(
				`Failed to save "${normalized.id}": ${error instanceof Error ? error.message : 'unknown error'}`
			);
		}
	}

	return result;
}
