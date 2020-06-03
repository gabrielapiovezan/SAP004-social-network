const logout = () => {
    debugger;
    //  window.addEventListener("load", () => {
    document.getElementById("buttonOut").addEventListener("click", () => {
            console.log("evento")
            firebase.auth().signOut();
            location.reload();
        })
        //   })

}


function uiConfig() {
    return {
        signInFlow: "popup",
        signInSuccessUrl: "#",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
            // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
    };
}

function configLogin() {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebase-auth-container", uiConfig());
}

function removeLogin() {
    document.getElementById('firebase-auth-container').innerHTML = `
      Que bom ver você ${firebase.auth().currentUser.displayName}    
<<<<<<< HEAD
      <a href="#" id="buttonOut"  >Logout</a>`



=======
      <a href="#"  >Logout</a>
      <button type="submit" id="buttonOut">sair</button>`
>>>>>>> fda1325151ba1e14265429f5dbad9ad4b1f33f51
}



function loginButton() {
    document.getElementById("login-email").addEventListener("submit", function() {


        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const username = "gabi"

        // firebase.auth().createUserWithEmailAndPassword("gabi@gabi.com", "password").catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        // });
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        // firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        //     // [END createwithemail]
        //     // callSomeFunction(); Optional
        //     // user = firebase.auth().currentUser;
        //     firebase.auth().currentUser.updateProfile({
        //         displayName: username
        //     }).then(function() {
        //         // Update successful.
        //     }, function(error) {
        //         // An error happened.
        //     });
        // }, function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // [START_EXCLUDE]
        //     if (errorCode == 'auth/weak-password') {
        //         alert('The password is too weak.');
        //     } else {
        //         console.error(error);
        //     }
        //     // [END_EXCLUDE]
        // });

    })
}
export { configLogin, removeLogin, loginButton, logout };
