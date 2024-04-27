import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppContext } from '../context/AppContext';

const ExpenseBarChart = () => {
  const { expenses } = useContext(AppContext);

  // Function to calculate total expenses for each category
  const getTotalExpensesByCategory = () => {
    const categories = {};
    expenses.forEach(expense => {
      if (categories[expense.type]) {
        categories[expense.type] += expense.cost;
      } else {
        categories[expense.type] = expense.cost;
      }
    });
    return categories;
  };

  const prepareDataForChart = () => {
    const categories = getTotalExpensesByCategory();
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#ff0000', '#800080', '#008080'];
    const data = Object.keys(categories).map((category, index) => ({
      name: category,
      totalExpense: categories[category],
      fill: colors[index % colors.length] // Assign each expense type a specific color
    }));
    return data;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={prepareDataForChart()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend iconType="none"/>
        <Bar dataKey="totalExpense" name="Total Cost"/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;