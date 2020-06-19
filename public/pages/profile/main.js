import { dataUser, updateProfile, fileProfile, deleteConta } from './data.js'
import { image } from '../elementos/objetos/image.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';


export default () => {
  const container = document.createElement('div');
  container.classList.add("container");

  container.innerHTML = `
    <figure>
    ${image({ src: "/pages/elementos/imagens/IMG2.png", class: "img-login", alt: "logo-umâmi" })}
    </figure>
    <div class="login">
      <h1> &lt; Umâmi &gt; </h1>
      <h2>Perfil</h2>
      <img id="photo" class="img-post"/>
      <div class="send-post">
        <input type="file" id= "file" accept= "image/*">
        <label for="file">${image({ id: "img-upload", class: "icon", src: "./pages/elementos/icones/img-1.png" })}</label>                     
        ${icon({ name: 'talher', id: 'remove-photo', class: "disappear" })} 
      </div>
        <form>        
            ${input({ type: "name", id: "name", placeholder: " Nome", class: "input" })}        
            ${button({ name: "Salvar", id: "save-profile" })}
            ${button({ name: "Deletar Conta", id: "delete-profile" })}   
            ${link({ href: "#home", name: "Voltar", title: "voltar", target: "_self" })}
        </form>
    </div>`;

  container.querySelector("#file").addEventListener("change", (event) => {
    event.preventDefault();
    const output = container.querySelector('#photo');
    output.src = URL.createObjectURL(event.target.files[0]);
    container.querySelector("#iconremove-photo").classList.remove("disappear")
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
    container.querySelector("#img-upload").src = "./pages/elementos/icones/img-2.png"
  })

  container.querySelector("#iconremove-photo").addEventListener("click", (event) => {
    event.preventDefault();
    container.querySelector("#file").value = "";
    container.querySelector("#photo").src = "./pages/elementos/imagens/chefe.png";
    container.querySelector("#iconremove-photo").classList.add("disappear")
    container.querySelector("#img-upload").src = "./pages/elementos/icones/img-1.png"
  })

  function profile(data) {
    console.log(data)
    container.querySelector("#name").value = data.displayName;
    container.querySelector("#photo").src = data.photoURL || "./pages/elementos/imagens/chefe.png";
  }

  container.querySelector("#save-profile").addEventListener('click', (event) => {
    event.preventDefault();
    const fileInpxut = container.querySelector("#file");
    if (fileInpxut.files[0]) {
      fileProfile(fileInpxut.files[0], `images${fileInpxut.files[0].name}`, saveProfile)
    } else { saveProfile(null) }


    function saveProfile(urlFile) {
      const profile = {
        photoURL: urlFile ? `https://firebasestorage.googleapis.com/v0/b/social-networt.appspot.com/o/${urlFile}?alt=media` : null,
        displayName: container.querySelector('#name').value,
        uid: firebase.auth().currentUser.uid,
      }
      updateProfile(profile, redirectToHome);
    }
  })
  function redirectToHome() {
    window.location.hash = "home";
  }

  container.querySelector("#delete-profile").addEventListener('click', (event) => {
    event.preventDefault();
    deleteConta(redirectToLogin)
  });
  function redirectToLogin() {
    window.location.hash = "login";
  }

  dataUser(profile);

  return container;
};