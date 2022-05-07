const teachers = [
  {
    name: "Marcelo Arenas",
    image: "images/Arenas.webp",
    card_id: "Arenas-card" 
  },
  {
    name: "Jorge Baier",
    image: "images/Baier.webp",
    card_id: "Baier-card" 
  },
  {
    name: "Yadran Eterovic",
    image: "images/Eterovic.webp",
    card_id: "Eterovic-card" 
  },
  {
    name: "Valeria Herskovic",
    image: "images/Herskovic.webp",
    card_id: "Herskovic-card" 
  },
  {
    name: " Hans Löbel​",
    image: "images/Lobel.webp",
    card_id: "Lobel-card" 
  },
  {
    name: " Domingo Mery",
    image: "images/Mery.webp",
    card_id: "Mery-card" 
  },
  {
    name: "Jorge Muñoz",
    image: "images/Muñoz.webp",
    card_id: "Munoz-card" 
  },
  {
    name: "Jaime Navón",
    image: "images/Navon.webp",
    card_id: "Navon-card" 
  },
  {
    name: "Andrés Neyem",
    image: "images/Neyem.webp",
    card_id: "Neyem-card" 
  },
  {
    name: "Miguel Nussbaum",
    image: "images/Nussbaum.webp",
    card_id: "Nussbaum-card" 
  },
  {
    name: "Denis Parra",
    image: "images/Parra.webp",
    card_id: "Parra-card" 
  },
  {
    name: "Karim Pichara",
    image: "images/Pichara.webp",
    card_id: "Pichara-card" 
  },
  {
    name: "Juan Reutter",
    image: "images/Reuter.webp",
    card_id: "Reutter-card" 
  },
  {
    name: "Cristián Riveros",
    image: "images/Riveros.webp",
    card_id: "Riveros-card" 
  },
  {
    name: "Cristian Ruz",
    image: "images/Ruz.webp",
    card_id: "Ruz-card" 
  },
  {
    name: "Marcos Sepúlveda",
    image: "images/Sepúlveda.webp",
    card_id: "Sepulveda-card" 
  },
  {
    name: "Juan Pablo Sandoval",
    image: "images/Sandoval.webp",
    card_id: "Sandoval-card" 
  },
  {
    name: "Álvaro Soto",
    image: "images/Soto.webp",
    card_id: "Soto-card" 
  },
  {
    name: "Gonzalo Valdés",
    image: "images/Valdés.webp",
    card_id: "Valdes-card" 
  }
];


const removeAllChildNodes = parent => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

const loadMyRequestCards = tabName => {
  var  requestContainer, teacherCard;
  requestContainer = document.getElementById(tabName)
  removeAllChildNodes(requestContainer)
  teachers.forEach(teacher => {
    teacherCard = document.getElementById(teacher.card_id).cloneNode(true);
    teacherCard.removeAttribute('id');
    teacherCard.id = teacher.card_id + '-request'
    teacherButton = document.getElementById(teacher.card_id.split('-')[0])
    if (teacherButton.classList.contains('cancel')) {
      requestContainer.appendChild(teacherCard)
    }
  });
}

const openTab = (e, tabName) => { // hide elements with class tabcontent
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks"); //Deactive tabs
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  if (tabName == "my-requests") {
    loadMyRequestCards(tabName);
  }
  document.getElementById(tabName).style.display = "grid"; // activate selected tab
  e.currentTarget.classList.add("active");
}

const editButtonClass = (e, button) => {
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

const handleClick = e => {
  let data_ = e.firstChild.data == "Cancelar" ? "Enviar Solicitud" : "Cancelar"
  button = document.getElementById(e.id); // Tomamos el botón a modificar
  button.firstChild.data = data_; // Modificamos su texto
  if (data_ == "Enviar Solicitud") { 
    // Se canceló la solicitud,
    // Elimino tarjeta de Mis Solicitudes
    var myRequests = document.getElementById("my-requests")
    var canceledTeacher = myRequests.querySelector("#"+ e.id + "-card-request")
    myRequests.removeChild(canceledTeacher);
  }
  editButtonClass(e, button)
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
