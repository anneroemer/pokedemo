const gulp = require("gulp");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

function processJS(){
    return gulp.src("./src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("app.js")) //her vælger vi hvad vores nye samlede/concatenatede fil skal hedde
        .pipe(babel({ //så laver vi babel på den samlede fil
            presets: ["@babel/env"]
        }))
        .pipe(sourcemaps.write()) //vi bruger igen sourcemaps, så vi kan finde ud af hvor(hvis) i de samlede filer, der er en fejl
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload());
}

function buildJS(){
    return gulp.src("./src/js/**/*.js")
        .pipe(concat("app.js"))
        .pipe(babel({ 
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"));
}

function watchJS(){
    return gulp.watch("./src/js/**/*.js", {
        ignoreInitial: false
    }, processJS)
}

module.exports = {
    watchJS, 
    buildJS
}