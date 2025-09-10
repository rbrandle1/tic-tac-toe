import { useState } from 'react';

/**
 * ? EXTRA CREDIT
 * If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:

When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
// 1. need to know/extract the winning combination
// 2. would need to know if a particular square is a winning square. Possibly by modifying the array to be an array of objects to include a value boolean that indicates if it was a winning square or not. Would need to reset this boolean accordingly.
// 3. need to apply a style to those squares.

Display the location for each move in the format (row, col) in the move history list.
// would need to add to the array object which row and col was clicked.
 * 
 */

const calculateWinner = (squares) => {
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
};

const Square = ({ value, onClick }) => {
	return (
		<button className='square' onClick={onClick}>
			{value}
		</button>
	);
};

const Board = ({ squares, xIsNext, onPlay }) => {
	const handleClick = (i) => {
		const nextSquares = squares.slice();

		if (squares[i] || calculateWinner(squares)) return;

		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}

		onPlay(nextSquares);
	};

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
	}

	return (
		// Original:
		// <>
		// 	<div className='status'>{status}</div>
		// 	<div className='board-row'>
		// 		<Square value={squares[0]} onClick={() => handleClick(0)} />
		// 		<Square value={squares[1]} onClick={() => handleClick(1)} />
		// 		<Square value={squares[2]} onClick={() => handleClick(2)} />
		// 	</div>
		// 	<div className='board-row'>
		// 		<Square value={squares[3]} onClick={() => handleClick(3)} />
		// 		<Square value={squares[4]} onClick={() => handleClick(4)} />
		// 		<Square value={squares[5]} onClick={() => handleClick(5)} />
		// 	</div>
		// 	<div className='board-row'>
		// 		<Square value={squares[6]} onClick={() => handleClick(6)} />
		// 		<Square value={squares[7]} onClick={() => handleClick(7)} />
		// 		<Square value={squares[8]} onClick={() => handleClick(8)} />
		// 	</div>
		// </>
		<>
			{/* Extra credit: Use two loops to construct the board*/}
			<div className='status'>{status}</div>
			{[0, 1, 2].map((row) => (
				<div key={row} className='board-row'>
					{[0, 1, 2].map((square) => {
						const i = row * 3 + square;

						return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />;
					})}
				</div>
			))}
		</>
	);
};

const Game = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const [sortBy, setSortBy] = useState('asc');
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	const handlePlay = (newArr) => {
		const nextHistory = [...history.slice(0, currentMove + 1), newArr];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	};

	const jumpTo = (nextMove) => {
		setCurrentMove(nextMove);
	};

	{
		/* Extra credit: sort ascending an descending*/
	}
	let sortedHistory;
	if (sortBy === 'asc') {
		sortedHistory = history;
	}
	if (sortBy === 'desc') {
		sortedHistory = history.slice().reverse();
	}

	const move = sortedHistory.map((items) => {
		// In order to sort, need to calculate the original move index for unique keys, avoiding the re-indexing issue.
		const index = history.findIndex((el) => el === items);

		let description;
		if (index > 0) {
			description = `Go to move #${index}`;
		} else {
			description = `Go to game start`;
		}

		return (
			<li key={index}>
				{index === currentMove && currentMove !== 0 ? (
					<span>You are at move {currentMove}</span>
				) : (
					<button onClick={() => jumpTo(index)}>{description}</button>
				)}
			</li>
		);
	});

	return (
		<div className='game'>
			<div className='game-board'>
				<Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<label htmlFor='sort'>Sort by:</label>
				<select id='sort' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value='asc'>Ascending</option>
					<option value='desc'>Descending</option>
				</select>
				<ol reversed={sortBy === 'desc'}>{move}</ol>
			</div>
		</div>
	);
};
export default Game;
