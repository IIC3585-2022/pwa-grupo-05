const teachersContainer = document.querySelector("#all-teachers");
const teachers = [
  {
    name: "Marcelo Arenas",
    image: "images/Arenas.webp"
  },
  {
    name: "Jorge Baier",
    image: "images/Baier.webp"
  },
  {
    name: "Yadran Eterovic",
    image: "images/Eterovic.webp"
  },
  {
    name: "Valeria Herskovic",
    image: "images/Herskovic.webp"
  },
  {
    name: " Hans Löbel​",
    image: "images/Lobel.webp"
  },
  {
    name: " Domingo Mery",
    image: "images/Mery.webp"
  },
  {
    name: "Jorge Muñoz",
    image: "images/Muñoz.webp"
  },
  {
    name: "Jaime Navón",
    image: "images/Navon.webp"
  },
  {
    name: "Andrés Neyem",
    image: "images/Neyem.webp"
  },
  {
    name: "Miguel Nussbaum",
    image: "images/Nussbaum.webp"
  },
  {
    name: "Denis Parra",
    image: "images/Parra.webp"
  },
  {
    name: "Karim Pichara",
    image: "images/Pichara.webp"
  },
  {
    name: "Juan Reutter",
    image: "images/Reuter.webp"
  },
  {
    name: "Cristián Riveros",
    image: "images/Riveros.webp"
  },
  {
    name: "Cristian Ruz",
    image: "images/Ruz.webp"
  },
  {
    name: "Marcos Sepúlveda",
    image: "images/Sepúlveda.webp"
  },
  {
    name: "Juan Pablo Sandoval",
    image: "images/Sandoval.webp"
  },
  {
    name: "Álvaro Soto",
    image: "images/Soto.webp"
  },
  {
    name: "Gonzalo Valdés",
    image: "images/Valdés.webp"
  }
];
const handleClick = (e) => {
  let data_ = e.firstChild.data == "Cancelar" ? "Enviar Solicitud" : "Cancelar"
  button = document.getElementById(e.id); // Tomamos el botón a modificar
  button.firstChild.data = data_; // Modificamos su texto

  let class_;// Modificamos su clase
  if ( e.classList.contains('send')) { 
    class_ = 'cancel';
    button.classList.remove('send');

  } else {
    class_ = 'send';
    button.classList.remove('cancel');
  }
  button.classList.add(class_);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
