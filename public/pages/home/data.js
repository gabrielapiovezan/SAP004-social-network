export const greeting = name => `Oi ${name}! Que bom ver você aqui!`;

export const logout = () => {
    firebase.auth().signOut();
    location.reload();
};

export const user = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        // Se troca essa variável por const ou let para de funcionar.
        var user = firebase.auth().currentUser;
        if (user) {
            let name = user.displayName;
            // let photo = user.photoURL;
            console.log(`Oi ${name}! Que bom ver você aqui!`);
        } else {
            console.log("não possui usuário logado!");
            //   let name = "anonimo"
        }
        // return name;
    });
}

//Que bom ver você ${firebase.auth().currentUser.displayName}