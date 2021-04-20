//kig efter media filer. Skal flyttes til en tilsvarende mediamappe i dist mappen
//husk at exportere og derefter importere i gulfile
const gulp = require("gulp");
const connect = require("gulp-connect");

function media(){
    return gulp.src("./src/media/**/*.pdf") //er det nødvendigt med undermapper **
    .pipe(gulp.dest("./dist/media"))
    .pipe(connect.reload());
}

function buildMedia(){
    return gulp.src("./src/media/**/*.pdf")
    .pipe(gulp.dest("./build/media"));
}

function watchMedia(){
    return gulp.watch("./src/media/**/*.pdf", {
        ignoreInitial: false
    }, media)
}

module.exports = {
    watchMedia,
    buildMedia
}