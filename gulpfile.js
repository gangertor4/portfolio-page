const gulp = require('gulp');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");
const csso = require("postcss-csso");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const del = require("del");



//Less to css

gulp.task('less', function() {
    return gulp.src("less/style.less")
        .pipe(less())
        .pipe(postcss([
          autoprefixer(),
        ]))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

//Server & watcher

gulp.task('server', gulp.series('less', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("less/*.less", gulp.series('less'));
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('server'));

//SVG to spites

const sprite = () => {
  return gulp.src("img/*-icon.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("img"));
}

exports.sprite = sprite

//BUILD

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/img/*.{png,svg}",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

const stylesMin = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}

exports.stylesMin = stylesMin;

const scripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
}

exports.scripts = scripts;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

const clean = () => {
  return del("build");
};

const build = gulp.series(
  clean,
  gulp.parallel(
    stylesMin,
    html,
    scripts,
    copy
  ));

exports.build = build;



