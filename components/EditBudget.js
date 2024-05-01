import React, { useState } from "react";

const EditBudget = (props) => {
  // Initialize local state with the budget value received as props
  const [value, setValue] = useState(props.budget);
  const [inputValue, setInputValue] = useState(props.budget);

  // Function to handle input change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle input blur (when focus is lost)
  const handleBlur = () => {
    // Check if input value contains a decimal
    if (inputValue.includes(".")) {
      // Display value with two decimal places
      setValue(parseFloat(inputValue).toFixed(2));
    } else {
      // Display value as normal
      setValue(inputValue);
    }
  };

  return (
    <>
      <input
        required="required"
        type="number"
        className="form-control mr-3"
        id="name"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="badge rounded-pill bg-primary me-3"
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
