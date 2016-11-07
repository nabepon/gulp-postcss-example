// 各種ライブラリ読み込み。それぞれの詳細は調べてみてください。
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

// htmlのコンパイル。今回は単純にdestにコピーするだけ。
gulp.task('html', function(){
  gulp.src('./src/**/*.html') // src配下のhtmlファイルを
    .pipe(gulp.dest('./dest'));  // destフォルダに出す
});

// cssのコンパイル
gulp.task('css', function(){
  gulp.src('./src/**/*.scss') // src配下のscssファイルに対して処理
    .pipe(sourcemaps.init()) // sourcemapの初期処理
    .pipe(sass()) // sassをcssに変換
    .pipe(postcss([ // PostCSSを使う。引数にpluginを配列で渡す。
      autoprefixer({ browsers: ['last 10 versions'] }) // 変換したcssに対してprefixを付与。対応バージョンを引数で渡す。
      // ,cssnano() // cssを圧縮。見づらくなるので今回はコメントアウトしておく。
    ]))
    .pipe(sourcemaps.write()) // sourcemapをファイル内に書き出す
    .pipe(gulp.dest('./dest')); // もろもろ変換処理が終わったので、destフォルダにcssを書き出す。
});

// ファイル変更監視
gulp.task('watch',function(){
  gulp.watch('./src/**/*', ['build']); // src配下のフォルダに変更があったら gulp.task('build') を実行
  gulp.watch('./dest/**/*').on('change', browserSync.reload); // dest配下のフォルダに変更があったらブラウザリロード
});

// dev server立ち上げ
gulp.task('server', function(){
  browserSync.init({
    server:{
      baseDir:"./dest/",
      index: "/html/index.html"
    }
  })
});

// compileをまとめたタスク。buildを実行するとhtmlとcssのタスクを実行する。
gulp.task('build', ['html', 'css']);

// 起動タスク。devを実行すつとbuildとwatchとserverタスクを実行する。
gulp.task("dev", ['build', 'watch', 'server']);