import { useState } from 'react';

const Square = () => {
	const [value, setValue] = useState(null);

	const handleClick = () => {
		setValue('X');
	};

	return (
		<button className='square' onClick={handleClick}>
			{value}
		</button>
	);
};

const Board = () => {
	const [squares, setSquares] = useState(Array(9).fill(null));

	return (
		<>
			<div className='board-row'>
				<Square />
				<Square />
				<Square />
			</div>
			<div className='board-row'>
				<Square />
				<Square />
				<Square />
			</div>
			<div className='board-row'>
				<Square />
				<Square />
				<Square />
			</div>
		</>
	);
};
export default Board;
