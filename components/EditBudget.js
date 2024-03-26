import React, { useState } from 'react';

const EditBudget = (props) => {
	// Initialize local state with the budget value received as props
	const [value, setValue] = useState(props.budget);
	return (
		<>
			<input
				required='required'
				type='number'
				class='form-control mr-3'
				id='name'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<button
				type='button'
				class='badge rounded-pill bg-primary me-3'
				onClick={() => props.handleSaveClick(value)}
			>
				Save
			</button>
		</>
	);
};

export default EditBudget;

/*
Provides an input for editing the budget value.
*/