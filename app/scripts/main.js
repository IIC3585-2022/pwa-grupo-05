/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';



// Enable CORS globally for any host
// var corsAttr = new EnableCorsAttribute("*", "*", "*");
// config.EnableCors(corsAttr);

const applicationServerPublicKey = 'BPhU8x4kP2_GhrEIlKOb42MeDCV0BN59CUTdknTnINcsG6lqjTcQPiy3TCr8QNsyQo-SiIGvJQxRyHQictDS0J8';



const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
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

function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);


    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
})

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}


const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})


swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
.then(function(subscription) {
  console.log('User is subscribed:', subscription);

  updateSubscriptionOnServer(subscription);

  isSubscribed = true;

  updateBtn();

})
.catch(function(err) {
  console.log('Failed to subscribe the user: ', err);
  updateBtn();
});

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {

    
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
// aca hago mi fetch
    // console.log("if subs", subscriptionJson.textContent)
    // console.log("if subs", JSON.parse(subscriptionJson.textContent)["keys"]["auth"])


    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json","Retry-After");
    
    var raw = JSON.stringify({
      "subscription": {
        "endpoint": "https://fcm.googleapis.com/fcm/send/facyAJIlBeU:APA91bFbUSawfQVb7OQLuYulw8yZ2fJb4eFEYYc8yd1vHiGjGPaQtvhq40L_4czJPfrdfIiC5Lv7SDY1ivtRxtx4ZLiY7mWaZ9xa8mCekYEoJpm3DjQCSmnCcOwBJo3345eRdjk-vUus",
        "expirationTime": null,
        "keys": {
          "p256dh": "BMPOgr5zJf1OE0PL3gFXwlT0Pu80psRH4BMuergy7rK98a2_c9QlInfuJrldLbfNns23tLlhwdPmgAWynk7Je6E",
          "auth": "YqABxSjSFhKcPflxCUfTAQ"
        }
      },
      "data": "wtf",
      "applicationKeys": {
        "public": "BPhU8x4kP2_GhrEIlKOb42MeDCV0BN59CUTdknTnINcsG6lqjTcQPiy3TCr8QNsyQo-SiIGvJQxRyHQictDS0J8",
        "private": "dYwtzBQtrHqfkOLU2Tvebzw1bmdzJw0GLl2HBsT6PjQ"
      }
    });
    
    var requestOptions = {
      method: 'POST',
      mode: 'no-cors',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://web-push-codelab.glitch.me/api/send-push-msg/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));




  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}