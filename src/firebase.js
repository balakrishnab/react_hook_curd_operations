import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
	// Add your firestore app config here
};
// Initialize Firebase
var firebaseDB = firebase.initializeApp(firebaseConfig);

export default firebaseDB.database().ref();