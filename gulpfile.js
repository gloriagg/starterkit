var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');

/* Broswer sync */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "IamGG_2015_v1"
        }
    });
});


/* Jade */
gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('_dev/jade_files/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./'));
});

/* scripts */
/* uglify */
gulp.task('compressJS', function() {
  return gulp.src('_dev/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('gg.js'))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});


/* sass */
gulp.task('sass', function () {
  gulp.src('_dev/sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
            browsers: ['> 0%', 'IE 7'],
            cascade: false
      }))
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(concat('gg.css'))
      .pipe(sourcemaps.write('./sourcemaps'))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
});




/* watch */
// gulp.task('watch', function() {
//    gulp.watch('_dev/js/*.js',['compressJS']);
//    gulp.watch('_dev/sass/*.scss',['sass']);
// });

gulp.task('serve', ['templates','sass','compressJS'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("_dev/sass/*.scss", ['sass']);
    gulp.watch("_dev/js/*.js", ['compressJS']);
    gulp.watch("_dev/jade_files/*.jade", ['templates']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
