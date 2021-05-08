const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");

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
  return gulp.src("img/*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("img"));
}

exports.sprite = sprite
