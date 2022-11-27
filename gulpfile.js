const { src, dest, watch } = require('gulp');
const sass = require("gulp-sass")(require("sass"));
const plumber = require ('gulp-plumber')

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

function dev(done) {
    watch('src/scss/**/*.scss', css);


    done();
}

exports.css = css;
exports.dev = dev;