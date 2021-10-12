/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//  D01.01:
//  D01.02: piece representation: filled cell with classList.append; 
//  D01.03: in-memory game board: use 2D array
//  D01.04: game flow: initialization; event-driven: mouseevent to place piece => check win (check if 4 in a row; check if board is full)
//  D02.variables: change variables to let and const where possible
//  D02.other stylistic changes: 
//  D03 & 04, init: makeBoard function / makeHTMLBoard
//  D05, style: round pieces, not square pieces; 
//  D06, handleClick:
//  D07, findSpotforCol & endGame
//  D09 explain checkForWin
//  O10 animations?

//Program:
//INIT (make HTML and memory representation) => update memory representation <=> check for win

let WIDTH = 7;    //future-proof for customizable number of columns (i.e. by slider).
let HEIGHT = 6;   //future-proof for customizable number of rows (i.e. by slider).

let activePlayerID = 1; //Active player: 1 or 2
let board = [];              //Memory Representation of the playing board(board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
    
    //board = new Array(HEIGHT).fill(new Array(WIDTH).fill(0));   //for some reason Array(WIDTH).map((ele) => null); yields undefined array.
    //debug: the above methods fills each row with the exact same pointer of 'new Array(WIDTH)'... because in polyfill, the way it is implemented is that it 'value' is a single object.

    for(let y = 0; y < HEIGHT; y++){
        let row = Array(WIDTH).fill(0);
        board[y] = row;
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHTMLBoard() {
    htmlBoard = document.getElementById('board');

    // create the header cell to allow player to select a column to place in
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);

    for (let x = 0; x < WIDTH; x++) {     
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    htmlBoard.append(top);

    // create the game board cell
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
    for(let y = HEIGHT-1; y >= 0; y--){
        if(board[y][x] == 0){
            return y;
        }
    }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
    board[y][x] = activePlayerID;
    
    const targetedTableCell = `${y}-${x}`
    const newPiece = document.createElement('div');
    newPiece.className = `piece player${activePlayerID}`;
    document.getElementById(targetedTableCell).append(newPiece);
}

/** endGame: announce game end */
function endGame(msg) {
  window.alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${activePlayerID} won!`);
    }

    // check for tie
    if(!checkForTie()){
        return endGame('It is a tie! Game over.');
    }

    // switch activePlayerID 1 <-> 2
    activePlayerID = 3 - activePlayerID;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {

    function _win(cells) {  //Note: this is a callback
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match activePlayerID
    
    //this pretty much handles the border cases (i.e. horiz must stop 4 from right; vertical must start at least 4 rows down; diag.) b/c otherwise either y or x will be out of bounds
    //diagonal right: start 4 rows from top and up to at most 4 from the right; diagonal left: stop when 4 rows from bottom and start at 4 columns from the left
        return cells.every(     
        ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === activePlayerID  //checks if every cell is activePlayerID
        );
    }
 
    for (let y = 0; y < HEIGHT; y++) {  //go through each row
        for (let x = 0; x < WIDTH; x++) { 
            let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //check for horizontal win
            let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];  //check for vertical win
            let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];    //check for a diagonal win, to the right of the cell
            let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];    //check for a diagonal win, to the left of the cell
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

/** checkForTie: check board cell-by-cell for a tie case */
function checkForTie(){
    for(let row of board){
        return row.some((columnCell) => columnCell == 0);
    } //expected to return true if a 0 is detected, o.w. false.
}

function init(){
    makeBoard();
    makeHTMLBoard();
}

init();   
