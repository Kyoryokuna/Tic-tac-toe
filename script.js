const notify = document.querySelector("#playersTurn")
const score1 = document.querySelector(".score1")
const score2 = document.querySelector(".score2")
const cells = document.querySelectorAll(".cell")

function createPlayer(symbol,Name) {
    const letter = symbol;
    const name = Name;
    let score = 0;
    return {letter, score, name};
}
const player1 = createPlayer("x", "p1")
score1.textContent = `p1 score: ${player1.score}`
const player2 = createPlayer("o", "p2")
score2.textContent = `p2 score: ${player2.score}`

let currentPlayer = player1
notify.textContent = `${currentPlayer.name}'s turn`

let board = ["","","","","","","","",""];
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function nextPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2
    }else{
        currentPlayer = player1
    }
    notify.textContent = `${currentPlayer.name}'s turn`
}

function checkWin(letter) {
    return winConditions.some(condition => {
        return condition.every(index => board[index] === letter)
    })
}

function updateScores() {
    score1.textContent = `P1's score: ${player1.score}`
    score2.textContent = `P2's score: ${player2.score}`
}

function resetBoard() {
    board = ["","","","","","","","",""];
    cells.forEach(cell => cell.textContent = "")
    currentPlayer = player1
    notify.textContent = `${currentPlayer.name}'s turn`
}

function Draw(cell, index) {
    if (board[index] !== "") return;

    board[index] = currentPlayer.letter
    cell.textContent = currentPlayer.letter

    if (checkWin(currentPlayer.letter)) {
        notify.textContent = `${currentPlayer.name} has won this round 🎉!!!`;
        currentPlayer.score++;
        updateScores();
        setTimeout(() => {
            resetBoard()
        }, 2000)
        return;
    }

    if (board.every(cell => cell !== "")) {
        notify.textContent = "Game over it's a tie!";
        resetBoard();
        return;
    }
    nextPlayer()
}

cells.forEach((cell,index) => {
    cell.addEventListener("click", () => {
        Draw(cell,index)
    })  
})