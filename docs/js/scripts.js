const pointsUserElement = document.getElementById('points-user');
const pointsPcElement = document.getElementById('points-pc');

const mainElement = document.getElementById('main');

const firstStepElement = document.getElementById('first-step');
const secondStepElement = document.getElementById('second-step');

const gameResultElement = document.getElementById('game-result');

const playAgainElement = document.getElementById('play-again');

const GAME_MODE = document.body.dataset.gameMode;
const GAME_OPTIONS = ['rock', 'scissors', 'paper'];

const GAME_RULES = {
  rock: {
    paper: false,
    scissors: true,
    lizard: true,
    spock: false
  },
  scissors: {
    rock: false,
    paper: true,
    lizard: true,
    spock: false
  },
  paper: {
    rock: true,
    scissors: false,
    lizard: false,
    spock: true
  },
  lizard: {
    rock: false,
    paper: true,
    scissors: false,
    spock: true
  },
  spock: {
    rock: true,
    paper: false,
    scissors: true,
    lizard: false
  }
};

let currentScreen = 1;
let pointsUser = 0;
let pointsPc = 0;
let userIcon;
let pcIcon;

if (GAME_MODE === 'advanced') {
  GAME_OPTIONS.push('lizard', 'spock');
}

const resetGame = () => {
  userIcon.classList.remove('game-item--show');
  pcIcon.classList.remove('game-item--show');
};

const changeScreen = () => {
  if (currentScreen === 1) {
    currentScreen = 2;
    firstStepElement.classList.remove('first-step--show');
    secondStepElement.classList.add('second-step--show');
  } else {
    currentScreen = 1;
    firstStepElement.classList.add('first-step--show');
    secondStepElement.classList.remove('second-step--show');
  }
};

const updateScore = () => {
  pointsPcElement.textContent = pointsPc;
  pointsUserElement.textContent = pointsUser;
};

const checkWinner = (userPlay, pcPlay) => {
  if (userPlay === undefined || pcPlay === undefined) {
    console.log('ERROR');
    return;
  }

  if (userPlay === pcPlay) {
    gameResultElement.textContent = 'DRAW';
    return;
  }

  if (GAME_RULES[userPlay][pcPlay]) {
    gameResultElement.textContent = 'YOU WIN';
    pointsUser++;
  } else {
    pointsPc++;
    gameResultElement.textContent = 'YOU LOSE';
  }

  updateScore();
};

const optionsSelection = userSelection => {
  const pcSelection = selectPcElement();
  userIcon = document.getElementById(`${userSelection}-user`);
  pcIcon = document.getElementById(`${pcSelection}-pc`);
  userIcon.classList.add('game-item--show');
  pcIcon.classList.add('game-item--show');
  checkWinner(userSelection, pcSelection);
};

const selectPcElement = () => {
  const result = Math.floor(Math.random() * (GAME_OPTIONS.length - 1));
  return GAME_OPTIONS[result];
};

firstStepElement.addEventListener('click', ev => {
  if (ev.target.classList.contains('game-item__image')) {
    changeScreen();
    optionsSelection(ev.target.dataset.element);
  }
});

playAgainElement.addEventListener('click', () => {
  changeScreen();
  resetGame();
});
