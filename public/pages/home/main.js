import { greeting, logout, user } from './data.js';
import { button } from '../elementos/objetos/button.js';
import { input } from '../elementos/objetos/input.js';
import { link } from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';
import { textarea } from '../elementos/objetos/textarea.js';

// ${textarea({ id: "name", type: "text", placeholder: "Diga Oi!" })} <textarea rows="52" cols="52" id="name" type="text"></textarea>
//    ${icon('churrasqueira')}
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
    <ul id="posts"></ul>
    ${link({ href: "#", id: "buttonOut", name: "Logout" })}`;

    // container.appendChild(icon('cereja'))
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

    function loadPost() {
        const postsCollection = firebase.firestore().collection("posts")
        container.querySelector("#posts").innerHTML = "Carregando..."
        postsCollection.get().then(snap => {
            container.querySelector("#posts").innerHTML = ""
            snap.forEach(post => {
                addPosts(post)
            });
            snap.forEach(post => {
                like(post)
            });
            snap.forEach(post => {
                likeClass(post)
            });
        })
    }

    function likeClass(post) {
        post.data().liked.forEach(a => {
            if (a === firebase.auth().currentUser.uid) {
                console.log("curtiu")
                container.querySelector(`#like1${post.id}`).classList.add("disappear")
                container.querySelector(`#like2${post.id}`).classList.remove("disappear")
            } else {
                console.log("não curtiu")
                container.querySelector(`#like2${post.id}`).classList.add("disappear")
                container.querySelector(`#like1${post.id}`).classList.remove("disappear")
            }
        })

    }

    function addPosts(post) {

        const postsTemplete = `
        <li id="li${post.id}">
            ${post.data().name}: ${post.data().text} ${icon({name:'luva', id:post.id})}${post.data().likes}  
        </li>
        `
        container.querySelector("#posts").innerHTML += postsTemplete
    }


    function like(post) {
        container.querySelector(`#li${post.id}`).addEventListener("click", (event) => {
            event.preventDefault();
            let likes = post.data().likes
            let likeUser = post.data().liked
                //  console.log(likes)
                //console.log(likeUser)
                // console.log("likes" + likes)
            let valid = 1

            for (let i in likeUser) {
                //     console.log("Aqui")
                //     console.log(likeUser[i], firebase.auth().currentUser.uid)
                if (likeUser[i] === firebase.auth().currentUser.uid) {
                    console.log(likeUser)
                    likeUser.splice(i, 1)
                    console.log("deslike")
                    console.log(likeUser)
                    valid = -1
                }
            }
            if (valid === 1) {
                console.log(likeUser)
                console.log("like")
                likeUser.push(firebase.auth().currentUser.uid)
                console.log(likeUser)
                    //  console.log("user" + likeUser)
            }
            //else {
            //     // console.log(valid)
            // }
            firebase.firestore().collection("posts").doc(`${post.id}`).update({
                    liked: likeUser
                })
                // console.log(likes)
            firebase.firestore().collection("posts").doc(`${post.id}`).update({
                    likes: likes + valid
                })
                // console.log("likes" + likes)
                //location.reload()
        })

    }






    //   let like = post.data().liked
    //    console.log(like)
    // container.querySelector(`#like1${post.id}`).addEventListener("click", () => {
    //   var database = firebase.database();
    // let like = post.data().liked
    // console.log(like)
    //    like.push(firebase.auth().currentUser.uid)
    //   console.log(like)
    //   like = like.push(firebase.auth().currentUser.uid)
    // console.log(like)
    //   console.log(firebase.auth().currentUser.uid)
    // container.querySelector(`#like1${post.id}`).classList.add("disappear")
    // container.querySelector(`#like2${post.id}`).classList.remove("disappear")
    // console.log(post.data().liked)
    // firebase.firestore().collection("posts").doc(`${post.id}`).update({
    //     liked: like
    // })
    // })

    //    container.querySelector(`#like2${post.id}`).addEventListener("click", () => {
    //  let like = post.data().liked
    //  like.pull(firebase.auth().currentUser.uid)

    // for (let i in like) {
    //     if (like[i] === firebase.auth().currentUser.uid) {
    //         like.splice(i, 1)
    //     }
    // }

    //     //     // container.querySelector(`#like2${post.id}`).classList.add("disappear")
    //     //     // container.querySelector(`#like1${post.id}`).classList.remove("disappear")
    //     firebase.firestore().collection("posts").doc(`${post.id}`).update({
    //         liked: [].push(firebase.auth().currentUser.uid)
    //     })

    //         //     loadPost()

    //   })


    //  firebase.firestore().collection("posts").doc(`${post.id}`).update({
    //         liked: like
    //     })



    function profile() {
        firebase.auth().onAuthStateChanged(function(user) {
            container.querySelector("#nameUser").innerHTML = firebase.auth().currentUser.displayName
        });
    }
    user();
    loadPost();
    profile();


    return container;
};