import React, { useContext, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AppContext } from "../context/AppContext";
import YearPicker from "./YearPicker";

const ExpenseLineChart = () => {
  const { expenses } = useContext(AppContext);
  const [selectedYear, setSelectedYear] = useState(""); // State to track the selected year

  // Function to prepare data for the line chart
  const prepareDataForChart = () => {
    // Filter expenses based on the selected year
    const filteredExpenses = selectedYear
      ? expenses.filter((expense) => expense.date.startsWith(selectedYear))
      : expenses;

    // Initialize an object to store total expenses for each date
    const expensesByDate = {};

    // Calculate total expenses for each date
    filteredExpenses.forEach((expense) => {
      const date = expense.date.slice(0, 7); // Extracting year and month
      if (expensesByDate[date]) {
        expensesByDate[date] += parseFloat(expense.cost); // Parse cost to float
      } else {
        expensesByDate[date] = parseFloat(expense.cost); // Parse cost to float
      }
    });

    // Convert object to array of objects for Recharts LineChart
    const data = Object.keys(expensesByDate).map((date) => ({
      date,
      totalExpense: expensesByDate[date],
    }));

    // Sort data by date
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    return data;
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <YearPicker
          selectedYear={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={prepareDataForChart()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `£${value.toFixed(2)}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalExpense"
            activeDot={{ r: 8 }}
            name="Total Cost"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseLineChart;
