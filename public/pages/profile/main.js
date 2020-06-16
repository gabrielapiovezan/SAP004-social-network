import { image } from '../elementos/objetos/image.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import icon from '../elementos/objetos/icon.js';


export default () => {
  const container = document.createElement('div');
  container.classList.add("container");

  container.innerHTML = `
    <figure>
    ${image({ src: "/pages/elementos/imagens/IMG2.png", class: "img-login", alt: "logo-umâmi" })}
    </figure>
    <div class="profile">
      <h1> &lt; Umâmi &gt; </h1>
      <h2>Perfil</h2>
      <img id="photo" class="img-post"/>
      <div class="send-post">
        <input type="file" id= "file" accept= "image/*">
        <label for="file">${image({ id: "img-upload", class: "icon", src: "./pages/elementos/icones/img-1.png" })}</label>                     
        ${icon({ name: 'talher', id: 'remove-photo', class: "disappear" })}   
        </div>
      <form id="login-email">        
          ${input({ type: "name", id: "name", placeholder: " Nome", class: "input" })}
          ${input({ type: "email", id: "email", placeholder: " E-mail", class: "input" })}
          ${input({ type: "password", id: "password", placeholder: " Senha", class: "input" })} 
          ${input({ type: "password", id: "password", placeholder: " Confirmar Senha", class: "input" })}   
          ${button({ name: "Deletar Conta" })}   
          ${button({ name: "Salvar" })}
      </form>
    </div>`;



  container.querySelector("#file").addEventListener("change", (event) => {
    event.preventDefault();
    const output = container.querySelector('#photo');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      container.querySelector("#iconremove-photo").classList.remove("disappear")
      URL.revokeObjectURL(output.src) // free memory
    }
    container.querySelector("#img-upload").src = "./pages/elementos/icones/img-2.png"
  })

  container.querySelector("#iconremove-photo").addEventListener("click", (event) => {
    event.preventDefault();
    container.querySelector("#photo").src = "";
    container.querySelector("#iconremove-photo").classList.add("disappear")
    container.querySelector("#img-upload").src = "./pages/elementos/icones/img-1.png"
  })

  return container;
};