'use strict';

let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');
let image = require('gulp-image');
let browserSync = require('browser-sync');
 

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('image', function () {
    gulp.src('./src/img/*')
        .pipe(image())
        .pipe(gulp.dest('./build/img'));
});

gulp.task('sass', function () {
    return gulp.src('./src/styles/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
         }))
        .pipe(gulp.dest('./build/styles'));

});

gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./build/js')); 
});


gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './build/'
        },
    });
});


gulp.task('watch', function () {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/styles/*.sass', ['sass']);
    gulp.watch('./src/img/*', ['image']);
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('build/*.html', browserSync.reload);
    gulp.watch("./build/css/**/*.css").on("change", browserSync.reload);
    gulp.watch('./build/js/**/*.js').on("change", browserSync.reload);
});

gulp.task('default', ['watch', 'html', 'sass', 'image', 'scripts', 'browserSync']);