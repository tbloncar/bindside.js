var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');

var paths = {
  src: ['./src/*.js']
};

gulp.task('lint', function() {
  return gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.src)
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(concat('bindside.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('demo'));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['lint', 'scripts'])
});

gulp.task('default', ['watch']);