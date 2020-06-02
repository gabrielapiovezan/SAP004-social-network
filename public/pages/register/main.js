export default () => {
    const container = document.createElement("div");
    container.innerHTML = `
              <a href="/#login">Voltar</a>
              <h1> &lt;Nome Projeto&gt; </h1>
              <h2>Inclua seus dados</h2>
              <form id="register">
                  <input id="name" type="text" placeholder="Seu nome completo">
                  <input id="email" type="email" placeholder="Seu e-mail">
                  <input id="password" type="password" placeholder="Sua senha">
                  <button type="submit">CADASTRAR</button> 
              </form>
           
              `;

    // const name = container.querySelector("#name");
    // const email = container.querySelector("#email");
    // const password = container.querySelector("#password");

    // container.querySelector("#register").addEventListener("submit", () => {
    //   console.log(name.value);
    //   console.log(email.value);
    //   console.log(password.value);
    // })

    container.querySelector("#register").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = container.querySelector("#email").value
        const password = container.querySelector("#password").value
        const username = container.querySelector("#name").value

        console.log(email);
        console.log(password);
        // firebase.auth().createUserWithEmailAndPassword("gabi@gabi.com", "password").catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        // });


        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
            // [END createwithemail]
            // callSomeFunction(); Optional
            // user = firebase.auth().currentUser;
            firebase.auth().currentUser.updateProfile({
                displayName: username
            }).then(function() {
                // Update successful.
            }, function(error) {
                // An error happened.
            });
        }, function(error) {
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
    });



    return container;
};