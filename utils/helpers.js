const fs = require('fs');

/**
 * node.js require all files in a directory
 * @param {string} dirname - directory to search for files
 * @returns {object}
 * */
function requireAll(dirname) {
	const modules = {};

	function filter(filename) {
		const match = filename.match(/.+\.js$/);
		if (!match) return;

		return match;
	}

	const files = fs.readdirSync(dirname);

	files.forEach((file) => {
		const filepath = dirname + '/' + file;
		if (fs.statSync(filepath).isDirectory()) {
			const subModules = requireAll(filepath);

			if (Object.keys(subModules).length === 0) return;

			modules[(file, filepath)] = subModules;
		} else {
			const name = filter(file);
			if (!name) return;

			modules[(name, filepath)] = require('.' + filepath);
		}
	});

	return modules;
}

module.exports = { requireAll };
