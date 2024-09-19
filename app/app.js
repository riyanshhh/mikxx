// Initialize Firebase
// ... existing Firebase initialization code ...

// Google and Facebook Auth Providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

// Login Function
document.getElementById('login-button').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            // Show video call UI
            document.getElementById('video-call-container').style.display = 'block';
        })
        .catch(error => console.error(error));
});

// Google Login
document.getElementById('google-login').addEventListener('click', () => {
    firebase.auth().signInWithPopup(googleProvider)
        .then(() => {
            // Show video call UI
            document.getElementById('video-call-container').style.display = 'block';
        })
        .catch(error => console.error(error));
});

// Facebook Login
document.getElementById('facebook-login').addEventListener('click', () => {
    firebase.auth().signInWithPopup(facebookProvider)
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
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            // Show video call UI
            document.getElementById('video-call-container').style.display = 'block';
        })
        .catch(error => console.error(error));
});