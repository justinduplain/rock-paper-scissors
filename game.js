// Rock Paper Scissors game, human vs. computer, First to 5 (best of 5?) wins.

// gameplay data objects
import { avatars, userPlayer, compPlayer, gameData } from './components/gameObjects.js';
import { gamePlayUI, historyCols } from "./components/uiObjects.js"

// constants for use in gameplay
const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

// for use in resetting the game board
const startButton = document.querySelector("#start-button");


// game play UI happens here
const gameBoard = document.querySelector("#app");

// variables for plays results
let compPlay;
let userPlay;
let roundResult;

// adds a listener to UI so user can start a new game
const addStartListener = function(){
  startButton.addEventListener('click', startGame);
}

const addPlayListeners = function(){
  const rockSubmit = document.querySelector("#rockSubmit");
  const paperSubmit = document.querySelector("#paperSubmit");
  const scissorsSubmit = document.querySelector("#scissorsSubmit");

  rockSubmit.addEventListener('click', playRock);
  paperSubmit.addEventListener('click', playPaper);
  scissorsSubmit.addEventListener('click', playScissors);
};

// if a player wins, the winner argument is passed from checkWin, the user is notified in the UI and is given the option to start a new game. 
function gameWinner(){
  let playInput = document.querySelector('#play-input');
  let roundNumber = document.querySelector('#round-number');
  roundNumber.innerHTML = '<h4>Game Winner!</h4>';
  playInput.innerHTML = '<h2>Winner</h2>';
  if(userPlayer.lastPoint === 1) {
    roundNumber.innerHTML = ('<h4>You win the game, good job!</h4>');
    //  <h5>Play again?</h5>
    // <button id="start-button">Play Again</button>
    // addStartListener();
  } else {
    roundNumber.innerHTML = 
    '<h4>You lost the game, sorry.</h4>'
    //  <h5>Play again?</h5>
    // <button id="start-button">Play Again</button>
    // addStartListener();
  }
};

//play-input

const updatePlayCounts = function() {
  document.querySelector('#compRockCount').innerText = compPlayer.rockCount;
  document.querySelector('#compPaperCount').innerText = compPlayer.paperCount;
  document.querySelector('#compScissorsCount').innerText = compPlayer.scissorsCount;
  document.querySelector('#userRockCount').innerText = userPlayer.rockCount;
  document.querySelector('#userPaperCount').innerText = userPlayer.paperCount;
  document.querySelector('#userScissorsCount').innerText = userPlayer.scissorsCount;
}

// Displays the result of the round
// If a player gets to five points: 
  // Declares a winner
  // Gives the option to play again
function checkWin(userScore, compScore) {
  console.log('user score:', userScore + ',', 'comp score:', compScore + '.');
  if(userScore == 5) {
    console.log('user won the game.');
    gameWinner();
    return;
  }
  if(compScore == 5) {
    console.log('comp won the game.');
    gameWinner();
    return;
  }
}

//win(), loss(), tie() functions update appropriate scores and updates the scoreboard
function loss(userPlay, compPlay) {
  roundResult = 'Comp won. Shoot again.';
  userPlayer.updatePlayerScore(0, userPlay);
  compPlayer.updatePlayerScore(1, compPlay);
  document.querySelector('#comp-score').innerText = compPlayer.score;
  document.querySelector('#user-score').innerText = userPlayer.score;
  checkWin(userPlayer.score, compPlayer.score);
}

function win(userPlay, compPlay) {
  roundResult = 'You won! Shoot again.';
  userPlayer.updatePlayerScore(1, userPlay);
  compPlayer.updatePlayerScore(0, compPlay);
  document.querySelector('#user-score').innerText = userPlayer.score;
  checkWin(userPlayer.score, compPlayer.score);
}

function tie(userPlay, compPlay) {
  userPlayer.updatePlayerScore(0, userPlay);
  compPlayer.updatePlayerScore(0, compPlay);
  roundResult = `both played ${compPlay}.`
  console.log(roundResult);
}

//switch function to determine win or loss, runs appropriate win(), loss(), tie() functions.
function updateScore(userLastPlay, compLastPlay){
  let scoreCase = userLastPlay + compLastPlay;
  switch(scoreCase) {
    case 'rockpaper': 
      loss(userLastPlay, compLastPlay);
      break;
    case 'rockscissors': 
      win(userLastPlay, compLastPlay);
      break;
    case 'paperrock':
      win(userLastPlay, compLastPlay);
      break;
    case 'paperscissors':
      loss(userLastPlay, compLastPlay);
      break;
    case 'scissorsrock':
      loss(userLastPlay, compLastPlay);
      break;
    case 'scissorspaper':
      win(userLastPlay, compLastPlay);
      break;
    default: 
      tie(userLastPlay, compLastPlay);
  }
  updatePlayCounts();
}

