import { auth } from './firebase.js'; // Ensure this path is correct
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Google and Facebook Auth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Login Function
document.getElementById('login-button').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Show video call UI
            document.getElementById('video-call-container').style.display = 'block';
        })
        .catch(error => console.error(error));
});

// Google Login
document.getElementById('google-login').addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
        .then(() => {
            // Show video call UI
            document.getElementById('video-call-container').style.display = 'block';
        })
        .catch(error => console.error(error));
});

// Facebook Login
document.getElementById('facebook-login').addEventListener('click', () => {
    signInWithPopup(auth, facebookProvider)
        .then(() => {
            // Show video call UI
            document.getElementById('video-call-container').style.display = 'block';
        })
        .catch(error => console.error(error));
});

// Signup Function
document.getElementById('signup-button').addEventListener('click', () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Show video call UI
            document.getElementById('video-call-container').style.display = 'block';
        })
        .catch(error => console.error(error));
});