
//function to create a board
function makeBoard() {
    //keep track of current player
    let currentPlayer = 'X';
    let num = 1;
    let board = document.getElementById('board');

    
    //Loop through the rows
    for (let r = 0; r < 3; r++) {
        let row = document.createElement('div');
        row.setAttribute('class','row');

        //Loop through the columns
        for (let c = 0; c < 3; c++) {
            let cell = document.createElement('div');
            cell.setAttribute('class','cell');
            cell.setAttribute('data-row', r);
            cell.setAttribute('data-col', c);

            //add event listener
            cell.addEventListener('click', function() {
                // Check if cell is empty
                if (!cell.textContent) {
                    cell.textContent = currentPlayer; // Set cell content to current player
                    // Check for win or draw
                    if (checkWin(cell)) {
                        alert("Player " + currentPlayer + " wins!");
                        resetBoard();
                    } else if (checkDraw()) {
                        alert("It's a draw!");
                        resetBoard();
                    } else {
                        // Switch players
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    }
                }
            });

            row.append(cell);
            num++;
        }

        board.append(row);
    }


}

// Function to check if a player has won
function checkWin(cell) {
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));
    const currentPlayer = cell.textContent;

    // Check row
    if (checkLine(0, col, 1, 0, currentPlayer)) return true;
    // Check column
    if (checkLine(row, 0, 0, 1, currentPlayer)) return true;
    // Check diagonal
    if (row === col && checkLine(0, 0, 1, 1, currentPlayer)) return true;
    // Check anti-diagonal
    if (row + col === 2 && checkLine(0, 2, 1, -1, currentPlayer)) return true;

    return false;
}

// Function to check if there is a winning line
function checkLine(startRow, startCol, rowInc, colInc, currentPlayer) {
    for (let i = 0; i < 3; i++) {
        const cell = document.querySelector(`.cell[data-row="${startRow + i * rowInc}"][data-col="${startCol + i * colInc}"]`);
        if (cell.textContent !== currentPlayer) return false;
    }
    return true;
}

// Function to check for a draw
function checkDraw() {
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        if (!cell.textContent) return false;
    }
    return true;
}

// Function to reset the board
function resetBoard() {
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.textContent = '';
    }
}

makeBoard();
