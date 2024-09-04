'use strict';

//select elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const winner0El = document.querySelector('.winner--0');
const winner1El = document.querySelector('.winner--1');
const pokerEl = document.querySelector('.poker');
const bntNew = document.querySelector('.btn--new');
const bntRoll = document.querySelector('.btn--roll');
const bntHold = document.querySelector('.btn--hold');
const closePopupButton = document.getElementById('closePopup');
const popup = document.getElementById('myPopup');

let scores, pokerArr, activePlayer, playing;

//const pokerArr = [];
//Starting conditions
const init = function () {
  scores = [0, 0];
  pokerArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14, 15,
  ];

  activePlayer = 0;
  playing = true;
  bntHold.disabled = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  pokerEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--lose');
  player1El.classList.remove('player--lose');
  winner0El.classList.add('hidden');
  winner1El.classList.add('hidden');
};

const switchPlayer = function () {
  activePlayer = 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //pokerEl.classList.add('hidden');
};
const player0Win = function () {
  player0El.classList.add('player--winner');
  //winner0El.classList.remove('hidden');
};
const player1Win = function () {
  player1El.classList.add('player--winner');
  //winner1El.classList.remove('hidden');
};
const judgeWinner = function () {
  //pokerEl.classList.add('hidden');
  playing = false;
  if (scores[0] <= 10.5 && scores[1] <= 10.5) {
    if (scores[0] === scores[1]) {
      player0Win();
      player1Win();
      //popup here
      popup.classList.add('show');
      displayMessage("It's a draw!");
    } else if (scores[0] > scores[1]) {
      player0Win();
      popup.classList.add('show');
      displayMessage('Player 1 Wins The Game🎉');
    } else {
      player1Win();
      popup.classList.add('show');
      displayMessage('Player 2 Wins The Game🎉');
    }
  } else if (scores[0] > 10.5 && scores[1] > 10.5) {
    player0El.classList.add('player--lose');
    player1El.classList.add('player--lose');
    // Display popup when game over
    popup.classList.add('show');
    displayMessage('You both lose the game😢');
  } else {
    if (scores[0] > scores[1]) {
      player0Win();
      popup.classList.add('show');
      displayMessage('Player 2 Wins The Game🎉');
    } else {
      player1Win();
      popup.classList.add('show');
      displayMessage('Player 1 Wins The Game🎉');
    }
  }
};
// display the message on popup
const displayMessage = function (message) {
  document.getElementById('popupHeader').textContent = message;
};
init();
//Rolling poker functionality
bntRoll.addEventListener('click', function () {
  if (playing) {
    if (pokerArr.length === 0) {
      console.log('No more cards to draw.');
      return;
    } else {
      //1. Generating a random poker
      let i = Math.trunc(Math.random() * pokerArr.length);
      console.log(i);
      let poker = pokerArr[i];
      pokerArr.splice(i, 1);

      //2. display the poker
      pokerEl.classList.remove('hidden');
      console.log(poker);
      pokerEl.src = `poker-${poker}.jpg`;
      bntHold.disabled = false;

      //3. Check for poker J, Q, K: if true, score + 0.5
      if (poker <= 10) {
        // Add poker to score
        scores[activePlayer] += poker;
      } else {
        // score + 0.5
        scores[activePlayer] += 0.5;
      }
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      if (scores[activePlayer] >= 10.5) {
        //playing = false;
        if (activePlayer === 0) {
          switchPlayer();
        } else {
          // Judge the result
          judgeWinner();
        }
      }
    }
  }
});

//Hold poker functionality
bntHold.addEventListener('click', function () {
  //if (scores[activePlayer] > 0) playing = true;
  if (playing) {
    if (scores[activePlayer] > 0) {
      //1. if current player is player 1, then judge the winner
      if (activePlayer === 1) {
        judgeWinner();
      }
      //2. Switch player
      else switchPlayer();
    }
  }
});

//NewGame functionality
bntNew.addEventListener('click', init);

// close popup functionality
closePopupButton.addEventListener('click', function () {
  popup.classList.remove('show');
});
window.addEventListener('click', function (event) {
  if (event.target == popup) {
    popup.classList.remove('show');
  }
});
