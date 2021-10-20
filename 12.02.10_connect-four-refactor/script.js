/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 class Game{

  constructor (gameWallHeight = 6, gameWallWidth = 7){

    this.HEIGHT = gameWallHeight;
    this.WIDTH = gameWallWidth;
    this.gameBoard = [];
    this.currentPlayer = 1;
    //this.playerCount = 2; //this can become a parameter for later development so that there are more than 2 players.

  }

  /** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
  initializeBoard(){

    for (let y = 0; y < this.HEIGHT; y++) {
      this.gameBoard.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */
  initializeHTMLBoard(){
    //create board
    const board = document.getElementById('board');

    // make interactive top row to place the piece
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.clickHandler);
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }

  }

  /** findColumnSpotHandler: given column x, return top empty y (null if filled); handler function */
  findColumnSpotHandler(x){
    console.log(`this: ${this}`);
    for(let y = this.HEIGHT-1; y >= 0; y--){
      if(!this.gameBoard[y][x])
        return y;
    }

    return null;

  }

  /** placePieceInTableHandler: update DOM to place piece into HTML table of board */
  placePieceInTableHandler(y, x){
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.classList.add(`p${this.currentPlayer}`);
      piece.style.top = -50 * (y + 2);
    
      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);  
  }


  endGameHandler(message){
    alert(message);
  }

  /** checkWinHandler: check board cell-by-cell for "does a win start here?" */
  checkWinHandler() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match this.currentPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          board[y][x] === this.currentPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }

  /** clickHandler: handle click of column top to play piece */
  clickHandler(evt) {

    console.log(this);
    //need a reliable way to get both 'evt' parameter and the instance of the class as 'this'
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findColumnSpotHandler(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.gameBoard[y][x] = this.currentPlayer;
    this.placePieceInTableHandler(y, x);
    
    // check for win
    if (this.checkWinHandler()) {
      return this.endGameHandler(`Player ${this.currentPlayer} won!`);
    }
    
    // check for tie
    if (this.gameBoard.every(row => row.every(cell => cell))) {
      return this.endGameHandler('Tie!');
    }
      
    // switch players
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

}

function initializeGame(){

  let boardHTMLElement = document.getElementById('board');

  while(boardHTMLElement.firstChild){
    boardHTMLElement.removeChild(boardHTMLElement.firstChild);
  }

  const game = new Game();
  game.initializeBoard();
  game.initializeHTMLBoard();

}

function onload(){

  document.getElementById('startGameButton').addEventListener('click',initializeGame);


}

document.addEventListener('DOMContentLoaded',onload);