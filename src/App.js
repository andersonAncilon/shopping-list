import React, { useState } from 'react';
import './App.css';
import ProductForm from './components/ProductForm/index';

function App() {
	const [total, setTotal] = useState(0.0);
	const [components, setComponents] = useState([0]);

	function receiveSubTotal(value, oldValue) {
		setTotal(total - oldValue + value);

		console.log(value, oldValue);
	}

	return (
		<div className='App'>
			<div className='container mx-auto mt-5' style={{ width: '100vh' }}>
				<h2>Shopping List</h2>
				{components.map((value) => {
					return (
						<ProductForm key={value} sendSubTotal={(value, oldValue) => receiveSubTotal(value, oldValue)} />
					);
				})}

				<button
					className='btn btn-danger ml-1'
					onClick={() => setComponents([...components, Math.random() * 3])}
				>
					Add item
				</button>
				<h2>Total: {total}</h2>
			</div>
		</div>
	);
}

export default App;
