var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

gulp.task('htmlMinify', function() {
  return gulp.src('src/pages/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
});
