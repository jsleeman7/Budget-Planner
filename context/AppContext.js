import React, { createContext, useReducer, useEffect } from "react";

// Reducer function to manage state updates based on dispatched actions
const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };
    default:
      return state;
  }
};

// Function to load state from localStorage when the application starts
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("budgetApp");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

// Function to save state to localStorage whenever it changes
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("budgetApp", serializedState);
  } catch {
    // Ignore write errors
  }
};

// Initial state of the application (for testing)
const initialState = loadState() || {
  budget: 2000,
  expenses: [
    {
      id: 25,
      name: "Food shopping",
      cost: 50,
      date: "2024-05-12",
      type: "Food",
    },
    {
      id: 26,
      name: "Hotel",
      cost: 400,
      date: "2024-06-26",
      type: "Entertainment",
    },
    {
      id: 27,
      name: "Car repair",
      cost: 200,
      date: "2024-07-08",
      type: "Utilities",
    },
  ],
};

// Create a context for managing global state and actions
export const AppContext = createContext();

// Provider component to wrap the application and provide access to global state and actions
export const AppProvider = (props) => {
  // Initialize state and dispatcher using the reducer function and initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Provide the state and dispatcher to the entire application via context
  return (
    <AppContext.Provider
      value={{
        budget: state.budget,
        expenses: state.expenses,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

/*
Defines the context and state management using React Context API.
*/
