//  Aqui serão exportadas as funções que irão ser usadas

export const greeting = name => `Oi ${name}! Que bom ver você aqui!`;

export const logout = () => {

    console.log("evento")
    firebase.auth().signOut();
    location.reload();

}



//Que bom ver você ${firebase.auth().currentUser.displayName}