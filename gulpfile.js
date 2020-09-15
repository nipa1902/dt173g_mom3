const gulp = require ('gulp');
const { series, parallel } = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const delFile = require('gulp-clean');

const htmlmin = require('gulp-htmlmin');


// Wipes everything in public directory
function cleanPub() {
    return gulp.src('./pub/**/*.*')
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

// Concatenates all CSS and streams result to browser sync
function css() {
    return gulp.src('./src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./pub/css'))
        .pipe(browserSync.stream());
}

// Concatenates all JS and streams result to browser sync
function javascript() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./pub/js'))
        .pipe(browserSync.stream());
}

// Moves html from source to pub
function html() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin())
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
    gulp.watch('src/css/*.css',series(cleanCSS, css));

    // I watch for public changes and reload browser (this will run whenever the above code is invoked)
    gulp.watch('./pub/*.html').on('change', browserSync.reload);
    gulp.watch('./pub/js/*.js').on('change', browserSync.reload);
    gulp.watch('./pub/css/*.css').on('change', browserSync.reload);
}


exports.cleanCSS = cleanCSS;
exports.cleanJS = cleanJS;
exports.cleanHTML = cleanHTML;

exports.cleanPub = cleanPub;

exports.html = html;
exports.javascript = javascript;
exports.css = css;

exports.watch = watch;

// This is our watcher, it checks for changes to src files, and cleans+pipes new files to public folder
/* exports.watch = function() {
    watch('src/*.html', series(cleanHTML, html));
    watch('src/css/*.css',series(cleanCSS, css));
    watch('src/js/*.js', series(cleanJS, javascript));
} */

exports.default = series(cleanPub, parallel(html, css, javascript), watch);

// The "build" will wipe public directory, and then run HTML/CSS/JS concat+migrate
//exports.build = series(cleanPub, parallel(html, css, javascript), watch);