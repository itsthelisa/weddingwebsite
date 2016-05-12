'use strict';

var changed = require('gulp-changed'),
	gulp = require('gulp'),

	dest = './public';

gulp.task('pages', function() {
	return gulp.src('src/pages/**/*')
		.pipe(changed(dest))
		.pipe(gulp.dest(dest));
});
