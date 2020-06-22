export const logout = () => {
    firebase.auth().signOut();
    window.location.hash = '';
};

export const loadPost = (
    //  checkedPrivacy,
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
                }
            });
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    like(post);
                }
            });
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    deletePost(post);
                }
            });
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    editPost(post);
                }
            });
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    lokerPost(post);
                }
            });
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    textareaAdaptable(post);
                }
            });
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    commenter(post);
                }
            });
            snap.forEach((post) => {
                if (
                    post.data().privacy === false ||
                    firebase.auth().currentUser.uid === post.data().user_id
                ) {
                    printComment(post);
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
    });
};

// export const dataUser = (profile) => {
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) profile(user.displayName, user.photoURL);
//     });
// };

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

export const updatePost = (id, post) => {
    return firebase.firestore().collection('posts').doc(id).update({
        text: post,
    });
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
        if (a === firebase.auth().currentUser.uid) likeClass(post.id, true);
    });
    likeClass(`loker-${post.id}`, post.data().privacy);
}

export const loadProfile = (callnack) => {
    let dataUser;
    firebase
        .firestore()
        .collection('users')
        .onSnapshot((snap) => {
            snap.forEach((user) => {
                if (firebase.auth().currentUser.uid === user.data().userUid) {
                    const dataUser = user.data();
                    callnack(dataUser);
                }
            });
        });
};

export const loadUserPost = (post, callnack) => {
    let dataUser;
    firebase
        .firestore()
        .collection('users')
        .onSnapshot((snap) => {
            snap.forEach((user) => {
                if (post.data().user_id === user.data().userUid) {
                    const dataUser = user.data();
                    callnack(dataUser);
                }
            });
        });
};