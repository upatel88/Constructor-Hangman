/////////////////////////////////////////////// /* Import Packages */ //////////////////////////////////////////////////////////
const LetterConstructor = require('./letterConstructor');
const fs = require ('fs');

/////////////////////////////////////////////// /* Game Object Constructor */ //////////////////////////////////////////////////////////

  function WordConstructor(currentWord){

    // WordConstructor Properties
    this.word = currentWord; //  Property that Stores the currentWord
    this.currentWordArray = currentWord.split(""); // Converts the currentWord String Argument into an Array
    this.guessedLetters = []; // Stores Each Letter Object Created by populateGuessedLetter() in an Array
    this.wordFound = false; // wordFound Property that Stores the Boolean that Keeps Track if the Word has been Found

    // Function that Populates Guessed Letters Array with letter Objects for Each letter in currentWordArray
    this.populateGuessedLetters = () => {
      this.currentWordArray.forEach((letterObject) => { // Loop Through Each Array Index
        this.guessedLetters.push(new LetterConstructor(letterObject)); // Creates an Object for Each Letter and Pushes it into guessedLetters Array
      })
    }; // End of Populates Guessed Letters() Function

    // Function that checks if the letter guessed is part of the currentWord
    this.checkLetter = (letter) =>{ // Takes in the Current Letter Guessed as an Argument
      this.guessedLetters.forEach((letterObject) => { // Loop Through Each Object in the guessedLetters Array
        // Condition to Check if the Letter Belongs to the Object
        if(letterObject.letter.indexOf(letter) > -1){ // If it Matches the letter in the Object, indexOf will be greater than -1
          letterObject.guessed = true; // Set the Guessed Property of the Object to True
        } // End of Condition that Checks if the Letter Belongs to the Object
      }) // End of For Each
    };

    // Function that Prints the Results of the Word Guessed onto the Screen
    this.printWord = () => {
      let displayedWord = ""; // Create a Empty Variable String
      this.guessedLetters.forEach((letterObject) => displayedWord += letterObject.displayLetter()); // Function that Loops Through Each Object in the guessedLetters Array and Executes a Function that Returns a Character Based on its Guessed Property and Concatinates it to the displayedWord String
      console.log(displayedWord + "\n"); // Display the Results of the Word Guessed
    }; // End of printWord() Function

    // Function that Checks if All the Letters in currentWord has been Guessed
    this.wordGuessCompleted = () => {
      // Condition to Check if all the Lettesr Have been Found
      if (this.guessedLetters.every((letterObject) => // every() returns True if Every Object Property Guessed is True. Else it Will Return False
         letterObject.guessed === true
       )){
        this.wordFound = true; // Set the WordFound Property to True
      }
    }; // End of wordGuessCompleted() Function

  }; // End of Constructor

/////////////////////////////////////////////// /* Export Modules */ //////////////////////////////////////////////////////////
module.exports = WordConstructor;