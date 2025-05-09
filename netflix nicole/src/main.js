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
    playerContainer.classList.add('aberto'); // Add the "aberto" class to make the player visible
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
    } else {
      musicaPlayer.pause();
      playPauseBtn.textContent = 'Play';
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
});
