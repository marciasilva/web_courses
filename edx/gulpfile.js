var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  gulp.
    src('./test.js').
    pipe(mocha()).
    on('error', function(err) {
      this.emit('end');
    });
});

//watch the changes and execute the test task
gulp.task('watch', function() {
  gulp.watch('./*.js', ['test']); //test file inside root directory
  //gulp.watch('./test/*.js',['test']);
});
