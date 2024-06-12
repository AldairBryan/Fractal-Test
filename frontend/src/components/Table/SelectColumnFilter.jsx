import React, { useMemo } from 'react';

function SelectColumnFilter({
    column: { filterValue,
              setFilter,
              preFilteredRows,
              id },
}) {
  
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  
  return (
    <select
      name={id}
      id={id}
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className='select'
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>{option}</option>
      ))}
    </select>   
  );
}
export { SelectColumnFilter };