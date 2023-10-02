// Initialize a variable to keep track of the current player
let currentPlayer = 'X';
let activeBoard = null;
let overallBoard = Array(9).fill(null); // this array will keep track of who won each sub-board

// Add a click event listener to each cell
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Get the game message element
const gameMessage = document.getElementById('game-message');

// Function to handle the cell click event
function handleCellClick(event) {
    const cell = event.target;
    const subBoard = cell.closest('.sub-board');
    const subBoardIndex = Array.from(document.querySelectorAll('.sub-board')).indexOf(subBoard);

    // Check if the sub-board or cell is already won
    if (subBoard.classList.contains('win-x') || subBoard.classList.contains('win-o') || cell.classList.contains('won')) {
        return;
    }

    // Check if it is not the active board
    if (activeBoard && subBoard !== activeBoard) {
        return;
    }

    // Check if the cell is already filled
    if (cell.textContent !== '') {
        return;
    }

    // Fill the cell with the current player's symbol
    cell.textContent = currentPlayer;

    // Check for a win in the sub-board
    if (checkWin(subBoard, '.cell')) {
        subBoard.classList.add(`win-${currentPlayer.toLowerCase()}`);
        subBoard.querySelectorAll('.cell').forEach(cell => cell.classList.add('won'));
        overallBoard[subBoardIndex] = currentPlayer;
    }

    // Check for a win in the overall board
    if (checkOverallWin()) {
        lockAllBoards();
        gameMessage.textContent = `Player ${currentPlayer} Wins!`;
        return;
    }

    // Set the next active board based on the cell's position in its sub-board.
    setActiveBoard(Array.from(subBoard.children).indexOf(cell));

    // Switch to the other player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function lockAllBoards() {
    document.querySelectorAll('.sub-board').forEach(subBoard => {
        subBoard.classList.add('locked');
        subBoard.querySelectorAll('.cell').forEach(cell => cell.classList.add('won'));
    });
}

function setActiveBoard(index) {
    // remove highlights from all sub-boards
    document.querySelectorAll('.sub-board').forEach(board => {
        board.classList.remove('active');
    });

    // Find the corresponding sub-board
    activeBoard = document.querySelectorAll('.sub-board')[index];

    // If the active board is full or null, unset activeBoard, allowing a click on any board.
    if (!activeBoard || isBoardFull(activeBoard) || activeBoard.classList.contains('win-x') || activeBoard.classList.contains('win-o')) {
        activeBoard = null;
    } else {
        // Otherwise, add the active class to the new active board.
        activeBoard.classList.add('active');
    }
}

// Function to check if a board is full
function isBoardFull(board) {
    return Array.from(board.querySelectorAll('.cell')).every(cell => cell.textContent !== '');
}

// Function to check for a win in a board
function checkWin(parent, selector) {
    const elements = Array.from(parent.querySelectorAll(selector));
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    return winningCombos.some(combo => combo.every(index => elements[index] && elements[index].textContent === currentPlayer));
}

// Function to check for win on the overall board
function checkOverallWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return winningCombos.some(combo => combo.every(index => overallBoard[index] === currentPlayer));
}