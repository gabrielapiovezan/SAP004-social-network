import { login, loginGoogle } from './data.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';

export default () => {
    const container = document.createElement('div');
    container.classList.add("container");

    container.innerHTML = `
    <figure>
        <img src="/pages/elementos/imagens/IMG2.png" class="imgLogin">
    </figure>
  
    <div class="login">
        <h1> &lt; Umâmi &gt; </h1>
        <h2>Bem vindo!</h2>
        <form id="login-email">
        ${input({ type: "email", id: "email", placeholder: " E-mail", class: "input" })}
        ${input({ type: "password", id: "password", placeholder: " Senha", class: "input" })}     
        ${button({ name: "Entrar" })}
        <div id="error"></div>
        </form>
        <p>Entrar com Google</p>
        ${input({ type: "image", src: "./pages/elementos/icones/icon-google-32.png", id: "gmailBtn", class: "icon" })}
        <div id="firebase-auth-container"></div>
        <p id="load"></p>
        <p>Não tem uma conta? 
        ${link({ href: "#register", name: "Cadastre-se" })}</p>
    </div>`;

    container.querySelector("#login-email").addEventListener("submit", (event) => {
        event.preventDefault();
        const email = container.querySelector('#email').value;
        const password = container.querySelector('#password').value;
        const error = container.querySelector('#error').value;
        login(email, password);
    });

    container.querySelector("#gmailBtn").addEventListener('click', (event) => {
        event.preventDefault();
        loginGoogle();
    });

    return container;
}