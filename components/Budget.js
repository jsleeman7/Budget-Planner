import React, { useState, useContext } from "react";
import ViewBudget from './ViewBudget';
import EditBudget from './EditBudget';
import { AppContext } from "../context/AppContext";

const Budget = () => {
	// Accessing the budget value and dispatch function from the global state
	const { budget, dispatch } = useContext(AppContext);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = (value) => {
		// Dispatching an action to update the budget value in the global state
		dispatch({
			type: 'SET_BUDGET',
			payload: value,
		});
		setIsEditing(false);
	};

	return (
		<div class='alert alert-secondary p-3 d-flex align-items-center justify-content-between'>
            {/* Conditionally rendering either the edit form or the budget view */}
			{isEditing ? (
				<EditBudget handleSaveClick={handleSaveClick} budget={budget} />
			) : (
				<ViewBudget handleEditClick={handleEditClick} budget={budget} />
			)}
		</div>
	);
};

export default Budget;

/*
Manages the budget-related functionality and UI, including retrieving and editing the budget
*/