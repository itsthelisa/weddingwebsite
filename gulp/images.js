'use strict';

var changed = require('gulp-changed'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    dest = './public/img';

gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
});
