'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

gulp.task('bump:major', function(){
  return bumpVersion('major')
});

gulp.task('bump:minor', function(){
  return bumpVersion('minor')
});

gulp.task('bump:patch', function(){
  return bumpVersion('Patch')
});

gulp.task('bump:prerelease', function(){
  return bumpVersion('prerelease')
});

function bumpVersion(type){
  gulp.src(['./bower.json', './package.json'])
    .pipe($.bump({type: type}))
    .pipe(gulp.dest('./'));
}
