import { user, createPost, logout, loadPost, dataUser, updateCollection, postDelete, updatePost } from './data.js';
import { button } from '../elementos/objetos/button.js';
import { link } from '../elementos/objetos/link.js';
import iconColor from '../elementos/objetos/icon-color.js';
import icon from '../elementos/objetos/icon.js';
import { textarea } from '../elementos/objetos/textarea.js';
import { image } from '../elementos/objetos/image.js';


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
          <li>${link({ href:"#profile", name:"Perfil", title:"perfil", target:"_self" })}</li>
          <li>${link({ id:"logout-btn", name:"Sair", title:"deslogar", target:"_self" })}</li>
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
      <div class="posts">
        <form class="box">
          ${textarea({ id: "post-text", type: "text", size: "500", placeholder: "Compartilhe sua publicação aqui!" })}
          ${button({ id: "post-btn", class: "post-btn", name: "Postar" })}
        </form>
        <ul id="posts" class="post-box"></ul>
      </div>
    </section>
    <footer class="footer">
      <h5>Desenvolvido por: 
        ${link({ href:"https://github.com/camilagerarde", name:"Camila Cunha", class:"link-footer", title:"Camila Cunha", target:"_blank"})},
        ${link({ href:"https://github.com/gabrielapiovezan/", name:"Gabriela Piovezan", class:"link-footer", title:"Gabriela Piovezan", target:"_blank"})}
        e ${link({ href:"https://github.com/MarianaMBarros", name:"Mariana Barros", class:"link-footer", title:"Mariana Barros", target:"_blank"})}
      </h5>
    </footer>
    `;

    // container.appendChild(icon('churrasqueira'))
    // container.appendChild(icon('cafeteira'))
    // container.appendChild(icon('comida'))
    // container.appendChild(icon('luva'))
    // container.appendChild(icon('talher'))
    // container.appendChild(icon('tomate'))
    // container.appendChild(icon('caneca'))

    container.querySelector('#post-btn').addEventListener('click', (event) => {
        event.preventDefault();
        const postText = container.querySelector('#post-text').value;

        const post = {
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
        createPost(post);
        loadPost(addPosts, like, likeClass, deletePost, editPost);
    });

    container.querySelector('#logout-btn').addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    })


    function likeClass(post) {
        post.data().liked.forEach(a => {
            if (a === firebase.auth().currentUser.uid) {
                container.querySelector(`#like1${post.id}`).classList.add("disappear");
                container.querySelector(`#like2${post.id}`).classList.remove("disappear");
            } else {
                container.querySelector(`#like2${post.id}`).classList.add("disappear");
                container.querySelector(`#like1${post.id}`).classList.remove("disappear");
            };
        });
    };

    function addPosts(post) {
        const postsTemplete = `
        <li id="li${post.id}" class="post box">
          <div class="user-post">Publicado por: ${post.data().name} 
            <div class="btn-post">
              ${button({ id:`edit${post.id}`, class:"edit-btn", name:"Editar" })}
              ${button({ id:`save${post.id}`, class:"edit-btn disappear", name:"Salvar" })}
              ${icon({ name:'talher', id:post.id })}</div>
            </div>  
          <div class="text" id="text${post.id}">${post.data().text}</div>          
          <div class="icon-post">${post.data().likes} 
          <span id="like${post.id}">${iconColor({ name:'cereja', id:post.id })}</span></div> 
        </li>
        `;
    container.querySelector("#posts").innerHTML += postsTemplete;
  };

  function deletePost(post) {
    container.querySelector(`#icon${post.id}`).addEventListener("click", (event) => {
      event.preventDefault();
      let postUser = post.data().user_id;

      if (postUser === firebase.auth().currentUser.uid) {
        postDelete(post.id);
        container.querySelector("#posts").innerHTML = "";
        loadPost(addPosts, like, likeClass, deletePost, editPost);
      } else {
        alert("Você não é o autor do post!");
      };
    });
  };

  function like(post) {
    container.querySelector(`#like${post.id}`).addEventListener("click", (event) => {
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
      loadPost(addPosts, like, likeClass, deletePost, editPost);
    });
  };

  function profile(data) {
    container.querySelector("#nameUser").innerHTML = `Olá, ${data}!`;
  };

  function editPost(post) {
    const edit = container.querySelector(`#edit${post.id}`)
    const save = container.querySelector(`#save${post.id}`)
    edit.addEventListener("click", (event) => {
      event.preventDefault();
      const textPost = document.querySelector(`#text${post.id}`);

      textPost.classList.add("disappear");

      const newPost = document.createElement("input");
      newPost.value = post.data().text;

      textPost.after(newPost);

      edit.classList.add("disappear")
      save.classList.remove("disappear")

      save.addEventListener("click", async () => {
        await updatePost(post.id, newPost.value);
        save.classList.add("disappear")
        edit.classList.remove("disappear")

        textPost.innerHTML = newPost.value;
        textPost.classList.remove("disappear")

        newPost.remove()
        loadPost(addPosts, like, likeClass, deletePost, editPost)
      })

    });

  };

  user();
  dataUser(profile);
  loadPost(addPosts, like, likeClass, deletePost, editPost);

  return container;
};