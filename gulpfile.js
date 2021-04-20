const { task } = require("gulp");
const gulp = require("gulp");
const connect = require("gulp-connect");
const { watchHTML, buildHtml } = require("./tasks/html"); //vi har eksporteret et objekt fra html.js, så derfor skal vi gribe den her
const { watchSCSS, buildScss } = require("./tasks/scss");
const { watchJS, buildJS } = require("./tasks/js");
const { watchMedia, buildMedia } = require("./tasks/media");
const { watchImage, buildImage } = require("./tasks/image");


function dist (done){ 
    //console.log("Halloooo...?");
    watchHTML()
    watchSCSS()
    watchJS()
    watchMedia()
    watchImage()
    connect.server({ //server er en metode der tager ét argument, som er et objekt
        root: "./dist",
        livereload: true, 
        port: 3000
    })
    done()
}

function build(done){
    buildHtml()
    buildScss()
    buildJS()
    buildMedia()
    buildImage()
    done() //vi har kun brug for at sætte en server op til vores udviklingsfunktion
}

exports.default = dist; //vi sætter den til at køre vores funktion dist som default
exports.build = build;