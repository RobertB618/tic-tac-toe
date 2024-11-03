export function checkWinner(boardState) {
  // vars used for accumulate values
  const cols = [0, 0, 0];
  const rows = [0, 0, 0];
  let diag = 0;
  let diagInv = 0;

  for (let x = 0; x < 9; x++) {
    let col = x % 3;
    let row = Math.floor(x / 3);

    //add value to accumulator of column of the cell
    cols[col] += boardState[x];

    //add value to accumulator of row of the cell
    rows[row] += boardState[x];

    // acculate value to  diagonal only if col===row (criteria of main diagonal cells)
    diag += col === row ? boardState[x] : 0;

    // acculate value to inverse diagonal only if col+row===2 (criteria of inverse diagonal)
    diagInv += col + row === 2 ? boardState[x] : 0;
  }

  //create an array with all values for easy check winner and location
  const results = [...cols, ...rows, diag, diagInv];

  /* Some player has won only some of the sum should be 3 or -3.
         if some row column or diagonal have a diferent value  of 3
         means not all cells are populated or there is a mix of
         positive and negative values
      */
  const winnerIndex = results.findIndex((value) => Math.abs(value) === 3);
  console.log('winnerIndex', winnerIndex);
  if (winnerIndex === -1) return false;

  /* since Player 1 (0) has a value of 1 in each cell 
         player 1 win is equivalent to find an accumulated
         value of 3. Player 2 (1) has a value of -1 wich
         accumulate a total of -3
      */
  const winner = results[winnerIndex] === 3 ? 0 : 1;

  let winplace = null;

  // if index is lower than 3 (0,1,2) player has won in accumulating in different cols mean win a row
  if (winnerIndex < 3)
    winplace = { location: 'col', position: winnerIndex + 1 };

  // if index is between 3 and 5 (3,4,5) player has won in accumulating in different row mean win a col
  if (winnerIndex >= 3 && winnerIndex < 6)
    winplace = { location: 'row', position: winnerIndex - 2 };

  //if index is 6 player has won in main diagonal
  if (winnerIndex == 6) winplace = { location: 'maindiag' };

  //if index is 7 player has won in inversed diagonal
  if (winnerIndex == 7) winplace = { location: 'invdiag' };

  //this condition never should happen is added for security
  if (!winplace) return;
  console.log('winplace', winplace);
  return { winnerPlayer:winner, winplace };
}

export function getWinningCells(winplace) {
  if (winplace.location === 'row') {
    // Return all cells in the winning row
    const dots = Array.from({ length: 3 }, (_, col) => ({
      cy: ((winplace.position  ) * 100) / 3 - 100 / 6,
      cx: (col * 100) / 3 + 100 / 6,
    }));

    return dots;
  }

  if (winplace.location === 'col') {
    // Return all cells in the winning column
    const dots = Array.from({ length: 3 }, (_, row) => ({
      cy: (row * 100) / 3 + 100 / 6,
      cx: ((winplace.position ) * 100) / 3 - 100 / 6,
    }));
    return dots;
  }

  if (winplace.location === 'maindiag') {
    // Return cells in the main diagonal (top-left to bottom-right)
    const dots = [
      { cx: 100 / 6, cy: 100 / 6 },
      { cx: 50, cy: 50 },
      { cx: 500 / 6, cy: 500 / 6 },
    ];
    return dots;
  }

  if (winplace.location === 'invdiag') {
    // Return cells in the inverse diagonal (top-right to bottom-left)
    const dots = [
      { cx: 100 / 6, cy: 500 / 6 },
      { cx: 50, cy: 50 },
      { cx: 500 / 6, cy: 100 / 6 },
    ];

    return dots;
  }

  // If no valid winplace location is provided, return an empty array
  return [];
}

//
export function getLine(dots) {
  const extension = 10;
  const start = dots[0];
  const end = dots[2];

  // Calculate direction vector (dx, dy) from start to end
  const dx = end.cx - start.cx;
  const dy = end.cy - start.cy;

  // Calculate the length of the vector
  const length = Math.sqrt(dx * dx + dy * dy);

  // Normalize the direction vector and apply the extension
  const extendX = (dx / length) * extension;
  const extendY = (dy / length) * extension;

  // Adjust start and end points
  const extendedStart = {
    x1: start.cx - extendX,
    y1: start.cy - extendY,
  };
  const extendedEnd = {
    x2: end.cx + extendX,
    y2: end.cy + extendY,
  };

  // Return the extended line coordinates
  return {
    x1: extendedStart.x1,
    y1: extendedStart.y1,
    x2: extendedEnd.x2,
    y2: extendedEnd.y2,
  };
}
