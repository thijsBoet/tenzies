import React, { useState, useEffect } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';


const App = () => {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
		const allSame = dice.every(die => die.value === dice[0].value);

		if (allHeld && allSame) setTenzies(true);

	}, [dice]);

	function generateNewDie() {
		return {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		};
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++)
			newDice.push(generateNewDie());
		return newDice;
	}

	function rollDice() {
		return setDice(oldDice => oldDice.map(die => (die.isHeld ? die : generateNewDie()))
		);
	}

	function holdDice(id) {
		return setDice(oldDice => oldDice.map(die => die.id === id ? { ...die, isHeld: !die.isHeld } : die));
	}

	function newGame () {
		setTenzies(false);
		setDice(allNewDice());
	}

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
			{tenzies && <Confetti />}
			<h1 className='title'>Tenzies</h1>
			<p className='instructions'>
				Roll until all dice are the same. <br />
				Click each die to freeze it at its current value between rolls.
			</p>
			<div className='dice-container'>{diceElements}</div>
			<button className='roll-dice' onClick={tenzies ? newGame : rollDice}>
				{tenzies ? 'New Game' : 'Roll Dice'}
			</button>
		</main>
	);
};

export default App;
