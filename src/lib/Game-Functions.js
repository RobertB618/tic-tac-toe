export function checkWinner(boardState){
      // vars used for accumulate values
      const cols=[0,0,0]
      const rows=[0,0,0]
      let diag=0
      let diagInv=0

      for(let x=0;x<9;x++)
      {
      
        let col=x%3
        let row=Math.floor(x/3)
      
        //add value to accumulator of column of the cell
        cols[col]+=boardState[x]
      
        //add value to accumulator of row of the cell
        rows[row]+=boardState[x]
      
        // acculate value to  diagonal only if col===row (criteria of main diagonal cells)
        diag+=col===row ? boardState[x]:0
      
        // acculate value to inverse diagonal only if col+row===2 (criteria of inverse diagonal)
        diagInv+=col+row===2 ? boardState[x]:0
      } 
      
      //create an array with all values for easy check winner and location
      const results=[...cols,...rows,diag,diagInv]
     
      /* Some player has won only some of the sum should be 3 or -3.
         if some row column or diagonal have a diferent value  of 3
         means not all cells are populated or there is a mix of
         positive and negative values
      */
      const winnerIndex=results.findIndex((value)=>Math.abs(value)===3)

      if(winnerIndex===-1) return false

      /* since Player 1 (0) has a value of 1 in each cell 
         player 1 win is equivalent to find an accumulated
         value of 3. Player 2 (1) has a value of -1 wich
         accumulate a total of -3
      */ 
      const winner=results[winnerIndex]===3?0:1

      let winplace=null
      
      // if index is lower than 3 (0,1,2) player has won in accumulating in different cols mean win a row
      if(winnerIndex<3) winplace={location:"col",position:winplace}

      // if index is between 3 and 5 (3,4,5) player has won in accumulating in different row mean win a col
      if(winnerIndex>=3 && winplace<6) winplace={location:"row",position:winplace-3}

      //if index is 6 player has won in main diagonal
      if(winnerIndex==6) winplace={location:"maindiag"}

      //if index is 7 player has won in inversed diagonal
      if(winnerIndex==7) winplace={location:"invdiag"}

      //this condition never should happen is added for security
      if(!winplace) return
            
      return {winner,winplace}

    }