import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, googleProvider, facebookProvider, signInWithPopup } from './firebase.js';

// Initialize variables
let localStream;
let remoteStream;
let peerConnection;
const signalingServer = {}; // Mock signaling server

// Handle login/signup
document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('video-call-container').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
};

document.getElementById('signup-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
    } catch (error) {
        alert(error.message);
    }
};

// Google login
document.getElementById('google-login').onclick = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        alert("Google login successful!");
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('video-call-container').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
};

// Facebook login
document.getElementById('facebook-login').onclick = async () => {
    try {
        await signInWithPopup(auth, facebookProvider);
        alert("Facebook login successful!");
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('video-call-container').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
};

// Start video call
document.getElementById('startCall').onclick = async () => {
    // Get user media
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('localVideo').srcObject = localStream;

    // Setup WebRTC connection
    peerConnection = new RTCPeerConnection();
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Handle remote stream
    peerConnection.ontrack = (event) => {
        remoteStream = event.streams[0];
        document.getElementById('remoteVideo').srcObject = remoteStream;
    };

    // Create offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    // Send offer to the remote peer (mock signaling)
    signalingServer.send({ type: 'offer', offer });
};

// Mock signaling server handling
signalingServer.send = async (message) => {
    // Simulate sending the message to the remote peer
    console.log("Sending message:", message);
    // Here you would implement actual signaling logic
};

// Implement receiving signaling messages
const receiveSignalingMessage = async (message) => {
    if (message.type === 'offer') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        signalingServer.send({ type: 'answer', answer });
    } else if (message.type === 'answer') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer));
    }
};

// Example of receiving a message (mock)
setTimeout(() => {
    receiveSignalingMessage({ type: 'offer', offer: {} }); // Replace with actual offer
}, 5000);