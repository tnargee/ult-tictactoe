// Initialize a variable to keep track of the current player
let currentPlayer = 'X';
let activeBoard = null;

// Add a click event listener to each cell
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Function to handle the cell click event
function handleCellClick(event) {
    const cell = event.target;
    const subBoard = cell.closest('.sub-board');

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
    if (checkWin(subBoard, currentPlayer)) {
        subBoard.classList.add(currentPlayer === 'X' ? 'win-x' : 'win-o');
        subBoard.querySelectorAll('.cell').forEach(cell => cell.classList.add('won'));
    }

    // Set the next active board based on the cell's position in its sub-board.
    setActiveBoard(Array.from(subBoard.children).indexOf(cell));

    // Switch to the other player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function setActiveBoard(index) {
    // remove highlights from all sub-boards
    document.querySelectorAll('.sub-board').forEach(board => {
        board.classList.remove('active');
    });

    // Find the corresponding sub-board
    activeBoard = document.querySelectorAll('.sub-board')[index];

    // If the active board is full or null, unset activeBoard, allowing a click on any board.
    if (!activeBoard || isBoardFull(activeBoard)) {
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

function checkWin(board, player) {
    const cells = Array.from(board.querySelectorAll('.cell'));
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];
    return winningCombos.some(combo => combo.every(index => cells[index].textContent === player));
}