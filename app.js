//---------------Constants-----------------------//
//State changes as the player takes turns.
let secretNumber;
let wrongGuesses;
let previousGuesses;
let gameOver;
let message;
//----------------Cache the Elements--------------//
const difficultyEl = document.querySelector('#difficulty');
const instructionsEl = document.querySelector('#instructions');
const startScreenEl = document.querySelector('#start-screen');
const gameEl = document.querySelector('#game');
const bodyPartEls = document.querySelectorAll('.body-part');
const guessInputEl = document.querySelector('#guess-input');
const guessBtnEl = document.querySelector('#guess');
const randomBtnEl = document.querySelector('#random')
const resetBtnEl = document.querySelector('#reset');
const remainingDisplayEl = document.querySelector('#remaining-display');
const resultDisplayEl = document.querySelector('#result-display');
const historyDisplayEl = document.querySelector('#history-display');
const startBtnEl = document.querySelector('#start');
//------------------Functions----------------------//
function getRandomNumber() {
    return Math.floor(
        Math.random()*(maxNumber - minNumber + 1)
    ) + minNumber;
}
// Start a fresh round using the following rules
function init() {
    const difficulty = difficultyEl.value;
    if (difficulty === 'easy') {
        maxNumber = 20;
    } else if (difficulty === 'medium') {
        maxNumber = 50;
    } else {
        maxNumber = 100;
    }
    guessInputEl.max = maxNumber;
    guessInputEl.placeholder = `1–${maxNumber}`;
    secretNumber = getRandomNumber();
    wrongGuesses = 0;
    previousGuesses = [];
    gameOver = false;
    message = 'Choose your first number!';
    guessInputEl.value = '';
    render();
}
// Display the state without changing the score.
function render() {
    instructionsEl.textContent = `Guess a whole number from 1 to ${maxNumber}. Six wrong guesses lose the round.`;
    remainingDisplayEl.textContent =
        `Guesses remaining: ${maxGuesses - wrongGuesses}`;
    resultDisplayEl.textContent = message;
    bodyPartEls.forEach((part, index) => {
        if (index < wrongGuesses) {
            part.classList.add('visible');
        } else {
            part.classList.remove('visible');
        }
    });
    updateHistory();
    guessInputEl.disabled = gameOver;
    guessBtnEl.disabled = gameOver;
    randomBtnEl.disabled = gameOver;
}
function handleGuess() {
    if (gameOver === true) {
        return;
    }
    const guess = Number(guessInputEl.value);
    if (
        guessInputEl.value === '' ||
        Number.isInteger(guess) === false ||
        guess < minNumber ||
        guess > maxNumber
    ) {
        message = `Enter a whole number from ${minNumber} to ${maxNumber}.`;
        render();
        return;
    }
    if (previousGuesses.includes(guess)) {
        message = 'You already tried that number. Choose another!';
        render();
        return;
    }
    previousGuesses.push(guess);
    if (guess === secretNumber) {
        gameOver = true;
        message = `You win! The secret number was ${secretNumber}!`;
    } else {
        wrongGuesses = wrongGuesses + 1;
        if (wrongGuesses === maxGuesses) {
            gameOver = true;
            message = `Game over! The secret number was ${secretNumber}.`;
        } else if (guess < secretNumber) {
            message = `${guess} is too low. Try a higher number!`;
        } else {
            message = `${guess} is too high. Try a lower number!`;
        }
    }
    guessInputEl.value = '';
    render();
}
function handleRandomGuess() {
    if (gameOver === true) {
        return;
    }
    guessInputEl.value = getRandomNumber();
    handleGuess();
}
// Create one colored list item for each previous guess.
function updateHistory() {
    historyDisplayEl.textContent = '';
    if (previousGuesses.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.textContent = 'No guesses yet';
        emptyItem.classList.add('empty-history');
        historyDisplayEl.appendChild(emptyItem);
        return;
    }
    previousGuesses.forEach((guess) => {
        const guessItem = document.createElement('li');
        if (guess < secretNumber) {
            guessItem.textContent = `${guess} — Too low`;
            guessItem.classList.add('too-low');
        } else if (guess > secretNumber) {
            guessItem.textContent = `${guess} — Too high`;
            guessItem.classList.add('too-high');
        } else {
            guessItem.textContent = `${guess} — Correct!`;
            guessItem.classList.add('correct');
        }
        historyDisplayEl.appendChild(guessItem);
    });
}
//-------------------Event Listeners-------------------//
// Run the functions
guessBtnEl.addEventListener('click', handleGuess);
randomBtnEl.addEventListener('click', handleRandomGuess);
resetBtnEl.addEventListener('click', init);
difficultyEl.addEventListener('change', init);
guessInputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});
startBtnEl.addEventListener('click', () => {
    startScreenEl.hidden = true;
    gameEl.hidden = false;
    guessInputEl.focus();
});
// Call init once now to start the first round.
init();
