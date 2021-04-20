const gulp = require("gulp");
const connect = require("gulp-connect");
const imagemin = require("gulp-imagemin");
const imageResize = require("gulp-image-resize");

function image(){
    return gulp.src("./src/img/**/*.*") //vi kigger efter alle typer billeder
    //noget her...
    .pipe(imageResize({ //vi bruger imageResize, som vi har installeret, til at croppe vores billeder
        width : 1800,
        height : 1000,
        crop : false, //false: de skal ikke croppes
        upscale : false
      }))
    .pipe(imagemin([ //så bruger vi imagemin, som vi også har installeret, til at optimere billederne
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 60, progressive: true}), //quality: 60, handler om sensitivitet ift. pixelfarve. Dvs. hvor høj kvalitet billedet er
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest("./dist/img"))
    .pipe(connect.reload());
}

function buildImage(){
    return gulp.src("./src/img/**/*.*") //vi kigger efter alle typer billeder
    //noget her...
    .pipe(imageResize({ //vi bruger imageResize, som vi har installeret, til at croppe vores billeder
        width : 1800,
        height : 1000,
        crop : false, //false: de skal ikke croppes
        upscale : false
      }))
    .pipe(imagemin([ //så bruger vi imagemin, som vi også har installeret, til at optimere billederne
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 60, progressive: true}), //quality: 60, handler om sensitivitet ift. pixelfarve. Dvs. hvor høj kvalitet billedet er
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest("./build/img"));
}

function watchImage(){
    return gulp.watch("./src/img/**/*.*", {
        ignoreInitial: false
    }, image)
}

module.exports = {
    watchImage, 
    buildImage
}