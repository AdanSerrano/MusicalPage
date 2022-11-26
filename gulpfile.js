const { src, dest, watch } = require('gulp');
const sass = require("gulp-sass")(require("sass"));

function css(done) {
  // identificar el archivo
  // compilar
  // almacenarla en el disco duro
  src("src/scss/app.scss") // identificar el archivo
    .pipe(sass()) // compilar
    .pipe(dest("build/css")) // almacenarla en el disco duro

  done();
}

function dev(done) {
    watch('src/scss/app.scss', css);


    done();
}

exports.css = css;
exports.dev = dev;