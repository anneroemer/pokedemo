const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

sass.compiler = require("node-sass");

function scss(){
    return gulp.src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init()) //vi sætter sourcemaps på så den kan holde øje med hvor vores scss filer kommer fra. Sourcemaps skal omkranse vores pipe(sass())
    .pipe(sass({ outputStyle: "expanded"})) //så vil vi ikke se vores css compressed
    .pipe(sourcemaps.write()) //og her får vi sourcemaps til at udskrive det
    .pipe(gulp.dest("./dist/css"))
    .pipe(connect.reload());
}

function buildScss(){
    return gulp.src("./src/scss/**/*.scss")
    .pipe(sass({outputStyle: "compressed"})) //vi vil gerne komprimere koden i build, derfor bruger vi dette objekt fra gulp-sass npm
    .pipe(gulp.dest("./build/css"));
}

function watchSCSS(){
    return gulp.watch("./src/scss/**/*.scss", { //vi laver /**/ for at få den til at lede i scss mappen OG evt. undermapper
        ignoreInitial: false
    }, scss)
}

module.exports = { //man ville kunne skrive watchSCSS: watchSCSS, men fordi der skal stå det samme på begge sider af colonnet, så kan vi nøjes med at skrive det én gang
    watchSCSS,
    buildScss
}