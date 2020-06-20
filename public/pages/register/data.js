import errorHandling from '../elementos/objetos/authError.js';

export const register = (email, password, username, printErrorLogin) => {
    if (username) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(user) {
                firebase
                    .auth()
                    .currentUser.updateProfile({
                        displayName: username,
                    })
                    .then(function() {
                        window.location.hash = 'home';
                    });
            })
            .catch(function(error) {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                printErrorLogin(errorHandling(error.code));
                // window.alert(errorMessage);
            });
    } else {
        printErrorLogin('Digite um nome válido');
    }
};