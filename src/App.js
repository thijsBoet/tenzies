import React, { useState } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';

const App = () => {
	const allNewDice = () => {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push({
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
			});
		}
		return newDice;
	};

	const rollDice = () => {
    setDice(oldDice => oldDice.map(die => (die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) })));
	};

	const holdDice = id =>
		setDice(oldDice =>
			oldDice.map(die =>
				die.id === id ? { ...die, isHeld: !die.isHeld } : die
			)
		);

	const [dice, setDice] = useState(allNewDice());

	const diceElements = dice.map(die => (
		<Die
			holdDice={() => holdDice(die.id)}
			key={die.id}
			id={die.id}
			value={die.value}
			isHeld={die.isHeld}
		/>
	));

	return (
		<main>
			<h1>Tenzies</h1>
			<div className='dice-container'>{diceElements}</div>
			<button className='roll-dice' onClick={rollDice}>
				Roll Dice
			</button>
		</main>
	);
};

export default App;
