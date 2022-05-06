const container = document.querySelector(".container")
const coffees = [
  { name: "Perspiciatis", image: "images/p1.jpg" },
  { name: "Voluptatem", image: "images/p1.jpg" },
  { name: "Explicabo", image: "images/p1.jpg" },
  { name: "Rchitecto", image: "images/p1.jpg" },
  { name: " Beatae", image: "images/p1.jpg" },
  { name: " Vitae", image: "images/p1.jpg" },
  { name: "Inventore", image: "images/p1.jpg" },
  { name: "Veritatis", image: "images/p1.jpg" },
  { name: "Accusantium", image: "images/p1.jpg" },
]

const showCoffees = () => {
  let output = ""
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Taste</a>
              </div>
              `)
  )
  container.innerHTML = output
}

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}


