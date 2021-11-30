import React, { useState } from 'react';
require('dotenv').config()

export default function App() {
	const MAX_NUMBER = 99999999999;

	const [ divisors, setDivisors ] = useState([]);
	const [ primes, setPrimes ] = useState([]);
	const [ number, setNumber ] = useState('');
	const [ isFetching, setIsFetching ] = useState(false);

	const handleChange = (e) => {
		setNumber(e.target.value);
	}

	const fetchResults = () => {
		const getResults = async () => {
			if (number > MAX_NUMBER) {
				alert(`Number must be less than ${MAX_NUMBER}`);
			} else {
				const res = await fetch(`${process.env.REACT_APP_FETCH_URL}/decomposition/${number}`);
				let json = await res.json();
	
				if (json && json.divisors) {
					setDivisors(json.divisors);
					setPrimes(json.primes);
				}
			}
		};
		
		setIsFetching(true);
		getResults();
		setIsFetching(false);
	};

	return (
		<div className="container">
			<h3>Decomposição de número</h3>
			<div className="default-flex-column">
				<div className="inputNumber">
					<input onChange={handleChange} type="number" step="1" placeholder="Digite o número para encontrar os divisores e primos"/>
				</div>
				<div className="getResultsBtn">
					<button onClick={fetchResults}>DECOMPOR</button>
				</div>

				<div className="results">
					{ isFetching ? <div className="loading">Loading...</div> : 
						<div>
							<div className="divisors">
								Divisores: {divisors.join(", ")}
							</div>
							<div className="primes">
								Primos: {primes.join(", ")}
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	);
}
