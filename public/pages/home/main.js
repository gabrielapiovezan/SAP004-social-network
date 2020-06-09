import { greeting, logout, user } from './data.js';
//import { button } from '../elementos/objetos/button.js';
import button from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import link from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';
import textarea from '../elementos/objetos/textarea.js';


export default () => {
    const container = document.createElement('div');
    container.classList.add("container");

    const greetingBtn = button({ id: "greeting-btn", class: "greeting-btn", name: "Compartilhar" })
    const cherry = icon('cereja')
    const textBox = textarea({ id: "name", type: "text", size: "500", placeholder: "Diga Oi!" })
    const logout = link({ href: "#", id: "buttonOut", name: "Logout" })

    container.appendChild(icon('cereja'))
    // container.appendChild(icon('churrasqueira'))
    // container.appendChild(icon('cafeteira'))
    // container.appendChild(icon('comida'))
    // container.appendChild(icon('luva'))
    // container.appendChild(icon('talher'))
    // container.appendChild(icon('tomate'))
    // container.appendChild(icon('caneca'))


    const form = document.createElement('form')
    form.classList.add("box")
    form.innerHTML = textBox.element
    form.appendChild(spaceButtons)
    container.appendChild(form)

    const greetingMessage = document.createElement('div')
    // greetingMessage.classList.add("greeting-message");
    container.appendChild(greetingMessage)

    const back = document.createElement('div')
    back.innerHTML += logout.element
    container.appendChild(back)



    container.querySelector(cherry.id1).addEventListener("click", () => {
        container.querySelector(cherry.id2).style.display = "block"
        container.querySelector(cherry.id1).style.display = "none"
    })
    container.querySelector(cherry.id2).addEventListener("click", () => {
        container.querySelector(cherry.id1).style.display = "block"
        container.querySelector(cherry.id2).style.display = "none"
    })


    // container.appendChild(icon('cereja'))
    // container.appendChild(icon('churrasqueira'))
    // container.appendChild(icon('cafeteira'))
    // container.appendChild(icon('comida'))
    // container.appendChild(icon('luva'))
    // container.appendChild(icon('talher'))
    // container.appendChild(icon('tomate'))
    // container.appendChild(icon('caneca'))


    const textBoxElement = container.querySelector(textBox.id)

    container.querySelector(greetingBtn.id).addEventListener("click", () => {
        event.preventDefault();
        greetingMessage.innerHTML = greeting(textBoxElement.value);
    });

    user();

    return container;
};