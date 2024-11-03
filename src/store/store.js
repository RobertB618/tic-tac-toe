import { create } from 'zustand';
import { checkWinner } from '@/lib';

// Zustand store to manage the state of the Tic Tac Toe game
const useTicStore = create((set, get) => ({
  // Players array to store player information
  players: [],
  
  // Initial board state, represented by a 3x3 grid flattened into an array
  // Values: 0 = empty, 1 = player 1, -1 = player 2
  boardState: [1, 1, 0, -1, -1, 0, 0, 0, 0],
  
  // Variable to track the current player's turn (0 = Player 1, 1 = Player 2)
  playerTurn: 0,
  
  // Winner of the game (can be null or contain information about the winner)
  winner: null,

  // Chats array to store the chat messages between players
  chats: [],

  actions: {
    // Action to create a new player
    createPlayer: () => {
      const numPlayers = get().players.length;
      if (numPlayers >= 2) return; // Limit to 2 players
      const playerName = `Player ${numPlayers + 1}`;
      const playerId = crypto.randomUUID();
      set(({ players }) => ({
        players: [
          ...players,
          {
            id: playerId,
            name: playerName,
            score: 0,
            playerIndex: numPlayers,
          },
        ],
      }));
    },

    // Action to make a move on the board
    playerMove(cell) {
      const actPlayer = get().playerTurn;
      const newValue = actPlayer === 0 ? 1 : -1; // Set value based on current player
      const newBoard = get().boardState.map((cellval, index) =>
        index === cell ? newValue : cellval // Update the cell with the player's move
      );

      // Update board state
      set({ boardState: newBoard });

      // Update player move count
      const playerData = get().players[actPlayer];
      const newPlayerData = { ...playerData, moves: (playerData.moves || 0) + 1 };
      set({
        players: get().players.map((player, index) =>
          actPlayer === index ? newPlayerData : player
        ),
      });

      // Check if there is a winner
      const winner = checkWinner(newBoard);
      if (!winner) {
        // If no winner, change turn to the next player
        return set(({ playerTurn }) => ({ playerTurn: (playerTurn + 1) % 2 }));
      }

      // Increment the score of the winning player
      set(({ players }) => ({
        players: players.map((player) =>
          winner.winnerPlayer === player.playerIndex
            ? { ...player, score: player.score + 1 }
            : player
        ),
      }));

      // Store winner information in the state
      set({ winner });

      // Reset the game after 5 seconds if there's a winner
      setTimeout(() => get().actions.resetGame(false), 5000);
    },

    // Action to reset the game state
    resetGame(resetScore) {
      set({ boardState: new Array(9).fill(0) }); // Clear the board
      set({ playerTurn: 0 }); // Reset to Player 1's turn
      set({ winner: null }); // Clear winner information
      get().actions.resetChat(); // Clear chat history
      if (resetScore) get().actions.resetScore(); // Optionally reset player scores
    },

    // Action to reset player scores
    resetScore() {
      set(({ players }) => ({
        players: players.map((player) => ({ ...player, score: 0 }))
      }));
    },

    // Action to add a new chat message
    addComment({ message, player }) {
      set(({ chats }) => ({
        chats: [...chats, { player, message, time: new Date() }]
      }));
    },

    // Action to reset chat history
    resetChat() {
      set({ chats: [] });
    },
  },
}));

export default useTicStore;
