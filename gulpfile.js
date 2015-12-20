var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var streamify = require('gulp-streamify')
var gutil = require('gulp-util');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var babel = require("gulp-babel");
var sourcemaps = require('gulp-sourcemaps');


gulp.task('build', function () {
  browserify({
    entries: './source/javascript/client/main.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));

});
 

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  
  var props = {
    entries: ['./source/javascript/client/' + file],
    extensions: ['.js'],
    debug : true,
    transform:  [babelify,reactify]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(streamify(uglify()))
      .pipe(sourcemaps.write('./')) // writes .map file
      .pipe(gulp.dest('./build/'));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}



// run once
gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts'], function() {
  return buildScript('main.js', true);
});


// run 'scripts' task first, then watch for future changes
gulp.task('item', function() {
  return buildScript('item.js', true);
});


