import { create } from 'zustand';
import { checkWinner } from '@/lib';

const useTicStore = create((set, get) => ({
  players: [],
  //boardState: new Array(9).fill(0),
  boardState: [1, 1, 0,-1, -1, 0, 0, 0, 0],
  playerTurn: 0,
  winner: null,
  chats: [],

  actions: {
    createPlayer: () => {
      const numPlayers = get().players.length;
      if (numPlayers >= 2) return;
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
    playerMove(cell) {
      const actPlayer = get().playerTurn;
      const newValue = actPlayer === 0 ? 1 : -1;
      const newBoard = get().boardState.map((cellval, index) =>
        index === cell ? newValue : cellval
      );
      set({ boardState: newBoard });

      const playerData = get().players[actPlayer];
      const newPlayerData = { ...playerData, moves: (playerData.moves || 0) + 1 };
      set({
        players: get().players.map((player, index) =>
          actPlayer === index ? newPlayerData : player
        ),
      });

      // Verificar si hay un ganador
      const winner = checkWinner(newBoard);
      //si no hay ganador nos salimos de la funcion cambiando el turno
      if (!winner) return   set(({ playerTurn }) => ({ playerTurn: (playerTurn + 1) % 2 }));
        

        // Incrementa el puntaje del jugador ganador
        set(({players})=>({
        players: players.map((player) =>
          winner.winnerPlayer === player.playerIndex ? {...player,score:player.score+1} : player
        )
      }));
        set({ winner }); // Guarda el índice del jugador ganador en el estado

        // Resetea el juego después de un tiempo
        setTimeout(() => get().actions.resetGame(false), 5000);
      
        
      
      
    },
    
    resetGame(resetScore) {
      set({ boardState: new Array(9).fill(0) });
      set({ playerTurn: 0 });
      set({ winner: null });
      get().actions.resetChat();
      if (resetScore) get().actions.resetScore();
    },
    resetScore() {
      set(({ players }) => ({
        players: players.map(player => ({ ...player, score: 0 }))
      }));
    },
    addComment({ message, player }) {
      set(({ chats }) => ({
        chats: [...chats, { player, message, time: new Date() }]
      }));
    },
    resetChat() {
      set({ chats: [] });
    },
  },
}));

export default useTicStore;
