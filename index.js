// Initialize variables for game state, player scores, and rounds
let currentPlayer = 'X';
let player1Score = 0;
let player2Score = 0;
let currentRound = 1;
let totalRounds = 5;
let gameOver = false;

// Function to check for a win
function checkWin() {
    const cells = document.querySelectorAll('td');
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            // A player has won
            if (currentPlayer === 'X') {
                player1Score++;
                document.getElementById('player1-score').textContent = player1Score;
                document.getElementById('message').textContent = 'Player 1 wins!';
            } else {
                player2Score++;
                document.getElementById('player2-score').textContent = player2Score;
                document.getElementById('message').textContent = 'Player 2 wins!';
            }

            // Add a class to the winning cells
            cells[a].classList.add('win-cell');
            cells[b].classList.add('win-cell');
            cells[c].classList.add('win-cell');

            // Check if it's the last round
            if (currentRound === totalRounds) {
                gameOver = true;
                document.getElementById('message').textContent += ' Game Over!';
                document.getElementById('continue-button').style.display = 'none';
                document.getElementById('exit-button').style.display = 'inline';
                document.getElementById('restart-button').style.display = 'inline';
            } else {
                document.getElementById('message').textContent += ' Round ' + currentRound + ' is over!';
                document.getElementById('continue-button').style.display = 'inline';
            }
            document.getElementById('new-game-button').style.display = 'none';
            return;
        }
    }

    // Check for a draw
    const isDraw = [...cells].every(cell => cell.textContent);
    if (isDraw) {
        document.getElementById('message').textContent = 'It\'s a draw!';
        if (currentRound === totalRounds) {
            gameOver = true;
            document.getElementById('message').textContent += ' Game Over!';
            document.getElementById('continue-button').style.display = 'none';
            document.getElementById('exit-button').style.display = 'inline';
            document.getElementById('restart-button').style.display = 'inline';
        } else {
            document.getElementById('message').textContent += ' Round ' + currentRound + ' is over!';
            document.getElementById('continue-button').style.display = 'inline';
        }
        document.getElementById('new-game-button').style.display = 'none';
    }
}

// Function to handle a player's move
function handleMove(cell) {
    const cellIndex = cell.id.split('-')[1];

    if (cell.textContent === '' && !gameOver) {
        cell.textContent = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to handle the end of a round
function endRound() {
    currentRound++;

    // Reset the board and game state
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win-cell'); // Remove the win-cell class
    }
    )
    document.getElementById('message').textContent = '';
    document.getElementById('new-game-button').style.display = 'inline';
    document.getElementById('continue-button').style.display = 'none';
    document.getElementById('exit-button').style.display = 'none';

    currentPlayer = 'X';
    gameOver = false;
}

// Function to continue the game
function continueGame() {
    if (currentRound > totalRounds) {
        document.getElementById('restart-button').style.display = 'inline';
        document.getElementById('exit-button').style.display = 'inline';
        document.getElementById('continue-button').style.display = 'none';
    } else {
        endRound();
    }
}

// Function to exit and go to Google
function exitGame() {
    window.location.href = 'https://www.google.com';
}

// Function to restart the game
function restartGame() {
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('exit-button').style.display = 'none';
    newGame();
}

// Function to start a new game
function newGame() {
    currentRound = 1;
    player1Score = 0;
    player2Score = 0;

    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;

    endRound();
}

// Add click event listeners to the cells
const cells = document.querySelectorAll('td');
cells.forEach(cell => cell.addEventListener('click', () => handleMove(cell)));

// Add event listeners for buttons
document.getElementById('new-game-button').addEventListener('click', newGame);
document.getElementById('continue-button').addEventListener('click', continueGame);
document.getElementById('exit-button').addEventListener('click', exitGame);
document.getElementById('restart-button').addEventListener('click', restartGame);

// Start a new game initially
newGame();
