import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyC86E-Ju1zSteJR3PmpXuqLmqyS0L3Ejy0",
	authDomain: "react-curd-todolist.firebaseapp.com",
	databaseURL: "https://react-curd-todolist.firebaseio.com",
	projectId: "react-curd-todolist",
	storageBucket: "react-curd-todolist.appspot.com",
	messagingSenderId: "541457011078",
	appId: "1:541457011078:web:24d5244a61e1097b805c07"
};
// Initialize Firebase
var firebaseDB = firebase.initializeApp(firebaseConfig);

export default firebaseDB.database().ref();