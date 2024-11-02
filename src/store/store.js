import { create } from 'zustand';

import { checkWinner } from '@/lib';

const useTicStore = create((set, get) => ({
  players: [],
  //boardState : new Array(9).fill(0),
  boardState: [1, 1, 0, 0, 0, 0, 0, 0, -1],
  playerTurn: 0,
  winner: null,
  chats:[],

  actions: {
    createPlayer: () => {
      const numPlayers = get().players.length;
      if (numPlayers >= 2) return;
      const playerName = `Player ${numPlayers + 1}`;
      const playerId = crypto.randomUUID();
      // Add playerIndex to player data
      set(({ players }) => ({
        players: [
          ...players,
          {
            id: playerId,
            name: playerName,
            score: numPlayers===0?1:2,
            playerIndex: numPlayers,
          },
        ],
      }));
    },
    playerMove(cell) {
      const actPlayer = get().playerTurn;
      const newValue = actPlayer === 0 ? 1 : -1;
      const newBoard = get().boardState.map((cellval, index) =>
        index === cell ? newValue : cellval,
      );
      set({ boardState: newBoard });
      const playerData = get().players[actPlayer];
      const newPlayerData = { ...playerData, moves: playerData.moves + 1 };
      set({
        players: get().players.map((player, index) =>
          actPlayer === index ? newPlayerData : player,
        ),
      });
      set(({ playerTurn }) => ({ playerTurn: (playerTurn + 1) % 2 }));

      const winner = checkWinner(newBoard);
      set({ winner });
      if (!winner) return;
      console.log('winner');
      const resetGame = get().actions.resetGame;
      setTimeout(() => resetGame(false), 5000);
    },
    resetGame(resetScore) {
      
      set({ boardState: new Array(9).fill(0) });
      set({ playerTurn: 0 });
      set({ winner: null });
      if(resetScore) 
        get().actions.resetScore()
    },
    resetScore() {
      console.log("reset score")
      set(({ players }) => ({
        players: players.map(player => ({ ...player, score: 0 }))
      }))
    },
    addComment({message,player}){
      set(({chats})=>({chats:[...chats,{player,message,time:new Date()}]}))
      
    },
    resetChat() {
      set({ chats: [] });
    },
    
  },
}));
export default useTicStore;
