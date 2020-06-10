import { logout, loadPost, dataUser, updateCollection } from './data.js';
import { button } from '../elementos/objetos/button.js';
//import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';
import { textarea } from '../elementos/objetos/textarea.js';

export default () => {
    const container = document.createElement('div');

    container.classList.add("container");
    container.innerHTML = `
    <div id="nameUser"></div>
    <form class="box">
    ${textarea({ id: "post-text", type: "text", size:"500", placeholder: "Diga Oi!" })}
    <div class="space-buttons">
    ${button({ id: "greeting-btn", class: "greeting-btn", name: "Compartilhar" })}
    </div>
    </form>
    <div id='greeting-message'></div>
    <div id="firebase-auth-container"></div>
    <div id='message'></div>
    <ul id="posts" class="post-box"></ul>
    ${link({ href: "#", id: "buttonOut", name: "Logout" })}`;

    // container.appendChild(icon('churrasqueira'))
    // container.appendChild(icon('cafeteira'))
    // container.appendChild(icon('comida'))
    // container.appendChild(icon('luva'))
    // container.appendChild(icon('talher'))
    // container.appendChild(icon('tomate'))
    // container.appendChild(icon('caneca'))


    const greetingBtn = container.querySelector('#greeting-btn');
    const greetingMessage = container.querySelector('#greeting-message');



    greetingBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const postText = container.querySelector('#post-text').value;
        const post = {
            name: firebase.auth().currentUser.displayName,
            text: postText,
            user_id: firebase.auth().currentUser.uid,
            likes: 0,
            liked: [],
            comments: []
        }
        const postsCollection = firebase.firestore().collection("posts")
        postsCollection.add(post).then(res => {
            container.querySelector("#post-text").value = ""
            loadPost()
        })
    });




    function likeClass(post) {
        post.data().liked.forEach(a => {
            if (a === firebase.auth().currentUser.uid) {
                container.querySelector(`#like1${post.id}`).classList.add("disappear")
                container.querySelector(`#like2${post.id}`).classList.remove("disappear")
            } else {
                container.querySelector(`#like2${post.id}`).classList.add("disappear")
                container.querySelector(`#like1${post.id}`).classList.remove("disappear")
            }
        })

    }

    function addPosts(post) {
        const postsTemplete = `
        <li id="li${post.id}" class="post box">
            <div class="user-post">Publicado por: ${post.data().name} ${icon({name:'talher', id:post.id+"close"})}</div>
            ${post.data().text} 
            <div class="icon-post">${post.data().likes}${icon({name:'cereja', id:post.id})}</div>
        </li>
        `
        container.querySelector("#posts").innerHTML += postsTemplete
    }


    function like(post) {
        container.querySelector(`#li${post.id}`).addEventListener("click", (event) => {
            event.preventDefault();
            let likes = post.data().likes
            let likeUser = post.data().liked

            let valid = 1

            for (let i in likeUser) {
                if (likeUser[i] === firebase.auth().currentUser.uid) {
                    likeUser.splice(i, 1)
                    valid = -1
                }
            }

            if (valid === 1) {
                likeUser.push(firebase.auth().currentUser.uid)
            }
            likes += valid
            container.querySelector("#posts").innerHTML = ""
            updateCollection(likeUser, likes, post.id)
        })

    }



    function profile(data) {
        container.querySelector("#nameUser").innerHTML = data
    }
    //  user();
    dataUser(profile);
    loadPost(addPosts, like, likeClass);



    return container;
};