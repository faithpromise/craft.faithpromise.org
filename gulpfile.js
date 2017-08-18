const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean        = require('gulp-clean-css');
const argv         = require('yargs').argv;
const rev          = require('gulp-rev');
const watch        = require('gulp-watch');
const sourcemaps   = require('gulp-sourcemaps');
const util         = require('gulp-util');

gulp.task('default', ['sass']);

gulp.task('sass', function () {
    return gulp.src('assets/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass).on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(config.is_production ? clean() : util.noop())
        // .pipe(clean())
        // .pipe(rev())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/build'))
        .pipe(rev.manifest());
});

gulp.task('js', function () {
    return gulp.src('assets/js/main.js')
        .pipe(gulp.dest('public/build'))
});

// Watch

gulp.task('watch', function () {
    gulp.watch('assets/sass/**/*.scss', ['sass']);
});

// Config

var config = {
    sass:          { errLogToConsole: true, outputStyle: 'expanded' },
    autoprefixer:  { browsers: ['last 2 versions'], cascade: false },
    is_production: !!util.env.production
};
