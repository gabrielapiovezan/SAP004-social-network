import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { register } from './data.js';
import { link } from '../elementos/objetos/link.js';
import { image } from '../elementos/objetos/image.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('container');

  container.innerHTML = `
      ${image({ src: '/pages/elementos/imagens/IMG3.png', class: 'img-login', alt: 'logo-umâmi' })}
    <div class="login">
      <h1> &lt; Umâmi &gt; </h1>
      <h2>Bem vindo!</h2>
      <form id="register">
        ${input({ type: 'text', id: 'name', placeholder: 'Nome' })}
        ${input({ type: 'email', id: 'email', placeholder: 'E-mail' })}
        ${input({ type: 'date', id: 'age' })}
        ${input({ type: 'text', id: 'profession', placeholder: 'Profissão' })}
        ${input({ type: 'password', id: 'password', placeholder: 'Senha' })} 
        ${input({ type: 'password', id: 'confirm-password', placeholder: 'Confirmar senha' })} 
        ${button({ name: 'Registrar' })}
        <div id="error" class="error"></div>
      </form>
      ${link({ href: '#', name: 'Voltar', title: 'voltar', target: '_self' })}
    </div>`;

  container.querySelector('#register').addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
      userUid: '',
      photo: './pages/elementos/imagens/chefe.png',
      userName: container.querySelector('#name').value,
      email: container.querySelector('#email').value,
      profession: container.querySelector('#profession').value,
      age: container.querySelector('#age').value,
    };

    const password = container.querySelector('#password').value;
    const confirmPassword = container.querySelector('#confirm-password').value;
    const error = 'As senhas não conferem.';
    password === confirmPassword ? register(user, password, printErrorLogin) : printErrorLogin(error);
    window.location.hash = '#login';
  });

  const printErrorLogin = (answer) => {
    container.querySelector('#error').innerHTML = answer;
  };

  return container;
};
