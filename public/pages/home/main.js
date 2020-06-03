// Aqui serão criados os eventos de Manipulação de DOM e templates
import { greeting, logout } from './data.js';

export default () => {
    const container = document.createElement('div');

    container.innerHTML = `
    <form>
      <input id='name' type='text'>
      <button id='greeting-btn'>Dizer Oi</button>
    </form>
    <div id='greeting-message'></div>
    <div id="firebase-auth-container"></div>
    <a href="#" id="buttonOut"  >Logout</a>`;

    const name = container.querySelector('#name');
    const greetingBtn = container.querySelector('#greeting-btn');
    const greetingMessage = container.querySelector('#greeting-message');

    greetingBtn.addEventListener('click', (event) => {
        event.preventDefault();
        greetingMessage.innerHTML = greeting(name.value);
    });
    container.querySelector("#buttonOut").addEventListener("click", (event) => {
        event.preventDefault();
        logout()
        window.location.hash = "login"
        location.reload();
    })
    return container;
};