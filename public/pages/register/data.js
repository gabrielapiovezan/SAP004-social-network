export const register = (email, password, username) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
        window.location.hash = "home";
        firebase.auth().currentUser.updateProfile({
            displayName: username
        })
    }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage);
        // ...
    });
}
    //         }).then(function() {
    //             // Update successful.
    //         }, function(error) {
    //             // An error happened.
    //         });
    //     }, function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         // [START_EXCLUDE]
    //         if (errorCode == 'auth/weak-password') {
    //             alert('The password is too weak.');
    //         } else {
    //             console.error(error);
    //         }
    //         // [END_EXCLUDE]
    //     })
    // };