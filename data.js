/*----------------------------- Game Settings -----------------------------*/
const minNumber = 1;
const maxGuesses = 6;
let maxNumber = 20;
// The reward upgrades with each consecutive win.
const streakRewards = [
    '\u{1F7E4}\u{2B50} Bronze',
    '\u{26AA}\u{2B50} Silver',
    '\u{1F31F} Gold',
    '\u{1F48E} Diamond',
    '\u{1F451} Crown'
];
// Position 0 is the starting face.
// Positions 1–6 match the number of wrong guesses.
const reactionFaces = [
    '\u{1F642}',
    '\u{1F610}',
    '\u{1F615}',
    '\u{1F61F}',
    '\u{1F630}',
    '\u{1F631}',
    '\u{1F480}'
];
// Descriptions for screen readers.
const reactionLabels = [
    'Feeling confident',
    'Getting serious',
    'Feeling unsure',
    'Getting worried',
    'Feeling nervous',
    'One chance remaining',
    'Game over'
];
// Matching positions describe the same rescue stage in all three arrays.
const stageNames = ['easy', 'medium', 'hard'];
const stageLabels = ['Easy', 'Medium', 'Hard'];
const stageTargets = [2, 2, 1];
