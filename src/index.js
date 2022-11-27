import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


initializeApp({
	apiKey: "AIzaSyBsAQDjYPlr8sXpBIQjR3mdSlD8y-VlN08",
	authDomain: "chat-react-9da14.firebaseapp.com",
	projectId: "chat-react-9da14",
	storageBucket: "chat-react-9da14.appspot.com",
	messagingSenderId: "839570124626",
	appId: "1:839570124626:web:8725baf4b4bd679d42948b"
});

export const Context = createContext(null);

const auth = getAuth();
auth.languageCode = 'ru';
const firestore = getFirestore();
const provider = new GoogleAuthProvider();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Context.Provider value={{
		signInWithPopup, provider, auth, firestore
	}}
	>
		<App />
	</Context.Provider>
);
