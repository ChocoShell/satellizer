var gulp = require('gulp');
var rename = require("gulp-rename");
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var complexity = require('gulp-complexity');

gulp.task('minify', function() {
  return gulp.src('satellizer.js')
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename('satellizer.min.js'))
    .pipe(gulp.dest('.'))
});

gulp.task('copy', function() {
  return gulp.src('satellizer.js')
    .pipe(gulp.dest('examples/client/vendor'));
});

gulp.task('complexity', function() {
  return gulp.src('satellizer.js')
    .pipe(complexity());
});

gulp.task('watch', function() {
  gulp.watch('satellizer.js', ['copy', 'minify']);
});

gulp.task('php', function() {
  return gulp.src('examples/client/**/*.*')
    .pipe(gulp.dest('examples/server/php/public'))
});

gulp.task('default', ['copy', 'minify', 'watch']);