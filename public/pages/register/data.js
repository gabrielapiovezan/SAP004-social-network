import errorHandling from '../elementos/objetos/authError.js';

export const register = (user, printErrorLogin) => {
    if (user.userName && user.profession && user.age) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(function(setUser) {
                firebase.auth().currentUser.updateProfile({
                    displayName: user.userName,
                });
                user.userUid = firebase.auth().currentUser.uid;
                firebase.firestore().collection('users').add(user);

                window.location.hash = '#home';
            })
            .catch(function(error) {
                console.log(error.code);
                printErrorLogin(errorHandling(error.code));
            });
    } else {
        printErrorLogin('Digite todos os campos');
    }
};