// Rock Paper Scissors game, human vs. computer, First to 5 (best of 5?) wins.

// player data objects
import playerObjectArray from "./components/data.js"

// creates player objects from the pulled data
let userPlayer = playerObjectArray.find(({id}) => id === 'user');
let compPlayer = playerObjectArray.find(({id}) => id === 'comp');

// constants for use in gameplay
const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

// for use in resetting the game board
const newGameHTML = `
<h3>Let's Go!</h3>
<p>It's you vs. the computer. First one to 5 wins!</p>
<div class="scoreboard" id="scorespace">
<table>
  <thead>
    <tr>
      <th colspan="2">Scoreboard</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>You</td>
      <td>Comp</td>
    </tr>
    <tr>
      <td id="user-score">0</td>
      <td id="comp-score">0</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
  </tbody>
  </table>
</div>
<div id="playspace">
  <div id="playHeadings">
    <h4>Rock, Paper, Scissors, Shoot!</h4>
  <div>
  <button id='rockSubmit'>Rock</button>
  <button id='paperSubmit'>Paper</button>
  <button id='scissorsSubmit'>Scissors</button>
  <p>
    <span id="user-play"></span>
    <span id="comp-play"></span>
  </p>
  <p id="round-result"></p>
</div>
`;

// game play UI happens here
const gameBoard = document.getElementById("app");

// variables for plays results
let compPlay;
let userPlay;
let roundResult;

// adds a listener to UI so user can start a new game
const addStartListener = function(){
  const startButton = document.querySelector("#start-button");
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

// if a player wins, the winner argument is passed from showRoundResult, the user is notified in the UI and is given the option to start a new game. 
function gameWinner(winner){
  const playHeadings = document.querySelector('#playHeadings');
  console.log(userPlayer);
  console.log(compPlayer);
  if (winner == 'user') {
    playHeadings.innerHTML = `
      <h4>You win the game, good job!</h4>
      <h5>Play again?</h5>
    <button id="start-button">Play Again</button>`
    addStartListener();
  } else {
    playHeadings.innerHTML = `
      <h4 syle="font-size: 2em;">You lost :(</h4>
      <h5>Sorry, the random number generator outsmarted you. Better luck next time, eh?</h5>
      <h5>Play again?</h5>
      <button id="start-button">Play Again</button>`
      addStartListener();
  }
};

// Displays the result of the round
// If a player gets to five points: 
  // Declares a winner
  // Gives the option to play again
function showRoundResult(result, userScore, compScore) {
  document.querySelector('#round-result').innerText = result;
  console.log('User score:', userScore + '.', 'Comp score:', compScore + '.');
  if(userScore == 5) {
    console.log('user won the game.');
    gameWinner('user');
    return;
  }

  if(compScore == 5) {
    console.log('comp won the game.');
    gameWinner('comp');
    return;
  }
}

//win(), loss(), tie() functions update appropriate scores and updates the scoreboard
function loss() {
  roundResult = 'Comp won. Shoot again.';
  compPlayer.updateScore();
  document.querySelector('#comp-score').innerText = compPlayer.score;
  showRoundResult(roundResult, userPlayer.score, compPlayer.score);
}

function win() {
  roundResult = 'You won! Shoot again.';
  userPlayer.updateScore();
  document.querySelector('#user-score').innerText = userPlayer.score;
  showRoundResult(roundResult, userPlayer.score, compPlayer.score);
}

function tie(play) {
  roundResult = `You both played ${play}. Go again.`
  document.querySelector('#user-play').innerText= '';
  document.querySelector('#comp-play').innerText = '';
  showRoundResult(roundResult, userPlayer.score, compPlayer.score);
}

//switch function to determine win or loss, runs appropriate win(), loss(), tie() functions.
function updateScore(userLastPlay, compLastPlay){
  let scoreCase = userLastPlay + compLastPlay;
  switch(scoreCase) {
    case 'rockpaper': 
      loss();
      break;
    case 'rockscissors': 
      win();
      break;
    case 'paperrock':
      win();
      break;
    case 'paperscissors':
      loss();
      break;
    case 'scissorsrock':
      loss();
      break;
    case 'scissorspaper':
      win();
      break;
    default: 
      tie(userLastPlay);
  }
}

//updates the UI with player selections
function playNotice(userLastPlay, compLastPlay){
  console.log('User plays', userLastPlay);
  console.log('Comp plays', compLastPlay);
  document.querySelector('#user-play').innerText = `${userLastPlay} vs`;
  document.querySelector('#comp-play').innerText = `${compLastPlay}`;
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
  userPlayer.lastPlay = userPlay;
  compShoot();
  compPlayer.lastPlay = compPlay;
  playNotice(userPlayer.lastPlay, compPlayer.lastPlay);
  updateScore(userPlayer.lastPlay, compPlayer.lastPlay);
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
  compPlayer.score = 0;
  compPlayer.lastPlay = '';
  userPlayer.score = 0;
  userPlayer.lastPlay = '';
}

// sets the board for a new game
function startGame() {
  initPlayers();
  //sets user interface
  gameBoard.innerHTML = newGameHTML;
  addPlayListeners();
};

// watch for start button to be clicked
addStartListener();

