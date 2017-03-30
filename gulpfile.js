var gulp = require("gulp");
var sass = require("gulp-sass");// for sass compiler
var uglify = require("gulp-uglify");// for javascript compresser
var imagemin = require('gulp-imagemin'); // for image compresser
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');

var notify = require('gulp-notify');
//var notify = require('node-notifier');

var postcss = require('gulp-postcss');
//var cssnext = require('postcss-cssnext');
//var mqpacker = require('css-mqpacker');
var autoprefixer = require('autoprefixer');
//var flexibility  = require('postcss-flexibility');

var eslint = require('gulp-eslint');

const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

var browserSync  = require('browser-sync');
var reload        = browserSync.reload;
var source = ["www/**/*"];
var js = "assets/js/*.js";
var ImgPass = "www/dist/img";
var bCss = "assets/build/css";
var distJs = "www/dist/js";

gulp.task("sass", function() {
  var processors = [
    //cssnext({browsers: ['last 2 version']}),
    //mqpacker(),
    autoprefixer(),
    //flexibility()
  ];
  gulp.src("assets/sass/**/*scss")
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss(processors))
    .pipe(gulp.dest(bCss))
    .pipe(notify('SASS task has already done!!'));
});

gulp.task("webpackJs",function(){
  return gulp
    .src(js)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest("assets/bundle"))
    .pipe(notify('Webpack has already done!!'));
});

gulp.task("webpackCss",function(){
  return gulp
    .src(["assets/build/css/*.css"])
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest("assets/bundle"))
    .pipe(notify('Webpack has already done!!'));
});

//Minify bundle.js
gulp.task("uglify", function() {
  gulp.src(["assets/bundle/bundle.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(distJs))
    .pipe(notify('uglify has already done!!'));
});

gulp.task("imagemin", function() {
  gulp.src("assets/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(ImgPass))
    .pipe(notify('Image Compression has already done!!'));
});

function reload() {
  browserSync.reload();
};

gulp.task('server',['browserSync'],function() {
  nodemon({
    script: './www/server/app.js',
    ext: 'js html css',
    ignore: [
      'node_modules',
      'bin',
      'views',
      'public',
      'test'
    ],
    env: {
      NODE_ENV: 'development'
    },
    stdout: false  // Express の再起動時のログを監視するため
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^SERVER\ HAS\ STARTED!!/.test(chunk)) {
        // Express の再起動が完了したら、reload() でBrowserSync に通知。
        // ※Express で出力する起動時のメッセージに合わせて比較文字列は修正
        console.log('reloaded');
        reload();
      }
      process.stdout.write(chunk);
    });
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  });
});

gulp.task('browserSync', function () {
  browserSync.init({
    files: ['public/**/*.*', 'views/**/*.*', 'server/app.js'],
    proxy: "http://localhost:3000",
    port : "3000",
    open: false
  });
  // gulp.watch('assets/sass/**/*.scss', ['sass']);
  // gulp.watch(js,['webpackJs']);
  // gulp.watch('assets/build/css/*.css',['webpackCss']);
  // gulp.watch('assets/bundle/*.js', ['uglify']);
  // gulp.watch('assets/img/**/*', ['imagemin']);
  // gulp.watch(source, reload);
});

gulp.task("default", ["server"]);
