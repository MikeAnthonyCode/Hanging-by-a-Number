# Hanging by a Number planning
## Goal
Combine a number guessing game with a six-part hangman drawing. Help Henry by using higher/lower clues to find a secret whole number.
## Screen plan
Welcome screen → Start → drawing on left, controls in middle, rules and history on right. On narrow screens a smaller drawing stays beside the controls, with rules and history underneath. Desktop history uses two columns to fit all six guesses. Text communicates outcomes; the drawing is decorative.
## Rules
- Practice Easy: 1–20; Medium: 1–50; Hard: 1–100.
- Each round ends on a correct guess or the sixth incorrect guess. Invalid and repeated entries cost nothing.
- Free Henry: two consecutive Easy wins, then two consecutive Medium wins, then one Hard win. Every round allows six mistakes, including Hard.
- Losing Easy or Medium resets only that stage’s streak. Completed stages stay completed.
- Losing Hard ends the rescue; restart returns to Easy.
- Next round preserves progress. Restart mode or changing mode clears all progress.
- Freeing Henry reveals all his parts, removes the pole, beam and rope, and puts his feet on the base.
## State
secretNumber: target for this round. wrongGuesses: 0–6. previousGuesses: accepted numbers. gameOver: whether the round ended. message: current feedback. winStreak: consecutive round wins. stageIndex: 0 Easy, 1 Medium, 2 Hard. stageWins: wins toward this stage. henryFreed: rescue success. rescueLost: Hard failure. maxNumber: active range ceiling.
## Turn logic
Reject a guess when the round is over. Convert the input to a number. Reject blank, fractional, out-of-range and repeated guesses. Store an accepted guess. On a match, end the round and update wins. Otherwise add one mistake, check for loss, then give a higher/lower clue. Finally render the state into the DOM.
## Course scope
Use separate HTML, CSS, app.js and data.js. Use functions, variables, arrays, conditions, one basic for loop, forEach, DOM methods and event listeners. No frameworks, packages, fetch calls, storage, classes, build tools, prompt or alert in the game.