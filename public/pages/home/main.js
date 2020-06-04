// Aqui serão criados os eventos de Manipulação de DOM e templates
import { greeting, logout } from './data.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';

export default () => {
    const container = document.createElement('div');
    container.innerHTML = `
    <form>
    ${input({ id: "name", type: "text", placeholder: "Diga Oi!" })}
    ${button({ id: "greeting-btn", name: "Dizer Oi" })}
    </form>
    <div id='greeting-message'></div>
    <div id="firebase-auth-container"></div>
    ${link({ href: "#", id: "buttonOut", name: "Logout" })}`;

    const name = container.querySelector('#name');
    const greetingBtn = container.querySelector('#greeting-btn');
    const greetingMessage = container.querySelector('#greeting-message');

    greetingBtn.addEventListener('click', (event) => {
        event.preventDefault();
        greetingMessage.innerHTML = greeting(name.value);
    });

    container.querySelector("#buttonOut").addEventListener("click", (event) => {
        event.preventDefault();
        logout();
        window.location.hash = "login";
        location.reload();
    });
    return container;
};