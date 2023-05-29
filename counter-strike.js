// counter-strike.js

// Obțineți referințele elementelor HTML cu care doriți să interacționați
const aboutLink = document.querySelector('.container ul li:nth-child(1) a');
const galleryLink = document.querySelector('.container ul li:nth-child(2) a');
const newsLink = document.querySelector('.container ul li:nth-child(3) a');
const videoFrames = document.querySelectorAll('.videos iframe');

// Adăugați un eveniment de clic pentru link-ul "About"

  aboutLink.onclick = function() {

    window.open('https://en.wikipedia.org/wiki/Counter-Strike', '_blank');
  };

galleryLink.addEventListener('click', (event) => {
  event.preventDefault();
  const confirmation = confirm('Do you want to open the Tournaments Gallery?');
  if (confirmation) {
    window.location.href = 'tournamentscs.html';
  }
});

// Adăugați un eveniment de clic pentru link-ul "News"
newsLink.addEventListener('click', (event) => {
  window.open('https://www.hltv.org', '_blank');
});

document.addEventListener('keydown', handleKeyDown);

let selectedVideo = null;

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    const videos = document.querySelectorAll('.responsive-iframe');
    if (videos.length > 0) {
      if (selectedVideo) {
        selectedVideo.src = selectedVideo.src; // Restart selected video
      }
    }
  } else if (event.key === ' ') {
    if (selectedVideo) {
      if (selectedVideo.paused) {
        selectedVideo.play();
      } else {
        selectedVideo.pause();
      }
    }
  }
}

document.querySelectorAll('.responsive-iframe').forEach(video => {
  video.addEventListener('mouseenter', () => {
    selectedVideo = video;
    video.play();
  });

  video.addEventListener('mouseleave', () => {
    selectedVideo = null;
    video.pause();
  });
});

