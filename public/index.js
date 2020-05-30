// // Este é o ponto de entrada de sua aplicação
// import { home } from './pages/home/main.js';

// document.querySelector('#root').appendChild(home())

import routes from "./routes.js";

const container = document.querySelector("#root");

const init = () => window.addEventListener("hashchange", renderPage);
const validateHash = (hash) => (hash === "" ? "login" : hash.replace("#", ""));

const renderPage = () => {
  const page = validateHash(window.location.hash);
  container.innerHTML = "";
  container.appendChild(routes[page]);
};

window.addEventListener("load", () => {
  renderPage();
  init();
});

document.getElementById("login-email").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const username = "gabi"

  // firebase.auth().createUserWithEmailAndPassword("gabi@gabi.com", "password").catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // ...
  // });


  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
    // [END createwithemail]
    // callSomeFunction(); Optional
    // user = firebase.auth().currentUser;
    firebase.auth().currentUser.updateProfile({
      displayName: username
    }).then(function () {
      // Update successful.
    }, function (error) {
      // An error happened.
    });
  }, function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      console.error(error);
    }
    // [END_EXCLUDE]
  });

})