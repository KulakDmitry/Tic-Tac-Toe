import React, { useState } from "react";
import styles from "./styles.css";

function calculateWinner(squares) {
const winPositions = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]

for (let i = 0; i < winPositions.length; i++) {
  const [a,b,c] = winPositions[i]
  if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    return squares[a]
  }
}

  
}

const Square = ({ value, onClick }) => {
  return (
    <button className={"square " + value} onClick={() => onClick()}>
      {value}
    </button>
  );
};

const Board = ({ cells, squares, onClick }) => {
  const rowsArr = [0, 1, 2];
  let counter = 1;

  return (
    <div className="board">
      {rowsArr.map((row, index) => (
        <div key={index} className="board-row">
          {cells.slice(row * 3, counter++ * 3).map((cellID) => (
            <Square
              key={cellID.toString()}
              value={squares[cellID]}
              onClick={() => onClick(cellID)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Status = ({ squares, xIsCurrentPlayer }) => {
  const winner = calculateWinner(squares);
  const effect = winner ? "winner" : "";
  let status;

  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Current player is: ${xIsCurrentPlayer ? "x" : "o"}`;
  }

  return (
    <div className="game-info__status">
      <div className={"status " + effect}>{status}</div>
    </div>
  );
};


const Game = () => {
const [squares, setSquares] = useState(Array(9).fill(null))
const [xIsCurrentPlayer, setxIsCurrentPlayer] = useState(true)
  

  const handleClick = (clickedSquareIndex) => {
if(squares[clickedSquareIndex] || calculateWinner(squares)) {
  return
}

    const newSquares = [...squares]
    newSquares[clickedSquareIndex] = xIsCurrentPlayer ? "X" : "0"
    setSquares(newSquares)

    setxIsCurrentPlayer(!xIsCurrentPlayer)
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={handleClick}
          cells={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        />
      </div>
      <div className="game-info">
        <Status squares={squares} xIsCurrentPlayer={xIsCurrentPlayer} />
      </div>
    </div>
  );
};

export default Game;
