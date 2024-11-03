import useTicStore from "@/store";
import Cross from "./cross";
import Circle from "./circle";
import { usePlayer } from '@/hooks/player-context';
import WinnerCombo from "./winner-combo";

// Board component representing the entire Tic Tac Toe board
function Board() {
  // Create a list of cells for the board (total 9 cells)
  const cellList = new Array(9).fill(0).map((_, index) => {
    return <Cell key={index} cellNum={index} />;
  });

  return (
    <div className="relative grid grid-cols-3 gap-[1px] border-[#454545] border-[1px] rounded-xl overflow-clip bg-[#7d7d7d]">
      {/* Component to draw the winning line if there's a winner */}
      <WinnerCombo />
      {/* Render all cells */}
      {cellList}
    </div>
  );
}

export default Board;

// Cell component representing an individual cell in the Tic Tac Toe board
function Cell({ cellNum }) {
  // Get the player index (0 or 1) from context
  const { playerIndex } = usePlayer();

  // Get the value of the current cell from the board state
  const cellValue = useTicStore((state) => state.boardState[cellNum]);
  
  // Get the current player's turn
  const playerTurn = useTicStore((state) => state.playerTurn);

  // Get the playerMove action to update the board
  const playerMove = useTicStore((state) => state.actions.playerMove);

  // Get the winner state to know if the game is already over
  const winner = useTicStore((state) => state.winner);

  // Determine which component to display in the cell (Cross for Player 1 or Circle for Player 2)
  const IconComponent = cellValue === 1 ? Cross : Circle;

  // Click handler for each cell
  const clickHandler = () => {
    // Prevent making a move if:
    // - The cell already has a value (either 1 or -1)
    // - The game has already ended (there's a winner)
    // - It's not the current player's turn
    if (cellValue || winner || playerIndex !== playerTurn) return;

    // Make a move if conditions are met
    playerMove(cellNum);
  };

  // Determine player value based on the player index
  const playerValue = playerIndex === 0 ? 1 : -1;

  return (
    <div
      className="flex justify-center items-center w-[5vw] aspect-square bg-[#313131]"
      onClick={clickHandler}
    >
      {/* Render the Cross or Circle component if the cell has a value */}
      {cellValue ? (
        <IconComponent className={cellValue !== playerValue ? "saturate-[0.2]" : ""} />
      ) : null}
    </div>
  );
}