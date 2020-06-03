import { configLogin, loginButton, logout, removeLogin } from "./login.js";
//logout removeLogin,
export default () => {
    const container = document.createElement("div");
    container.innerHTML = `
  <h1> &lt;Nome Projeto&gt; </h1>
  <h2>Welcome</h2>
  <form id="login-email">
    <input id="email" type="email" placeholder="E-mail">
    <input id="password" type="password" placeholder="Password">
    <button type="submit">ENTRAR</button> 
  </form>
  <p>Entrar com Google</p>
  <div id="firebase-auth-container"></div>
  <p id="load"></p>
  <p>Não tem uma conta? <a href="/#register">Cadastre-se</a></p>
  <div></div>
  `;

    // document.getElementById("message").innerHTML = `
    // <h2>Welcome</h2>
    // <div id="firebase-auth-container"></div>
    // `;

    document.addEventListener("DOMContentLoaded", function() {
        try {
            //let app = firebase.app();
            //let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
            //document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
            configLogin();
            window.addEventListener("load", () => {
                loginButton()
            })
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    removeLogin()
                    logout()
                        // window.location.href = "#home"
                }
                console.log(user);

            });

            // loadPost()
        } catch (e) {
            console.error(e);
            document.getElementById("load").innerHTML =
                "Error loading the Firebase SDK, check the console.";
        }
    });
    return container;
};