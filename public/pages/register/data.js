export const register = (email, password, username, printErrorLogin) => {
    if (username) {
        console.log("tem nome");

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                firebase.auth().currentUser.updateProfile({
                    displayName: username
                }).then(function () {
                    window.location.hash = "home";
                }).catch(function (error) {
                    // An error happened.
                });
            }).catch(function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                printErrorLogin(errorMessage);
                // window.alert(errorMessage);           
            });
    } else {
        printErrorLogin("Name not typed");
    };
};