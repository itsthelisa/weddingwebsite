'use strict';

var gulp = require('gulp'),
    changed = require('gulp-changed'),

	dest = 'public/fonts';

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
    	.pipe(changed(dest))
        .pipe(gulp.dest(dest));
});
