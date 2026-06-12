import type { Article } from '$lib/types';

/**
 * Convert articles to a pretty-printed JSON string.
 */
export function articlesToJson(articles: Article[]): string {
	return JSON.stringify(articles, null, 2);
}

/**
 * Convert articles to a CSV string. Tags are joined with a semicolon inside
 * their cell, and any double quotes inside fields are escaped per RFC 4180.
 */
export function articlesToCsv(articles: Article[]): string {
	const headers = [
		'id',
		'slug',
		'title',
		'excerpt',
		'body',
		'category',
		'author',
		'publishedAt',
		'readingTimeMinutes',
		'tags',
		'accentHue'
	];

	const rows = articles.map((a) => [
		a.id,
		a.slug,
		a.title,
		a.excerpt,
		a.body,
		a.category,
		a.author,
		a.publishedAt,
		String(a.readingTimeMinutes),
		a.tags.join(';'),
		String(a.accentHue)
	]);

	const escapeCell = (value: string) => {
		const needsQuoting = /[",\n\r]/.test(value);
		const escaped = value.replace(/"/g, '""');
		return needsQuoting ? `"${escaped}"` : escaped;
	};

	const lines = [headers.join(',')];
	for (const row of rows) {
		lines.push(row.map(escapeCell).join(','));
	}
	return lines.join('\n');
}

/**
 * Convert articles to an XML string.
 */
export function articlesToXml(articles: Article[]): string {
	const escape = (value: string) =>
		value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');

	const items = articles.map((a) => {
		const tagsXml = a.tags.map((t) => `      <tag>${escape(t)}</tag>`).join('\n');
		return `  <article>
    <id>${escape(a.id)}</id>
    <slug>${escape(a.slug)}</slug>
    <title>${escape(a.title)}</title>
    <excerpt>${escape(a.excerpt)}</excerpt>
    <body>${escape(a.body)}</body>
    <category>${escape(a.category)}</category>
    <author>${escape(a.author)}</author>
    <publishedAt>${escape(a.publishedAt)}</publishedAt>
    <readingTimeMinutes>${a.readingTimeMinutes}</readingTimeMinutes>
    <accentHue>${a.accentHue}</accentHue>
    <tags>
${tagsXml}
    </tags>
  </article>`;
	});

	return `<?xml version="1.0" encoding="UTF-8"?>
<articles>
${items.join('\n')}
</articles>
`;
}

export type ExportFormat = 'json' | 'csv' | 'xml';

const mimeTypes: Record<ExportFormat, string> = {
	json: 'application/json',
	csv: 'text/csv',
	xml: 'application/xml'
};

/**
 * Trigger a browser download with the given content and filename.
 */
export function downloadFile(content: string, filename: string, format: ExportFormat): void {
	const blob = new Blob([content], { type: `${mimeTypes[format]};charset=utf-8` });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

/**
 * Convenience: generate and download articles in the chosen format.
 */
export function exportArticles(articles: Article[], format: ExportFormat): void {
	if (format === 'json') {
		downloadFile(articlesToJson(articles), 'data.json', 'json');
	} else if (format === 'csv') {
		downloadFile(articlesToCsv(articles), 'data.csv', 'csv');
	} else {
		downloadFile(articlesToXml(articles), 'data.xml', 'xml');
	}
}
