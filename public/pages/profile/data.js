import errorHandling from '../elementos/objetos/authError.js';

export const updateProfile = (profile, callback) => {
	firebase.auth().currentUser.updateProfile({
		displayName: profile.displayName,
		photoURL: profile.photoURL,
	})
		.then(function () {
			updatePostsUser(profile.uid, profile.displayName, callback);
		})
};

export const updatePostsUser = (userId, name, callback) => {
	firebase.firestore().collection('posts').where('user_id', '==', userId).get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				firebase.firestore().collection('posts').doc(doc.id).update({
					name: name,
				});
			});
			callback();
		})
};

export const fileProfile = (file, name, callback) => {
	const ref = firebase.storage().ref();
	const fileProfile = ref.child(name);
	fileProfile.put(file).then(function () {
		callback(fileProfile.fullPath);
	});
};

export const deleteAccount = (userId, callback) => {
	const user = firebase.auth().currentUser;
	user.delete().then(function () {
		deletePostsUser(user.uid, callback);
		userDelete(userId);
	})
};

export const deletePostsUser = (userId, callback) => {
	firebase.firestore().collection('posts').where('user_id', '==', userId).get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				firebase.firestore().collection('posts').doc(doc.id).delete();
			});
			callback();
		})
};

const reauthenticate = (currentPassword) => {
	const user = firebase.auth().currentUser;
	const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
	return user.reauthenticateWithCredential(cred);
};

export const updatePassword = (currentPassword, newPassword, printError) => {
	reauthenticate(currentPassword)
		.then(() => {
			const user = firebase.auth().currentUser;
			user.updatePassword(newPassword)
				.then(() => {
					const answer = 'Senha alterada com sucesso!';
					printError(answer);
				})
				.catch((error) => {
					printError(errorHandling(error.code));
				});
		})
		.catch((error) => {
			printError(errorHandling(error.code));
		});
};

export const loadProfile = (profile) => {
	firebase.firestore().collection('users').onSnapshot((snap) => {
		snap.forEach((user) => {
			if (firebase.auth().currentUser.uid === user.data().userUid) {
				profile(user);
			}
		});
	});
};

export const updateCollection = (user, userData) => {
	firebase.firestore().collection('users').doc(`${user}`).update({
		photo: userData.photo,
		userName: userData.userName,
		profession: userData.profession,
		age: userData.age,
	});
};

export const logout = () => {
	firebase.auth().signOut();
	window.location.hash = '';
};