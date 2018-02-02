//////////////////////////////////////////////// /* Questions Object */ //////////////////////////////////////////////////////////

let questions = {

  readyToPlay : [{
    type: "input",
    name: "ready",
    message: "Begin Playing Hangman?",
    validate: (value) => {
      value = value.slice(0,1).toLowerCase();
      return (value === "y" || value === "n")? true : "Please input either yes or no only!"
    },
    default: "yes"
  }],

  guessLetter : [{
    type: "input",
    name: "guessLetter",
    message: "Guess a letter!",
    validate: (value) => value.match(/^[a-zA-Z]+$/) ? true : "Please Type In a Valid Letter!"
  }],

  playAgain : [{
    type: "input",
    name: "playAgain",
    message: "Do you want to play again?",
    validate: (value) => {
      value = value.slice(0,1).toLowerCase();
      return (value === "y" || value === "n")? true : "Please input either yes or no only!"
    },
    default: "yes"
  }]

}; // End of questions object

/////////////////////////////////////////////// /*  Export Modules */ //////////////////////////////////////////////////////////
module.exports = questions;