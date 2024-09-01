const console = document.getElementById("console");

const CHOICES = [ "rock", "paper", "scissors" ];

let playerScore = 0;
let computerScore = 0;
let rounds = 0;

const getComputerChoice = () => {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

const getHumanChoice = () => {
    const rock = /rock/i;
    const paper = /paper/i;
    const scissors = /scissors/i;

    let humanChoice = prompt("Type your selection from rock, paper, or scissors");
    while (!humanChoice || !(humanChoice.match(rock) || humanChoice.match(paper) || humanChoice.match(scissors))) {
        if (!humanChoice) {
            alert("Please type your selection from rock, paper, or scissors.");
        } else {
            alert("Please input a valid choice.");
        }
        humanChoice = prompt("Type your selection from rock, paper, or scissors");
    }

    return humanChoice;
}

const playGame = (humanChoice, computerChoice) => {
    let resultMessage = "";

    if (rounds < 5) {
        if (humanChoice === computerChoice) {
            alert("Tie!");
            resultMessage = "Tie!";
        } else {
            if ((humanChoice === "rock" && computerChoice === "scissors") ||
                (humanChoice === "scissors" && computerChoice === "paper") ||
                (humanChoice === "paper" && computerChoice === "rock")) {
                playerScore += 1;
                resultMessage = `Player wins with ${humanChoice}`;
            } else {
                computerScore += 1;
                resultMessage = `Computer wins with ${computerChoice}`;
            }
        }

        rounds += 1;

        console.innerHTML = ``
        console.innerHTML += `
        <p>Round ${rounds}: Player: ${humanChoice} || Computer: ${computerChoice}</p>
        <p>Round Result: ${resultMessage}</p>
        <p>Total Scores: ${playerScore} (Player) — ${computerScore} (Computer)</p>
        `;
        setTimeout(() => {
            playGame(getHumanChoice(), getComputerChoice());
        }, 1000);
    } else {
        const winner = checkWinner();

        const affirmative = /y(es)?/i;
        const retry = prompt(`${winner} Would you like to try start a new one? (type "y" or "yes" to try again)`);
        if (retry.match(affirmative)) {
            playerScore = 0;
            computerScore = 0;
            rounds = 0;
            playGame(getHumanChoice(), getComputerChoice());
        } else {
            return;
        }
    }
}


const checkWinner = () => {
    let winner = "";
    
    if (playerScore > computerScore) {
        winner = "Player";
    } else {
        winner = "Computer";
    }

    return playerScore === computerScore || !winner ? `Game over. The game ended in a TIE.` : `Game over. ${winner} won the game!`;
}

playGame(getHumanChoice(), getComputerChoice());
