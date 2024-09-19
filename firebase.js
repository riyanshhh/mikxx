// Initialize Firebase
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to send signaling data
export function sendSignal(signal) {
    console.log("Sending signal:", signal);
    database.ref('signals').push(signal);
}

// Listen for incoming signals
database.ref('signals').on('child_added', (snapshot) => {
    const signal = snapshot.val();
    handleSignal(signal);
});

// Function to handle incoming signals
function handleSignal(signal) {
    console.log("Received signal:", signal);
    // Handle the signal as before
}

// Export the database variable
export { database }; // Ensure this line is present