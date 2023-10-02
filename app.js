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

    setActiveBoard(cell.id);

    // Switch to the other player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function setActiveBoard(cellId) {
    // remove highlights from all sub-boards
    document.querySelectorAll('.sub-board').forEach(board => {
        board.classList.remove('active');
    });

    // Get the last character from the cell id (1-9)
    const nextBoardNumber = cellId.charAt(cellId.length - 1);

    // Find the corresponding sub-board
    activeBoard = document.querySelector('#board-${nextBoardNumber}');

    // If the active board is full, allow any unfilled board to be the active board
    if (isBoardFull(activeBoard)) {
        activeBoard = null;
    } else {
        // Otherwise, highlight the active board
        activeBoard.classList.add('active');
    }
}

// Function to check if a board is full
function isBoardFull(board) {
    return Array.from(board.querySelectorAll('.cell')).every(cell => cell.textContent !== '');
}

