document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  scrollNav();
  navegacionFija();
}

// scroll header
function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  
  //solucion de espacio que ocupa la posicion fija del header
  const body = document.querySelector('body');

  window.addEventListener('scroll', function () {
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

//scroll navegable 
function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal");
  
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', function (e) {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });

    });
  })
}

//crear galeria
function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
                    <source srcset="build/img/avif/thumb/${i}.avif" type="image/avif">
                    <source srcset="build/img/webp/thumb/${i}.webp" type="image/webp">
                    <img loading="lazy" src="build/img/webp/thumb/${i}.webp" alt="imagen galeria">
                `;
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
                    <source srcset="build/img/avif/grande/${id}.avif" type="image/avif">
                    <source srcset="build/img/webp/grande/${id}.webp" type="image/webp">
                    <img loading="lazy" src="build/img/webp/grande/${id}.webp" alt="imagen galeria">
                `;

  // crea el overlay con la imagen
  const overlay = document.createElement("ASIDE");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    // añade al html
    const body = document.querySelector("body");
    // cuando estamos antes de darle click a alguna imagen remueve la clase de fijar
    body.classList.remove("fijar-clase");
    overlay.remove();
  };

  // boton para cerrar el Modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("boton-cerrar");
  cerrarModal.onclick = function () {
    // añade al html
    const body = document.querySelector("body");
    // cuando estamos en la pantalla para cerrar la ventana agrega la clase de fijary no pueda dar escroll
    body.classList.add("fijar-clase");
    overlay.remove();
  };

  // añade al html
  const body = document.querySelector("body");
  overlay.appendChild(cerrarModal);
  body.appendChild(overlay);
  body.classList.add("fijar-clase");
}
