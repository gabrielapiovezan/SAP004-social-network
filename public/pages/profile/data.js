import errorHandling from '../elementos/objetos/authError.js';
export const dataUser = (profile) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) profile(user);
    });
};

export const updateProfile = (profile, callback) => {
    firebase
        .auth()
        .currentUser.updateProfile({
            displayName: profile.displayName,
            photoURL: profile.photoURL,
        })
        .then(function() {
            updatePostsUser(profile.uid, profile.displayName, callback);
        })
        .catch(function(error) {
            console.error('Error removing document: ', error);
        });
};

export const updatePostsUser = (userId, name, callback) => {
    firebase
        .firestore()
        .collection('posts')
        .where('user_id', '==', userId)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                firebase.firestore().collection('posts').doc(doc.id).update({
                    name: name,
                });
            });
            callback();
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error);
        });
};

export const fileProfile = (file, name, callback) => {
    const ref = firebase.storage().ref();
    const fileProfile = ref.child(name);
    fileProfile.put(file).then(function(snapshot) {
        callback(fileProfile.fullPath);
    });
};

export const deleteConta = (callback) => {
    const user = firebase.auth().currentUser;
    user
        .delete()
        .then(function() {
            deletePostsUser(user.uid, callback);
        })
        .catch(function(error) {
            // An error happened.
        });
};

export const deletePostsUser = (userId, callback) => {
    firebase
        .firestore()
        .collection('posts')
        .where('user_id', '==', userId)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                firebase.firestore().collection('posts').doc(doc.id).delete();
            });
            callback();
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error);
        });
};

export const logout = () => {
    firebase.auth().signOut();
    window.location.hash = '';
};

const reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
};

export const updatePassword = (currentPassword, newPassword, printError) => {
    reauthenticate(currentPassword)
        .then(() => {
            const user = firebase.auth().currentUser;
            user
                .updatePassword(newPassword)
                .then(() => {
                    const answer = 'Senha alterada com sucesso!';
                    printError(answer);
                })
                .catch((error) => {
                    console.log(error.code);
                    printError(errorHandling(error.code));
                });
        })
        .catch((error) => {
            printError(errorHandling(error.code));
        });
};

export const loadProfile = (profile) => {
    firebase
        .firestore()
        .collection('users')
        .onSnapshot((snap) => {
            snap.forEach((user) => {
                if (firebase.auth().currentUser.uid === user.data().userUid) {
                    profile(user);
                }
            });
        });
};

export const userDelete = (user) => {
    firebase
        .firestore()
        .collection('users')
        .doc(user)
        .delete()
        .then(function() {
            console.log('User successfully deleted!');
        })
        .catch(function(error) {
            console.error('Error removing user: ', error);
        });
};

export const updateCollection = (user, userData) => {
    firebase.firestore().collection('users').doc(`${user}`).update({
        photo: userData.photo,
        userName: userData.userName,
        //     email: userData.email,
        profession: userData.profession,
        age: userData.age,
    });
};