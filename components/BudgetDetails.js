import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const BudgetDetails = () => {
    const { expenses, budget } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const remainingAmount = budget - totalExpenses;
    let alertType;

    if (totalExpenses > budget) {
        alertType = "alert-danger";
    } else if (totalExpenses >= 0.8 * budget) { // 80% threshold
        alertType = "alert-warning";
    } else {
        alertType = "alert-success";
    }

    return (
        <div className={`alert ${alertType} d-flex justify-content-between align-items-center`}>
            <div>
                <span style={{ fontWeight: 'bold' }}>Spent so far: </span>
                <span>£{totalExpenses}</span>
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Remaining: </span>
                <span>£{remainingAmount}</span>
            </div>
        </div>
    );
};

export default BudgetDetails;