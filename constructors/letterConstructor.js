/////////////////////////////////////////////// /* Letter Constructor */ //////////////////////////////////////////////////////////

function LetterConstructor(letter){ // Letter constructor for each letter of a word

  // WordConstructor Properties
  this.letter = letter; // Store the Passed in letter Argument into Property letter
  this.guessed =  false; // Set Property of letterObject to False

  // Function that Looks at its Own Properties to Determine what Character to Return
  this.displayLetter = () => {
    // Condition that Determines which Character to Return
    if (this.guessed === false){ // If its Guessed Property is False, Return " _ "
      return " _ ";
    } else if (this.guessed === true){ // If its Guessed Property is True, Return this.letter
      return this.letter;
    } else if (this.letter == " "){n// If its Letter Property is a space, Return Space
      this.guessed = true; // Set the Letter Property of the Space to True
      return " ";
    } // End of Codition to Determine Character
  }; // End of displayLetter()
}; // End of LetterConstructor

/////////////////////////////////////////////// /* Export Module */ //////////////////////////////////////////////////////////
module.exports = LetterConstructor;
