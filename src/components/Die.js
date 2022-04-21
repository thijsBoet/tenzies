import React from 'react';

const Die = ({ value, isHeld, id, holdDice }) => {
	const styles = { backgroundColor: isHeld ? '#59E391' : '#fff' };

	return (
		<div className='die-face' style={styles} onClick={holdDice}>
			<h2 className='die-num'>{value}</h2>
		</div>
	);
};

export default Die;
