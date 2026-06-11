import type { Article } from '$lib/types';

/**
 * Article seed data.
 * The seed script reads this and uploads each entry as a document
 * in the Firestore "articles" collection.
 */
export const articleSeed: Article[] = [
	{
		id: 'rethinking-largo',
		slug: 'rethinking-largo',
		title: 'Rethinking Largo, Twenty Years Later',
		excerpt:
			"Brad Mehldau's strangest record gets reframed as the decade's most quietly influential, and the one that taught a generation the trio wasn't the only frame.",
		body:
			"When Largo came out in 2002, the consensus was that Brad Mehldau had wandered off. The record had drum machines on it. Jon Brion was credited as a producer. The trio that had made him essential (Larry Grenadier on bass, Jorge Rossy on drums) was nowhere to be heard for most of it.\\n\\nTwo decades on, the consensus has flipped. Largo is now arguably the most influential thing he made in the 2000s. It's where the modern jazz piano record stopped pretending the trio was the only legitimate frame. It opened a door, and a lot of people walked through it.",
		category: 'album-review',
		author: 'Elena Marsh',
		publishedAt: '2024-03-12T09:00:00.000Z',
		readingTimeMinutes: 6,
		tags: ['brad-mehldau', 'piano-trio', '2002', 'reissue'],
		accentHue: 35
	},
	{
		id: 'bad-plus-rock-argument',
		slug: 'bad-plus-rock-argument',
		title: 'The Bad Plus and the Rock Argument',
		excerpt:
			"Why a piano trio's cover of Nirvana mattered more than the cover itself, and how These Are the Vistas shifted the conversation about what jazz audiences could be.",
		body:
			"It's easy to overstate the Nirvana cover. These Are the Vistas had three other covers on it and seven originals, and the originals are where the band's real argument lives. But the cover did something the originals couldn't, which is generate a press cycle.",
		category: 'album-review',
		author: 'Jonas Veld',
		publishedAt: '2024-05-04T09:00:00.000Z',
		readingTimeMinutes: 5,
		tags: ['the-bad-plus', '2003', 'piano-trio', 'avant-garde'],
		accentHue: 130
	},
	{
		id: 'who-was-esbjorn-svensson',
		slug: 'who-was-esbjorn-svensson',
		title: 'Who Was Esbjörn Svensson?',
		excerpt:
			"A profile of the Swedish pianist whose trio sold out rock venues across Europe, and what his sudden death in 2008 cost the music he was building.",
		body:
			"There's a clip from 2003 of E.S.T. playing the Montreux Jazz Festival. The crowd is the size of a small football stadium. They're cheering between phrases.",
		category: 'musician-profile',
		author: 'Petra Holm',
		publishedAt: '2024-01-22T09:00:00.000Z',
		readingTimeMinutes: 9,
		tags: ['est', 'esbjorn-svensson', 'european-jazz', 'profile'],
		accentHue: 220
	},
	{
		id: 'glasper-bridge',
		slug: 'glasper-bridge',
		title: 'Robert Glasper as a Bridge',
		excerpt:
			"Before Black Radio there was Canvas. Canvas was the album that quietly redrew the map between jazz, hip-hop, and contemporary R&B.",
		body:
			"Canvas isn't Glasper's most famous record. That's Black Radio, which came later and won a Grammy and made him an industry figure. But Canvas is where the argument starts.",
		category: 'album-review',
		author: 'Andre Whitfield',
		publishedAt: '2024-04-18T09:00:00.000Z',
		readingTimeMinutes: 7,
		tags: ['robert-glasper', '2005', 'blue-note', 'r-and-b'],
		accentHue: 310
	},
	{
		id: 'spiritual-jazz-revival',
		slug: 'spiritual-jazz-revival',
		title: 'The Quiet Revival of Spiritual Jazz',
		excerpt:
			"Charles Lloyd's Sangam, Alice Coltrane's late records, and the long shadow of Pharoah Sanders. The 2000s as the decade spiritual jazz came back.",
		body:
			"The story most people tell about spiritual jazz ends in 1973. Coltrane is dead, Alice has moved to a monastery, Sanders is making fusion records that nobody plays anymore. The genre ossifies into something that lives in record stores. Then, somewhere around 2004, it starts moving again.",
		category: 'scene-history',
		author: 'Elena Marsh',
		publishedAt: '2024-02-08T09:00:00.000Z',
		readingTimeMinutes: 11,
		tags: ['spiritual-jazz', 'charles-lloyd', 'scene', 'history'],
		accentHue: 270
	},
	{
		id: 'where-to-start-jazz-2000s',
		slug: 'where-to-start-jazz-2000s',
		title: "Where to Start: The 2000s in 90 Minutes",
		excerpt:
			"A track-by-track listening guide for the absolute beginner. Six songs, in order, to make sense of the decade without reading a book first.",
		body:
			"Don't start with Kind of Blue. That's a 1959 record and you've heard the advice before. Start with this list. It's six tracks, it runs about 90 minutes, and it'll give you the shape of where the music was when this century started.",
		category: 'listening-guide',
		author: 'Jonas Veld',
		publishedAt: '2024-06-10T09:00:00.000Z',
		readingTimeMinutes: 8,
		tags: ['listening-guide', 'beginner', 'playlist'],
		accentHue: 40
	},
	{
		id: 'schneider-art-of-orchestration',
		slug: 'schneider-art-of-orchestration',
		title: 'Maria Schneider and the Art of Orchestration',
		excerpt:
			"How a composer trained by Gil Evans built a working large ensemble in the most expensive city in the world, and why Concert in the Garden changed how big bands sound.",
		body:
			"You don't just decide to run an 18-piece jazz orchestra in New York City in 2004. The math doesn't work. A single rehearsal at union scale costs more than a working musician makes in two weeks. The math, more or less, hasn't worked since 1965.",
		category: 'musician-profile',
		author: 'Petra Holm',
		publishedAt: '2024-03-28T09:00:00.000Z',
		readingTimeMinutes: 10,
		tags: ['maria-schneider', 'big-band', '2004', 'orchestration'],
		accentHue: 65
	},
	{
		id: 'akinmusire-tone',
		slug: 'akinmusire-tone',
		title: "Ambrose Akinmusire's Tone Is the Argument",
		excerpt:
			"On Prelude... To Cora and the trumpeter who decided, early, that resolution was for cowards.",
		body:
			"There's a phrase in the third track of Prelude... To Cora where Akinmusire bends a note down through what sounds like four different settled pitches before letting it land. It takes maybe two seconds. Listen to it three times and the rest of the record opens up.",
		category: 'album-review',
		author: 'Andre Whitfield',
		publishedAt: '2024-05-22T09:00:00.000Z',
		readingTimeMinutes: 6,
		tags: ['ambrose-akinmusire', '2008', 'trumpet', 'debut'],
		accentHue: 200
	},
	{
		id: 'village-vanguard-tuesdays',
		slug: 'village-vanguard-tuesdays',
		title: 'Tuesday Nights at the Vanguard',
		excerpt:
			"For most of the 2000s, the Village Vanguard's Tuesday-night house band was the Vanguard Jazz Orchestra. Here's why it mattered.",
		body:
			"The Vanguard is the room jazz uses to think out loud about itself. It's been that since 1957 or so, depending on whether you count the Sonny Rollins record. By the time the 2000s started, the Tuesday-night slot had become its own institution.",
		category: 'scene-history',
		author: 'Elena Marsh',
		publishedAt: '2024-04-02T09:00:00.000Z',
		readingTimeMinutes: 7,
		tags: ['village-vanguard', 'new-york', 'big-band', 'venues'],
		accentHue: 0
	},
	{
		id: 'iyer-historicity-close',
		slug: 'iyer-historicity-close',
		title: "Vijay Iyer's Historicity, Track by Track",
		excerpt:
			"A close listening guide to the record we picked as the album of the decade, with notes on what to listen for in each piece.",
		body:
			"Historicity is a record about how songs travel. Iyer wrote three of the ten tracks. The rest are covers, ranging across a span that probably shouldn't fit on one record: Andrew Hill, M.I.A., Stevie Wonder, Bernstein.",
		category: 'listening-guide',
		author: 'Jonas Veld',
		publishedAt: '2024-06-01T09:00:00.000Z',
		readingTimeMinutes: 12,
		tags: ['vijay-iyer', '2009', 'piano-trio', 'close-listening'],
		accentHue: 100
	},
	{
		id: 'why-acoustic-jazz-survived',
		slug: 'why-acoustic-jazz-survived',
		title: 'Why Acoustic Jazz Survived the 2000s',
		excerpt:
			"The decade was supposed to be the end of acoustic small-group jazz. The MP3 had won, the record industry was collapsing, the clubs were closing. Then it didn't end.",
		body:
			"There's a version of this story that's familiar by now. Napster, then iTunes, then the slow collapse of the major-label model. Sales fell, then halved, then halved again. Jazz, with its already-thin margins, was supposed to be one of the first genres to disappear from the industry as a recognizable thing.",
		category: 'scene-history',
		author: 'Andre Whitfield',
		publishedAt: '2024-02-25T09:00:00.000Z',
		readingTimeMinutes: 10,
		tags: ['scene', 'history', 'industry', '2000s'],
		accentHue: 25
	},
	{
		id: 'esperanza-spalding-self-titled',
		slug: 'esperanza-spalding-self-titled',
		title: 'The Quiet Year of Esperanza Spalding',
		excerpt:
			"Before Radio Music Society, before the Best New Artist Grammy, there was a small self-titled record on a tiny label. It still holds up.",
		body:
			"By the time most of the world heard Esperanza Spalding's name, it was 2011 and she had just beaten Justin Bieber for the Best New Artist Grammy. The press cycle was so loud about that fact (Beliebers vandalized her Wikipedia page, the whole thing) that her actual records got slightly buried.",
		category: 'album-review',
		author: 'Petra Holm',
		publishedAt: '2024-05-15T09:00:00.000Z',
		readingTimeMinutes: 5,
		tags: ['esperanza-spalding', '2008', 'bass', 'vocal-jazz'],
		accentHue: 50
	}
];
