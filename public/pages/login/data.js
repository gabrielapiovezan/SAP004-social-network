import errorHandling from '../elementos/objetos/authError.js';

export const login = (email, password, printErrorLogin) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      window.location.hash = 'home';
    })
    .catch(function (error) {
      printErrorLogin(errorHandling(error.code));
    });
};

export const loginGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      window.location.hash = 'home';
      if (result.additionalUserInfo.isNewUser) {
        const user = {
          userUid: firebase.auth().currentUser.uid,
          photo: firebase.auth().currentUser.photoURL || './pages/elementos/imagens/chefe.png',
          userName: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
          profession: '',
          age: '',
        };
        firebase.firestore().collection('users').add(user);
      }
    });
};
