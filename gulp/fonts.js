'use strict';

var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    plugins = require('gulp-load-plugins')(),
    series = require('stream-series'),

	dest = 'public/fonts';

gulp.task('fonts', function() {

	var fontawesome = gulp.src(mainBowerFiles())
    	.pipe(plugins.filter(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.otf']));

    var fonts =  gulp.src('src/fonts/**/*');

    return series(fontawesome, fonts)
    	.pipe(plugins.changed(dest))
        .pipe(gulp.dest(dest));
});
