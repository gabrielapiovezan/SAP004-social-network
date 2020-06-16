import { user, createPost, logout, loadPost, dataUser, updateCollection, postDelete, updatePost, filePost } from './data.js';
import { button } from '../elementos/objetos/button.js';
import { link } from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';
import { textarea } from '../elementos/objetos/textarea.js';
import { image } from '../elementos/objetos/image.js';
import { input } from '../elementos/objetos/input.js';


export default () => {
  const container = document.createElement('div');
  container.classList.add("container-home");

  container.innerHTML = `
    <header>
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox"/>
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
          <li>${link({ href: "#profile", name: "Perfil", title: "perfil", target: "_self" })}</li>
          <li>${link({ id: "logout-btn", name: "Sair", title: "deslogar", target: "_self" })}</li>
          </ul>
        </div>
      </nav>
      <h1> &lt; Umâmi &gt; </h1> 
      <figure>
        ${image({ src: "/pages/elementos/imagens/logo.png", class: "img-header", alt: "logo-umâmi" })}
      </figure>
    </header>
    <section class="timeline">
      <div class="profile">
        <figure>
          ${image({ src: "/pages/elementos/imagens/chefe.png", class: "img-profile", alt: "foto-perfil" })}
        </figure>
        <h3 id="nameUser" class="name-user"></h3>
      </div>
      ${image({ src: "/pages/elementos/imagens/fundo.png", class: "disappear image-back" })}
      <div class="posts">
        <form class="box">
          ${textarea({ id: "post-text", type: "text", size: "500", placeholder: "Compartilhe sua publicação aqui!" })}
          ${image({ id: "icon-variable-loker", src: "./pages/elementos/icones/cadeado-1.png", class: "icon" })}
            <img id="photo" class="img-post"/>
            ${icon({ name: 'talher', id: 'remove-photo', class: "disappear" })}                    
            <div class="send-post">
              <input type="file" id= "file" accept= "image/*">
              <label for="file"> ${image({ id: "img-upload", class: "icon", src: "./pages/elementos/icones/img-1.png" })}</label>                     
              ${button({ id: "post-btn", class: "post-btn", name: "Postar" })}
            </div>
        </form>
        <ul id="posts" class="post-box"></ul>
      </div>
    </section>
    <footer class="footer">
      <h5>Desenvolvido por:
        <div>
          ${link({ href: "", name: "Camila Cunha", class: "link-footer", title: "Camila Cunha", target: "_blank" })}
            <span> 
            ${link({ href: "https://github.com/camilagerarde", name: icon({ name: 'github' }), class: "link-footer", title: "Camila Cunha", target: "_blank" })}  
            ${link({ href: "https://www.linkedin.com/in/camila-gerarde/", name: icon({ name: 'linkedin' }), class: "link-footer", title: "Camila Cunha", target: "_blank" })}
            </span>
          </div>
        <div>
          ${link({ href: "", name: "Gabriela Piovezan", class: "link-footer", title: "Gabriela Piovezan", target: "_blank" })}
          <span>
            ${link({ href: "https://github.com/gabrielapiovezan/", name: icon({ name: 'github' }), class: "link-footer", title: "Gabriela Piovezan", target: "_blank" })}
            ${link({ href: "https://www.linkedin.com/in/gabrielapiovezan/", name: icon({ name: 'linkedin' }), class: "link-footer", title: "Gabriela Piovezan", target: "_blank" })}</div>
          </span>
        <div>
          ${link({ href: "https://marianambarros.github.io/portifolio/src/", name: "Mariana Barros", class: "link-footer", title: "Mariana Barros", target: "_blank" })}
         <span>
            ${link({ href: "https://github.com/MarianaMBarros", name: icon({ name: 'github' }), class: "link-footer", title: "Mariana Barros", target: "_blank" })}
            ${link({ href: "https://www.linkedin.com/in/marianambarros/", name: icon({ name: 'linkedin' }), class: "link-footer", title: "Mariana Barros", target: "_blank" })}
          </span>
        </div>  
        </h5>    
    </footer>
    `;


  container.querySelector('#post-btn').addEventListener('click', (event) => {
    event.preventDefault();
    const fileInpxut = container.querySelector("#file");
    if (fileInpxut.files[0]) {
      filePost(fileInpxut.files[0], `images${fileInpxut.files[0].name}`, saveFirebase)
    } else { saveFirebase(null) }


    function saveFirebase(urlFile) {
      const postText = container.querySelector('#post-text').value;
      const post = {
        url_file: urlFile ? `https://firebasestorage.googleapis.com/v0/b/social-networt.appspot.com/o/${urlFile}?alt=media` : null,
        name: firebase.auth().currentUser.displayName,
        text: postText,
        user_id: firebase.auth().currentUser.uid,
        likes: 0,
        liked: [],
        comments: [],
        time: firebase.firestore.FieldValue.serverTimestamp()
      }
      container.querySelector("#post-text").value = "";
      container.querySelector("#posts").innerHTML = "";
      container.querySelector("#photo").src = "";
      container.querySelector("#img-upload").src = "./pages/elementos/icones/img-1.png"
      createPost(post);
    }

  })
  container.querySelector('#logout-btn').addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  })


  function likeClass(id, valid) {
    let adress = container.querySelector(`#icon-variable-${id}`).src
    if (valid === 1) {
      adress = adress.replace("1", "2")
      container.querySelector(`#icon-variable-${id}`).src = adress
    } else {
      adress = adress.replace("2", "1")
      container.querySelector(`#icon-variable-${id}`).src = adress

    }

  };

  function renderImg(url_file) {
    return url_file ? `${image({ src: url_file, class: "img-post" })}` : ''
  }

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




      
  
          // alt:"ícone-editar"
          // alt:"ícone-salvar"
          // alt:"ícone-excluir"




  function addPosts(post) {
    let date = new Date(post.data().time.seconds*1000); 
    let options = {dateStyle:('short'), timeStyle:('short')};
    let datePost = date.toLocaleDateString("pt-BR", options);

    const postsTemplate = `
      <div li id = "li${post.id}" class="post box" >
        <div class="user-post">
        <div>
          <h3>Publicado por: ${post.data().name}</h3>
          <time>${datePost}</time>
        </div>
          <div class="btn-post">
            ${icon({ id: `edit-${post.id}`, class: "edit-btn disappear", name: "edit" })}
              ${icon({ id: `save-${post.id}`, class: "edit-btn disappear", name: "checked" })}
              ${icon({ name: 'talher', id: post.id, class: "disappear" })}
          </div>
        </div>
          <div class="text" id="text${post.id}">${post.data().text}</div>    
          ${renderImg(post.data().url_file)}
          <div class="icon-post" > ${post.data().likes}
          ${image({ id: `icon-variable-${post.id}`, class: "icon", name: "cereja", src: "./pages/elementos/icones/cereja-1.png" })}
            ${icon({ name: 'comentario', id: post.id })}
          </div> 
      </div> `;

    container.querySelector("#posts").innerHTML += postsTemplate;
  };

  function deletePost(post) {
    let postUser = post.data().user_id;

    if (postUser === firebase.auth().currentUser.uid) {
      container.querySelector(`#icon${post.id} `).classList.remove("disappear")
      container.querySelector(`#icon${post.id} `).addEventListener("click", (event) => {
        event.preventDefault();

        postDelete(post.id);
        container.querySelector("#posts").innerHTML = "";

      });
    }

  };

  function like(post) {
    container.querySelector(`#icon-variable-${post.id}`).addEventListener("click", (event) => {
      event.preventDefault();
      let likes = post.data().likes;
      let likeUser = post.data().liked;
      let valid = 1;

      for (let i in likeUser) {
        if (likeUser[i] === firebase.auth().currentUser.uid) {
          likeUser.splice(i, 1);
          valid = -1;
        };
      };

      if (valid === 1) {
        likeUser.push(firebase.auth().currentUser.uid);
      };

      likes += valid;
      container.querySelector("#posts").innerHTML = "";
      updateCollection(likeUser, likes, post.id);
    });
  };

  function profile(data) {
    container.querySelector("#nameUser").innerHTML = `Olá, ${data} !`;
  };


  container.querySelector("#icon-variable-loker").addEventListener('click', () => {
    likeClass("loker", 1)
  })


  let editing = false


  function editPost(post) {
    const edit = container.querySelector(`#iconedit-${post.id} `)
    const save = container.querySelector(`#iconsave-${post.id} `)

    let postEdit = post.data().user_id;
    if (postEdit === firebase.auth().currentUser.uid) {
      edit.classList.remove("disappear")

      edit.addEventListener("click", (event) => {
        event.preventDefault();
        if (!editing) {
          editing = true;

          container.querySelector(`#text${post.id} `).classList.add("disappear");

          const newPost = document.createElement("div");
          newPost.id = "edit-post"
          const textEdit = textarea({ id: "edit-post-text", type: "text", size: "500", placeholder: "Compartilhe sua publicação aqui!", value: post.data().text });
          newPost.innerHTML = textEdit;

          container.querySelector(`#text${post.id} `).after(newPost);

          edit.classList.add("disappear")
          save.classList.remove("disappear")
          container.querySelector(`#icon${post.id} `).classList.add("disappear")


          save.addEventListener("click", async () => {
            const valor = newPost.firstElementChild.value;
            container.querySelector(`#iconsave-${post.id} `).classList.add("disappear")
            container.querySelector(`#iconedit-${post.id} `).classList.remove("disappear")
            container.querySelector(`#icon${post.id} `).classList.remove("disappear")

            container.querySelector(`#text${post.id} `).innerHTML = newPost.firstElementChild.value;
            container.querySelector(`#text${post.id} `).classList.remove("disappear")
            container.querySelector("#edit-post").remove()

            await updatePost(post.id, valor);

            editing = false;
          })
        } else alert("Você já está editando!");
      });
    }
  };

  function profile(data) {
    container.querySelector("#nameUser").innerHTML = `Olá, ${data} !`;
  };



  container.querySelector("#icon-variable-loker").addEventListener('click', () => {

    likeClass("loker", 1)
  })




  user();
  dataUser(profile);
  loadPost(addPosts, like, likeClass, deletePost, editPost);

  return container;
};