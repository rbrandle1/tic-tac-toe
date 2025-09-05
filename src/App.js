// React tutorial: https://react.dev/learn/tutorial-tic-tac-toe
import { useState } from 'react';

/**
 * STEPS
 * 1. Fill out Board with 3 '.board-row' rows of 3 squares
 * Set up Square so "X" appears on click
 *
 * 2. Alternate "X"s and "O"s on the board and determine the winner
 * Create your default squares state to be 9 elements with a state of "null".
 * Array(9).fill(null)
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
