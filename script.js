'use strict';
//Selecting elements
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const score0El = document.querySelector('#score--0');
const diceEl = document.querySelector('.dice');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//We can also select ids by using : const score0 = document.getElementByID('score--0'); :We usually prefer the querySelector one.
//Starting conditions
let currentScore, activePlayer, scores, playing;
const init = function () {
  //init for initialization
  //These four variables are local variables. i.e they are available only inside the function. We can say they are scoped to the init function.
  currentScore = 0;
  activePlayer = 0;
  const scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();
//FUnction
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//It cant be inside function because it will be resetted everytime we click roll button
//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      //This is same as using toogle in both classes.As toogle adds class if it isn't present and if its present it removes it.
      /* if (activePlayer === 0) {
      player0El.classList.remove('player--active');
      player1El.classList.add('player--active');
    } else {
      player0El.classList.add('player--active');
      player1El.classList.remove('player--active');
    }
    */
    }
  }
});
//Done by myself
/*
btnHold.addEventListener('click', function () {
  y = Number(document.getElementById(`score--${activePlayer}`).textContent);
  y += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = y;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
});
*/
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] < 10) {
      switchPlayer();
    } else {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
  }
});
//Made by me
/*
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
*/
btnNew.addEventListener('click', init);
