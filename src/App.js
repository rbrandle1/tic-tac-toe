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
 * ? 4. Prep "time travel"
 * Make a new <Game /> component as the export default.
 * 
 * export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>todo</ol>
      </div>
    </div>
  );
}
 * Make some Game state: 1. history, which will be A SINGLE ARRAY item of an array of nine. 2. a derived "currentSquare" state which is derived as item 0 in the "history" array.
 *
 * Raise all necessary state from Board up into game, so all children have access. Squares will now be derived from "history".
 * 
 * Create a new "handlePlay" helper function to pass into an "onPlay" prop to the Board. This will allow child to parent communication to set the new array when clicked within Board.
 * 
 * This function will pass in a newArray object and ADD it as a new item to the current "history" array. Then it will toggle the xIsNext value.
 * 
 * ? 5. Show past moves
 * 
 * Map in some li into the ol. Try doing the map INLINE instead of making a separate <Item /> component. ex: const moves = history.map(); and implement {moves} in your component.
 * ! new understanding of index. When using map(), the first arg (the state) doesn't really need to be used if you want to utilize the second arg which represents the index. THE INDEX CAN BE NAMED ANYTHING, not just "i". So map((_, move)) basic says "I don't care about the state" and I am making the index represented as the variable "move" within the map.
 * The li will get a mutable variable for description the either says "Go to move #___" or "Go to game start" 
 * The li contains a button with an onClick to fire a "jumpTo" function.
 * 
 * Define a "currentMove" state to keep track of what the current move is and default to 0.
 * 
 * Update the jumpTo F so currentMove is updated to whatever li is clicked.
 * Also update setXIsNext to be true if the number being changed to is even. This is to reset who's turn it is to the correct X or O.
 * ? use the Modulo operator %. In this case, it basically checks if the number can be divided equally into two parts meaning it would be an even number. It would return either a true or a false.
 * setXIsNext(nextMove % 2 === 0);
 * 
 * !challenging... 
 * If you “go back in time” and then make a new move from that point, you only want to keep the history up to that point. Instead of adding nextSquares after all items (... spread syntax) in history, you’ll add it after all items in history.slice(0, currentMove + 1) so that you’re only keeping that portion of the old history.
 * ? this means slice will reset the history array to be from index 0 to the "currentMove" plus 1 to get the correct number value, and THEN add all future numbers after that.
 * 
 * Each time a move is made, you need to update currentMove to point to the latest history entry.
 * setCurrentMove(nextHistory.length - 1);
 * 
 * example:
 * function handlePlay(nextSquares) {
  const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
  setXIsNext(!xIsNext);
}
 * 
 * Finally, you need to update the currentSquares variable to be the currently selected move, instead of the length of history. history[currentMove]
 * 
 * You should have a functioning app now. 
 * 
 * ? FINAL CLEANUPS
 * You can now derive what xIsNext by tapping into currentMove. So if the currentMove is even then make xIsNext true. Therefore you can remove the get/set state for xIsNext and just make it a variable. You can remove the setXIsNext toggles.
 * 
 * ? EXTRA CREDIT
 * If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:

For the current move only, show “You are at move #…” instead of a button.
Rewrite Board to use two loops to make the squares instead of hardcoding them.
Add a toggle button that lets you sort the moves in either ascending or descending order.
When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
Display the location for each move in the format (row, col) in the move history list.
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
		// This is destructuring. It is shorthand way to extract the values of the first, second and third items in each winning line combination. The for loop will check each of the line arrays and see if any of them match the values and locations of the squares array.
		//This variable extracts each value of each lines array item.
		// So on the first loop, let's pull out 0, 1 and 2. So now a=0, b=1 and c=2. Does anything match? nope? ok do the next index line and try 3, 4, and 5. Do any of those appear in the locations of the squares array index values? Yes? Ok we have a winner.
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

const Game = () => {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
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

	const move = history.map((_, move) => {
		let description;

		if (move > 0) {
			description = `Go to move #${move}`;
		} else {
			description = `Go to game start`;
		}

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	return (
		<div className='game'>
			<div className='game-board'>
				<Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<ol>{move}</ol>
			</div>
		</div>
	);
};
export default Game;
