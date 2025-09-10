import { useState } from 'react';

/**
 * ? EXTRA CREDIT
 * If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:

Add a toggle button that lets you sort the moves in either ascending or descending order.
When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
Display the location for each move in the format (row, col) in the move history list.
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
	const [history, setHistory] = useState([{ id: 0, squares: Array(9).fill(null) }]);
	const [currentMove, setCurrentMove] = useState(0);
	const [sortBy, setSortBy] = useState('asc');
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove].squares;

	const handlePlay = (newArr) => {
		const nextHistory = [...history.slice(0, currentMove + 1), { id: history.length, squares: newArr }];

		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	};

	const jumpTo = (nextMove) => {
		setCurrentMove(nextMove);
	};

	let sortedHistory;
	if (sortBy === 'asc') {
		sortedHistory = history;
		console.log('asc');
	}
	if (sortBy === 'desc') {
		sortedHistory = history.slice().reverse();
		console.log('desc');
	}

	const move = sortedHistory.map((el, i) => {
		const originalMoveIndex = sortBy === 'desc' ? history.length - 1 - i : i;
		let description;

		if (originalMoveIndex > 0) {
			description = `Go to move #${originalMoveIndex}`;
		} else {
			description = `Go to game start`;
		}

		return (
			<li key={el.id}>
				{originalMoveIndex === currentMove && currentMove !== 0 ? (
					<span>You are at move {currentMove}</span>
				) : (
					<button onClick={() => jumpTo(originalMoveIndex)}>{description}</button>
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
