export const logout = () => {
    firebase.auth().signOut();
    location.reload();
};

// export const user = () => {
//     firebase.auth().onAuthStateChanged(function(user) {
//         // Se troca essa variável por const ou let para de funcionar.
//         var user = firebase.auth().currentUser;
//         if (user) {
//             let name = user.displayName;
//             // let photo = user.photoURL;
//             console.log(`Oi ${name}! Que bom ver você aqui!`);
//         } else {
//             console.log("não possui usuário logado!");
//             //   let name = "anonimo"
//         }
//         // return name;
//     });
// }



export const loadPost = (addPosts, like, likeClass) => {
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.get().then(snap => {
        snap.forEach(post => {
            addPosts(post)
        });
        snap.forEach(post => {
            likeClass(post)
        });
        snap.forEach(post => {
            like(post)
        });
    })
}
export const updateCollection = (likeUser, likes, post, addPosts, like, likeClass) => {
    firebase.firestore().collection("posts").doc(`${post}`).update({
        liked: likeUser,
        likes: likes
    }).then(() => {
        loadPost(addPosts, like, likeClass);
    })
}


export const dataUser = (profile) => {
    firebase.auth().onAuthStateChanged(function(user) {
        profile(firebase.auth().currentUser.displayName)
    })
}