import { create } from 'zustand';
import { checkWinner } from '@/lib';
const useTicStore = create((set, get) => ({
  players : [],
  //boardState : new Array(9).fill(0),
  boardState : [1,1,0,0,0,0,0,0,-1],
  playerTurn:0,
  winner:null,
  
  actions: {
    createPlayer: () => { 
        const numPlayers = get().players.length;
        if(numPlayers>=2) return
        const playerName = `Player${numPlayers + 1}`;
        const playerId = crypto.randomUUID();
        
        set(({players})=>({players:[...players,{id:playerId,name:playerName , moves:0}]}))

    },
    playerMove(cell) {
      const actPlayer = get().playerTurn;
      const newValue = actPlayer === 0 ? 1 : -1;
      const newBoard = get().boardState.map((cellval, index) =>
        index === cell ? newValue : cellval,
      );
      set({ boardState: newBoard });
      const playerData= get().players[actPlayer];
      const newPlayerData = { ...playerData,moves:playerData.moves+1 };
      set({ players: get().players.map((player,index )=> actPlayer === index ? newPlayerData : player) });
      set(({ playerTurn }) => ({ playerTurn: (playerTurn + 1) % 2 }));

      const winner = checkWinner(newBoard);
      set({ winner });
      if (!winner) return;
      console.log('winner');
      const resetGame = get().actions.resetGame;
      setTimeout(() => resetGame(), 5000);
    },
    resetGame(){
      console.log("reset")
      set({boardState:new Array(9).fill(0)})
      set({playerTurn:0})
      set({winner:null})
    }
    

  },
}));
export default useTicStore

