export interface Album {
	id: string;
	rank: number;
	title: string;
	artist: string;
	year: number;
	era: string;
	blurb: string;
	standoutTrack: string;
	coverPalette: CoverPalette;
}

export interface CoverPalette {
	background: string;
	foreground: string;
	accent: string;
	style: 'block' | 'lines' | 'circle' | 'split' | 'grid';
}

export interface Venue {
	id: string;
	name: string;
	city: string;
	country: string;
	description: string;
	latitude: number;
	longitude: number;
	founded: number;
}

export interface NavLink {
	href: string;
	label: string;
}

export interface SocialLink {
	href: string;
	label: string;
	platform: string;
}
