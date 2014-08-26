// Load modules
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    zip = require('gulp-zip')
;





// optionss and names and stuff
var options = {
  js: [ 'assets/js/*.js' ],
  jsmin : 'roadthegame.js',
  css : [ 'assets/css/style.css'],
  compile : 'compile',
  build : 'build',
  archive : 'roadthegame.zip',
  archive_content : [ 'compile/*', 'index.html' ]
};





// Create the minified version of all JS files
gulp.task('js', function() {
  return gulp.src(options.js)
    .pipe(concat(options.jsmin))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(options.compile))
  ;
});





// Create the minified version of all CSS files
gulp.task('css', function() {
  return gulp.src(options.css)
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(options.compile))
  ;
});






// Calls other tasks and creates the archive
gulp.task('build', [ 'js', 'css' ], function() {
    return gulp.src(options.archive_content)
      .pipe(zip(options.archive))
      .pipe(gulp.dest(options.build))
      .pipe(notify({ message: 'created ' + options.archive + '!' }))
    ;
});