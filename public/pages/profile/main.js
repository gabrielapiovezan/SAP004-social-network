import {
    loadProfile,
    updateProfile,
    fileProfile,
    deleteAccount,
    logout,
    updatePassword,
    updateCollection,
    // isLogin,
} from './data.js';
import { image } from '../elementos/objetos/image.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';

export default () => {
    const container = document.createElement('div');
    container.innerHTML = `<div id="profile-template" class="container-profile"></div>`;

    function addProfile(user) {
        const userData = user.data();

        const template = `<div id="modal" class="modal disappear">
        <div class="modal-content">
          <span class="close close-modal">&times;</span>
          <h2>Tem certeza que deseja deletar?</h2>
          ${button({ name: 'Sim', id: 'delete-yes', class: 'close-modal' })}
          ${button({ name: 'Cancelar', id: 'delete-no', class: 'close-modal' })}
        </div>
      </div>
      <header>
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              <li>
                ${link({ href: '#home', name: 'Voltar', title: 'voltar', target: '_self' })}
              </li>
              <li>
                ${link({ id: 'logout-btn', name: 'Sair', title: 'deslogar', target: '_self' })}
              </li>
            </ul>
          </div>
        </nav>
        <h1> &lt; Umâmi &gt; </h1>
        <figure>
          ${image({
            src: '/pages/elementos/imagens/logo.png',
            class: 'img-header',
            alt: 'logo-umâmi',
          })}
        </figure>
      </header>
      ${image({ src: '/pages/elementos/imagens/fundo.png', class: 'disappear image-back' })}
      <h2>Perfil</h2>
      <figure>
        ${image({
          id: 'photo',
          alt: 'foto do usuário',
          class: 'img-profile-change',
          src: userData.photo,
        })}
      </figure>
      <h2>${userData.userName}</h2>
      <h3>${userData.profession}</h3>
      <h4 id='print-age'></h4>
      <form class='form-profile'>
        ${button({ name: 'Alterar dados', id: 'change-profile' })}
        ${button({ name: 'Configurações da conta', id: 'change-password' })}
        <div id='profile-div' class='disappear'>
          <div class='flex-row'>
            <input type="file" id="file" accept="image/*">
            <label for="file">
              ${image({
                id: 'img-upload',
                class: 'icon',
                src: './pages/elementos/icones/img-1.png',
              })}
            </label>
            ${icon({ name: 'talher', id: 'remove-photo', class: 'disappear' })}
          </div>
          ${input({
            type: 'text',
            id: 'name',
            placeholder: ' Nome',
            value: `${userData.userName}`,
          })}
          ${input({
            type: 'email',
            id: 'email',
            placeholder: 'E-mail',
            value: `${userData.email}`,
          })}
          ${input({ type: 'date', id: 'age', value: `${userData.age}` })}
          ${input({
            type: 'text',
            id: 'profession',
            placeholder: 'Profissão',
            value: `${userData.profession}`,
          })}
          ${button({ name: 'Salvar alterações', id: 'save-profile' })}
          ${button({ name: 'Cancelar', id: 'cancel-profile' })}
        </div>
        <div id='password-div' class='disappear'>
          ${input({ type: 'password', id: 'current-password', placeholder: 'Senha atual' })} 
          ${input({ type: 'password', id: 'new-password', placeholder: 'Nova senha' })}
          ${input({ type: 'password', id: 'confirm-password', placeholder: 'Confirme a senha' })}
        <div id="error" class="error"></div>
        ${button({ name: 'Enviar', id: 'save-password' })}
        ${button({ name: 'Cancelar', id: 'cancel-password' })}
        ${button({ name: 'Deletar a conta', id: 'delete-profile', class: 'btn-delete' })}
      </div>
      </form>
      ${link({ href: '#home', name: 'Voltar', title: 'voltar', target: '_self' })}`;

    container.querySelector('#profile-template').innerHTML = template;

    container.querySelector('#file').addEventListener('change', (event) => {
      event.preventDefault();
      const output = container.querySelector('#photo');
      output.src = URL.createObjectURL(event.target.files[0]);
      document.querySelector('#photo').src = output.src;
      container.querySelector('#iconremove-photo').classList.remove('disappear');
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };
      container.querySelector('#img-upload').src = './pages/elementos/icones/img-2.png';
    });

    container.querySelector('#iconremove-photo').addEventListener('click', (event) => {
      event.preventDefault();
      container.querySelector('#file').value = '';
      userData.photo = userData.photo || './pages/elementos/imagens/chefe.png';
      container.querySelector('#photo').src = userData.photo;
      container.querySelector('#iconremove-photo').classList.add('disappear');
      container.querySelector('#img-upload').src = './pages/elementos/icones/img-1.png';
    });

    container.querySelector('#change-profile').addEventListener('click', (event) => {
      event.preventDefault();
      container.querySelector('#change-profile').classList.add('disappear');
      container.querySelector('#profile-div').classList.remove('disappear');
      container.querySelector('#password-div').classList.add('disappear');
    });

    container.querySelector('#cancel-profile').addEventListener('click', (event) => {
      event.preventDefault();
      container.querySelector('#file').value = '';
      container.querySelector('#profile-div').classList.add('disappear');
      container.querySelector('#change-profile').classList.remove('disappear');
      container.querySelector('#change-password').classList.remove('disappear');
      container.querySelector('#img-upload').src = './pages/elementos/icones/img-1.png';
      container.querySelector('#iconremove-photo').classList.add('disappear');
    });

    container.querySelector('#change-password').addEventListener('click', (event) => {
      event.preventDefault();
      container.querySelector('#change-password').classList.add('disappear');
      container.querySelector('#password-div').classList.remove('disappear');
      container.querySelector('#profile-div').classList.add('disappear');
    });

    container.querySelector('#cancel-password').addEventListener('click', (event) => {
      event.preventDefault();
      container.querySelector('#password-div').classList.add('disappear');
      container.querySelector('#change-profile').classList.remove('disappear');
      container.querySelector('#change-password').classList.remove('disappear');
    });

    container.querySelector('#save-profile').addEventListener('click', (event) => {
      event.preventDefault();
      const fileInput = container.querySelector('#file');
      if (fileInput.files[0]) {
        fileProfile(fileInput.files[0], `images${fileInput.files[0].name}`, saveProfile);
      } else {
        saveProfile(null);
      }
    });
    function saveProfile(urlFile) {
      const profile = {
        photoURL: urlFile
          ? `https://firebasestorage.googleapis.com/v0/b/social-networt.appspot.com/o/${urlFile}?alt=media`
          : firebase.auth().currentUser.photoURL,
        displayName: container.querySelector('#name').value,
        uid: firebase.auth().currentUser.uid,
      };
      userData.photo = profile.photoURL;
      userData.userName = profile.displayName;
      userData.profession = container.querySelector('#profession').value;
      userData.age = container.querySelector('#age').value;
      updateCollection(user.id, userData);
      updateProfile(profile, redirectToHome);
    }

    function redirectToHome() {
      window.location.hash = 'home';
    }

    function modal() {
      const modal = container.querySelector('#modal');
      modal.classList.remove('disappear');
      container.querySelector('#delete-yes').addEventListener('click', () => {
        removeAccount();
      });

      window.addEventListener('dblclick', (event) => {
        if (event.target === modal) {
          modal.classList.add('disappear');
        }
      });

      container.querySelectorAll('.close-modal').forEach((a) => {
        a.addEventListener('click', () => {
          modal.classList.add('disappear');
        });
      });
    }

    function removeAccount() {
      deleteAccount(user.id, redirectToLogin);
    }

    container.querySelector('#delete-profile').addEventListener('click', (event) => {
      event.preventDefault();
      modal();
    });

    function redirectToLogin() {
      window.location.hash = 'login';
    }

    container.querySelector('#logout-btn').addEventListener('click', (event) => {
      event.preventDefault();
      logout();
    });

    container.querySelector('#save-password').addEventListener('click', (event) => {
      event.preventDefault();
      const currentPassword = container.querySelector('#current-password').value;
      const newPassword = container.querySelector('#new-password').value;
      const confirmPassword = container.querySelector('#confirm-password').value;
      const error = 'As senhas devem ser iguais.';
      newPassword === confirmPassword
        ? updatePassword(currentPassword, newPassword, printError)
        : printError(error);
    });

    const printError = (answer) => {
      container.querySelector('#error').innerHTML = answer;
    };

    const age = () => {
      const birth = new Date(userData.age);
      const dayBirth = birth.getUTCDate();
      const monthBirth = birth.getUTCMonth() + 1;
      const today = new Date();
      const dayToday = today.getUTCDate();
      const monthToday = today.getUTCMonth() + 1;
      let difference = '';

      if (monthToday < monthBirth || (monthToday === monthBirth && dayToday < dayBirth)) {
        difference += today.getFullYear() - birth.getFullYear() - 1;
      } else {
        difference += today.getFullYear() - birth.getFullYear();
      }
      return difference;
    };

    const printAge = () => {
      !isNaN(age()) ? (container.querySelector('#print-age').innerHTML = `${age()} anos`) : '';
    };

    printAge();
  }
  // isLogin();
  loadProfile(addProfile);

  return container;
};