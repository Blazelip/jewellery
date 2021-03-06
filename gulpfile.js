'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var concat = require('gulp-concat');

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(rename('style.css'))
      .pipe(gulp.dest('build/css'))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
});

gulp.task('javascript', function () {
  return gulp.src([
    './source/js/vendor.js',
    './source/js/slider.js',
    './source/js/accordion.js',
    './source/js/burger.js',
    './source/js/modal.js',
    './source/js/form.js',
    './source/js/noscroll.js',
  ])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/**/*.js', gulp.series('javascript', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo({
          plugins: [{removeViewBox: false}, {cleanupIDs: false}]
        }),
      ]))

      .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/{icon-*,htmlacademy*}.svg')
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite_auto.svg'))
      .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
      .pipe(posthtml([
        include()
      ]))
      .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source//*.ico'
  ], {
    base: 'source'
  })
      .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('watcher', function () {
  gulp.watch('source/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('source/js/*.js', gulp.series('scripts'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/img/*.svg', gulp.series('sprite', 'refresh'));
  gulp.watch('source/img/**/*.{png,jpg}', gulp.series('images', 'webp', 'refresh'));
  gulp.watch('source/css/*.css', gulp.series('styles'));
});

gulp.task('build', gulp.series('clean', 'images', 'webp', 'css', 'javascript', 'sprite', 'copy', 'html'));
// gulp.task('build', gulp.series('clean', 'css', 'javascript', 'sprite', 'copy', 'html'));
gulp.task('start', gulp.series('build', 'server', 'watcher'));
