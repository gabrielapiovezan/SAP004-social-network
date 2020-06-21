import {
    loadProfile,
    dataUser,
    updateProfile,
    fileProfile,
    deleteConta,
    userDelete,
    logout,
    updatePassword,
    updateCollection,
} from './data.js';
import { image } from '../elementos/objetos/image.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';

export default () => {
    const container = document.createElement('div');
    //   container.classList.add('container-profile');
    container.innerHTML = `<div id="profile-template" class="container-profile"></div>`;

    function addProfile(user) {
        const userData = user.data();

        const template = `
        
        <div id="modal" class="modal disappear">
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
                ${link({
                  href: '#home',
                  name: 'Voltar',
                  title: 'voltar',
                  target: '_self',
                })}
              </li>
              <li>
                ${link({
                  id: 'logout-btn',
                  name: 'Sair',
                  title: 'deslogar',
                  target: '_self',
                })}
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
  ${image({
    src: '/pages/elementos/imagens/fundo.png',
    class: 'disappear image-back',
  })}
    <h2>Perfil</h2>
      <figure>
        ${image({
          id: 'photo',
          alt: 'foto do usuário',
          class: 'img-profile-change',
          src: userData.photo,
        })}
      </figure>
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
        <form class='form-profile'>
          ${input({
            type: 'name',
            id: 'name',
            placeholder: ' Nome',
            value: `${userData.userName}`,
          })}
    ${button({ name: 'Salvar alterações', id: 'save-profile' })}
    ${button({ name: 'Alterar senha', id: 'change-password' })}
    ${input({ type: 'email', id: 'email', placeholder: 'E-mail', value: `${userData.email}` })}
    ${input({ type: 'date', id: 'age', value: `${userData.age}` })}
    ${input({
      type: 'text',
      id: 'profession',
      placeholder: 'Profissão',
      value: `${userData.profession}`,
    })}
    ${input({ type: 'password', id: 'password', placeholder: 'Nova senha', class: 'disappear' })}
    ${button({ name: 'Enviar', id: 'save-password', class: 'disappear' })}
    ${button({ name: 'Cancelar', id: 'cancel-password', class: 'disappear' })}
    ${button({ name: 'Deletar a conta', id: 'delete-profile', class: 'disappear btn-delete' })}
        </form>
  ${link({ href: '#home', name: 'Voltar', title: 'voltar', target: '_self' })}`;
    container.querySelector('#profile-template').innerHTML = template;

    container.querySelector('#file').addEventListener('change', (event) => {
      event.preventDefault();
      const output = container.querySelector('#photo');
      output.src = URL.createObjectURL(event.target.files[0]);
      userData.photo = output.src;
      container.querySelector('#iconremove-photo').classList.remove('disappear');
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };
      container.querySelector('#img-upload').src = './pages/elementos/icones/img-2.png';
    });

    container.querySelector('#iconremove-photo').addEventListener('click', (event) => {
      event.preventDefault();
      container.querySelector('#file').value = '';
      userData.photo = './pages/elementos/imagens/chefe.png';
      container.querySelector('#photo').src = userData.photo;
      container.querySelector('#iconremove-photo').classList.add('disappear');
      container.querySelector('#img-upload').src = './pages/elementos/icones/img-1.png';
    });

    container.querySelector('#change-password').addEventListener('click', (event) => {
      event.preventDefault();
      container.querySelector('#change-password').classList.add('disappear');
      container.querySelector('#name').classList.add('disappear');
      container.querySelector('#save-profile').classList.add('disappear');
      container.querySelector('#img-upload').classList.add('disappear');
      container.querySelector('#save-password').classList.remove('disappear');
      container.querySelector('#password').classList.remove('disappear');
      container.querySelector('#cancel-password').classList.remove('disappear');
      container.querySelector('#delete-profile').classList.remove('disappear');
    });

    container.querySelector('#cancel-password').addEventListener('click', (event) => {
      event.preventDefault();
      container.querySelector('#change-password').classList.remove('disappear');
      container.querySelector('#name').classList.remove('disappear');
      container.querySelector('#save-profile').classList.remove('disappear');
      container.querySelector('#save-password').classList.add('disappear');
      container.querySelector('#password').classList.add('disappear');
      container.querySelector('#cancel-password').classList.add('disappear');
      container.querySelector('#delete-profile').classList.add('disappear');
    });

    // // function profile(user) {
    // container.querySelector('#name').value = userData.userName;
    // container.querySelector('#email').value = userData.email;
    // container.querySelector('#profession').value = userData.profession;
    // // container.querySelector('#password').value = user.password;
    // container.querySelector('#age').value = userData.age;
    // container.querySelector('#photo').src = userData.photo;

    container.querySelector('#save-profile').addEventListener('click', (event) => {
      event.preventDefault();
      const fileInpxut = container.querySelector('#file');
      if (fileInpxut.files[0]) {
        fileProfile(fileInpxut.files[0], `images${fileInpxut.files[0].name}`, saveProfile);
      } else {
        saveProfile(null);
      }

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
        //  userData.userUid = profile.uid;
        userData.profession = container.querySelector('#profession').value;
        userData.age = container.querySelector('#age').value;
        //userData.email = firebase.auth().currentUser.email;
        updateCollection(user.id, userData);
        updateProfile(profile, redirectToHome);
      }
    });

    function redirectToHome() {
      window.location.hash = 'home';
    }

    function modal(callback1, callback2, user) {
      const modal = container.querySelector('#modal');
      modal.classList.remove('disappear');
      container.querySelector('#delete-yes').addEventListener('click', () => {
        callback1();
        callback2(user);
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
      deleteConta(redirectToLogin);
    }
    container.querySelector('#delete-profile').addEventListener('click', (event) => {
      event.preventDefault();
      modal(removeAccount, userDelete, user.id);
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
      let newPassword = container.querySelector('#password').value;
      updatePassword(newPassword);
    });

    // dataUser(profile);

    //     // function profile(user) {
    //     container.querySelector('#name').value = userData.userName;
    //     container.querySelector('#email').value = userData.email;
    //     container.querySelector('#profession').value = userData.profession;
    //     // container.querySelector('#password').value = user.password;
    //     container.querySelector('#age').value = userData.age;
    //     container.querySelector('#photo').src = userData.photo;
    //   }
  }

  loadProfile(addProfile);

  return container;
};