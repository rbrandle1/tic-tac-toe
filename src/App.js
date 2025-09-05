// React tutorial: https://react.dev/learn/tutorial-tic-tac-toe
import { useState } from 'react';

/**
 * STEPS
 * Fill out Board with 3 '.board-row' rows of 3 squares
 * Set up Square so "X" appears on click
 *
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
