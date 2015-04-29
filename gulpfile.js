var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    gulp.src('./public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("public/scss/*.scss", ['sass']);
    gulp.watch("public/*.html").on('change', reload);
});

gulp.task('default', ['sass', 'browser-sync'], function() {
    // place code for your default task here
});