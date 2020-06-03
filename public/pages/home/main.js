// Aqui serão criados os eventos de Manipulação de DOM e templates
import { greeting } from './data.js';

export default () => {
    const container = document.createElement('div');

    container.innerHTML = `
    <form>
      <input id='name' type='text'>
      <button id='greeting-btn'>Dizer Oi</button>
    </form>
    <div id='greeting-message'></div>
    <div id="logout-social">aaa</div>
  `;

    const name = container.querySelector('#name');
    const greetingBtn = container.querySelector('#greeting-btn');
    const greetingMessage = container.querySelector('#greeting-message');

    greetingBtn.addEventListener('click', (event) => {
        event.preventDefault();
        greetingMessage.innerHTML = greeting(name.value);
    });

    return container;
};