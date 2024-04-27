import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const BudgetProgressBar = () => {
    const { expenses, budget } = useContext(AppContext);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    // Calculate percentage spent
    const percentageSpent = (totalExpenses / budget) * 100;

    // Determine progress bar color based on percentage spent
    let progressBarColor;
    if (percentageSpent > 100) {
        progressBarColor = "bg-danger";
    } else if (percentageSpent > 80) {
        progressBarColor = "bg-warning";
    } else {
        progressBarColor = "bg-success";
    }

    return (
        <div className="progress mt-5">
            <div className={`progress-bar ${progressBarColor}`} role="progressbar" style={{ width: `${percentageSpent}%` }} aria-valuenow={percentageSpent} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    );
};

export default BudgetProgressBar;
