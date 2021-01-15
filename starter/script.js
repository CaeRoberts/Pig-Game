'use strict';
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Selecting elements by ID (Look at how we're grabbing the elements)
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing = true;
/*

*/
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const newGame = function () {
  playing = true;
  activePlayer = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  scores = [0, 0];
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Starting Conditions //
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Display the total scores for each player

// Rolling Dice Functionality//
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random number dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the random number dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    if (dice != 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold button functionality//

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent =
      scores[activePlayer];
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];

    // 2. Check if players score >= 100.
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
// NEW GAME //
btnNew.addEventListener('click', function () {
  newGame();
});
