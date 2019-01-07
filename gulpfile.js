var gulp = require('gulp');
var postcss = require('gulp-postcss');
var minifycss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var px2rem = require('postcss-px2rem');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('procss', function () {
    var processors = [
        px2rem({
            remUnit: 75
        }),
        autoprefixer(),
        cssnano()
    ];
    return gulp.src('./src/css/mobile.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('minicss', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCss: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('image', function () {
    return gulp.src('./src/img/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('clean', function () {
    return gulp.src(['./dist/'], {
                read: false
            })
        .pipe(clean({
            force: true
        }));
});

gulp.task('default', ['clean'], function () {
    setTimeout(function () {
        gulp.start(['procss', 'minicss', 'html', 'image'])
    }, 1000);
});