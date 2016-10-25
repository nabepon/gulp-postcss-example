var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require("gulp-webserver");

// htmlのコンパイル。今回は単純にdestにコピーするだけ。
gulp.task('html', function(){
  gulp.src('./src/**/*.html').pipe(gulp.dest('./dest'));
});

// cssのコンパイル
gulp.task('css', function(){
  gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({ browsers: ['last 10 versions'] }),
      cssnano()
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dest'));
});

// ファイル変更監視
gulp.task('watch', function(){
  gulp.watch('./src/**/*', ['build']);
});

// dev server立ち上げ
gulp.task("server", function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true,
      directoryListing: true
    }));
});

// compileをまとめたタスク
gulp.task('build', ['html', 'css']);

// buildとwatchを実行し、serverを立ち上げる。
gulp.task("dev", ['build', 'watch', 'server']);