import type { RssFeed } from '$lib/types';

/**
 * Curated list of jazz-related RSS feeds.
 *
 * RSS is text-only by design. When you click "Open feed" the browser
 * shows the raw XML. To actually read the feed in a friendly format,
 * copy the URL into an RSS reader app (Feedly, NetNewsWire, Inoreader).
 */
export const rssFeeds: RssFeed[] = [
	{
		id: 'musbeetle-feed',
		name: 'MusBeetle Editorial',
		publisher: 'This site',
		url: '/rss.xml',
		description:
			'The site you are on, as a feed. Every new article we publish shows up here.',
		category: 'House feed'
	},
	{
		id: 'london-jazz-news',
		name: 'UK Jazz News',
		publisher: 'UK Jazz News (formerly London Jazz News)',
		url: 'https://ukjazznews.com/feed/',
		description:
			"Reviews, previews, and obituaries from the UK scene. Strong on European tours and festival coverage. The site rebranded from London Jazz News in 2024.",
		category: 'European scene'
	},
	{
		id: 'do-the-math',
		name: 'DO THE M@TH',
		publisher: 'Ethan Iverson',
		url: 'https://ethaniverson.com/feed/',
		description:
			"Pianist Ethan Iverson's blog. Deep dives, interviews with elder statesmen, transcriptions, and arguments. The newer essays land at his Substack but plenty of archival material lives here.",
		category: 'Critical writing'
	},
	{
		id: 'npr-tiny-desk',
		name: 'Tiny Desk Concerts',
		publisher: 'NPR Music',
		url: 'https://feeds.npr.org/1109/rss.xml',
		description:
			"Not jazz-only, but a steady stream of jazz, soul, and adjacent musicians passes through. The Tiny Desk has become one of the few mainstream platforms still booking working jazz artists.",
		category: 'Performance'
	},
	{
		id: 'npr-music',
		name: 'NPR Music',
		publisher: 'NPR',
		url: 'https://feeds.npr.org/1039/rss.xml',
		description:
			"The NPR Music section feed. Broad coverage with regular jazz reviews, profiles, and obituaries from a team of staff critics.",
		category: 'News & features'
	},
	{
		id: 'jazztimes',
		name: 'JazzTimes',
		publisher: 'JazzTimes Magazine',
		url: 'https://jazztimes.com/feed/',
		description:
			"The American magazine of record. Album reviews, artist interviews, and obituaries. A jazz institution since 1970. If the feed loads empty, check directly at jazztimes.com.",
		category: 'Reviews & features'
	}
];
