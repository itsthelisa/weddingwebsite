'use strict';

var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    mainBowerFiles = require('main-bower-files'),
    path = require('path'),
    plugins = require('gulp-load-plugins')(),
    series = require('stream-series'),

    srcRoot = 'src',
    destRoot = 'public';

function buildFiles(name) {
    var dest = path.join(destRoot, 'js');

    return lazypipe()
        .pipe(plugins.concat, name + '.js')
        .pipe(gulp.dest, dest)
        .pipe(plugins.uglify)
        .pipe(plugins.rename, name + '.min.js')
        .pipe(gulp.dest, dest);
}

gulp.task('libjs', function() {

    var bower = gulp.src(mainBowerFiles())
        .pipe(plugins.filter(['**/*.js']));

    var custom = gulp.src(path.join(srcRoot, 'lib/**/*.js'))
        .pipe(plugins.order([
            // classie must come first
            path.join(srcRoot, 'lib/classie.js'),
        ], { base: '.' }));

    // Bower modules must come first
    return series(bower, custom)
        .pipe(buildFiles('lib')());
});

gulp.task('appjs', function() {

    return gulp.src(path.join(srcRoot, 'js/**/*.js'))
        .pipe(buildFiles('app')());
});

gulp.task('serverjs', function() {
    return gulp.src('src/*.js')
        .pipe(plugins.changed(destRoot))
        .pipe(gulp.dest(destRoot));
});

gulp.task('js', ['libjs', 'appjs', 'serverjs']);
