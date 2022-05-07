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

const applicationServerPublicKey = 'BPhU8x4kP2_GhrEIlKOb42MeDCV0BN59CUTdknTnINcsG6lqjTcQPiy3TCr8QNsyQo-SiIGvJQxRyHQictDS0J8';



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

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('serviceWorker.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}



function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}


function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
})




