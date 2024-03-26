import React, { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../context/AppContext";

const ExpenseList = () => {
    const { expenses } = useContext(AppContext); //TODO: Needs something that filters based on a name (search bar)
    
    return (
        <ul className="list-group">
            {expenses.map((expense) => (
                <ExpenseItem
                    id={expense.id}
                    name={expense.name}
                    cost={expense.cost} />
            ))}
        </ul>
    );
};

export default ExpenseList;

/*
Manages the rendering of the list of expenses.
*/