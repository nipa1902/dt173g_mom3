const gulp = require ('gulp');
const { series, parallel } = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const delFile = require('gulp-clean');
const uglify = require('gulp-uglify');

const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-clean-css');


// Wipes everything in public directory
function cleanPub() {
    return gulp.src('./pub/**/*.*')
        .pipe(delFile());
}

function cleanImages() {
    return gulp.src('./pub/img/*.*')
        .pipe(delFile());
}

// Deletes CSS in pub
function cleanCSS() {
    return gulp.src('./pub/css/*.css') 
        .pipe(delFile());
}

// Deletes JS in pub
function cleanJS() {
    return gulp.src('./pub/js/*.js') 
        .pipe(delFile());
}

// Deletes HTML in pub
function cleanHTML() {
    return gulp.src('./pub/*.html') 
        .pipe(delFile());
}


// Minifies and moves the images
function images() {
 return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./pub/img'));
}

// Minifies and then concatenates all CSS
function css() {
    return gulp.src('./src/css/*.css')
        .pipe(cssmin({compatibility: 'ie8'}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./pub/css'))
        .pipe(browserSync.stream());
}

//  Minifies and then concatenates all JS
function javascript() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./pub/js'))
        .pipe(browserSync.stream());
}

// Moves html from source to pub
function html() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./pub/'));
}

// Our watcher for live reload on public folder
function watch() {
    browserSync.init({
        server: {
            baseDir: './pub/'
        }
    });

    // I watch for SRC changes, and update public files
    gulp.watch('src/js/*.js', series(cleanJS, javascript));
    gulp.watch('src/*.html', series(cleanHTML, html));
    gulp.watch('src/css/*.css', series(cleanCSS, css));
    gulp.watch('src/img/**.*', series(cleanImages, images));

    // I watch for public changes and reload browser (this will also run whenever the above code is invoked)
    gulp.watch('./pub/**').on('change', browserSync.reload);
}


exports.cleanCSS = cleanCSS;
exports.cleanJS = cleanJS;
exports.cleanHTML = cleanHTML;
exports.cleanImages = cleanImages;

exports.cleanPub = cleanPub;

exports.images = images;
exports.html = html;
exports.javascript = javascript;
exports.css = css;

exports.watch = watch;

exports.default = series(cleanPub, parallel(html, css, javascript, images), watch);