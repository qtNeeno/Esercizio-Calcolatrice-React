import React, { useState, useEffect } from 'react';
import Row from './Row';
import Result from './Result';

const Calculator = () => {
  const [rows, setRows] = useState([{ operator: '+', value: 100 }, { operator: '-', value: 30 }]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    calculateResult(rows);
  }, []);

  const handleOperatorChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].operator = event.target.value;
    setRows(updatedRows);
    calculateResult(updatedRows);
  };

  const handleValueChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].value = event.target.value;
    setRows(updatedRows);
    calculateResult(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { operator: '+', value: 0 }]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
    calculateResult(updatedRows);
  };

  const toggleRowDisable = (index) => {
    const updatedRows = [...rows];
    updatedRows[index].disabled = !updatedRows[index].disabled;
    setRows(updatedRows);
    calculateResult(updatedRows);
  };

  const calculateResult = (rows) => {
    let sum = 0;
    let hasValidInput = false;

    rows.forEach((row) => {
      if (!row.disabled) {
        const value = parseFloat(row.value);
        if (!isNaN(value)) {
          hasValidInput = true;
          sum = row.operator === '+' ? sum + value : sum - value;
        }
      }
    });

    setResult(hasValidInput ? sum : 'NaN');
  };

  return (
    <div className="wrapper">
      <div>
        <button onClick={addRow}>Add row</button>
      </div>
      <ul>
        {rows.map((row, index) => (
          <Row
            key={index}
            operator={row.operator}
            value={row.value}
            disabled={row.disabled}
            onOperatorChange={(event) => handleOperatorChange(index, event)}
            onValueChange={(event) => handleValueChange(index, event)}
            onDelete={() => deleteRow(index)}
            onToggleDisable={() => toggleRowDisable(index)}
          />
        ))}
      </ul>
      <Result result={result} />
    </div>
  );
};

export default Calculator;
