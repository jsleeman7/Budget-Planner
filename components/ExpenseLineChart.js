import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppContext } from '../context/AppContext';

const ExpenseLineChart = () => {
  const { expenses } = useContext(AppContext);

  // Function to prepare data for the line chart
  const prepareDataForChart = () => {
    // Group expenses by date
    const expensesByDate = {};
    expenses.forEach(expense => {
      const date = expense.date.slice(0, 7); // Extracting year and month
      if (expensesByDate[date]) {
        expensesByDate[date] += expense.cost;
      } else {
        expensesByDate[date] = expense.cost;
      }
    });

    // Convert object to array of objects for Recharts LineChart
    const data = Object.keys(expensesByDate).map(date => ({
      date,
      totalExpense: expensesByDate[date]
    }));

    // Sort data by date
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    return data;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={prepareDataForChart()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalExpense" activeDot={{ r: 8 }} name="Total Cost"/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseLineChart;