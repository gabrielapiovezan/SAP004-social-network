export const register = (email, password, username, printErrorLogin) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        window.location.hash = "home";
        firebase.auth().currentUser.updateProfile({
            displayName: username
        })
    }).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        printErrorLogin(errorMessage)
            // window.alert(errorMessage);
            // ...
    });
}