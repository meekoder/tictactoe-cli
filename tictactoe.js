const prompt = require('prompt');

let board = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' '
};

const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

const updateBoard = (position, player) => {
  board[position] = player.toUpperCase();
};

const printBoard = () => {
  console.log(` 
    ${board[1]} | ${board[2]} | ${board[3]}
    ----------
    ${board[4]} | ${board[5]} | ${board[6]}
    ----------
    ${board[7]} | ${board[8]} | ${board[9]}
  `);
};

const moveIsValid = (position) => {
  const isNum = isNaN(position) ? false : (parseFloat(position));
  return (isNum && board[position] === ' ');
};

const checkDraw = () => {
  for (let i = 1; i <= 9; i++) {
    if (board[i] === ' ') {
      return false;
    }
  }
  return true;
};

const checkWin = (player) => {
  for (let i = 0; i < winningCombos.length; i++) {
    let markCount = 0;
    for (let j = 0; j < winningCombos[i].length; j++) {
      if (board[winningCombos[i][j]] === player) {
        markCount++;
      }
      if (markCount === 3) {
        return true;
      }
    }
  }
  return false;
};

const ticTacToe = (player) => {
  console.log(`Player ${player}'s turn!`);
  prompt.start();
  prompt.get(['position'], (err, result) => {
    if (moveIsValid(result.position)) {
      updateBoard(result.position, player);
      printBoard();
      if (checkWin(player)) {
        console.log(`Player ${player} Wins!`);
        return;
      }
      if (checkDraw()) {
        console.log('DRAW! Play Again.');
        return;
      }
      if (player === 'X') {
        ticTacToe('O');
      } else {
        ticTacToe('X');
      }
    } else {
      console.log('Your choice must be a number and a currently open space! Please try again...');
      ticTacToe(player);
    }
  });
}

console.log(`
  WELCOME TO TICTACMEEKO!!
  GOOD LUCK, HAVE FUN!
  Please use this reference to make your moves:
    1 | 2 | 3
    ----------
    4 | 5 | 6
    ----------
    7 | 8 | 9
    `);

ticTacToe('X');
