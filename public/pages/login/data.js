import errorHandling from '../elementos/objetos/authError.js';

export const login = (email, password, printErrorLogin, callback) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function() {
            isUser();
        })
        .then(function() {
            callback();
        })
        .catch(function(error) {
            printErrorLogin(errorHandling(error.code));
        });
};

export const loginGoogle = (callback) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
                const user = {
                    userUid: firebase.auth().currentUser.uid,
                    photo: firebase.auth().currentUser.photoURL || './pages/elementos/imagens/chefe.png',
                    userName: firebase.auth().currentUser.displayName,
                    email: firebase.auth().currentUser.email,
                    profession: '',
                    age: '',
                };
                firebase
                    .firestore()
                    .collection('users')
                    .add(user)
                    .then(function() {
                        callback();
                    });
            } else {
                callback();
            }
        });
};

export const isUser = () => {
    firebase
        .firestore()
        .collection('users')
        .onSnapshot((snap) => {
            let valid = false;
            snap.forEach((user) => {
                if (firebase.auth().currentUser.uid === user.data().userUid) {
                    valid = true;
                }
            });
            creatUser(valid);
        });
};

const creatUser = (condition) => {
    if (!condition) {
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
};