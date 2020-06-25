export const logout = () => firebase.auth().signOut();

export const loadPost = (
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
) => {
    firebase
        .firestore()
        .collection('posts')
        .orderBy('time', 'desc')
        .onSnapshot((snap) => {
            clearPost();
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    addPosts(post);
                }
            });
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    iconVerific(post, likeClass);
                    like(post);
                    editPost(post);
                    lokerPost(post);
                    commenter(post);
                    printComment(post);
                    textareaAdaptable(post);
                    deletePost(post);
                }
            });
        });
};

export const updateCollection = (post, data) => {
    firebase.firestore().collection('posts').doc(`${post}`).update({
        liked: data.liked,
        comments: data.comments,
        text: data.text,
        privacy: data.privacy,
        text: data.text,
    });
};

export const postDelete = (post) => {
    firebase
        .firestore()
        .collection('posts')
        .doc(post)
        .delete()
        .then(function() {
            console.log('Document successfully deleted!');
        })
        .catch(function(error) {
            console.error('Error removing document: ', error);
        });
};

export const createPost = (post) => {
    firebase.firestore().collection('posts').add(post);
};

export const filePost = (file, name, callback, privacy) => {
    const ref = firebase.storage().ref();
    const filePostar = ref.child(name);
    filePostar.put(file).then(function(snapshot) {
        callback(filePostar.fullPath, privacy);
    });
};

function iconVerific(post, likeClass) {
    post.data().liked.forEach((a) => {
        if (a === firebase.auth().currentUser.uid) {
            likeClass(`like-${post.id}`, true);
        }
    });
    likeClass(`loker-${post.id}`, post.data().privacy);
}

export const loadUserPost = (callback, postUser) => {
    firebase
        .firestore()
        .collection('users')
        .onSnapshot((snap) => {
            snap.forEach((user) => {
                if (
                    postUser === user.data().userUid ||
                    (firebase.auth().currentUser.uid === user.data().userUid && !postUser)
                ) {
                    callback(user.data());
                }
            });
        });
};

export const isLogin = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.hash = '#';
            window.location.reload();
        }
    });
};