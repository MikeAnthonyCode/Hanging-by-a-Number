//State changes as the player takes turns.
let secretNumber;
let wrongGuesses;
let previousGuesses;
let gameOver;
let message;

// Cache the Elements

const guessInputEl = document.querySelector('#guess-input');
const guessBtnEl = document.querySelector('#guess');
const randomBtnEl = document.querySelector('#random')
const resetBtnEl = document.querySelector('#reset');
const remainingDisplayEl = document.querySelector('#remaining-display');
const resultDisplayEl = document.querySelector('#result-display');
const histroyDisplayEl = document.querySelector('#history-dispaly');


//------------------Functions--------------------

function getRandomNumber() {
    return Math.floor(
        Math.random()*(maxNumber - minNumber + 1)
    ) + minNumber;
}

// Start a fresh round using the fixed range in data.js
function init() {
    secretNumber = getRandomNumber();
    wrongGuesses = 0;
    previousGuesses = [];
    gameOver = false;
    message = 'Choose your first number!';
    guessInputEl.value = '';
    render();
}

// Display the accepted guesses as plain text.
function updateHistory() {
    if (previousGuesses.length === 0) {
        historyDisplayEl.textContent = 'Previous guesses: none yet';
    } else {
        historyDisplayEl.textContent =
            `Previous guesses: ${previousGuesses.join(', ')}`;
    }
}

// Display the state without changing the score.
function render() {
    remainingDisplayEl.textContent =
        `Guesses remaining: ${maxGuesses - wrongGuesses}`;
    resultDisplayEl.textContent = message;
    updateHistory();
    guessInputEl.disabled = gameOver;
    guessBtnEl.disabled = gameOver;
    randomBtnEl.disabled = gameOver;
}
