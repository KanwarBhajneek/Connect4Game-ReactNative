export const checkInDirection = (board, curr, dx, dy, x, y) => {
  let i = 0;
  for (i = 0; i < 4; i++) {
    if (curr !== board?.[x + dx * i]?.[y + dy * i]) break;
  }
  return i;
};

export const checkWin = (board, x, y) => {
  let curr = board[x][y];
  const upDown = () => {
    return (
      checkInDirection(board, curr, -1, 0, x, y) +
        checkInDirection(board, curr, 1, 0, x, y) -
        1 >=
      4
    );
  };

  const leftRight = () => {
    return (
      checkInDirection(board, curr, 0, -1, x, y) +
        checkInDirection(board, curr, 0, 1, x, y) -
        1 >=
      4
    );
  };

  const diagLeft = () => {
    return (
      checkInDirection(board, curr, -1, -1, x, y) +
        checkInDirection(board, curr, 1, 1, x, y) -
        1 >=
      4
    );
  };
  const diagRight = () => {
    return (
      checkInDirection(board, curr, -1, 1, x, y) +
        checkInDirection(board, curr, 1, -1, x, y) -
        1 >=
      4
    );
  };

  const won = upDown() || leftRight() || diagLeft() || diagRight();

  return won;
};


export const emptyBoard = (N) => {
  let board = [];
  for (let i = 0; i < N; i++) {
    board.push(new Array(N).fill(0));
  }
  return board;
};