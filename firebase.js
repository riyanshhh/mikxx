// Import the Firebase modules that you need in your app
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhz3wB1uNVEpln-nfZ3XMNLu4NMhZ_Xx0",
    authDomain: "mikxx-193ec.firebaseapp.com",
    databaseURL: "https://mikxx-193ec-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mikxx-193ec",
    storageBucket: "mikxx-193ec.appspot.com",
    messagingSenderId: "928424108366",
    appId: "1:928424108366:web:3d1755ae4221a74d673e1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export the auth object for use in other files
export { auth };