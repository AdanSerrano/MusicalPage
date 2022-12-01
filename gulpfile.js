const { src, dest, watch, parallel } = require('gulp');

//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require ('gulp-plumber')


// imagenes
const cache = require ('gulp-cache')
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require("gulp-avif");



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


function imagenes(done) {
  const opciones = {
    optimizationLevel:3 
  }
  src("src/img/**/*")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img/cache"));
  
  
  done()
}

// cambiar imagen de jpg png a webp
function versionWebp(done) {

  const opciones = {
    quality: 50
  };

  src('src/img/**/*')
    .pipe(webp(opciones))
    .pipe(dest('build/img/webp'))
  done()
}

function versionAvif(done) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.*")
    .pipe(avif(opciones))
    .pipe(dest("build/img/avif"));
  done();
}

function javascript(done){
  src('src/js/**/*.js')
    .pipe(dest('build/js'));
  done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);


    done();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, css, versionWebp, versionAvif, javascript, dev);


