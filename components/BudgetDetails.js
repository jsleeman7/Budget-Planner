import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const BudgetDetails = () => {
  const { expenses, budget } = useContext(AppContext);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, item) => {
    return total + parseFloat(item.cost); // Parse cost to float before adding
  }, 0);

  // Calculate remaining amount
  const remainingAmount = budget - totalExpenses;

  // Determine alert type based on remaining amount
  let alertType;
  if (remainingAmount < 0) {
    alertType = "alert-danger";
  } else if (remainingAmount < 0.2 * budget) {
    alertType = "alert-warning"; // 80% threshold
  } else {
    alertType = "alert-success";
  }

  // Format numbers for display with two decimal places
  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  return (
    <div
      className={`alert ${alertType} d-flex justify-content-between align-items-center`}
    >
      <div>
        <span style={{ fontWeight: "bold" }}>Spent so far: </span>
        <span>£{formatNumber(totalExpenses)}</span>
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Remaining: </span>
        <span>£{formatNumber(remainingAmount)}</span>
      </div>
    </div>
  );
};

export default BudgetDetails;
