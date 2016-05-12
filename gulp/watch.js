'use strict';

var gulp = require('gulp'),
    path = require('path'),
    lr = require('tiny-lr')(),
    nodemon = require('gulp-nodemon');

function notifyLiveReload(event) {
    lr.changed({
        body: {
            files: [path.relative(__dirname, event.path)]
        }
    });
}

function serve() {
    nodemon({
        script: 'public/server.js',
        ext: 'js',
        watch: [
            'public/*.js'
        ]
    });
}

gulp.task('watch', ['build'], function() {

    gulp.watch(['src/lib/**'], ['libjs', 'libless']);
    gulp.watch(['src/fonts/**'], ['fonts']);

    gulp.watch(['src/less/*.less'], ['appless']);
    gulp.watch(['src/js/*.js'], ['appjs']);
    gulp.watch(['src/*.js'], ['serverjs']);

    gulp.watch(['src/img/**/*'], ['img']);
    gulp.watch(['src/pages/**/*'], ['pages']);

    gulp.watch('public/css/**/*.css', notifyLiveReload);
    gulp.watch('public/js/**/*.js', notifyLiveReload);
    gulp.watch('public/img/**/*', notifyLiveReload);
    gulp.watch('public/fonts/**/*', notifyLiveReload);

    serve();

    // Start live reload
    lr.listen(35729);
});

gulp.task('serve', ['build'], serve);
