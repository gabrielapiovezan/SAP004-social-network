function uiConfig() {
  return {
    signInFlow: "popup",
    signInSuccessUrl: "#",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
}

function configLogin() {
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebase-auth-container", uiConfig());
}

function removeLogin() {
  document.getElementById('firebase-auth-container').innerHTML = `
    Que bom ver você ${firebase.auth().currentUser.displayName}
    <a href="#" onClick="logout()";>Logout </a>`
}

function logout() {
  firebase.auth().signOut();
  location.reload();
}

export { configLogin, logout, removeLogin };
