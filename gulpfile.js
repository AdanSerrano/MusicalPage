const { src, dest, watch, parallel } = require('gulp');

//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require ('gulp-plumber')


// imagenes
const webp = require('gulp-webp');



function css(done) {
  // identificar el archivo
  // compilar
  // almacenarla en el disco duro
  src("src/scss/**/*.scss") // identificar el archivo
    .pipe(plumber())
    .pipe(sass()) // compilar
    .pipe(dest("build/css")) // almacenarla en el disco duro

  done();
}


// cambiar imagen de jpg png a webp
function versionWebp(done) {

  const opciones = {
    quality: 50
  };

  src('src/img/**/*.{png, jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
  
  
  done()
}

function dev(done) {
    watch('src/scss/**/*.scss', css);


    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);


