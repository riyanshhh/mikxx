let localStream;
let remoteStream;
let peerConnection;

const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

startCallButton.onclick = startCall;
endCallButton.onclick = endCall;

async function startCall() {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    // Initialize peer connection
    peerConnection = new RTCPeerConnection();
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    // Create offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    // Send offer to remote peer
    sendSignal({ type: 'offer', offer: offer });
}

function endCall() {
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
}

function handleSignal(signal) {
    if (signal.type === 'offer') {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal.offer));
        peerConnection.createAnswer().then(answer => {
            peerConnection.setLocalDescription(answer);
            sendSignal({ type: 'answer', answer: answer });
        });
    } else if (signal.type === 'answer') {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal.answer));
    } else if (signal.candidate) {
        peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
    }
}

// Add ICE candidate handling
peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        sendSignal({ candidate: event.candidate });
    }
};

// Implement signaling logic (e.g., using Firebase)