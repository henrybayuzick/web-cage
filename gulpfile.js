var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-ruby-sass'),
    // svgmin = require('gulp-svgmin'),
    watch = require('gulp-watch');
    concat = require('gulp-concat');
    notify = require('gulp-notify');

gulp.task('styles', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))       
        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./css'))
        .pipe(notify({message: "Styles task completed."}));
});

gulp.task('scripts', function() {
    return gulp.src(['./js/*.js,','./js/vendor/*.js'])
        .pipe(concat('all.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(notify({message: "Scripts task completed."}));
});

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', ['styles']);

    gulp.watch('./js/*.js', ['scripts']);
})

gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});