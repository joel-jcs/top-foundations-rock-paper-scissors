const buttons = document.querySelectorAll(".selection");
const result = document.getElementById("result");
const restartContainer = document.getElementById("restart");
const restartBtn = document.getElementById("restart-button");

const CHOICES = [ "rock", "paper", "scissors" ];

let playerScore = 0;
let computerScore = 0;
let rounds = 0;

const getComputerChoice = () => {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

const playGame = (humanChoice, computerChoice) => {
    let resultMessage = "";

    if (rounds < 5) {
        if (humanChoice === computerChoice) {
            resultMessage = "Tie!";
        } else {
            if ((humanChoice === "rock" && computerChoice === "scissors") ||
                (humanChoice === "scissors" && computerChoice === "paper") ||
                (humanChoice === "paper" && computerChoice === "rock")) {
                playerScore += 1;
                resultMessage = `Player wins the round with ${humanChoice}`;
            } else {
                computerScore += 1;
                resultMessage = `Computer wins the round with ${computerChoice}`;
            }
        }

        rounds += 1;

        result.innerHTML = `
        <p>Round ${rounds}: Player: ${humanChoice} || Computer: ${computerChoice}</p>
        <p>Round Result: ${resultMessage}</p>
        <p>Total Scores: ${playerScore} (Player) — ${computerScore} (Computer)</p>
        `;
    } else {
        const winner = checkWinner();
        result.innerHTML += playerScore === computerScore || !winner ? `<h2>Game over. The game ended in a TIE.</h2>` : `<h2>Game over. ${winner} won the game!</h2>`;
        restartGame();
    }
}

const checkWinner = () => {
    let winner = playerScore > computerScore ? "Player" : "Computer";
    return winner;
}

const restartGame = () => {
    restartContainer.style.display = "block";
    restartBtn.addEventListener("click", () => {
        playerScore = 0;
        computerScore = 0;
        rounds = 0;
        
        result.innerHTML = ``

        restartContainer.style.display = "none";
    })
}

let playerChoice = ""

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        playerChoice = button.id;
        playGame(playerChoice, getComputerChoice());
    })
})