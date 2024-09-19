// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

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
export { database }; // Add this line to export the database variable