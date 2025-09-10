import { useState } from 'react';

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
		<>
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

	const sortedHistory = sortBy === 'desc' ? history.slice().reverse() : history;

	const move = sortedHistory.map((items) => {
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
