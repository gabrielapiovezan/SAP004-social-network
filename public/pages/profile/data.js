export const dataUser = (profile) => {
  firebase.auth().onAuthStateChanged(function (user) {
    profile(firebase.auth().currentUser);
  });
};

export const updateProfile = (profile) => {
  firebase.auth().currentUser.updateProfile({
    displayName: profile.displayName,
    photoURL: profile.photoURL,
  }).then(function () {
    window.location.hash = "home";
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

export const fileProfile = (file, name, callback) => {
  const ref = firebase.storage().ref();
  const fileProfile = ref.child(name);
  fileProfile.put(file).then(function (snapshot) {
    console.log(snapshot);
    callback(fileProfile.fullPath);
  });
};