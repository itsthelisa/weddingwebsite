/*eslint-env node */

/*
	gulpfile.js
	===========
	Rather than manage one giant configuration file responsible
	for creating multiple tasks, each task has been broken out into
	its own file in the gulp folder (required below).

	To add a new task, simply add a new task file to /gulp.
*/

// Speeds load of modules required by 'require' by caching their path
require('cache-require-paths');

require('require-dir')('./gulp', { recurse: true });
