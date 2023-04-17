// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBqpg0AcXQ50NnHyuZU4659LkrtmwmCIO8",
	authDomain: "silly-socks-7a9e6.firebaseapp.com",
	projectId: "silly-socks-7a9e6",
	storageBucket: "silly-socks-7a9e6.appspot.com",
	messagingSenderId: "833185796892",
	appId: "1:833185796892:web:8ea370d85e087fc77d60d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);
