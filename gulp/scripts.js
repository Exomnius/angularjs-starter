'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var jscs = require('gulp-jscs');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function () {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return buildScripts();
});

function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(jscs({fix: true}))
    .pipe(jscs.reporter())
    .pipe($.size())
};
