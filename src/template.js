var gulp = require('gulp'),
    react = require('gulp-react'),
    stylus = require('gulp-stylus'),
    base64 = require('gulp-base64'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    pkg = JSON.parse(fs.readFileSync('package.json')),
    pkgName = pkg.name,
    buildDir = './../.build/',
    distDir = './../dist/';

gulp.task('copy',function() {
    return gulp.src(['**'])
            .pipe(gulp.dest(buildDir + pkgName + '/'));
});
gulp.task('styl',function() {
    return gulp.src(['**/**.styl'])
            .pipe(stylus())
            .pipe(gulp.dest(buildDir+pkgName+'/'));
});
gulp.task('base',['styl','copy'],function() {
    return gulp.src([buildDir + pkgName + '/**/**.css',buildDir + pkgName + '/**.css'])
            .pipe(base64({
                'baseDir': buildDir,
                'extensions': ['svg', 'png', /\.jpg#datauri$/i],
                'maxImageSize': 8*1024*1024*1024,
                'debug': true
            }))
            .pipe(gulp.dest(buildDir + pkgName + '/'))
});
gulp.task('react',function() {
    return gulp.src(['**/**.jsx'])
            .pipe(react())
            .pipe(gulp.dest(buildDir + pkgName + '/'));
});
gulp.task('moveCss',['base'],function() {
    return gulp.src([buildDir + pkgName + '/**/**.css'])
            .pipe(gulp.dest(distDir + pkgName + '/'));
});
gulp.task('browserify',['copy'],function() {
    console.log('please wait moment :)');
    console.log('maybe is so long,go to get a cup of coffee :)');
    return gulp.src([buildDir + pkgName + '/**/**.jsx'],{ read: false })
            .pipe(browserify({
                'debug': true,
                'transform': ['reactify'],
                'extensions': ['.jsx']
            }))
            .pipe(rename(function (path) {
                path.extname = '.js';
            }))
            .pipe(gulp.dest(distDir + pkgName + '/'));
});
gulp.task('uglify',['browserify'],function() {
    return gulp.src([distDir+pkgName+'/**/**.js'])
            .pipe(uglify())
            .pipe(gulp.dest(distDir+pkgName+'/'));
});

gulp.task('default',['moveCss','uglify']);
gulp.task('build',['base','browserify']);
gulp.task('release',['moveCss','uglify']);
