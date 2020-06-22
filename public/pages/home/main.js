import {
    //  user,
    createPost,
    logout,
    loadPost,
    //  dataUser,
    updateCollection,
    postDelete,
    updatePost,
    filePost,
    loadProfile,
    loadUserPost,
} from './data.js';
import { button } from '../elementos/objetos/button.js';
import { link } from '../elementos/objetos/link.js';
import icon from '../elementos/objetos/icon.js';
import { textarea } from '../elementos/objetos/textarea.js';
import { image } from '../elementos/objetos/image.js';
// import { input } from '../elementos/objetos/input.js';

export default () => {
    const container = document.createElement('div');

    container.classList.add('container-home');

    container.innerHTML = `

    <div id="modal" class="modal disappear">
      <div class="modal-content">
        <span class="close close-modal">&times;</span>
        <h2>Tem certeza que deseja deletar?</h2>
        ${button({ name: 'Sim', id: 'delete-yes', class: 'close-modal' })}
        ${button({
          name: 'Cancelar',
          id: 'delete-no',
          class: 'close-modal',
        })}
      </div>
    </div>
    <header>
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox"/>
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
          <li>${link({
            href: '#profile',
            name: 'Perfil',
            title: 'perfil',
            target: '_self',
          })}</li>
          <li>${link({
            id: 'logout-btn',
            name: 'Sair',
            title: 'deslogar',
            target: '_self',
          })}</li>
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
    <section class="timeline">
      <div class="profile">
        <figure>
          ${image({
            id: 'img-profile',
            class: 'img-profile',
            alt: 'foto-perfil',
          })}
        </figure>
        <div>
        <h3 id="nameUser"></h3>
        <h4 id="profession"></h4>
        </div>
      </div>
      ${image({
        src: '/pages/elementos/imagens/fundo.png',
        class: 'disappear image-back',
      })}
      <div class="posts">
        <form class="box">
          ${textarea({
            id: 'post-text',
            type: 'text',
            size: '500',
            placeholder: 'Compartilhe sua publicação aqui!',
          })}
          ${image({
            id: 'icon-variable-loker',
            src: './pages/elementos/icones/cadeado-1.png',
            class: 'icon icon-left',
          })}
          <img id="photo" class="img-post"/>
          ${icon({
            name: 'talher',
            id: 'remove-photo',
            class: 'disappear icon-left',
          })}                    
          <div class="send-post">
            <input type="file" id= "file" accept= "image/*" class="icon-left">
            <label for="file"> ${image({
              id: 'img-upload',
              class: 'icon icon-left',
              src: './pages/elementos/icones/img-1.png',
            })}</label>                    
            ${button({ id: 'post-btn', class: 'post-btn', name: 'Postar' })}
          </div>
        </form>
        <ul id="posts" class="post-box"></ul>
      </div>
    </section>
    <footer class="footer">
      <h5>Desenvolvido por:
        <div>
          ${link({
            href: '',
            name: 'Camila Cunha',
            class: 'link-footer',
            title: 'Camila Cunha',
            target: '_blank',
          })}
            <span> 
            ${link({
              href: 'https://github.com/camilagerarde',
              name: icon({ name: 'github', class: 'icon-footer' }),
              class: 'link-footer',
              title: 'Camila Cunha',
              target: '_blank',
            })}  
            ${link({
              href: 'https://www.linkedin.com/in/camila-gerarde/',
              name: icon({ name: 'linkedin', class: 'icon-footer' }),
              class: 'link-footer',
              title: 'Camila Cunha',
              target: '_blank',
            })}
            </span>
          </div>
        <div>
          ${link({
            href: '',
            name: 'Gabriela Piovezan',
            class: 'link-footer',
            title: 'Gabriela Piovezan',
            target: '_blank',
          })}
          <span>
            ${link({
              href: 'https://github.com/gabrielapiovezan/',
              name: icon({ name: 'github', class: 'icon-footer' }),
              class: 'link-footer',
              title: 'Gabriela Piovezan',
              target: '_blank',
            })}
            ${link({
              href: 'https://www.linkedin.com/in/gabrielapiovezan/',
              name: icon({ name: 'linkedin', class: 'icon-footer' }),
              class: 'link-footer',
              title: 'Gabriela Piovezan',
              target: '_blank',
            })}</div>
          </span>
        <div>
          ${link({
            href: 'https://marianambarros.github.io/portifolio/src/',
            name: 'Mariana Barros',
            class: 'link-footer',
            title: 'Mariana Barros',
            target: '_blank',
          })}
         <span>
            ${link({
              href: 'https://github.com/MarianaMBarros',
              name: icon({ name: 'github', class: 'icon-footer' }),
              class: 'link-footer',
              title: 'Mariana Barros',
              target: '_blank',
            })}
            ${link({
              href: 'https://www.linkedin.com/in/marianambarros/',
              name: icon({ name: 'linkedin', class: 'icon-footer' }),
              class: 'link-footer',
              title: 'Mariana Barros',
              target: '_blank',
            })}
          </span>
        </div>  
        </h5>    
    </footer>
    `;

    function createNewPost() {
        let privacy = false;
        container.querySelector('#icon-variable-loker').addEventListener('click', () => {
            privacy === false ? (privacy = true) : (privacy = false);
            likeClass('loker', privacy);
        });
        container.querySelector('#post-btn').addEventListener('click', (event) => {
            event.preventDefault();
            const fileInpxut = container.querySelector('#file');
            if (fileInpxut.files[0]) {
                filePost(fileInpxut.files[0], `images${fileInpxut.files[0].name}`, saveFirebase, privacy);
            } else {
                saveFirebase(null, privacy);
            }
        });
    }

    function saveFirebase(urlFile, privacy) {
        const postText = container.querySelector('#post-text').value;
        const post = {
            url_file: urlFile ?
                `https://firebasestorage.googleapis.com/v0/b/social-networt.appspot.com/o/${urlFile}?alt=media` :
                null,
            name: firebase.auth().currentUser.displayName,
            photo: firebase.auth().currentUser.photoURL || './pages/elementos/imagens/chefe.png',
            text: postText,
            user_id: firebase.auth().currentUser.uid,
            liked: [],
            comments: [],
            time: firebase.firestore.FieldValue.serverTimestamp(),
            date: new Date().getTime(),
            privacy: privacy,
        };
        container.querySelector('#post-text').value = '';
        container.querySelector('#posts').innerHTML = '';
        container.querySelector('#photo').src = '';
        container.querySelector('#img-upload').src = './pages/elementos/icones/img-1.png';
        createPost(post);
    }

    container.querySelector('#logout-btn').addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });

    function likeClass(id, valid) {
        let adress = container.querySelector(`#icon-variable-${id}`).src;

        valid === true ? (adress = adress.replace('1', '2')) : (adress = adress.replace('2', '1'));

        container.querySelector(`#icon-variable-${id}`).src = adress;
    }

    function renderImg(url_file) {
        return url_file ? `${image({ src: url_file, class: 'img-post' })}` : '';
    }

    container.querySelector('#file').addEventListener('change', (event) => {
        event.preventDefault();
        const output = container.querySelector('#photo');
        output.src = URL.createObjectURL(event.target.files[0]);
        container.querySelector('#iconremove-photo').classList.remove('disappear');
        output.onload = function() {
            URL.revokeObjectURL(output.src); // free memory
        };
        container.querySelector('#img-upload').src = './pages/elementos/icones/img-2.png';
    });

    container.querySelector('#iconremove-photo').addEventListener('click', (event) => {
        event.preventDefault();
        container.querySelector('#file').value = '';
        container.querySelector('#photo').src = '';
        container.querySelector('#iconremove-photo').classList.add('disappear');
        container.querySelector('#img-upload').src = './pages/elementos/icones/img-1.png';
    });

    function dateAndHour(date) {
        const options = { dateStyle: 'short', timeStyle: 'short' };
        return date.toLocaleDateString('pt-BR', options);
    }

    function addPosts(post) {
        const date = new Date(post.data().date);

        const postsTemplate = `
      <div li id = "li${post.id}" class="post" >
        <div class="user-post">
          <div class='flex-row'>
            <figure>
              ${image({
                id: `photo${post.id}`,
                class: 'img-profile-post',
                alt: 'foto-usuário',
                src: `${post.data().photo}`,
              })}
            </figure>
            <div>
              <h3 id="nameUser${post.id}"></h3>
              <time>${dateAndHour(date)}</time>
            </div>
                ${image({
                  id: `icon-variable-loker-${post.id}`,
                  src: './pages/elementos/icones/cadeado-1.png',
                  class: 'icon icon-left disappear',
                })}
          </div>
        <div class="btn-post">
          ${icon({
            id: `edit-${post.id}`,
            class: 'edit-btn disappear',
            name: 'edit',
          })}
          ${icon({
            id: `save-${post.id}`,
            class: 'edit-btn disappear',
            name: 'checked',
          })}
          ${icon({ name: 'talher', id: post.id, class: 'disappear' })}
        </div>
        </div>
        <div class="text">
          <textarea id="text${post.id}" rows="auto" disabled> ${post.data().text} </textarea>  
          ${renderImg(post.data().url_file)}
        </div>
        <hr não apagar linha divisória>
        <div class="icon-post" > 
          ${post.data().liked.length}
          ${image({
            id: `icon-variable-${post.id}`,
            class: 'icon',
            name: 'cereja',
            src: './pages/elementos/icones/cereja-1.png',
          })}
          ${post.data().comments.length}
          ${icon({ name: 'comentario', id: `commenter-${post.id}` })}
        </div> 
        <div id="comments${post.id}">
          ${textarea({
            id: `comment-text${post.id}`,
            type: 'text',
            size: '500',
            placeholder: 'Insira seu comentário!',
            class: 'textarea-comment',
          })}
          ${icon({
            name: 'enviar',
            id: `send-comment-${post.id}`,
            class: 'icon-left',
          })}
          <div id="comments-list${post.id}"></div>
        </div>
      </div>`;
    container.querySelector('#posts').innerHTML += postsTemplate;

    const getDataUser = (dataUser) => {
      container.querySelector(`#photo${post.id}`).src = dataUser.photo;
      container.querySelector(
        `#nameUser${post.id}`
      ).innerHTML = `Publicado por: ${dataUser.userName}`;
    };
    loadUserPost(post, getDataUser);
  }

  function lokerPost(post) {
    const loker = container.querySelector(`#icon-variable-loker-${post.id}`);
    let postUser = post.data().user_id;
    if (postUser === firebase.auth().currentUser.uid) {
      loker.classList.remove('disappear');
      container.querySelector(`#icon-variable-loker-${post.id}`).addEventListener('click', () => {
        let data = post.data();
        data.privacy === true ? (data.privacy = false) : (data.privacy = true);
        likeClass(`loker-${post.id}`, data.privacy);
        //   container.querySelector('#posts').innerHTML = '';
        updateCollection(post.id, data);
      });
    }
  }
  function callPostDelete(post) {
    postDelete(post.id);
    //  container.querySelector('#posts').innerHTML = '';
  }
  function callCommentDelet(post, i) {
    const data = post.data();
    data.comments.splice(i, 1);
    updateCollection(post.id, data);
  }
  function modal(post, func, i) {
    const modal = container.querySelector('#modal');
    modal.classList.remove('disappear');
    container.querySelector('#delete-yes').addEventListener('click', () => {
      func(post, i);
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

  function deletePost(post) {
    let postUser = post.data().user_id;

    if (postUser === firebase.auth().currentUser.uid) {
      container.querySelector(`#icon${post.id} `).classList.remove('disappear');
      container.querySelector(`#icon${post.id} `).addEventListener('click', (event) => {
        event.preventDefault();
        modal(post, callPostDelete);
      });
    }
  }

  function like(post) {
    container.querySelector(`#icon-variable-${post.id}`).addEventListener('click', (event) => {
      event.preventDefault();
      let data = post.data();
      let valid = 1;

      for (let i in data.liked) {
        if (data.liked[i] === firebase.auth().currentUser.uid) {
          data.liked.splice(i, 1);
          valid = -1;
        }
      }

      if (valid === 1) {
        data.liked.push(firebase.auth().currentUser.uid);
      }

      //container.querySelector('#posts').innerHTML = '';
      updateCollection(post.id, data);
    });
  }

  function profile(dataUser) {
    container.querySelector('#img-profile').src =
      dataUser.photo || './pages/elementos/imagens/chefe.png';
    container.querySelector('#nameUser').innerHTML = `${dataUser.userName}`;
    container.querySelector('#profession').innerHTML = `${dataUser.profession}`;
  }

  let editing = false;

  function editPost(post) {
    const edit = container.querySelector(`#iconedit-${post.id} `);
    const save = container.querySelector(`#iconsave-${post.id} `);

    let postEdit = post.data().user_id;
    if (postEdit === firebase.auth().currentUser.uid) {
      edit.classList.remove('disappear');

      edit.addEventListener('click', (event) => {
        event.preventDefault();
        if (!editing) {
          editing = true;

          container.querySelector(`#text${post.id} `).classList.add('disappear');

          const newPost = document.createElement('div');
          newPost.id = 'edit-post';
          const textEdit = textarea({
            id: 'edit-post-text',
            type: 'text',
            size: '500',
            placeholder: 'Compartilhe sua publicação aqui!',
            value: post.data().text,
          });
          newPost.innerHTML = textEdit;

          container.querySelector(`#text${post.id} `).after(newPost);

          edit.classList.add('disappear');
          save.classList.remove('disappear');
          container.querySelector(`#icon${post.id} `).classList.add('disappear');

          save.addEventListener('click', async () => {
            const valor = newPost.firstElementChild.value;
            container.querySelector(`#iconsave-${post.id} `).classList.add('disappear');
            container.querySelector(`#iconedit-${post.id} `).classList.remove('disappear');
            container.querySelector(`#icon${post.id} `).classList.remove('disappear');

            container.querySelector(`#text${post.id} `).innerHTML = newPost.firstElementChild.value;
            container.querySelector(`#text${post.id}`).classList.remove('disappear');
            container.querySelector('#edit-post').remove();

            await updatePost(post.id, valor);

            editing = false;
          });
        } else alert('Você já está editando!');
      });
    }
  }

  function commenter(post) {
    container.querySelector(`#iconcommenter-${post.id}`).addEventListener('click', () => {
      container.querySelector(`#comments${post.id}`).classList.toggle('disappear');
    });
    const data = post.data();
    container.querySelector(`#iconsend-comment-${post.id}`).addEventListener('click', () => {
      const comment = {
        text: container.querySelector(`#comment-text${post.id}`).value,
        user_id: firebase.auth().currentUser.uid,
        user_name: firebase.auth().currentUser.displayName,
        photo: firebase.auth().currentUser.photoURL || './pages/elementos/imagens/chefe.png',
        date: new Date().getTime(),
      };
      data.comments.unshift(comment);
      //  container.querySelector('#posts').innerHTML = '';
      updateCollection(post.id, data);
    });
  }

  function deleteComents(data, post) {
    for (let i in data.comments) {
      container.querySelector(`#iconclose-${i}-${post.id}`).addEventListener('click', (event) => {
        event.preventDefault();
        modal(post, callCommentDelet, i);
      });
    }
  }
  function editComments(data, post) {
    for (let i in data.comments) {
      container.querySelector(`#iconedit-${i}-${post.id}`).addEventListener('click', (event) => {
        event.preventDefault();
        container.querySelector(`#iconedit-${i}-${post.id}`).classList.add('disappear');
        container.querySelector(`#iconchecked-${i}-${post.id}`).classList.remove('disappear');
        container.querySelector(`#comment-${i}-${post.id}`).removeAttribute('disabled');
        container.querySelector(`#iconchecked-${i}-${post.id}`).addEventListener('click', () => {
          container.querySelector(`#comment-${i}-${post.id}`).setAttribute('disabled', true);
          data.comments[i].text = container.querySelector(`#comment-${i}-${post.id}`).value;
          updateCollection(post.id, data);
          container.querySelector(`#iconchecked-${i}-${post.id}`).classList.add('disappear');
          container.querySelector(`#iconedit-${i}-${post.id}`).classList.remove('disappear');
        });
      });
    }
  }

  function printComment(post) {
    const boxComments = container.querySelector(`#comments-list${post.id}`);
    const data = post.data();
    boxComments.innerHTML = '';
    for (let i in data.comments) {
      const date = new Date(data.comments[i].date);

      boxComments.innerHTML += `
      <div  class="comment">
        <figure>
          ${image({
            class: 'img-profile-comment',
            alt: 'foto-usuário',
            src: `${data.comments[i].photo}`,
          })}
        </figure>
        <div class='comment-box'>
          <h3>${data.comments[i].user_name}</h3> 
          <time>${dateAndHour(date)}</time> 
          ${textarea({
            value: `${data.comments[i].text}`,
            id: `comment-${i}-${post.id}`,
            size: 50,
          })}
        </div>
        <div class='icons-comment'>
          ${icon({
            name: 'talher',
            id: `close-${i}-${post.id}`,
            class: 'disappear',
          })}
          ${icon({
            name: 'edit',
            id: `edit-${i}-${post.id}`,
            class: 'disappear',
          })}
          ${icon({
            name: 'checked',
            id: `checked-${i}-${post.id}`,
            class: 'disappear',
          })}
        </div>

      </div>`;
      container.querySelector(`#comment-${i}-${post.id}`).setAttribute('disabled', true);
      if (firebase.auth().currentUser.uid === data.comments[i].user_id) {
        container.querySelector(`#iconclose-${i}-${post.id}`).classList.remove('disappear');
        container.querySelector(`#iconedit-${i}-${post.id}`).classList.remove('disappear');
      }
    }
    deleteComents(data, post);
    editComments(data, post);
  }

  function textareaAdaptable(post) {
    container.querySelectorAll('textarea').forEach((a) => {
      a.addEventListener('input', () => {
        if (a.scrollHeight >= a.offsetHeight) a.rows++;
        else if (a.scrollHeight < a.offsetHeight) a.rows--;
      });

      while (a.scrollHeight > a.offsetHeight) {
        a.rows += 1;
      }
    });
    container.querySelector(`#comments${post.id}`).classList.add('disappear');
  }
  function clearPost() {
    container.querySelector('#posts').innerHTML = '';
  }
  createNewPost();

  loadProfile(profile);

  loadPost(
    clearPost,
    addPosts,
    like,
    likeClass,
    deletePost,
    editPost,
    lokerPost,
    commenter,
    printComment,
    textareaAdaptable
  );
  return container;
};