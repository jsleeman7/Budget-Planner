import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { AppContext } from "../context/AppContext";

const ExpensePieChart = () => {
  const { expenses } = useContext(AppContext);

  // Function to calculate total expenses for each category
  const getTotalExpensesByCategory = () => {
    const categories = {};
    expenses.forEach((expense) => {
      if (categories[expense.type]) {
        categories[expense.type] += parseFloat(expense.cost); // Parse cost to float
      } else {
        categories[expense.type] = parseFloat(expense.cost);
      }
    });
    return categories;
  };

  // Function to calculate total expenses across all categories
  const totalExpenses = Object.values(getTotalExpensesByCategory()).reduce(
    (total, cost) => total + cost,
    0
  );

  // Function to prepare data for the pie chart
  const prepareDataForChart = () => {
    const categories = getTotalExpensesByCategory();
    return Object.keys(categories).map((category) => ({
      name: category,
      value: categories[category],
      // Calculate percentage spent for each category and round to integer
      percentage: Math.round((categories[category] / totalExpenses) * 100),
    }));
  };

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f0e",
    "#ff0000",
    "#800080",
    "#008080",
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={prepareDataForChart()}
          cx="50%"
          cy="50%"
          outerRadius={150}
          dataKey="value"
          label={({ name, percentage }) => `${name} (${percentage}%)`}
          labelLine={false}
        >
          {prepareDataForChart().map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => [
            `${props.payload.name}: £${value.toFixed(2)} (${
              props.payload.percentage
            }%)`,
          ]}
        />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
