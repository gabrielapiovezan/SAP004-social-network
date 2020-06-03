import { login } from './data.js'

export default () => {
    const container = document.createElement('div');

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


    container.querySelector("#login-email").addEventListener("submit", (event) => {
        event.preventDefault();
        const email = container.querySelector('#email').value;
        const password = container.querySelector('#password').value;
        login(email, password)
        window.location.hash = "home"
    })
    return container;
}