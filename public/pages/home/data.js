export const greeting = name => `Oi ${name}! Que bom ver você aqui!`;

export const logout = () => {
    firebase.auth().signOut();
    location.reload();
};

//Que bom ver você ${firebase.auth().currentUser.displayName}