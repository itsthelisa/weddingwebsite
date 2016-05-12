'use strict';

var gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    path = require('path'),
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
    return getLibStream([
            path.join(srcRoot, 'lib/**/*.less'),
            path.join(srcRoot, 'lib/**/*.css')
        ]).pipe(buildFiles('lib')());
});

gulp.task('appless', function() {
    return gulp.src(path.join(srcRoot, 'less/agency.less'))
        .pipe(plugins.less())
        .pipe(buildFiles('app')());
});

gulp.task('less', ['libless', 'appless']);
