import React, { useReducer, useState } from 'react';

const INCREMENT = 'INCREMENT';

const initialState = { subTotal: 0 };

function reducer(state, action) {
	switch (action.type) {
		case 'INCREMENT':
			return { subTotal: action.amount * action.price };
		default:
			throw new Error('Invalid action type');
	}
}

export default function ProductForm({ sendSubTotal }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0.0);
	const [subTotal, setSubTotal] = useState(0.0);
	const [oldSubTotal, setOldSubTotal] = useState(0.0);

	function handleAmount(value) {
		setAmount(value);
		setSubTotal(value * price);
	}

	function handlePrice(value) {
		setPrice(value);
		setSubTotal(value * amount);
	}

	function handleSubtotal() {
		let total = amount * price;
		setOldSubTotal(total);
		dispatch({ type: INCREMENT, amount: amount, price: price });
		sendSubTotal(total, oldSubTotal);
	}

	return (
		<div className='input-group jumbotron'>
			<div className='input-group-prepend'>
				<span className='input-group-text'>Item name</span>
			</div>
			<input type='text' aria-label='First name' className='form-control' />
			<div className='input-group-prepend ml-2'>
				<span className='input-group-text'>Amount</span>
			</div>
			<input
				type='text'
				aria-label='First name'
				className='form-control'
				onChange={(e) => handleAmount(e.target.value)}
			/>
			<div className='input-group-prepend ml-2'>
				<span className='input-group-text'>Price</span>
			</div>
			<input
				type='text'
				aria-label='First name'
				className='form-control'
				onChange={(e) => handlePrice(e.target.value)}
			/>
			<div className='input-group-prepend ml-2'>
				<span className='input-group-text'>Subtotal</span>
			</div>
			<input disabled type='text' aria-label='First name' className='form-control' value={subTotal} />
			<button className='btn btn-success ml-1' onClick={() => handleSubtotal()}>
				V
			</button>
		</div>
	);
}
