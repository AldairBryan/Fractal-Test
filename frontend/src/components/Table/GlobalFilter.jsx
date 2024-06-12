import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { BsSearch } from "react-icons/bs";
import 'regenerator-runtime/runtime';

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {

  const count = preGlobalFilteredRows.length;

  const [value, setValue] = useState(globalFilter);
  
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  
  return (
    <div className="contenedor-input">
      <span>
        <BsSearch className='icon-search'/>
      </span>
      <input
        type="search"
        value={value || ""}
        onChange={ handleInputChange }
        placeholder={`${count} registros...`}
        className='input-search'
      />
    </div>
  );
}
export { GlobalFilter };