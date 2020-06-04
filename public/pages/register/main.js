import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { register } from './data.js';
import { link } from '../elementos/objetos/link.js';

export default () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <h1> &lt;UMÂMI&gt; </h1>
    <h2>Bem vindo!</h2>
    <form id="register">
      ${input({ type: "text", id: "name", placeholder: "Nome" })}
      ${input({ type: "email", id: "email", placeholder: "E-mail" })}
      ${input({ type: "password", id: "password", placeholder: "Senha" })}     
      ${button({ name: "Registrar" })}
      <div id="error"></div>
    </form>
    ${link({ href: "#", name: "Voltar" })}`;

  container.querySelector("#register").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = container.querySelector('#name').value;
    const email = container.querySelector('#email').value;
    const password = container.querySelector('#password').value;
    register(email, password, name);
  });
  return container;
}