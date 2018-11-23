'use strict'

var gulp = require('gulp'),
  scss = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  imagemin = require('gulp-imagemin'),
  runSequence = require('run-sequence'),
  del = require('del'),
  terser = require('gulp-terser')

var SASS_INCLUDE_PATHS = [
  './node_modules/@mezhevykh/reset-styles/src'
]

function handleError (err) {
  console.log(err.toString())
  this.emit('end')
}

gulp.task('styles', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(plumber({errorHandler: handleError}))
    .pipe(concat('main.min.css'))
    .pipe(sourcemaps.init())
    .pipe(scss({outputStyle: 'compressed', includePaths: SASS_INCLUDE_PATHS}))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 8',
        'ie 11',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber({errorHandler: handleError}))
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/js'))
})

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/img'))
})

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('./assets/fonts'))
})

gulp.task('clean', function () {
  return del(['assets/'])
})

gulp.task('watch', function () {
  runSequence('styles', ['js'], ['fonts'], ['images'],
    function () {
      gulp.watch('./src/scss/**/*.scss', ['styles'])
      gulp.watch('./src/js/**/*.js', ['js'])
      gulp.watch('./src/fonts/*', ['fonts'])
      gulp.watch('./src/images/**/*', ['images'])
    })
})

gulp.task('default', function () {
  runSequence('styles', ['js'], ['fonts'], ['images'],
    function () {

    })
})