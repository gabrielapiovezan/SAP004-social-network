export const dataUser = (profile) => {
  firebase.auth().onAuthStateChanged(function (user) {
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
    .then(function () {
      updatePostsUser(profile.uid, profile.displayName, callback);
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
};

export const updatePostsUser = (userId, name, callback) => {
  firebase
    .firestore()
    .collection('posts')
    .where('user_id', '==', userId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        firebase.firestore().collection('posts').doc(doc.id).update({
          name: name,
        });
      });
      callback();
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
};

export const fileProfile = (file, name, callback) => {
  const ref = firebase.storage().ref();
  const fileProfile = ref.child(name);
  fileProfile.put(file).then(function (snapshot) {
    console.log(snapshot);
    callback(fileProfile.fullPath);
  });
};

export const deleteConta = (callback) => {
  const user = firebase.auth().currentUser;
  user
    .delete()
    .then(function () {
      deletePostsUser(user.uid, callback);
    })
    .catch(function (error) {
      // An error happened.
    });
};

export const deletePostsUser = (userId, callback) => {
  firebase
    .firestore()
    .collection('posts')
    .where('user_id', '==', userId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        firebase.firestore().collection('posts').doc(doc.id).delete();
      });
      callback();
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
};

export const logout = () => {
  firebase.auth().signOut();
  window.location.hash = '';
};
