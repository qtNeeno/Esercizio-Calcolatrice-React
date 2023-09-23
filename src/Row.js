import React from 'react';

const Row = ({ operator, value, disabled, onOperatorChange, onValueChange, onDelete, onToggleDisable }) => {
  return (
    <li>
      <select value={operator} onChange={onOperatorChange}>
        <option>+</option>
        <option>-</option>
      </select>
      <input type="text" value={value} onChange={onValueChange} disabled={disabled} />
      <button onClick={onDelete}>Delete</button>
      <button onClick={onToggleDisable}>{disabled ? 'Enable' : 'Disable'}</button>
    </li>
  );
};

export default Row;
