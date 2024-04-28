import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { AppProvider } from './context/AppContext';
import Login from './components/Login';
import ExpensePieChart from './components/ExpensePieChart';
import ExpenseLineChart from './components/ExpenseLineChart';
import BudgetDetails from './components/BudgetDetails'
import BudgetProgressBar from './components/BudgetProgressBar';

const RootApp = () => {
  // State to manage authentication status
  const [authenticated, setAuthenticated] = useState(() => {
    // Initialize authentication state from localStorage
    return localStorage.getItem('authenticated') === 'true';
  });

  // Effect to update localStorage when authentication state changes
  useEffect(() => {
    localStorage.setItem('authenticated', authenticated);
  }, [authenticated]);

  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Route for the login page */}
          <Route path="/login" element={<Login authenticate={() => setAuthenticated(true)} />} />
          {/* Protected route for the main page */}
          <Route path="/" element={authenticated ? <Main setAuthenticated={setAuthenticated} /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

const Main = ({ setAuthenticated }) => {
  const handleLogout = () => {
    // Clears authentication state
    setAuthenticated(false);
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='mt-3'>ExpenseHelp</h1>
        <div className="mt-3">
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <BudgetProgressBar />
      <div className='row mt-3'>
        <div className='col-sm'>
          <Budget />
        </div>
        <div className='col-sm'>
          <BudgetDetails />
        </div>
      </div>
      <h3 className='mt-3'>Expenses</h3>
      <div className='row mt-3'>
        <div className='col-sm'>
          <ExpenseList />
        </div>
      </div>
      <div className="mt-5 card p-3">
        <h3>Add New Expense:</h3>
        <div className='mt-3'>
          <div className='col-sm'>
            <AddExpenseForm />
          </div>
        </div>
      </div>
      <div className="card mt-5 p-3">
        <h3 className="card-title">Expense Overview</h3>
        <div className='card-body'>
          <ExpensePieChart />
        </div>
      </div>
      <div className="card mt-3 mb-3 p-3">
        <h3 className="card-title">Your Expenses over time</h3>
        <div className='card-body'>
          <ExpenseLineChart />
        </div>
      </div>
    </div>
  );
};

export default RootApp;