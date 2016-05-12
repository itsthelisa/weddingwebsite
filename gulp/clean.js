'use strict';

var del = require('del'),
    gulp = require('gulp');

gulp.task('clean', function() {
    del(['public']);
});
