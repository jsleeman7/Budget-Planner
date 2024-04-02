import React, { useContext } from "react";
import { TiDelete } from 'react-icons/ti';
import { AppContext } from "../context/AppContext";

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        // Dispatching an action to delete the expense item
        dispatch({
            type: "DELETE_EXPENSE",
            payload: props.id, // Passes the ID of the expense item to be deleted
        });
    }

    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
            <div style={{ minWidth: '200px' }}>
                <span>{props.name}</span>
                {props.type && (
                    <span className="ms-2 text-muted">({props.type})</span>
                )}
            </div>
            <div className="d-flex align-items-center">
                <span className="text-muted me-3" style={{ minWidth: '100px' }}>{props.date}</span>
                <span className="badge rounded-pill bg-primary me-3" style={{ minWidth: '75px' }}>
                    £{props.cost}
                </span>
                <TiDelete
                    size='1.5em'
                    onClick={handleDeleteExpense}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </li>
    );
};

export default ExpenseItem;

/*
Represents a single item in the expense list.

Allows items to be deleted.
*/