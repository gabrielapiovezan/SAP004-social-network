import errorHandling from '../elementos/objetos/authError.js';

export const login = (email, password, printErrorLogin) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
            window.location.hash = 'home';
        })
        .catch(function(error) {
            // Handle Errors here.
            //    const errorCode = error.code;
            // const errorResult = errorHandling(errorCode);

            //  const errorMessage = error.message;
            printErrorLogin(errorHandling(error.code));
            //window.alert(errorMessage);
        });
};

export const loginGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            window.location.hash = 'home';
            // This gives you a Google Access Token.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
        });
};