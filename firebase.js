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
    if (signal.type === 'offer') {
        // Handle the offer
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal.offer))
            .then(() => {
                return peerConnection.createAnswer(); // Create an answer
            })
            .then(answer => {
                return peerConnection.setLocalDescription(answer); // Set the local description
            })
            .then(() => {
                sendSignal({ type: 'answer', answer: peerConnection.localDescription }); // Send the answer
            })
            .catch(error => {
                console.error("Error handling offer:", error);
            });
    } else if (signal.type === 'answer') {
        // Handle the answer
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal.answer))
            .catch(error => {
                console.error("Error setting remote description for answer:", error);
            });
    } else if (signal.candidate) {
        // Handle ICE candidate
        peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate))
            .catch(error => {
                console.error("Error adding ICE candidate:", error);
            });
    }
}

// Export the database variable
export { database }; // Ensure this line is present