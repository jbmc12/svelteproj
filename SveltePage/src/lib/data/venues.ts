import type { Venue } from '$lib/types';

export const venues: Venue[] = [
	{
		id: 'village-vanguard',
		name: 'Village Vanguard',
		city: 'New York',
		country: 'United States',
		description:
			'Open since 1935, the room where Coltrane, Bill Evans, and countless others recorded live albums that defined the music.',
		latitude: 40.7355,
		longitude: -74.0021,
		founded: 1935
	},
	{
		id: 'blue-note-nyc',
		name: 'Blue Note',
		city: 'New York',
		country: 'United States',
		description:
			'The flagship of the global Blue Note chain. Mid-sized, food-and-drink format, two sets a night, world-class bookings.',
		latitude: 40.731,
		longitude: -74.0005,
		founded: 1981
	},
	{
		id: 'smalls',
		name: 'Smalls Jazz Club',
		city: 'New York',
		country: 'United States',
		description:
			'A basement room on West 10th Street. Long sets, late nights, and a livestream archive that turned it into an institution.',
		latitude: 40.7333,
		longitude: -74.0023,
		founded: 1994
	},
	{
		id: 'preservation-hall',
		name: 'Preservation Hall',
		city: 'New Orleans',
		country: 'United States',
		description:
			'A French Quarter room with no air conditioning and no microphones. The traditional New Orleans jazz scene anchors here.',
		latitude: 29.9586,
		longitude: -90.0648,
		founded: 1961
	},
	{
		id: 'ronnie-scotts',
		name: "Ronnie Scott's",
		city: 'London',
		country: 'United Kingdom',
		description:
			"Soho's longest-running jazz club, opened by the saxophonist of the same name. Late shows still go past midnight.",
		latitude: 51.5134,
		longitude: -0.1318,
		founded: 1959
	},
	{
		id: 'blue-note-tokyo',
		name: 'Blue Note Tokyo',
		city: 'Tokyo',
		country: 'Japan',
		description:
			'Aoyama district. Often the first stop for American artists touring Asia, with a famously attentive listening culture.',
		latitude: 35.6627,
		longitude: 139.7196,
		founded: 1988
	},
	{
		id: 'sunside-sunset',
		name: 'Sunset / Sunside',
		city: 'Paris',
		country: 'France',
		description:
			'Two rooms stacked together on Rue des Lombards, Sunside for acoustic, Sunset for electric. Continuous programming year-round.',
		latitude: 48.8595,
		longitude: 2.3475,
		founded: 1983
	},
	{
		id: 'bimhuis',
		name: 'Bimhuis',
		city: 'Amsterdam',
		country: 'Netherlands',
		description:
			'A purpose-built jazz hall on the waterfront. Modernist black box, exceptional acoustics, strong European booking.',
		latitude: 52.3729,
		longitude: 4.9165,
		founded: 1974
	}
];
