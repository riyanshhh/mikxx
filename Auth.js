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
    const username = document.getElementById('signupUsername').value; // Get username
    const bio = document.getElementById('signupBio').value; // Get bio
    const profilePicture = document.getElementById('signupProfilePicture').value; // Get profile picture URL

    // Check if username is already taken
    db.collection('users').doc(username).get()
        .then((doc) => {
            if (doc.exists) {
                alert('Username is already taken. Please choose another one.');
            } else {
                // Proceed with signup
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        // Save user data to Firestore using username as the document ID
                        return db.collection('users').doc(username).set({
                            email: user.email,
                            username: username,
                            bio: bio,
                            profilePicture: profilePicture,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp() // Add createdAt timestamp
                        });
                    })
                    .then(() => {
                        alert('User signed up and data saved!');
                        window.location.href = 'home.html'; // Redirect to home page
                    })
                    .catch((error) => {
                        alert('Error: ' + error.message);
                    });
            }
        })
        .catch((error) => {
            alert('Error checking username: ' + error.message);
        });
});

// Google login
document.getElementById('googleLogin').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Check if user data exists in Firestore
            return db.collection('users').doc(user.email).get().then((doc) => {
                if (!doc.exists) {
                    // Prompt for username if not set
                    const username = prompt('Please set a username:');
                    if (username) {
                        return db.collection('users').doc(user.email).set({
                            email: user.email,
                            username: username,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                }
            });
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
            // Check if user data exists in Firestore
            return db.collection('users').doc(user.email).get().then((doc) => {
                if (!doc.exists) {
                    // Prompt for username if not set
                    const username = prompt('Please set a username:');
                    if (username) {
                        return db.collection('users').doc(user.email).set({
                            email: user.email,
                            username: username,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                }
            });
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