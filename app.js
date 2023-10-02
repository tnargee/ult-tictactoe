// Initialize a variable to keep track of the current player
let currentPlayer = 'X';

// Add a click event listener to each cell
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Function to handle the cell click event
function handleCellClick(event) {
    const cell = event.target;

    // Check if the cell is already filled
    if (cell.textContent !== '') {
        return;
    }

    // Fill the cell with the current player's symbol
    cell.textContent = currentPlayer;

    // Switch to the other player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

