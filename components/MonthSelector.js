import React, { useState } from 'react';

const MonthSelector = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth()); // Initialize with current month

    const handleChange = (event) => {
        setSelectedMonthIndex(parseInt(event.target.value));
    };

    return (
        <div className="text-center my-3">
            <select
                value={selectedMonthIndex}
                onChange={handleChange}
                className="form-select"
            >
                {months.map((month, index) => (
                    <option key={index} value={index}>
                        {month}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MonthSelector;