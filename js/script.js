// here im storing declairing variables, arrays, current players, strings,
const showStatus = document.querySelector('.status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]; // this allows me to track played cells and store the current game state
//these are the win loss draw messages
const victory = () => `${currentPlayer} has won!`;
const draw = () => `Run it back!!`;
const currentTurn = () => `It's ${currentPlayer}'s turn`;
// this shows whos current turn it is
showStatus.innerHTML = currentTurn();

// these are the winning conditions, i took them from another source because i was NOT going to do all that math on my own, fuck that.
const winningConditions = [
    [2, 4, 6],
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [0, 4, 8],
    [6, 7, 8]

];

// this is for the basic modal i have, just a basic start button
const modalButton = document.querySelector('body > div.modal > button.startButton');
const modal = document.querySelector('body > div.modal')

//this allows for the click to be heard on each cell
document.querySelectorAll('.cell').forEach(cell =>
  cell.addEventListener('click', cellClick));

// restart button
document.querySelector('.restart').addEventListener('click', restartGame);

const toggleClass = (node, className) => { // node is an element
  node.classList.toggle(className)
}


// Game Logic
// this is where ill get all the "cells" attribute from the click cell to locate the clicked cell on the grid
// had to do a bit of research on this, took me a few days. figured it out tho.
//the getAttribute returns a string. so parse it returns an actual num to an integer, stilla bit iffy on that but it seems to work
function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('gameblock'));



// this checks if a cell has been clicked, if so, use the break to ignore it.
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    cellPlayed(clickedCell, clickedCellIndex);
    Results();
}

//this just updates the game and tells us whos turn it is
function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}


// player change, loss and win
function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    showStatus.innerHTML = currentTurn();
}

// for loop that checks who win (space game helped me understand for loops a LOT)
function Results() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        showStatus.innerHTML = victory();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        showStatus.innerHTML = draw();
        gameActive = false;
        return;
    }
    playerChange();
}


// game restart
function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    showStatus.innerHTML = currentTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Modal
modalButton.addEventListener('click', (e) =>{
  toggleClass(modal, 'open')
})
