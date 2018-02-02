/////////////////////////////////////////////// /* Import Packages*/ //////////////////////////////////////////////////////////
const fs = require ('fs');
const inquirer = require('inquirer');
const readline = require('readline');
const questions = require('../assets/questions.js');
const WordConstructor = require ('./wordConstructor.js');
const hangmanFigure = require ('../assets/hangmanDrawings.js');

/////////////////////////////////////////////// /* Game Constructor */ //////////////////////////////////////////////////////////

function GameConstructor(){

  // Game Constructor Properties
  this.guessRemaining = 10; // Store Remaning Guesses
  this.wordsWon = 0; // Sore Number of Words Guessed Correctly
  this.wordsLose = 0; // Sore Number of Words Guessed Incorrectly

  // Function that Starts the Game
  this.newGame = () => {
    if (this.guessRemaining == 10){
        this.lettersGuessed = []; // Creates an Empty Array to store the letters Guessed So Far
        console.log("\n --------------------- \n Let The Games Begin!!! \n --------------------- \n"); // Shows Welcome Message
        this.generateRandomWordObject(); // Creates a New Word Object
    } else { // If New Game starts without guessRemaining == 10
        this.guessRemaining = 10;
        this.newGame();
    } // End of if else
  }; // End of newGame() Function

  // Function that Gets a Random Word from a Text File
  this.getWordPromise = () => {
    return new Promise((resolve, reject) => { // Create a new Promise that gets Resolved after Word has been Selected
      fs.readFile("./assets/words.txt", "utf-8", (error, data) => { // FS Read the Contents of the Text File
        if(error) console.log(` An error occured while reading the textfile ${error} \n`); // Throws an Error if Readfile Fails
        var wordsArray = data.split('\n').map((line) => line.replace("\r", ""));   // Stores the data returned into an Array
        var choosenWord = wordsArray[Math.floor(Math.random()*wordsArray.length)]; // Returns and Stores a Random Word From the Array Above
        resolve(choosenWord); // Pass the choosenWord when the Promise Gets Resolved
      }) // End of Node FS
    })
  }; // End of getWordPromise() Function

  // Function that Resolves getWordPromise and Creates a new Word Object from choosenWord
  this.generateRandomWordObject = () => {
    this.getWordPromise().then((randomWord) => { // Resolves Promise then Passes randomWord / choosenWord as an Argument
      this.currentWord = new WordConstructor(randomWord); // Creates a New Word Object and assigns it to currentWord
      this.currentWord.populateGuessedLetters(); // Function that Creates a new Letter Object for Each Letter in choosenWord
      this.currentWord.printWord();  // Display Current Letters on the Screen
      this.recursivePrompt(); // Prompt for Letter Input
    }) // Promise Resolved
  }; // End of generateRandomWordObject

  // Function that Asks for a Letter Input. This is the Main Logic of the Game
  this.recursivePrompt = () => {
    inquirer.prompt(questions.guessLetter).then((letterAnswer) => { // Pass the Letter Response as an argument of the Callback Function
      let currentLetter = letterAnswer.guessLetter.toLowerCase(); // Transform to LowerCase and Store letter Guessed in a currentLetter Variable
      // Condition to Check if the letter has been Guessed Previously
      if (this.lettersGuessed.indexOf(currentLetter) > -1){ // If letter has been guessed, indecOf will be greater than -1
        console.log(`\n Letters You Have Guessed: ${this.lettersGuessed.join(",")} \n`);
        console.log(" This Letter Has Been Guessed! \n");
        this.recursivePrompt(); // Prompt for Letter Input
      } else { // Letter has not been Guessed Previously
        this.lettersGuessed.push(currentLetter);  // Store the letter Guessed in the lettersGuessed Array for Future Reference
        console.log(`\n Letters You Have Guessed: ${this.lettersGuessed.join(",")} \n`);
        this.currentWord.checkLetter(currentLetter); // Push the Guessed Letter into the wordObject Function that Sets the Guessed Letter Property to True if the Letter is Part of the Word Object
          // Condition that Checks if the Letter Guessed is Part of the Word Object
          if (this.currentWord.currentWordArray.indexOf(currentLetter) == -1){ // If not part, indexOf will be -1
              this.guessRemaining--; // Reduce guessRemaining by 1
              this.currentWord.printWord(); // Print the all the Letters onto the Screen
              console.log(" Wrong Letter. Guess Again!!! \n")
              console.log(" "+ this.guessRemaining + " Guesses Remaining \n");
              console.log(hangmanFigure[this.guessRemaining]); // Displays a Hangman Figure
              // Condition to Check if guessRemaining is 0
              if (this.guessRemaining <= 0){
                  this.wordsLose++; // Increase Words lost
                  console.log(` You No More Lives Remaining. You Lose. The Correct Answer is ${this.currentWord.word} \n`);
                  console.log(` You Have Guessed ${this.wordsWon} Correctly, ${this.wordsLose} Incorrectly \n`);
                  console.log(` Games Won: ${this.wordsWon} | Games Loss ${this.wordsLose} \n`);
                  inquirer.prompt(questions.playAgain).then((answer) => { // Ask if the User Wants to Play Again
                  // Condition to See if the User Wants to Play Again
                  if (answer.playAgain.toLowerCase().slice(0,1) == "y"){ // If User Wants to Play Again
                      console.log(" New Game Started \n");
                      this.newGame(); // Create a New Game
                    // End the Game
                    } else {
                      console.log(" Game Over \n");
                      process.exit(); // Game Ends
                    } // End of Condition to See if User Wants to Play Again
                }) // End of Prompt to See if User Wants to Play Again
              // guessRemaining is Greater than 0
              } else {
                console.log("");
                this.recursivePrompt(); // Prompt for Letter Input
              } // End of if Else to Check if guessRemaining is 0
          // If Letter is Part of the Word Object
          } else {
            this.currentWord.printWord(); // Print the all the Letters onto the Screen
            console.log(" Correct! \n")
            this.currentWord.wordGuessCompleted()
            // Condition that Checks if All Letters have been Guessed.
            if (this.currentWord.wordFound === true){
              this.wordsWon++; // Increase Words Won by 1
              console.log(` You Have Guessed the Word ${this.currentWord.word} correctly \n`);
              console.log(` You Have Guessed ${this.wordsWon} Correctly, ${this.wordsLose} Incorrectly \n`);
              console.log(` Games Won: ${this.wordsWon} | Games Loss ${this.wordsLose} \n`);
              inquirer.prompt(questions.playAgain).then((answer) => { // Ask if the User Wants to Play Again
              // Condition to See if the User Wants to Play Again
              if (answer.playAgain.toLowerCase().slice(0,1) == "y"){ // If User Wants to Play Again
                  console.log(" New Game Started \n");
                  this.newGame(); // Create a New Game
                // End the Game
                } else {
                  console.log(" Game Over \n");
                  process.exit(); // Game Ends
                } // End of Condition to See if User Wants to Play Again
              }) // End of Prompt Asking if User Wants to Play Again
                // All Characters have not been Guessed
            } else {
              this.recursivePrompt(); // Prompt for Letter Input
            }
          } // End of if Else to Check if letter is Part of the Word Object
        } // End of Main if Else that Checks if the Letter has Been Guessed Previously
    }) // End of inquirer prompt that Asks for Letter Inpit
  }; // End of recursivePrompt() Function
}; // End of Game Constructor

/////////////////////////////////////////////// /* Game Constructor */ //////////////////////////////////////////////////////////
module.exports = GameConstructor;