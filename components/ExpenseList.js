import React, { useContext, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../context/AppContext";
import YearPicker from "./YearPicker";

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);
    const [query, setQuery] = useState(""); // State to store search query
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const handleSearch = (event) => {
        setQuery(event.target.value.toLowerCase());
    };

    const handleMonthFilter = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearFilter = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleTypeFilter = (event) => {
        setSelectedType(event.target.value);
    };

    const handleReset = () => {
        setQuery("");
        setSelectedMonth("");
        setSelectedYear("");
        setSelectedType("");
    };

    const filteredExpenses = expenses.filter((expense) =>
        expense.name.toLowerCase().includes(query)
    );

    const filteredByMonth = selectedMonth
        ? filteredExpenses.filter(
              (expense) =>
                  new Date(expense.date).getMonth() === parseInt(selectedMonth)
          )
        : filteredExpenses;

    const filteredByYear = selectedYear
        ? filteredByMonth.filter(
              (expense) =>
                  new Date(expense.date).getFullYear() === parseInt(selectedYear)
          )
        : filteredByMonth;

    const filteredByType = selectedType
        ? filteredByYear.filter((expense) => expense.type === selectedType)
        : filteredByYear;

    const sortedExpenses = filteredByType.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Search expenses..."
                    value={query}
                    onChange={handleSearch}
                />
                <div className="d-flex justify-content-between mb-2">
                    <YearPicker selectedYear={selectedYear} onChange={handleYearFilter} />
                    <select
                        className="form-select me-2"
                        value={selectedMonth}
                        onChange={handleMonthFilter}
                    >
                        <option value="">Month</option>
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                    <select
                        className="form-select"
                        value={selectedType}
                        onChange={handleTypeFilter}
                    >
                        <option value="">Type</option>
                        <option value="Food">Food</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Rent">Rent</option>
                        <option value="Medical">Medical</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                </div>
                <button className="btn btn-secondary mb-3" onClick={handleReset}>
                    Reset Filters
                </button>
            </div>
            <ul className="list-group">
                {sortedExpenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        cost={expense.cost}
                        date={expense.date}
                        type={expense.type}
                    />
                ))}
            </ul>
        </>
    );
};

export default ExpenseList;