'use strict';

var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    mainBowerFiles = require('main-bower-files'),
    path = require('path'),
    series = require('stream-series'),
    plugins = require('gulp-load-plugins')(),

    srcRoot = 'src',
    destRoot = 'public';

function getLibStream(source) {
    var needsCompiling = plugins.filter(['**/*.less'], {restore: true});
    return gulp.src(source)
        .pipe(plugins.filter(['**/*.less', '**/*.css']))
        .pipe(needsCompiling)
        .pipe(plugins.less())
        .pipe(needsCompiling.restore);
}

function buildFiles(name) {
    var dest = path.join(destRoot, 'css');

    return lazypipe()
        .pipe(plugins.concat, name + '.css')
        .pipe(gulp.dest, dest)
        .pipe(plugins.cleanCss, {compatibility: 'ie8'})
        .pipe(plugins.rename, name + '.min.css')
        .pipe(gulp.dest, dest);
}

gulp.task('libless', function() {
    var bower = getLibStream(mainBowerFiles());

    var custom = getLibStream([
            path.join(srcRoot, 'lib/**/*.less'),
            path.join(srcRoot, 'lib/**/*.css')
        ]);

    // Bower modules must come first
    var lib = series(bower, custom)
        .pipe(buildFiles('lib')());

    return lib;
});

gulp.task('appless', function() {
    return gulp.src(path.join(srcRoot, 'less/agency.less'))
        .pipe(plugins.less())
        .pipe(buildFiles('app')());
});

gulp.task('less', ['libless', 'appless']);
