import type { RssFeed } from '$lib/types';

/**
 * Curated list of jazz-related RSS feeds.
 * Used by the /rss page to point readers at quality external coverage.
 */
export const rssFeeds: RssFeed[] = [
	{
		id: 'musbeetle-feed',
		name: 'MusBeetle Editorial',
		publisher: 'This site',
		url: '/rss.xml',
		description:
			'The site you are on, as a feed. Every new article published to the articles section appears here within minutes of going live.',
		category: 'House feed'
	},
	{
		id: 'npr-jazz',
		name: 'A Blog Supreme',
		publisher: 'NPR Music',
		url: 'https://www.npr.org/rss/rss.php?id=1109',
		description:
			"NPR's long-running jazz blog. News, premieres, and well-edited features. A reliable feed for keeping up with what's happening at the institutional level.",
		category: 'News & features'
	},
	{
		id: 'jazztimes',
		name: 'JazzTimes',
		publisher: 'JazzTimes Magazine',
		url: 'https://jazztimes.com/feed/',
		description:
			"The American magazine of record. Album reviews, artist interviews, and obituaries; an institution since 1970.",
		category: 'Reviews & features'
	},
	{
		id: 'all-about-jazz',
		name: 'All About Jazz',
		publisher: 'All About Jazz',
		url: 'https://www.allaboutjazz.com/rss/news.xml',
		description:
			"Volume-heavy coverage of the global jazz scene. Useful for catching releases that the larger outlets miss.",
		category: 'News & reviews'
	},
	{
		id: 'london-jazz-news',
		name: 'London Jazz News',
		publisher: 'London Jazz News',
		url: 'https://londonjazznews.com/feed/',
		description:
			"Reviews, previews, and obituaries from the UK scene. Particularly strong on European tours and festival coverage.",
		category: 'European scene'
	},
	{
		id: 'wbgo-take-five',
		name: 'Take Five',
		publisher: 'WBGO / Jazz Night in America',
		url: 'https://www.wbgo.org/podcast/take-five-from-jazz-night-in-america/feed.xml',
		description:
			"Short weekly podcast highlighting five new releases. A quick way to keep your listening current without committing to long-form reviews.",
		category: 'Podcast'
	},
	{
		id: 'do-the-math',
		name: 'Do the Math',
		publisher: 'Ethan Iverson',
		url: 'https://ethaniverson.com/feed/',
		description:
			"Pianist Ethan Iverson's long-running blog. Deep dives, interviews with elder statesmen, transcriptions, and arguments. Essential for the player's perspective.",
		category: 'Critical writing'
	},
	{
		id: 'bandcamp-jazz',
		name: 'Bandcamp Daily, Jazz',
		publisher: 'Bandcamp',
		url: 'https://daily.bandcamp.com/category/jazz/feed',
		description:
			"Editorial guides and label features focused on independent jazz. Strong on contemporary releases that the legacy press undercovers.",
		category: 'Reviews & guides'
	}
];
