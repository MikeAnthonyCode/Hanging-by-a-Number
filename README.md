# Hanging by a Number
A browser number guessing game with a hangman twist. Use higher/lower clues to find the secret number before six wrong guesses complete Henry’s drawing.
![Game showing Henry, controls, rules and guess history](assets/game-screenshot.png)
## Getting started
Open index.html in your browser. No installation is needed. Select a mode, enter a whole number, and click Submit or press Enter. Random submits an untried number and can cost a mistake.
[Play Hanging by a Number](https://mikeanthonycode.github.io/Hanging-by-a-Number/)

Open the link above to play online. You can also download the project and open index.html locally.
[Planning](planning/PLAN.md) | [Testing](testing/TESTING.md) | [Requirements](docs/REQUIREMENTS.md)
## Rules
- Easy: 1–20. Medium: 1–50. Hard: 1–100.
- A correct guess wins. Six incorrect guesses lose a round.
- Invalid and duplicate guesses do not cost a mistake.
- Free Henry requires two consecutive Easy wins, two consecutive Medium wins, and one Hard win. Every round allows six mistakes.
- An Easy or Medium loss resets that stage’s consecutive wins. A Hard loss ends the rescue.
- Next continues progress. Restart or changing mode clears it.
![Henry standing free after all stages](assets/freed-henry.png)
## Technologies used
HTML, CSS with Flexbox, and vanilla JavaScript using the DOM. Henry is drawn with CSS shapes. No external game libraries are used.
## Development and attribution
I developed the game from my earlier Basic prototype. AI assistance supported the code, explanations and testing. I am reviewing the implementation and following my course’s policy for acknowledging that assistance. Screenshots show the game itself.
## Next steps
- Add an optional sound toggle.
- Explore saving a best streak after learning browser storage.
