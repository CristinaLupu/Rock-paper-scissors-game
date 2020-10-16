let roundCounter = 0;
let playerScore = 0;
let computerScore = 0;

/**
 * * Make computer pick a random value
 */
function computerPlay() {
  const selections = ["rock", "paper", "scissors"];
  const randomSelection = Math.floor(Math.random() * selections.length);

  return selections[randomSelection];
}

/**
 * *See who wins each round
 * @param {*} playerSelection
 * @param {*} computerSelection
 */
function playRound(playerSelection, computerSelection) {
  let message = "";
  let whoWon;

  if (playerSelection == computerSelection) {
    message = "It's a tie!";
    whoWon = 0;
  } else if (playerSelection == "rock" && computerSelection == "paper") {
    message = "You Lose! Paper beats Rock";
    whoWon = 1;
  } else if (playerSelection == "rock" && computerSelection == "scissors") {
    message = "You Win! Rock beats Scissors";
    whoWon = 2;
  } else if (playerSelection == "paper" && computerSelection == "rock") {
    message = "You Win! Paper beats Rock";
    whoWon = 2;
  } else if (playerSelection == "paper" && computerSelection == "scissors") {
    message = "You Lose! Scissors beats Paper";
    whoWon = 1;
  } else if (playerSelection == "scissors" && computerSelection == "rock") {
    message = "You Lose! Rock beats Scissors";
    whoWon = 1;
  } else if (playerSelection == "scissors" && computerSelection == "paper") {
    message = "You Win! Scissors beats Paper";
    whoWon = 2;
  }

  return { message, whoWon };
}

/**
 * *Starts the game when clicking the play button
 */
function startGame() {
  roundCounter = 0;
  playerScore = 0;
  computerScore = 0;
  showScore();

  const startGameBtn = document.querySelector("#start-game");
  const restartGameBtn = document.querySelector("#restart-game");

  startGameBtn.classList.add("display-none");
  restartGameBtn.classList.add("display-none");

  document.querySelector("#output").innerHTML = "Click to play!";

  const buttons = document.querySelectorAll(".selection-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("display-none");
    btn.onclick = () => {
      handleUserSelect(btn);
    };
  });
}

/**
 * *Checks what button the user clicked and changes the output
 * @param {*} btnClicked
 */
function handleUserSelect(btnClicked) {
  const userSelection = btnClicked.innerHTML.toLowerCase();
  const output = playRound(userSelection, computerPlay());

  // ? show msg on ui
  document.querySelector("#output").innerHTML = output.message;

  updateScore(output.whoWon);
  showScore();

  // ? check end of the game
  roundCounter++;
  if (roundCounter >= 5) {
    checkWin();

    // ? hide game selection btns
    document.querySelectorAll(".selection-btn").forEach((btn) => {
      btn.classList.add("display-none");
    });
    // ? play again btn apearence
    document.querySelector("#restart-game").classList.remove("display-none");
  }
}

/**
 * * Updates the score
 */
function updateScore(whoWon) {
  if (whoWon == 1) {
    computerScore++;
  } else if (whoWon == 2) {
    playerScore++;
  }
}

/**
 * * Shows score on UI
 */
function showScore() {
  document.querySelector("#playerScore").innerHTML = playerScore;
  document.querySelector("#computerScore").innerHTML = computerScore;
}

/**
 * * Checks the winner
 */
function checkWin() {
  let winner =
    playerScore > computerScore
      ? "Congratulations! You win!"
      : playerScore < computerScore
      ? "Computer Wins! Better luck next time!"
      : "It's a tie!";
  console.log(winner);
  return (document.querySelector("#output").innerHTML = winner);
}

(function main() {
  const startGameBtn = document.querySelector("#start-game");
  const restartGameBtn = document.querySelector("#restart-game");

  startGameBtn.onclick = () => {
    startGame();
  };

  restartGameBtn.onclick = () => {
    startGame();
  };
})();
