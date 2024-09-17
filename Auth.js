const auth = firebase.auth();

// Login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'home.html'; // Redirect to home page
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Save user data to Firestore
            return db.collection('users').doc(user.uid).set({
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert('User signed up and data saved!');
            window.location.href = 'home.html'; // Redirect to home page
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});

// Google login
document.getElementById('googleLogin').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Save user data to Firestore
            return db.collection('users').doc(user.uid).set({
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        })
        .then(() => {
            window.location.href = 'home.html'; // Redirect to home page
        })
        .catch((error) => {
            console.error('Google login error', error);
        });
});

// Facebook login
document.getElementById('facebookLogin').addEventListener('click', () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Save user data to Firestore
            return db.collection('users').doc(user.uid).set({
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        })
        .then(() => {
            window.location.href = 'home.html'; // Redirect to home page
        })
        .catch((error) => {
            console.error('Facebook login error', error);
        });
});

// Logout
document.getElementById('logoutButton').addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Logout error', error);
        });
});

// Auth state change listener
auth.onAuthStateChanged((user) => {
    const userInfo = document.getElementById('userInfo');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const googleLogin = document.getElementById('googleLogin');
    const facebookLogin = document.getElementById('facebookLogin');

    if (user) {
        console.log('User is signed in', user);
        document.getElementById('userName').textContent = user.displayName || user.email;
        userInfo.style.display = 'block';
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        googleLogin.style.display = 'none';
        facebookLogin.style.display = 'none';
    } else {
        console.log('No user is signed in');
        userInfo.style.display = 'none';
        loginForm.style.display = 'block';
        signupForm.style.display = 'block';
        googleLogin.style.display = 'block';
        facebookLogin.style.display = 'block';
    }
});