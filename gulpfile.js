// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var order = require('gulp-order');
var mainBowerFiles = require('main-bower-files');
var buildConfig = require('./build.config.js');
var concatCss = require('gulp-concat-css');
var webserver = require('gulp-webserver');

//Compile and concatenate css
gulp.task('stylus', function() {
    return gulp.src(['src/css/*.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build/css'));
});
// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./build/css'));
});
// Concatenate & Minify JS
gulp.task('scripts', function () {

   return gulp.src(['src/js/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/'))
        //.pipe(rename('all.min.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('build/js'));
});
//Move html to build
gulp.task('copy-html', function() {
    gulp.src('./src/tpl/**/*.html')
        .pipe(gulp.dest('./build/tpl/'));
});
//Concatenate all vendors
gulp.task('scripts:vendor', function() {
        var vendors = mainBowerFiles();
        return gulp.src(vendors)
            .pipe(filter('bower_components/**/*.js'))
            .pipe(order(vendors))
            .pipe(concat('vendors.js'))
            .pipe(gulp.dest('build/'));
    })
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/tpl/**/*.html', ['copy-html']);
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/css/*.css', ['stylus']);
});
//Create vendors.css
gulp.task('concatenate-css-vendor', function() {
    return gulp.src(buildConfig.css)
        .pipe(concatCss("vendors.css"))
        .pipe(gulp.dest('build/css/'));
});
//Create vendors.js
gulp.task('concatenate-js-vendor', function() {
    return gulp.src(buildConfig.js)
        .pipe(concat('vendors.js', { newLine: ';\n' }))
        .pipe(gulp.dest('build/'));
});
//Start webserver
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            fallback: 'index.html',
            open: 'index.html'
        }));
});
//Build task
gulp.task('build', ['stylus', 'sass', 'concatenate-css-vendor', 'concatenate-js-vendor', 'scripts', 'copy-html'])
// Default Task
gulp.task('default', ['lint','stylus', 'sass', 'scripts', 'watch', 'copy-html', 'webserver']);
