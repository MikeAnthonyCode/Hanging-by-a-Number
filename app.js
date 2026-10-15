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