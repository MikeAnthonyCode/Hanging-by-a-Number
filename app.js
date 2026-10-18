//---------------Constants-----------------------//
//State changes as the player takes turns.
let secretNumber;
let wrongGuesses;
let previousGuesses;
let gameOver;
let message;
let winStreak = 0;
let stageIndex = 0;
let stageWins = 0;
let henryFreed = false;
let rescueLost = false;
/* 2. Cache the HTML elements once so functions can reuse them below. */
const startScreenEl = document.querySelector('#start-screen');
const startBtnEl = document.querySelector('#start');
const gameEl = document.querySelector('#game');
const difficultyEl = document.querySelector('#difficulty');
const guessInputEl = document.querySelector('#guess-input');
const guessBtnEl = document.querySelector('#guess');
const randomBtnEl = document.querySelector('#random');
const nextBtnEl = document.querySelector('#next');
const resetBtnEl = document.querySelector('#reset');
const instructionsEl = document.querySelector('#instructions');
const remainingDisplayEl = document.querySelector('#remaining-display');
const resultDisplayEl = document.querySelector('#result-display');
const historyDisplayEl = document.querySelector('#history-display');
const stageDisplayEl = document.querySelector('#stage-display');
const rulesEl = document.querySelector('#rescue-rules');
const streakDisplayEl = document.querySelector('#streak-display');
const rewardDisplayEl = document.querySelector('#reward-display');
const faceDisplayEl = document.querySelector('#face-display');
const hangmanEl = document.querySelector('#hangman');
const captionEl = document.querySelector('#henry-caption');
const bodyPartEls = document.querySelectorAll('.body-part');
/* 3. Round setup. Resetting a mode and starting a round are different jobs. */
function getRandomNumber() {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}
function init() {
    winStreak = 0;
    stageIndex = 0;
    stageWins = 0;
    henryFreed = false;
    rescueLost = false;
    startRound();
}
function startRound() {
    let difficulty = difficultyEl.value;
    if (difficulty === 'free') {
        difficulty = stageNames[stageIndex];
    }
    if (difficulty === 'easy') {
        maxNumber = 20;
    } else if (difficulty === 'medium') {
        maxNumber = 50;
    } else {
        maxNumber = 100;
    }
    secretNumber = getRandomNumber();
    wrongGuesses = 0;
    previousGuesses = [];
    gameOver = false;
    message = 'Choose your first number!';
    guessInputEl.value = '';
    guessInputEl.max = maxNumber;
    guessInputEl.placeholder = `1–${maxNumber}`;
    render();
    guessInputEl.focus();
}
function handleGuess() {
    if (gameOver === true) {
        return;
    }
    const guess = Number(guessInputEl.value);
    if (
        guessInputEl.value.trim() === '' ||
        Number.isInteger(guess) === false ||
        guess < minNumber || guess > maxNumber
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
        handleWin();
    } else {
        wrongGuesses = wrongGuesses + 1;
        if (wrongGuesses === maxGuesses) {
            gameOver = true;
            winStreak = 0;
            message = `Round lost! The number was ${secretNumber}.`;
            if (difficultyEl.value === 'free') {
                stageWins = 0;
                if (stageIndex === 2) {
                    rescueLost = true;
                    message += ' Rescue over. Restart from Easy.';
                } else {
                    message += ' Stage streak reset. Try again.';
                }
            }
        } else if (guess < secretNumber) {
            message = `${guess} is too low. Try a higher number!`;
        } else {
            message = `${guess} is too high. Try a lower number!`;
        }
    }
    guessInputEl.value = '';
    render();
    if (gameOver === false) {
        guessInputEl.focus();
    } else if (nextBtnEl.hidden === false) {
        nextBtnEl.focus();
    } else {
        resetBtnEl.focus();
    }
}
/* 5. A rescue win counts toward the current stage. */
function handleWin() {
    gameOver = true;
    winStreak = winStreak + 1;
    message = `You win! The number was ${secretNumber}.`;
    if (difficultyEl.value === 'free') {
        stageWins = stageWins + 1;
        if (stageIndex === 2) {
            henryFreed = true;
            message = 'You’ve Freed Henry! You completed all three stages!';
        } else if (stageWins === 2) {
            message += ' Stage complete! Choose Next stage.';
        } else {
            message += ' One more win to complete this stage.';
        }
    }
}
function handleNextRound() {
    if (gameOver === false || henryFreed === true || rescueLost === true) {
        return;
    }
    if (difficultyEl.value === 'free' && stageWins === 2) {
        stageIndex = stageIndex + 1;
        stageWins = 0;
    }
    startRound();
}
/* Build a list of untried numbers so Random never repeats a guess. */
function handleRandomGuess() {
    if (gameOver === true) {
        return;
    }
    const availableNumbers = [];
    for (let number = minNumber; number <= maxNumber; number = number + 1) {
        if (previousGuesses.includes(number) === false) {
            availableNumbers.push(number);
        }
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    guessInputEl.value = availableNumbers[randomIndex];
    handleGuess();
}
function render() {
    instructionsEl.textContent = `Guess a whole number from 1 to ${maxNumber}. Find it before six mistakes. Follow the higher/lower clues.`;
    remainingDisplayEl.textContent = `Mistakes left: ${maxGuesses - wrongGuesses}`;
    resultDisplayEl.textContent = message;
    rulesEl.hidden = difficultyEl.value !== 'free';
    stageDisplayEl.textContent = 'Practice round';
    if (difficultyEl.value === 'free') {
        stageDisplayEl.textContent = `${stageLabels[stageIndex]} · Stage wins: ${stageWins} / ${stageTargets[stageIndex]}`;
    }
    guessInputEl.disabled = gameOver;
    guessBtnEl.disabled = gameOver;
    randomBtnEl.disabled = gameOver;
    nextBtnEl.hidden = gameOver === false || henryFreed === true || rescueLost === true;
    nextBtnEl.textContent = 'Next round';
    if (difficultyEl.value === 'free' && stageWins === 2) {
        nextBtnEl.textContent = 'Next stage';
    }
    bodyPartEls.forEach((part, index) => {
        if (index < wrongGuesses || henryFreed === true) {
            part.classList.add('visible');
        } else {
            part.classList.remove('visible');
        }
    });
    hangmanEl.classList.remove('freed');
    captionEl.textContent = 'Keep Henry safe!';
    if (henryFreed === true) {
        hangmanEl.classList.add('freed');
        captionEl.textContent = 'Henry is standing free!';
    } else if (gameOver === true && wrongGuesses === maxGuesses) {
        captionEl.textContent = 'Round lost. Try again!';
    }
    updateHistory();
    updateStreak();
    updateFace();
}
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
function updateStreak() {
    streakDisplayEl.textContent = `Win streak: ${winStreak}`;
    if (winStreak === 0) {
        rewardDisplayEl.textContent = 'Win your first star!';
    } else if (winStreak >= 5) {
        rewardDisplayEl.textContent = streakRewards[4];
    } else {
        rewardDisplayEl.textContent = streakRewards[winStreak - 1];
    }
}
function updateFace() {
    if (gameOver === true && wrongGuesses < maxGuesses) {
        faceDisplayEl.textContent = '\u{1F973}';
        faceDisplayEl.setAttribute('aria-label', 'You won!');
    } else {
        faceDisplayEl.textContent = reactionFaces[wrongGuesses];
        faceDisplayEl.setAttribute('aria-label', reactionLabels[wrongGuesses]);
    }
}
/* EVENT LISTENERS - To Enable the functions */
startBtnEl.addEventListener('click', () => {
    startScreenEl.hidden = true;
    gameEl.hidden = false;
    guessInputEl.focus();
});
guessBtnEl.addEventListener('click', handleGuess);
randomBtnEl.addEventListener('click', handleRandomGuess);
nextBtnEl.addEventListener('click', handleNextRound);
resetBtnEl.addEventListener('click', init);
difficultyEl.addEventListener('change', init);
guessInputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleGuess();
    }
});
// Prepare the first round behind the welcome screen.
init();
