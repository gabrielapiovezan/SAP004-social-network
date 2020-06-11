import { user, createPost, logout, loadPost, dataUser, updateCollection, postDelete } from './data.js';
import { button } from '../elementos/objetos/button.js';
// import { link } from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';
import { textarea } from '../elementos/objetos/textarea.js';


export default () => {
    const container = document.createElement('div');
    container.classList.add("container");

    container.innerHTML = `
    <div id="nameUser"></div>
    ${button({ id: "logout-btn", class: "post-btn", name: "Sair" })}
    <form class="box">
    ${textarea({ id: "post-text", type: "text", size:"500", placeholder: "Compartilhe sua publicação aqui!" })}
    <div class="space-buttons">
    ${button({ id: "post-btn", class: "post-btn", name: "Postar" })}
    </div>
    </form>
    <ul id="posts" class="post-box"></ul>
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
        loadPost(addPosts, like, likeClass, deletePost);
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
            <span id="close${post.id}">${icon({name:'talher'})}</span></div>
            <div class="text">${post.data().text}</div> 
            <div class="icon-post">${post.data().likes} 
            <span id="like${post.id}">${icon({name:'cereja', id:post.id})}</span></div>
        </li>
        `;
        container.querySelector("#posts").innerHTML += postsTemplete;
    };

    function deletePost(post) {
        container.querySelector(`#close${post.id}`).addEventListener("click", (event) => {
            event.preventDefault();
            let postUser = post.data().user_id;

            if (postUser === firebase.auth().currentUser.uid) {
                postDelete(post.id);
                container.querySelector("#posts").innerHTML = "";
                loadPost(addPosts, like, likeClass, deletePost);
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
            loadPost(addPosts, like, likeClass, deletePost);
        });
    };

    function profile(data) {
        container.querySelector("#nameUser").innerHTML = `Olá, ${data}!`;
    };

    user();
    dataUser(profile);
    loadPost(addPosts, like, likeClass, deletePost);
    
    return container;
};