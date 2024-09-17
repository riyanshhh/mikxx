// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhz3wB1uNVEpln-nfZ3XMNLu4NMhZ_Xx0",
  authDomain: "mikxx-193ec.firebaseapp.com",
  databaseURL: "https://mikxx-193ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mikxx-193ec",
  storageBucket: "mikxx-193ec.appspot.com",
  messagingSenderId: "928424108366",
  appId: "1:928424108366:web:3d1755ae4221a74d673e1f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore(); // Make sure this line is present

// For better security, consider using environment variables or a secure configuration management system