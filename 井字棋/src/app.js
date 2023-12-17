import { useState } from 'react';

function Square({ value, clickfn }) {
    return <button className="square" onClick={clickfn}>{value}</button>
}

function Board({ square, xIsNext, onPlay }) {
    // const [square, setSquare] = useState(new Array(9).fill(null));
    // const [xIsNext, setXIsNext] = useState(0);
    function handleClick(i) {
        const newsquare = square.slice();
        if (newsquare[i] || success(newsquare)) return;
        xIsNext ? newsquare[i] = 'X' : newsquare[i] = 'O';
        onPlay(newsquare);
        // setSquare(newsquare);
        // setXIsNext(xIsNext + 1);
        success(newsquare);
    }
    const winner = success(square);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    return (
        <>
            <div>{status}</div>
            <div className="board-row">
                <Square value={square[0]} clickfn={() => handleClick(0)} />
                <Square value={square[1]} clickfn={() => handleClick(1)} />
                <Square value={square[2]} clickfn={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={square[3]} clickfn={() => handleClick(3)} />
                <Square value={square[4]} clickfn={() => handleClick(4)} />
                <Square value={square[5]} clickfn={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={square[6]} clickfn={() => handleClick(6)} />
                <Square value={square[7]} clickfn={() => handleClick(7)} />
                <Square value={square[8]} clickfn={() => handleClick(8)} />
            </div>
        </>
    )
}

export default function Game() {
    const [history, setHistory] = useState([new Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 == 0;
    const currentSquare = history[currentMove];
    function handlePlay(cur) {
        const newHistory = [...history.slice(0, currentMove + 1), cur]
        setCurrentMove(newHistory.length - 1);
        setHistory(newHistory)
    }
    function jumpTo(i) {
        setCurrentMove(i);
    }
    const moves = history.map((item, index) => {
        const description = index ? `Touch to #${index}` : `Restart!`
        return (
            <li key={index - 1}><button onClick={() => jumpTo(index)}>{description}</button></li>
        )
    })

    return (
        <>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} square={currentSquare} onPlay={handlePlay} />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    )
}



function success(squares) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}