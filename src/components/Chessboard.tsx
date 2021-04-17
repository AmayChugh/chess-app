import React from "react";

import './Chessboard.css';

const horizontalaxis = ["a","b","c","d","e","f","g","h"];
const verticalaxis = [1,2,3,4,5,6,7,8];
export default function Chessboard(){
    let board = []
    for(let j = verticalaxis.length-1; j >= 0; j--) {  
        for (let i = 0; i < horizontalaxis.length; i++) {
            const number = j+i+2;
            if (number%2 === 0){
                board.push(<div className="tile black-tile">[{horizontalaxis[i]}{verticalaxis[j]}]</div>)
            }else{
                board.push(<div className="tile white-tile">[{horizontalaxis[i]}{verticalaxis[j]}]</div>)
            }
          
    }
  }
    return <div id="chessboard">{board}</div>
}
