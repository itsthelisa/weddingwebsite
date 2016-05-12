'use strict';

var del = require('del'),
    gulp = require('gulp');

gulp.task('clean', function() {
    del(['public/**/*', '!public/bower_components', '!public/bower_components/**/*']);
});
