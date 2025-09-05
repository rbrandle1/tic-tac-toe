// React tutorial: https://react.dev/learn/tutorial-tic-tac-toe
import { useState } from 'react';

/**
 * STEPS
 * 1. Fill out Board with 3 '.board-row' rows of 3 squares
 * Set up Square so "X" appears on click
 *
 * 2. Alternate "X"s and "O"s on the board
 * Create your default squares state to be 9 elements with a state of "null". Array(9).fill(null)
 * Pass down the value of each square by using the {square} state. value={state[0]}
 * Set up a handler F to setSquares to either "X", "O" or null
 * 
 * Example:
 * function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }
    This will make a new squares array and will update the value of the index element that was clicked and will set the squares state with that new value for that particular index. You are rendering a new array with every click, each time updating that corresponding value within the array.

    So why make a copy of the array each time instead of mutating the original? In certain situations there are benefits of making new copies each time, like being able to compare one array with the other. Can undo, redo, etc...
 * 
 * Now update your square components onClick props to onClick={()=>handleClick(0, 1, 2, 3, etc.)}
 * 
 * Next, set up a boolean state to toggle whether "x" is next or not. In the handlClick helper function, you'll want to also update this state if (xIsNext) render it "X" else "O"
 * 
 * Make sure to prevent begin able to click the square more than once. Try an early return to see if "squares[i]" exists already.
 * 
 * 3. Declare the winner!
 * 
 */

const Square = () => {
	return <button className='square'>x</button>;
};

const Board = () => {
	return (
		<>
			<div className='board-row'>
				<Square />
			</div>
		</>
	);
};
export default Board;
