import { useState } from "react";
import "./style.css";

function Square({ value, onSquareClick, isOldMove }) {
  return (
    <button
      className={`square ${isOldMove ? "old-move" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, xMoves, oMoves }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    let nextXMoves = [...xMoves];
    let nextOMoves = [...oMoves];

    if (xIsNext) {
      if (nextXMoves.length === 3) {
        const oldestMove = nextXMoves.shift();
        nextSquares[oldestMove] = null;
      }
      nextSquares[i] = "X";
      nextXMoves.push(i);
    } else {
      if (nextOMoves.length === 3) {
        const oldestMove = nextOMoves.shift();
        nextSquares[oldestMove] = null;
      }
      nextSquares[i] = "O";
      nextOMoves.push(i);
    }
    onPlay(nextSquares, nextXMoves, nextOMoves);
  }

  const winner = calculateWinner(squares);
  const status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isOldMove={xMoves[0] === 0 || oMoves[0] === 0} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isOldMove={xMoves[0] === 1 || oMoves[0] === 1} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isOldMove={xMoves[0] === 2 || oMoves[0] === 2} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isOldMove={xMoves[0] === 3 || oMoves[0] === 3} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isOldMove={xMoves[0] === 4 || oMoves[0] === 4} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isOldMove={xMoves[0] === 5 || oMoves[0] === 5} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isOldMove={xMoves[0] === 6 || oMoves[0] === 6} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isOldMove={xMoves[0] === 7 || oMoves[0] === 7} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isOldMove={xMoves[0] === 8 || oMoves[0] === 8} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xMoves, setXMoves] = useState([]); 
  const [oMoves, setOMoves] = useState([]); 
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, nextXMoves, nextOMoves) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXMoves(nextXMoves);
    setOMoves(nextOMoves);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} xMoves={xMoves} oMoves={oMoves} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
