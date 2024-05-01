import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";

const AddExpenseForm = () => {
  // Accessing the global state and dispatch function from the context
  const { dispatch } = useContext(AppContext);

  // Local state to manage input fields for expense name and cost
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  // Character limit for expense name
  const maxNameLength = 50;

  // Maximum allowed value for expense cost
  const maxCostValue = 999999;

  // Function to handle form submission
  const onSubmit = (event) => {
    event.preventDefault();

    // Truncate name if it exceeds the character limit
    const truncatedName =
      name.length > maxNameLength ? name.substring(0, maxNameLength) : name;

    // Parsing cost to a floating-point number and ensuring it does not exceed the maximum value
    let parsedCost = parseFloat(cost);
    if (isNaN(parsedCost) || parsedCost > maxCostValue) {
      parsedCost = maxCostValue;
    }

    // Formatting cost to always display two decimal places
    const formattedCost =
      parsedCost % 1 === 0 ? parsedCost.toFixed(0) : parsedCost.toFixed(2);

    // Creating a new expense object with a unique ID using UUID
    const expense = {
      id: uuidv4(),
      name: truncatedName,
      cost: formattedCost,
      date: date,
      type: type,
    };

    // Dispatching an action to add the new expense to the global state
    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

    // Reset input fields after submitting the form
    setName("");
    setCost("");
    setDate("");
    setType("");
  };

  return (
    <form onSubmit={onSubmit} className="mb-3">
      <div className="row align-items-end">
        <div className="col-sm-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={maxNameLength} // Set maximum character limit
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="cost" className="form-label">
            Cost
          </label>
          <input
            required
            type="number"
            step="0.01" // Allow up to two decimal places
            min="0" // Ensure non-negative values
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            max={maxCostValue} // Set maximum value
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <select
            required
            className="form-select"
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Housing">Housing</option>
            <option value="Medical">Medical</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
