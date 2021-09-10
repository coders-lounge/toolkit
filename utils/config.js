import * as fs from 'fs';
import yaml from 'js-yaml';

// Files to look for in order of preference
const files = [
	'config.json',
	'config.yaml',
	'config.yml',
	'config.local.json',
	'config.local.yaml',
	'config.local.yml',
];

// Load config
let configData = {};
// Loop through files
for (const file of files) {
	// Check if file exists
	if (fs.existsSync(`./${file}`)) {
		// Get file extension
		const ext = file.split('.').pop();

		// Check if file is json
		if (ext === 'json') {
			// set config
			configData = JSON.parse(fs.readFileSync(`./${file}`));
		}

		// Check if file is yaml
		if (ext === 'yaml' || ext === 'yml') {
			// set config
			configData = yaml.load(fs.readFileSync(`./${file}`, 'utf8'));
		}

		// Break loop
		break;
	}
}

// load config into Map with :: as the value seperator, flatten all child objects (recursive function) leave arrays as is
const config = new Map();
function flatten(obj, path = '') {
	// Loop through object
	for (const key in obj) {
		// Check if key is an object
		if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			// Recursive call
			flatten(obj[key], `${path}${key}::`);
		} else {
			// Set key value
			config.set(`${path}${key}`, obj[key]);
		}
	}
}

flatten(configData);

export default config;
