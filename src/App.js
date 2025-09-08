import { useState } from 'react';

/**
 * STEPS
 * ? 1. Fill out Board with 3 '.board-row' rows of 3 squares
 * Set up Square so "X" appears on click
 *
 * ? 2. Alternate "X"s and "O"s on the board
 * Create your default squares state to be 9 elements with a state of "null". Array(9).fill(null)
 * Pass down the value of each square by using the {square} state. value={state[0]}
 * 
 * Set up a handler F to setSquares to either "X", "O" or null:
 * 
 * This F will make a new squares array. It will pass in an index and update the value of the "i" that  was passed/clicked and will set the squares state with the new index value... either an "X/O". You are rendering a new array with every click, each time updating that corresponding value within the array.
 * 
 * ...So why make a copy of the array each time instead of mutating the original? In certain situations there are benefits of making new copies each time, like being able to compare one array with the other. Can undo, redo, etc...
 * 
 * Example:
  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }
 * 
 * Now update your Square component onClick props to pass in their appropriate index value, 0,2,3,4, etc...
 * 
 * Next, set up a boolean state to toggle whether "x" is next or not. In the handlClick helper function, you'll want to also update this state if (xIsNext) render it "X" else "O"
 * 
 * Make sure to prevent begin able to click the square more than once. Try an early return to see if "squares[i]" exists already.
 * 
 * ? 3. Declare the winner!
 * Use the calculateWinner function and return early if the squares match a winner and end the game.
 * 
 * Create a div.status container at the top of the board.
 * Make a new variable to represent the winning value as "winner".
 * Make a new mutatable variable "status" (let), and modify this variable to either make "status" say "Winner (winner)" or Next Player: (X or 0)
 * 
 */

// JS func to calculate a winner.
// squares is a nine string array. This will check if any specific combinations of the values in this array match any winning value and will declare a winner.
const calculateWinner = (squares) => {
	// These identify the winning square combinations. 0,1,2 is the top line.
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
	// This for loop will loop through the lines and check for a winning combination.
	// So if [0,1,2] then a=0, b=1, c=2;
	// Standard "for loop", Start with i = 0. Keep going as long as i is smaller than the number of things in lines. After each round, add 1 to i.
	for (let i = 0; i < lines.length; i++) {
		// This is destructuring. It is shorthand way to pull out the value of the first, second and third value in a line with the the right index. The for loop will check each of the line arrays and run it through the check below. If any of them are the same then you have a match.
		//This line is extracting each value of each line. So let's pull out 0, 1 and 2. So now a=0, b=1 and c=2.
		const [a, b, c] = lines[i];
		// Is there something in the first spot (not empty)? And is the same thing in the second spot? and is the same thing in the third spot? (if all 3 are the same then we have a winner)
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			// return the winning value which will either be X or O.
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

const Board = () => {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);

	const handleClick = (i) => {
		const nextSquares = squares.slice();

		if (squares[i] || calculateWinner(squares)) return;

		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}

		setSquares(nextSquares);
		setXIsNext((is) => !is);
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
			<div className='board-row'>
				<Square value={squares[0]} onClick={() => handleClick(0)} />
				<Square value={squares[1]} onClick={() => handleClick(1)} />
				<Square value={squares[2]} onClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onClick={() => handleClick(3)} />
				<Square value={squares[4]} onClick={() => handleClick(4)} />
				<Square value={squares[5]} onClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onClick={() => handleClick(6)} />
				<Square value={squares[7]} onClick={() => handleClick(7)} />
				<Square value={squares[8]} onClick={() => handleClick(8)} />
			</div>
		</>
	);
};
export default Board;
