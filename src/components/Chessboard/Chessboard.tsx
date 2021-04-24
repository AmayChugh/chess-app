import React from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';
import { useRef } from 'react';

const horizontalaxis = ["a","b","c","d","e","f","g","h"];
const verticalaxis = [1,2,3,4,5,6,7,8];
interface Piece {
    image: string;
    x: number;
    y: number;
}
const pieces : Piece[] = [];
for (let p = 0 ; p < 2; p++ ){
    const type = p === 0 ? "b" : "w";
    const y = p === 0 ? 7 : 0
    pieces.push({ image: `assets/images/rook_${type}.png`, x:0 ,y: y})
    pieces.push({ image: `assets/images/knight_${type}.png` ,x:1 ,y: y})
    pieces.push({ image: `assets/images/bishop_${type}.png`, x:2 ,y: y})
    pieces.push({ image: `assets/images/king_${type}.png`, x:3 ,y: y})
    pieces.push({ image: `assets/images/queen_${type}.png`, x:4 ,y: y})
    pieces.push({ image: `assets/images/bishop_${type}.png`, x:5 ,y: y})
    pieces.push({ image: `assets/images/knight_${type}.png`, x:6 ,y: y})
    pieces.push({ image: `assets/images/rook_${type}.png`, x:7 ,y: y})
    
    

    
}

for (let  i = 0; i < 8; i++){
    pieces.push( { image:"assets/images/pawn_b.png" , x: i,y: 6} );    
}
for (let  i = 0; i < 8; i++){
    pieces.push( { image: "assets/images/pawn_w.png", x: i,y: 1} );    
}

export default function Chessboard(){
    const chessboardRef = useRef<HTMLDivElement>(null);

    let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent){
    const element  = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")){
        console.log(e)
        const x = e.clientX -50;
        const y = e.clientY -50;
        
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;

    }
}
function movePiece(e: React.MouseEvent){
    // const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current
    if (activePiece && chessboard){
        console.log(e)
        const minX = chessboard.offsetLeft-25;
        const maxX = chessboard.offsetLeft + chessboard.clientWidth-75;
        const minY = chessboard.offsetTop-25;
        const maxY = chessboard.offsetTop + chessboard.clientHeight-75;    
        const x = e.clientX -50;
        const y = e.clientY -50;
        
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;

        activePiece.style.left = (x < minX) ? `${minX}px` : `${x}px`;
        activePiece.style.top  = (y < minY) ? `${minY}px` : `${y}px`;
        activePiece.style.left = (x > maxX) ? `${maxX}px` : `${x}px`;
        activePiece.style.top = (y > maxY) ? `${maxY}px` : `${y}px`;

    }
    console.log(activePiece)
}

function dropPiece(e: React.MouseEvent){
    if(activePiece){
        activePiece = null;
    }
}


    let board = []
    for(let j = verticalaxis.length-1; j >= 0; j--) {  
        for (let i = 0; i < horizontalaxis.length; i++) {
            const number = j + i + 2;
            let image  = undefined;
            pieces.forEach((p) =>{
                if (p.x === i && p.y === j){
                    image = p.image;
                }

            });
            board.push(<Tile key={`${i},${j}`} image= {image} number = {number}/> );
            // if (number%2 === 0){
            //     board.push(<Tile />)
            // }else{
            //     board.push(<Tile />)
            // }
          
    }
  }
    return <div 
    onMouseMove={e => movePiece(e)} 
    onMouseDown={e => grabPiece(e)} 
    onMouseUp={e => dropPiece(e)}
    id="chessboard"
    ref = {chessboardRef}
    >{board}</div>
    
  }
