import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// Seleção dos elementos do player e botão
const musicaBotao = document.getElementById('musica-botao'); // Botão de abrir player
const playerContainer = document.querySelector('.player__container');
const discoArea = document.querySelector('.disco__area');
const musicaPlayer = document.getElementById('musica-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');

// Seleção de elementos adicionais para o modal (se necessário)
const abrirBtn = document.getElementById('abrir-btn'); // Defina o ID correto do botão
const modal = document.getElementById('modal'); // Defina o ID correto do modal
const video = document.getElementById('video'); // Defina o ID correto do vídeo

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

// Função para abrir o player e tocar a música
function abrirPlayer() {
  // Exibir o player com animação de crescimento
  playerContainer.classList.add('aberto');
  document.body.classList.add('embacado');  // Ativar o efeito de fundo embaçado
  musicaPlayer.play();

  // Iniciar a animação do disco girando
  discoArea.classList.add('girando');
  musicaBotao.style.display = 'none';  // Esconder o botão "A nossa Música"
}

// Controlar Play/Pause
function togglePlayPause() {
  if (musicaPlayer.paused) {
      musicaPlayer.play();
      playPauseBtn.textContent = 'Pause'; // Alterar texto para Pause
      discoArea.classList.add('girando'); // Iniciar a animação do disco
  } else {
      musicaPlayer.pause();
      playPauseBtn.textContent = 'Play'; // Alterar texto para Play
      discoArea.classList.remove('girando'); // Parar a animação do disco
  }
}

// Atualizar o progresso da música
function updateProgress() {
  const progress = (musicaPlayer.currentTime / musicaPlayer.duration) * 100;
  progressBar.value = progress;
}

// Controlar o clique no botão para abrir o player
musicaBotao.addEventListener('click', abrirPlayer); // Ao clicar no botão "A nossa Música"
playPauseBtn.addEventListener('click', togglePlayPause);

// Atualizar o progresso da música a cada segundo
musicaPlayer.addEventListener('timeupdate', updateProgress);

// Atualizar o progresso quando a barra for clicada
progressBar.addEventListener('input', () => {
  const progress = progressBar.value / 100;
  musicaPlayer.currentTime = progress * musicaPlayer.duration;
});

// Garantir que o player está escondido inicialmente
window.onload = () => {
  playerContainer.classList.remove('aberto');  // Inicialmente escondido
  document.body.classList.remove('embacado');  // Fundo não embaçado
  musicaPlayer.pause(); // Não tocar música automaticamente
};

// Fechar o player quando clicar fora da área do player
document.addEventListener('click', function(event) {
  if (!playerContainer.contains(event.target) && !musicaBotao.contains(event.target)) {
      // Fechar o player e voltar ao botão
      playerContainer.classList.remove('aberto');
      document.body.classList.remove('embacado');  // Remover o efeito de fundo embaçado
      musicaPlayer.pause();
      discoArea.classList.remove('girando');
      musicaBotao.style.display = 'block';  // Mostrar o botão "A nossa Música"
  }
});

// Adicionando funcionalidade do botão "abrir-btn" e "modal"
if (abrirBtn && modal) {
  abrirBtn.addEventListener('click', () => {
    modal.classList.add('mostrar');
    video.currentTime = 0;
    video.play();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('mostrar');
        video.pause();
    }
  });
}
