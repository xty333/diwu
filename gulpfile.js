let gulp = require("gulp");
let sass = require("gulp-sass");
let cssnano = require("gulp-cssnano")
let htmlmin = require("gulp-htmlmin")
let imagemin = require("gulp-imagemin")
let uglify = require("gulp-uglify")
let babel = require("gulp-babel")
let rename = require("gulp-rename")

function fnsass(){
    return gulp.src("./src/sass/*.scss")
    .pipe(sass({outputStyle:"expanded"}))
    //.pipe(cssnano())
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest("./dist/css"))
}

function fnhtml(){
    return gulp.src("./src/html/*.html")
    // .pipe(cssnano())
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest("./dist/html"))
}

function fnimg(){
    return gulp.src("./src/img/*")
    // .pipe(imagemin())
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest("./dist/img"))
}

function fnjs(){
    return gulp.src("./src/js/*")
    .pipe(babel({
        presets: ['@babel/env']   //这一步是操作转换为ES5,就是在js中写es6,不支持的情况下，可以用babel转换
    }))
    .pipe(uglify())
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest("./dist/uglify"))
}

function fnWatch(){
    gulp.watch("./src/sass/*.scss",fnsass)
    gulp.watch("./src/html/*.html",fnhtml)
    gulp.watch("./src/img/*.img",fnimg)
    gulp.watch("./src/js/*",fnjs) 
}

exports.sass = fnsass;
exports.html = fnhtml;
exports.js = fnjs;
exports.img = fnimg;
exports.default = fnWatch;




