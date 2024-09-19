import { sendSignal, database } from './firebase.js'; // Ensure this import is correct

let localStream;
let remoteStream;
let peerConnection;

const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const callModal = document.getElementById('callModal');
const acceptCallButton = document.getElementById('acceptCall');
const rejectCallButton = document.getElementById('rejectCall');

// Firebase signaling listener
database.ref('signals').on('child_added', (snapshot) => {
    const signal = snapshot.val();
    handleSignal(signal); // Process the incoming signal
});

startCallButton.onclick = startCall;
endCallButton.onclick = endCall;
acceptCallButton.onclick = acceptCall;
rejectCallButton.onclick = rejectCall;

async function startCall() {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    // Initialize peer connection
    peerConnection = new RTCPeerConnection();
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    // Send call invitation
    sendSignal({ type: 'call' });
}

function endCall() {
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
}

function acceptCall() {
    callModal.style.display = 'none';
    startCall();
}

function rejectCall() {
    callModal.style.display = 'none';
}

function handleSignal(signal) {
    if (signal.type === 'call') {
        // Show call invitation modal
        callModal.style.display = 'flex';
    } else if (signal.type === 'offer') {
        // Handle offer
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

// Add ICE candidate handling
peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        sendSignal({ candidate: event.candidate }); // Send ICE candidate to remote peer
    }
};