import React from "react";

const YearPicker = ({ selectedYear, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 12 },
    (_, index) => currentYear - index + 1
  );

  return (
    <select
      className="form-select me-2"
      value={selectedYear}
      onChange={onChange}
    >
      <option value="">Year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearPicker;
