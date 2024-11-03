import GameLayout from './layout';

import './App.css';
import useTicStore from './store';
import { useEffect } from 'react';


function App() {

  const addPlayer = useTicStore((state) => state.actions.createPlayer);
  

  
  useEffect(() => {
    addPlayer();
    addPlayer();
    
  }, [addPlayer])
  
  return (
    <div className="flex justify-center  w-screen h-screen text-white">
      <GameLayout />
    
    </div>
  );
}

export default App;
