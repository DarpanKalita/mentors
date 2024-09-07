const localVideo = document.getElementById('localVideo');
const toggleVideoBtn = document.getElementById('toggleVideo');
const videoIcon = document.getElementById('videoIcon');
const toggleAudioBtn = document.getElementById('toggleAudio');
const audioIcon = document.getElementById('audioIcon');

let localStream;

// Get user's video and audio
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localVideo.srcObject = stream;
    localStream = stream;
  })
  .catch(error => console.error('Error accessing media devices.', error));

// Toggle Video
toggleVideoBtn.addEventListener('click', () => {
  const videoTrack = localStream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;

  // Toggle icon appearance
  if (videoTrack.enabled) {
    videoIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 2h6a2 2 0 002-2V10a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
    `;
    toggleVideoBtn.classList.remove('bg-red-500');
    toggleVideoBtn.classList.add('bg-blue-500');
  } else {
    videoIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.58 6.469A2 2 0 019 7v4m-3.42 3.531L15 10m0 0V8a2 2 0 012-2h1.618A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4L9 19.031M5 7l14 14" />
    `;
    toggleVideoBtn.classList.remove('bg-blue-500');
    toggleVideoBtn.classList.add('bg-red-500');
  }
});

// Toggle Audio
toggleAudioBtn.addEventListener('click', () => {
  const audioTrack = localStream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;

  // Toggle icon appearance
  if (audioTrack.enabled) {
    audioIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14a2 2 0 002-2V7a2 2 0 00-2-2 2 2 0 00-2 2v5a2 2 0 002 2zM12 20v-2m0 0H8a4 4 0 01-4-4V9a4 4 0 014-4h8a4 4 0 014 4v5a4 4 0 01-4 4h-4z" />
    `;
    toggleAudioBtn.classList.remove('bg-red-500');
    toggleAudioBtn.classList.add('bg-green-500');
  } else {
    audioIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14a2 2 0 002-2V7a2 2 0 00-2-2 2 2 0 00-2 2v5a2 2 0 002 2zM12 20v-2m0 0H8a4 4 0 01-4-4V9a4 4 0 014-4h8a4 4 0 014 4v5a4 4 0 01-4 4h-4z" />
    `;
    toggleAudioBtn.classList.remove('bg-green-500');
    toggleAudioBtn.classList.add('bg-red-500');
  }
});
