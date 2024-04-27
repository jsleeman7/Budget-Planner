import React, { useContext } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { AppContext } from '../context/AppContext';

const ExpensePieChart = () => {
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
        return Object.keys(categories).map(category => ({
            name: category,
            value: categories[category]
        }));
    };

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#ff0000', '#800080', '#008080'];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={prepareDataForChart()}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                >
                    {
                        prepareDataForChart().map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
                <Tooltip />
                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    wrapperStyle={{ marginLeft: '20px' }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ExpensePieChart;