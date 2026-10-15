//---------------Constants-----------------------//

//State changes as the player takes turns.
let secretNumber;
let wrongGuesses;
let previousGuesses;
let gameOver;
let message;

//----------------Cache the Elements--------------//

const guessInputEl = document.querySelector('#guess-input');
const guessBtnEl = document.querySelector('#guess');
const randomBtnEl = document.querySelector('#random')
const resetBtnEl = document.querySelector('#reset');
const remainingDisplayEl = document.querySelector('#remaining-display');
const resultDisplayEl = document.querySelector('#result-display');
const historyDisplayEl = document.querySelector('#history-display');


//------------------Functions----------------------//

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


//-------------------Event Listeners-------------------//

// Run the functions
guessBtnEl.addEventListener('click', handleGuess);
randomBtnEl.addEventListener('click', handleRandomGuess);
resetBtnEl.addEventListener('click', init);
guessInputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});


// Call init once now to start the first round.
init();

