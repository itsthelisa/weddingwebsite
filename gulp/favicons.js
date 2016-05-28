'use strict';

var changed = require('gulp-changed'),
	gulp = require('gulp'),

	dest = './public';

gulp.task('favicons', function() {
	return gulp.src('src/favicons/**/*')
		.pipe(changed(dest))
		.pipe(gulp.dest(dest));
});
