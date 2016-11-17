'use strict';

var gulp = require('gulp');
var conf = require('./conf');

var gulpDocs = require('gulp-ngdocs');

gulp.task('docs', function () {
  var options = {
    html5Mode: true,
    startPage: '/portal',
    title: "Hubo Angularjs Documentation",
    titleLink: "/portal",
    scripts: [
      '../bower_components/angular/angular.min.js',
      '../bower_components/angular/angular.min.js.map',
      '../bower_components/angular-animate/angular-animate.min.js',
      '../bower_components/angular-animate/angular-animate.min.js.map',
      '../bower_components/marked/lib/marked.js'
    ]
  };

  return gulp.src(conf.paths.src + '/**/*.js')
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest(conf.paths.docs));
});
