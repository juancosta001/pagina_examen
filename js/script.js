const botonDesplegar = document.getElementById("desplegar-menu");
const menuDesplegable = document.querySelector(".menu-desplegable");

botonDesplegar.addEventListener("mouseover", function() {
  // Mostrar el menú desplegable
  menuDesplegable.style.display = "block";
});

menuDesplegable.addEventListener("mouseleave", function() {
  // Ocultar el menú desplegable cuando se sale de él
  menuDesplegable.style.display = "none";
});

function toggleMenu() {
  if (menuDesplegable.style.display === "block") {
    menuDesplegable.style.display = "none";
  } else {
    menuDesplegable.style.display = "block";
  }
}

document.addEventListener("click", function(event) {
  // Verificar si el objetivo del clic está dentro del menú desplegable
  const isClickInsideMenu = menuDesplegable.contains(event.target);

  if (!isClickInsideMenu) {
    // Si el clic es fuera del menú, ocultar el menú desplegable
    menuDesplegable.style.display = "none";
  }
  
  
});
botonDesplegar.addEventListener("click", function(event) {
  // Verificar si el dispositivo es móvil
  if (window.innerWidth < 768) {
    // Detener la propagación del evento click para evitar que se cierre inmediatamente
    event.stopPropagation();
    toggleMenu();
  }
});
botonDesplegar.addEventListener("touchstart", function(event) {
  // Verificar si el dispositivo es móvil
  if (window.innerWidth < 768) {
    event.preventDefault(); // Evitar el comportamiento táctil predeterminado (como hacer zoom en la página)
    toggleMenu();
  }
});

// Evento click en cualquier parte del documento para cerrar el menú desplegable en dispositivos móviles
document.addEventListener("click", function() {
  // Verificar si el dispositivo es móvil
  if (window.innerWidth < 768) {
    menuDesplegable.style.display = "none";
  }
});

// Precarga de imágenes
function preloadCarouselImages() {
  return Promise.all(
    imagenes.map((imagen) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Manejo de errores de carga de imágenes
        img.src = imagen.url;
      });
    })
  );
}

let imagenes = [
  {
    "url": "img/carrusel/imagen2.webp",
    "nombre": "Ambiente",
    "descripcion": "Sumérgete en el cálido abrazo de nuestro restobar, donde la diversión y la camaradería crean recuerdos inolvidables"
  },
  {
    "url": "img/carrusel/imagen3.webp",
    "nombre": "Métodos de Pago",
    "descripcion": "Abre un mundo de posibilidades para pagar en nuestro restobar. Descubre la libertad de elegir entre múltiples métodos de pago y disfruta de una experiencia sin límites"
  },
  {
    "url": "img/carrusel/imagen4.webp",
    "nombre": "Control de Calidad",
    "descripcion": "Excelencia en cada detalle. Nuestro restobar, donde el control de calidad es una prioridad, para brindarte el sabor impecable que mereces."
  },
  {
    "url": "img/carrusel/imagen5.webp",
    "nombre": "Atención al Cliente",
    "descripcion": "La combinación perfecta: Cerveza helada y atención excepcional. En nuestro restobar, vivirás una experiencia refrescante y única"
  },
  {
    "url": "img/carrusel/imagen6.webp",
    "nombre": "Variedad",
    "descripcion": "De lo mejor en cerveza a lo más exquisito en café. Descubre la versatilidad de nuestro restobar, donde satisfacemos todos tus antojos en un solo lugar."
  },
  {
    "url": "img/carrusel/imagen7.webp",
    "nombre": "Comidas",
    "descripcion": "Desde la frescura de la cerveza hasta la delicia de la gastronomía. Disfruta de una experiencia completa en nuestro restobar, donde cada bocado es un placer para tu paladar."
  }
];

let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');
let actual = 0;
let intervaloCarrusel;
let transicionActiva = false;

function cambiarImagen(direccion) {
  if (transicionActiva) {
    return;
  }

  transicionActiva = true;

 
  setTimeout(function() {
    actual += direccion;

    if (actual < 0) {
      actual = imagenes.length - 1;
    } else if (actual >= imagenes.length) {
      actual = 0;
    }

    mostrarImagenActual();

    setTimeout(function() {
      transicionActiva = false;
    }, 1000); // Duración de la transición en milisegundos
  }); // Retraso antes de cambiar de imagen en milisegundos
}

function mostrarImagenActual() {
  imagen.innerHTML = `<img class="img animate__animated animate__fadeIn" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`;
  texto.innerHTML = ` <h3 class="animate__animated animate__fadeIn">${imagenes[actual].nombre}</h3>
    <p class="animate__animated animate__fadeIn">${imagenes[actual].descripcion}</p>
  `;
  posicionCarrusel();
}

function posicionCarrusel() {
  puntos.innerHTML = "";
  for (var i = 0; i < imagenes.length; i++) {
    if (i === actual) {
      puntos.innerHTML += '<p class="bold">.<p>';
    } else {
      puntos.innerHTML += '<p>.<p>';
    }
  }
}

function iniciarCarrusel() {
  intervaloCarrusel = setInterval(cambiarImagen, 10000, 1);
}

function detenerCarrusel() {
  clearInterval(intervaloCarrusel);
}

atras.addEventListener('click', function() {
  detenerCarrusel();
  cambiarImagen(-1);
  iniciarCarrusel();
});

adelante.addEventListener('click', function() {
  detenerCarrusel();
  cambiarImagen(1);
  iniciarCarrusel();
});

window.addEventListener('DOMContentLoaded', () => {
  preloadCarouselImages().then(() => {
    mostrarImagenActual();
    iniciarCarrusel();
  });
});




