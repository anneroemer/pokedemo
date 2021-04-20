const gulp = require("gulp");
const connect = require("gulp-connect");
const rename = require("gulp-rename");

function html(){
    return gulp.src("./src/html/*.html") //vi kigger i den yderste mappe -> src -> * alle filer der har .html
    .pipe(rename(function(path){
        //console.log(path.basename); //her kan vi kigge på hvilke filer der bliver behandlet
        if(path.basename !== "index"){ //Hvis ikke den hedder index, så skal der oprettes en mappe med samme navn som filen. Ex. "contact"
            path.dirname = path.basename; //dirname betyder "directory name". 
            path.basename = "index"
        }
    }))
    .pipe(gulp.dest("./dist")) //så gemmer vi en kopi i en mappe vi kalder "dist"
    .pipe(connect.reload()); //vigtigt at lukke vores pipe ";", så gulp ikke står og venter på at der kommer flere "pipes" 
    //".dest" står for destination
    //"reload" betyder at browseren vil refreshe siden automatisk efter ændringer

}

function buildHtml(){
    return gulp.src("./src/html/*.html") 
    .pipe(rename(function(path){
        if(path.basename !== "index"){ 
            path.dirname = path.basename; 
            path.basename = "index"
        }
    }))
    .pipe(gulp.dest("./build"));
}

function watchHTML(){
    return gulp.watch("./src/html/*.html", {
        ignoreInitial: false //dvs. den skal køre initial run selvom der ikke er blevet gemt endnu. Ellers vil den først køre, når der gemmes første gang
    }, html) //watch er en metode der tager 3 argumenter: den første er en string der definerer stien til mappen vi holder øje med, et objekt og det sidste er et kald til vores html funktion
}

module.exports = { //vi laver en navngiven export, og det gør man som et objekt
    watchHTML, 
    buildHtml
}