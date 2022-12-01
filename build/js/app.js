document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
}

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
        }

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
    const overlay = document.createElement('ASIDE');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    // boton para cerrar el Modal 
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('boton-cerrar')
    cerrarModal.onclick = function () {
        overlay.remove();
    }

    overlay.appendChild(cerrarModal);

    // añade al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-clase')
}