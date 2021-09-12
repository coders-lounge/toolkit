/**
 * Can currently only be used for the following: [inf, 10m, 20m, 30m, 1h, 12h] I will make it more flexible later
 * @param {String} duration - The duration to parse
 * @returns {Number|'inf'} The parsed duration in milliseconds
 */
export function parseDuration(duration) {
	const units = {
		s: 1000,
		m: 1000 * 60,
		h: 1000 * 60 * 60,
	};

	switch (duration) {
		case 'inf':
			return 'inf';
		case '10m':
			return units.m * 10;
		case '20m':
			return units.m * 20;
		case '30m':
			return units.m * 30;
		case '1h':
			return units.h;
		case '12h':
			return units.h * 12;
	}
}
