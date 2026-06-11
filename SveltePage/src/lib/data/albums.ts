import type { Album } from '$lib/types';

export const albums: Album[] = [
	{
		id: 'largo',
		rank: 1,
		title: 'Largo',
		artist: 'Brad Mehldau',
		year: 2002,
		era: 'Post-Bop',
		blurb:
			'Mehldau steps outside the piano trio he made famous and lets Jon Brion produce. The result drifts between chamber jazz, electronic textures, and Beatles covers without ever feeling lost.',
		standoutTrack: 'Paranoid Android',
		coverPalette: {
			background: '#1a2332',
			foreground: '#e8d9b8',
			accent: '#c47a3d',
			style: 'lines'
		}
	},
	{
		id: 'footprints-live',
		rank: 2,
		title: 'Footprints Live!',
		artist: 'Wayne Shorter Quartet',
		year: 2002,
		era: 'Post-Bop',
		blurb:
			'Shorter at 68, with a band that listens like one organism. The compositions are decades old but the playing is restless, searching, alive — the sound of musicians refusing to repeat themselves.',
		standoutTrack: 'JuJu',
		coverPalette: {
			background: '#2d1810',
			foreground: '#f0e4c8',
			accent: '#b8472a',
			style: 'circle'
		}
	},
	{
		id: 'these-are-the-vistas',
		rank: 3,
		title: 'These Are the Vistas',
		artist: 'The Bad Plus',
		year: 2003,
		era: 'Avant-Garde',
		blurb:
			'A piano trio that treated Nirvana and Aphex Twin with the same seriousness as the standards. Tense, loud when it wants to be, often funny. The album that argued jazz could still be a rock argument.',
		standoutTrack: 'Smells Like Teen Spirit',
		coverPalette: {
			background: '#0f1e1a',
			foreground: '#e6e0d4',
			accent: '#7ba05b',
			style: 'split'
		}
	},
	{
		id: 'seven-days-of-falling',
		rank: 4,
		title: 'Seven Days of Falling',
		artist: 'E.S.T.',
		year: 2003,
		era: 'European Jazz',
		blurb:
			'The Swedish trio that played to rock audiences in clubs the size of jazz festivals. Esbjörn Svensson built melodies that lingered like pop songs and harmony that opened like film scores.',
		standoutTrack: 'Believe, Beleft, Below',
		coverPalette: {
			background: '#1c2538',
			foreground: '#dfe6f0',
			accent: '#5a7fa8',
			style: 'grid'
		}
	},
	{
		id: 'concert-in-the-garden',
		rank: 5,
		title: 'Concert in the Garden',
		artist: 'Maria Schneider Orchestra',
		year: 2004,
		era: 'Big Band',
		blurb:
			'Released only through ArtistShare, it became the first download-only record to win a Grammy. The music is gentler than the format fight suggests — long-form, painterly writing for large ensemble.',
		standoutTrack: 'Choro Dançado',
		coverPalette: {
			background: '#1f2614',
			foreground: '#f2ecd6',
			accent: '#a89a3c',
			style: 'block'
		}
	},
	{
		id: 'canvas',
		rank: 6,
		title: 'Canvas',
		artist: 'Robert Glasper',
		year: 2005,
		era: 'Modern Jazz',
		blurb:
			'Glasper had already played with Q-Tip and Bilal. His debut on Blue Note braids that history into post-bop without flinching. The hinge between his trio years and what came next.',
		standoutTrack: 'Riot',
		coverPalette: {
			background: '#2a1428',
			foreground: '#ecdcec',
			accent: '#c068a8',
			style: 'lines'
		}
	},
	{
		id: 'same-mother',
		rank: 7,
		title: 'Same Mother',
		artist: 'Jason Moran',
		year: 2005,
		era: 'Post-Bop',
		blurb:
			'Moran lets the blues sit in plain sight. With Marvin Sewell on guitar, the trio reaches back through stride, country blues, and James P. Johnson — not as study, but as inheritance.',
		standoutTrack: 'Jump Up',
		coverPalette: {
			background: '#2c1e0e',
			foreground: '#ecd9b4',
			accent: '#a06030',
			style: 'split'
		}
	},
	{
		id: 'continuo',
		rank: 8,
		title: 'Continuo',
		artist: 'Avishai Cohen',
		year: 2006,
		era: 'World Jazz',
		blurb:
			'The bassist composes like he learned harmony from cantorial singing and Cuban montunos at the same time. Acoustic, propulsive, and unmistakably his — a record that travels without sounding lost.',
		standoutTrack: 'Continuo',
		coverPalette: {
			background: '#241818',
			foreground: '#e8d4c0',
			accent: '#b85838',
			style: 'circle'
		}
	},
	{
		id: 'sangam',
		rank: 9,
		title: 'Sangam',
		artist: 'Charles Lloyd',
		year: 2006,
		era: 'Spiritual Jazz',
		blurb:
			'Lloyd, Zakir Hussain on tabla, and Eric Harland on drums. Recorded live in Santa Barbara. The kind of record where the silence between phrases matters as much as the phrases.',
		standoutTrack: 'Dancing on One Foot',
		coverPalette: {
			background: '#1a1428',
			foreground: '#e4dcee',
			accent: '#8870b8',
			style: 'block'
		}
	},
	{
		id: 'esperanza',
		rank: 10,
		title: 'Esperanza',
		artist: 'Esperanza Spalding',
		year: 2008,
		era: 'Vocal Jazz',
		blurb:
			'Spalding sings and plays upright bass at once and makes both sound easy. The record moves between Portuguese, Spanish, and English, between bossa, samba, and post-bop, like none of it is a switch.',
		standoutTrack: 'I Adore You',
		coverPalette: {
			background: '#28200c',
			foreground: '#f4e8cc',
			accent: '#d4a247',
			style: 'grid'
		}
	},
	{
		id: 'prelude-to-cora',
		rank: 11,
		title: 'Prelude... To Cora',
		artist: 'Ambrose Akinmusire',
		year: 2008,
		era: 'Modern Post-Bop',
		blurb:
			"A debut that announced a trumpeter unwilling to play the obvious phrase. Akinmusire's tone is grainy, vocal, almost reluctant — and the writing matches, never reaching for the easy resolution.",
		standoutTrack: 'Cora',
		coverPalette: {
			background: '#0e1e2c',
			foreground: '#dce6f0',
			accent: '#4a90b8',
			style: 'lines'
		}
	},
	{
		id: 'historicity',
		rank: 12,
		title: 'Historicity',
		artist: 'Vijay Iyer Trio',
		year: 2009,
		era: 'Modern Piano Trio',
		blurb:
			'Iyer covers M.I.A., Stevie Wonder, and Andrew Hill on the same record and makes the choices feel inevitable. Rhythmically dense, structurally rigorous, never academic. The decade closes here.',
		standoutTrack: 'Galang',
		coverPalette: {
			background: '#1a2418',
			foreground: '#e0e8d8',
			accent: '#8aa850',
			style: 'split'
		}
	}
];
