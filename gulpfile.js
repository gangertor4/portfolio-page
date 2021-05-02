const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task('less', function() {
    return gulp.src("less/style.less")
        .pipe(less())
        .pipe(postcss([
          autoprefixer(),
        ]))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

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
