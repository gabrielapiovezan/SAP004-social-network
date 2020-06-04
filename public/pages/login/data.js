export const login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            window.location.hash = "home"
        })
        .catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            window.alert(errorMessage)
                // ...
        });

}


export const loginGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        window.location.hash = "home"
            // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
    });
}