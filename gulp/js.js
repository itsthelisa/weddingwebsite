'use strict';

var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    path = require('path'),
    plugins = require('gulp-load-plugins')(),

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

    return gulp.src(path.join(srcRoot, 'lib/**/*.js'))
        .pipe(plugins.order([
            // classie must come first
            path.join(srcRoot, 'lib/classie.js'),
        ], { base: '.' }))
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