//updates the UI with player selections
function playNotice(userLastPlay, compLastPlay){
  console.log('User plays', userLastPlay);
  console.log('Comp plays', compLastPlay);
}

const updateHistory = function(round) {
  let gameHistory = document.querySelector('#game-history');
  let historyRow = document.createElement('div');
  historyRow.classList = 'history-view row row-cols-11 justify-content-center';
  historyRow.innerHTML = historyCols;
  let userDisk = historyRow.querySelector('.user-disk');
  let usrPrevPlay = historyRow.querySelector('.user-play');
  let prevRound = historyRow.querySelector('.history-round');
  let cmpPrevPlay = historyRow.querySelector('.comp-play');
  let compDisk = historyRow.querySelector('.comp-disk');
  if (userPlayer.lastPoint === 1) {
    userDisk.innerHTML = `&#128994;`;
  } 
  if (compPlayer.lastPoint === 1) {
    compDisk.innerHTML = `&#128308;`;
  }
  switch(userPlayer.lastPlay) {
    case 'rock':
      usrPrevPlay.innerHTML = 
        '<img src="img/rock.png" alt="rock">';
      break;
    case 'paper':
      usrPrevPlay.innerHTML = 
        '<img src="img/paper.png" alt="paper">';
      break;
    case 'scissors':
      usrPrevPlay.innerHTML = 
          '<img src="img/scissors.png" alt="scissors">';
      break;
  } 
  prevRound.innerText = (round.toString()).padStart(2, '0');
  switch(compPlayer.lastPlay) {
    case 'rock':
      cmpPrevPlay.innerHTML = 
        '<img src="img/rock.png" alt="rock">';
      break;
    case 'paper':
      cmpPrevPlay.innerHTML = 
        '<img src="img/paper.png" alt="paper">';
      break;
    case 'scissors':
      cmpPrevPlay.innerHTML = 
          '<img src="img/scissors.png" alt="scissors">';
      break;
  } 
  gameHistory.prepend(historyRow);
}

//randomizes the computer play and updates that variable
function compShoot(){
  let rand = Math.floor(Math.random() * 3 );
  switch(rand) {
    case 0: 
      compPlay = rock;
      break;
    case 1: 
      compPlay = paper;
      break;
    case 2:
      compPlay = scissors;
      break;
  }
}

//runs functions for one round of play
function playRound(play) {
  userPlay = play;
  userPlayer.lastPlay = play;
  compShoot();
  compPlayer.lastPlay = compPlay;
  console.log('round ' + (gameData.round) + ':');
  gameData.updateRound();
  document.querySelector('#round-number').innerText = 'Round: ' + gameData.round;
  playNotice(userPlayer.lastPlay, compPlayer.lastPlay);
  updateScore(userPlayer.lastPlay, compPlayer.lastPlay);
  updateHistory((gameData.round-1));
};

// playRock, playPaper, and playScissors runs the round with the selected variable
function playRock() {
  playRound(rock);
}
function playPaper() {
  playRound(paper);
}
function playScissors() {
  playRound(scissors);
}

function initPlayers(){
  //initializes player scores
  compPlayer.init(0);
  userPlayer.init(0);
}

// sets the board for a new game
function startGame() {
  //initializes player objects in gameObjects.js
  initPlayers();
  //sets user interface
  gameBoard.innerHTML = gamePlayUI;
  addPlayListeners();
  startButton.innerText = 'Restart Game';
  gameData.round = 1;
  console. clear()
};

//loads avatars for selection
let displayAvatars = (avatars) => {
  let avatarRow = document.createElement('div');
  avatarRow.classList = 'row';
  avatarRow.id = 'avatarRow';
  let addAvatarItem = function(element) {
    let avatarItem = document.createElement('div');
    avatarItem.classList = 'col-sm-2 col-md-2 col-lg-2 avatar-item';
    avatarItem.id = element;
    avatarItem.innerHTML = `
    <img class="img-fluid avatar-img" src="img/char/${element}.png" alt="${element} face emoji">`
    avatarRow.append(avatarItem);
  }
  avatars.forEach(addAvatarItem);
  gameBoard.append(avatarRow);
}

// get the avatar options onto the page
displayAvatars(avatars);

// listen for hover on avatar images


// watch for start button to be clicked
addStartListener();
