export const greeting = name => `Oi ${name}! Que bom ver você aqui!`;

export const logout = () => {
  firebase.auth().signOut();
  location.reload();
};

export const user = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    var user = firebase.auth().currentUser;
    if (user) {
      let name = user.displayName;
      console.log(`Oi ${name}! Que bom ver você aqui!`);
    } else {
      console.log("não possui usuário logado!");
    }
  });
}

//Que bom ver você ${firebase.auth().currentUser.displayName}