const SIZE = 4;

export const createBoard = (): number[][] =>
  Array(SIZE)
    .fill(0)
    .map(() => Array(SIZE).fill(0));

export const addRandomTile = (board: number[][]): number[][] => {
  const emptyCells: [number, number][] = [];

  board.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell === 0) emptyCells.push([r, c]);
    })
  );

  if (emptyCells.length === 0) return board;

  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[r][c] = Math.random() < 0.9 ? 2 : 4;
  return board;
};

const mergeRow = (row: number[]): number[] => {
  let filtered = row.filter((n) => n !== 0);

  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      filtered[i + 1] = 0;
    }
  }

  filtered = filtered.filter((n) => n !== 0);

  while (filtered.length < SIZE) filtered.push(0);

  return filtered;
};

export const moveLeft = (board: number[][]): number[][] =>
  board.map((row) => mergeRow(row));

export const moveRight = (board: number[][]): number[][] =>
  board.map((row) => mergeRow([...row].reverse()).reverse());

const transpose = (matrix: number[][]): number[][] =>
  matrix[0].map((_, i) => matrix.map((row) => row[i]));

export const moveUp = (board: number[][]): number[][] =>
  transpose(moveLeft(transpose(board)));

export const moveDown = (board: number[][]): number[][] =>
  transpose(moveRight(transpose(board)));

export const canMove = (board: number[][]): boolean => {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return true;
      if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return true;
      if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
};
