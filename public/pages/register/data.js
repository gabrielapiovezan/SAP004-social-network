export const register = (email, password, username) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
    // firebase.auth().createUserWithEmailAndPassword("gabi@gabi.com", "password").catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    // });

    // [END createwithemail]
    // callSomeFunction(); Optional
    // user = firebase.auth().currentUser;
    firebase.auth().currentUser.updateProfile({
      displayName: username
    }).then(function () {
      // Update successful.
    }, function (error) {
      // An error happened.
    });
  }, function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      console.error(error);
    }
    // [END_EXCLUDE]
  })
};