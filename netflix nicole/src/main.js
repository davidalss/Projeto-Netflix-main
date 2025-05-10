document.addEventListener('DOMContentLoaded', () => {
  const musicaBotao = document.getElementById('musica-botao');
  const playerContainer = document.querySelector('.player__container');
  const discoArea = document.querySelector('.disco__area');
  const musicaPlayer = document.getElementById('musica-player');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const progressBar = document.getElementById('progress-bar');
  const body = document.body;

  // Function to open the player
  function abrirPlayer() {
    playerContainer.classList.add('aberto'); // Show the player
    body.classList.add('embacado'); // Add the "embacado" class to blur/darken the background
    musicaPlayer.play(); // Start playing the music
    discoArea.classList.add('girando'); // Add spinning effect to the disc
    musicaBotao.style.display = 'none'; // Hide the button
  }

  // Function to toggle play/pause
  function togglePlayPause() {
    if (musicaPlayer.paused) {
      musicaPlayer.play();
      playPauseBtn.textContent = 'Pause';
      discoArea.classList.add('girando'); // Resume spinning
    } else {
      musicaPlayer.pause();
      playPauseBtn.textContent = 'Play';
      discoArea.classList.remove('girando'); // Stop spinning
    }
  }

  // Update the progress bar
  function updateProgress() {
    const progress = (musicaPlayer.currentTime / musicaPlayer.duration) * 100;
    progressBar.value = progress;
  }

  // Seek music when progress bar is adjusted
  progressBar.addEventListener('input', () => {
    const progress = progressBar.value / 100;
    musicaPlayer.currentTime = progress * musicaPlayer.duration;
  });

  // Close the player when clicking outside
  document.addEventListener('click', (event) => {
    if (
      playerContainer.classList.contains('aberto') &&
      !playerContainer.contains(event.target) &&
      event.target !== musicaBotao
    ) {
      playerContainer.classList.remove('aberto'); // Hide the player
      body.classList.remove('embacado'); // Remove the blur/dark effect
      musicaPlayer.pause(); // Pause the music
      discoArea.classList.remove('girando'); // Stop spinning effect
      musicaBotao.style.display = 'block'; // Show the button
    }
  });

  // Event listeners
  if (musicaBotao) {
    musicaBotao.addEventListener('click', abrirPlayer);
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  if (musicaPlayer) {
    musicaPlayer.addEventListener('timeupdate', updateProgress);
  }

  const videoModal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const fecharVideo = document.querySelector('.fechar-video');
  const videoItems = document.querySelectorAll('.container__video');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const videoControls = document.querySelector('.video-controls');

  let hideControlsTimeout;

  // Function to show video controls
  function showControls() {
    videoControls.style.opacity = '1';
    videoControls.style.pointerEvents = 'auto';
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(hideControls, 10000); // Hide controls after 10 seconds
  }

  // Function to hide video controls
  function hideControls() {
    videoControls.style.opacity = '0';
    videoControls.style.pointerEvents = 'none';
  }

  // Add event listeners to reset the timer when interacting with the player
  videoModal.addEventListener('mousemove', showControls);
  videoModal.addEventListener('click', showControls);

  // Open video modal
  videoItems.forEach(item => {
    item.addEventListener('click', () => {
      const videoSrc = item.getAttribute('data-video-src');
      const videoContainer = videoModal.querySelector('.video-container');

      if (videoSrc.includes('vimeo.com')) {
        // Handle Vimeo videos
        const iframe = document.createElement('iframe');
        iframe.src = videoSrc;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        videoPlayer.style.display = 'none'; // Hide the default video player
        videoContainer.appendChild(iframe);
      } else {
        // Handle regular videos
        videoPlayer.querySelector('source').src = videoSrc;
        videoPlayer.load();
        videoPlayer.play();
        videoPlayer.style.display = 'block'; // Show the default video player
      }
      videoModal.classList.add('active');
      showControls(); // Show controls when the modal opens
    });
  });

  // Close video modal
  fecharVideo.addEventListener('click', () => {
    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;

    // Remove any iframes (for Vimeo videos)
    const iframe = videoModal.querySelector('iframe');
    if (iframe) {
      iframe.remove();
    }
    clearTimeout(hideControlsTimeout); // Clear the timeout when closing the modal
  });

  // Close modal when clicking outside the video
  videoModal.addEventListener('click', (e) => {
    if (!e.target.closest('.video-container')) {
      videoModal.classList.remove('active');
      videoPlayer.pause();
      videoPlayer.currentTime = 0;

      // Remove any iframes (for Vimeo videos)
      const iframe = videoModal.querySelector('iframe');
      if (iframe) {
        iframe.remove();
      }
      clearTimeout(hideControlsTimeout); // Clear the timeout when closing the modal
    }
  });

  // Fullscreen functionality
  fullscreenBtn.addEventListener('click', () => {
    const videoContainer = videoModal.querySelector('.video-container');
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
      videoContainer.msRequestFullscreen();
    }
  });

  const abrirVideoBtn = document.getElementById('abrir-video');

  // Open video modal
  abrirVideoBtn.addEventListener('click', () => {
    const videoSrc = "https://res.cloudinary.com/dkwsfkdkk/video/upload/v1746843263/RITMO_PERIGOSO_dzzkta.mp4"; // Example video source
    videoPlayer.querySelector('source').src = videoSrc;
    videoPlayer.load();
    videoPlayer.play();
    videoModal.classList.add('active');
  });

  // Close video modal
  fecharVideo.addEventListener('click', () => {
    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  });

  // Close modal when clicking outside the video
  videoModal.addEventListener('click', (e) => {
    if (!e.target.closest('.video-container')) {
      videoModal.classList.remove('active');
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  });

  const currentTimeDisplay = document.getElementById('current-time');
  const durationDisplay = document.getElementById('duration');

  // Play/Pause functionality
  playPauseBtn.addEventListener('click', () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      videoPlayer.pause();
      playPauseBtn.textContent = 'Play';
    }
  });

  // Update progress bar and time
  videoPlayer.addEventListener('timeupdate', () => {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.value = progress;

    // Update time displays
    const currentMinutes = Math.floor(videoPlayer.currentTime / 60);
    const currentSeconds = Math.floor(videoPlayer.currentTime % 60);
    const durationMinutes = Math.floor(videoPlayer.duration / 60);
    const durationSeconds = Math.floor(videoPlayer.duration % 60);

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    durationDisplay.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
  });

  // Seek functionality
  progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = seekTime;
  });

  const carousels = [
    { left: 'btn-left-assistir', right: 'btn-right-assistir', list: 'assistir-novamente' },
    { left: 'btn-left-lista', right: 'btn-right-lista', list: 'minha-lista' },
    { left: 'btn-left-filmes', right: 'btn-right-filmes', list: 'todos-os-filmes' },
  ];

  carousels.forEach(({ left, right, list }) => {
    const leftBtn = document.getElementById(left);
    const rightBtn = document.getElementById(right);
    const listElement = document.getElementById(list);

    leftBtn.addEventListener('click', () => {
      listElement.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      listElement.scrollBy({ left: 300, behavior: 'smooth' });
    });
  });
});
