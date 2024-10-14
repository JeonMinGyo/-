const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const startButton = document.getElementById('start-btn');
const timerDisplay = document.getElementById('time-left');
const rulesModal = document.getElementById('rules-modal');
const closeRulesButton = document.getElementById('close-rules-btn');
const gameOverModal = document.getElementById('game-over-modal');
const restartButton = document.getElementById('restart-btn');
const finalScoreDisplay = document.getElementById('final-score');

let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
let gameInterval;
let countdownInterval;
let speed = 800;
let timeLeft = 30;
let balloonSpeed = 4;

bestScoreDisplay.textContent = bestScore;

const balloons = [
  'images/balloon1.png',
  'images/balloon2.png',
  'images/balloon3.png',
  'images/balloon4.png'
];

const bombImage = 'images/bomb.png';

function createObject() {
  const isBomb = Math.random() < 0.2;
  const object = document.createElement('img');
  object.src = isBomb ? bombImage : balloons[Math.floor(Math.random() * balloons.length)];
  object.classList.add(isBomb ? 'bomb' : 'balloon');
  object.style.left = `${Math.random() * (gameArea.clientWidth - 60)}px`;
  object.style.animationDuration = `${balloonSpeed}s`;

  gameArea.appendChild(object);

  object.addEventListener('animationend', () => object.remove());
  object.addEventListener('click', () => {
    score += isBomb ? -5 : 10;
    scoreDisplay.textContent = score;
    object.style.transform = 'scale(0)';
    object.style.opacity = '0';
    setTimeout(() => object.remove(), 200);
  });
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;

  if (timeLeft === 0) endGame();
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  gameArea.innerHTML = ''; // 초기화
  gameOverModal.style.display = 'none';

  gameInterval = setInterval(createObject, speed);
  countdownInterval = setInterval(updateTimer, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(countdownInterval);
  finalScoreDisplay.textContent = score;
  gameOverModal.style.display = 'flex';

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
    bestScoreDisplay.textContent = bestScore;
  }
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
closeRulesButton.addEventListener('click', () => rulesModal.style.display = 'none');
window.onload = () => rulesModal.style.display = 'flex';
