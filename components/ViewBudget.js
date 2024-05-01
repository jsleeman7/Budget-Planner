import React from "react";

const ViewBudget = (props) => {
  return (
    <>
      <span>
        <span style={{ fontWeight: "bold" }}>Budget: </span>£{props.budget}
      </span>
      <button
        type="button"
        class="badge rounded-pill bg-primary"
        onClick={props.handleEditClick}
      >
        Edit
      </button>
    </>
  );
};

export default ViewBudget;

/*
Renders the budget value and an "Edit" button.

Receives the budget value and a callback function to handle edit clicks as props.
*/
