'use strict';

var changed = require('gulp-changed'),
    gulp = require('gulp'),

    dest = './public/img';

gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
});
