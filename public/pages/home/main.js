import { greeting, logout, user } from './data.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';
import { icon } from '../elementos/objetos/icon.js';
import { textarea } from '../elementos/objetos/textarea.js';

// ${textarea({ id: "name", type: "text", placeholder: "Diga Oi!" })} <textarea rows="52" cols="52" id="name" type="text"></textarea>

export default () => {
    const container = document.createElement('div');
    container.classList.add("container");
    container.innerHTML = `
    <form class="box">
    ${textarea({ id: "name", type: "text", size:"500", placeholder: "Diga Oi!" })}
    <div class="space-buttons">
    ${icon('churrasqueira')}
    ${button({ id: "greeting-btn", class: "greeting-btn", name: "Compartilhar" })}
    </div>
    </form>

    <div id='greeting-message'></div>
    <div id="firebase-auth-container"></div>
    <div id='message'></div>
    ${link({ href: "#", id: "buttonOut", name: "Logout" })}`;

    const name = container.querySelector('#name');
    const greetingBtn = container.querySelector('#greeting-btn');
    const greetingMessage = container.querySelector('#greeting-message');




    greetingBtn.addEventListener('click', (event) => {
        event.preventDefault();
        greetingMessage.innerHTML = greeting(name.value);
    });

    container.querySelector("#churrasqueira-1").addEventListener("click", (event) => {
        event.preventDefault();
        container.querySelector("#churrasqueira-2").style.display === "none" ?
            container.querySelector("#churrasqueira-2").style.display = "block" :
            container.querySelector("#churrasqueira-2").style.display = "none"
    })




    // const message = container.querySelector('#message');

    // window.addEventListener("load", () => {
    //   message.innerHTML = user();
    // })
    user();

    return container;
};