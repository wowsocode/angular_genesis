'use strict';

var gulp = require('gulp')
  , bowerSrc = require('gulp-bower-files')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  , sass = require('gulp-sass')
  , autoprefix = require('gulp-autoprefixer')
  , mincss = require('gulp-minify-css')
  , nodemon = require('gulp-nodemon')
  , config  = require('./app/config.json')

gulp.task('lib', function(){
  return bowerSrc()
    .pipe(uglify())
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('public/js'))
})

gulp.task('app', function(){
  return gulp.src([
        'js/**/*.js'
      ])
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/js'))
})

gulp.task('css', function(){
  return gulp.src('sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefix('last 1 version'))
    .pipe(concat('main.css'))
    .pipe(mincss())
    .pipe(gulp.dest('public/css'))
})

//dev
gulp.task('watch', ['lib', 'css', 'app'], function(){
  gulp.watch(config.sass, ['css'])
  gulp.watch(config.dev, ['app'])
  nodemon({ script: 'index.js', ext: 'html js'})
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('build', ['lib', 'css', 'app'], function(){
  nodemon({ script: 'index.js', ext: 'html'})
    .on('restart', function () {
      console.log('restarted!')
    })
})
