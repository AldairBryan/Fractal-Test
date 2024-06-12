import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTable, useGlobalFilter, useSortBy, useFilters, usePagination, useRowSelect } from 'react-table';
import { GlobalFilter } from "./GlobalFilter";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { BsFillTrashFill, BsFillPencilFill, BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight } from "react-icons/bs";

function Table ({ nombreID, columns, data, nombre, onEdit, onDelete, clickableRows}) {
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const navigate = useNavigate();

  const handleRowClick = (rowId) => {
    if(clickableRows) {
      navigate(`/${nombre}/${rowId}`);
    }
  };

  return (
  <>
  <div className="contenedor-filtro">
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={state.globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
    {headerGroups.map((headerGroup) =>
      headerGroup.headers.map((column) =>
        column.Filter ? (
          <div key={column.id} className="contenedor-seleccionar">
            <label htmlFor={column.id} className='text-fil'>{column.render("Header")}: </label>
            {column.render("Filter")}
          </div>
        ) : null
      )
    )}
  </div>

  <div className="contenedor-lista">
    <div className='contenedor-headerLista'>
      <h3>List of {nombre}</h3>
      <div className='contenedor-opcCheckboxes'>
        {Object.keys(state.selectedRowIds).length > 0 && (
          <>
            <h6>Actions:</h6>
            <BsFillTrashFill
              color='white'
              className='accionDelete'            
            />
          </>
        )}
      </div>
    </div>
    <table {...getTableProps()} className="tabla">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr className="tabla-header"
          {...headerGroup.getHeaderGroupProps()} >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
              >
                {column.render("Header")}
              </th>
            ))}
            <th>Acciones</th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className='tabla-row'>
              {row.cells.map((cell, index) => {
                return  (
                  <td 
                    key={index}
                    onClick={() => {
                      if (index > 0) {
                        handleRowClick(eval(`row.original.${nombreID}`));
                      }
                    }}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
              <td>
                <span className="actions">
                  <BsFillPencilFill
                    color='green'
                    className="btn-edit"
                    onClick={() => onEdit(eval(`row.original.${nombreID}`))}
                  />
                  <BsFillTrashFill
                    color='green'
                    className="btn-delete"
                    onClick={() => onDelete(eval(`row.original.${nombreID}`))}
                  />
                </span>
              </td>
            </tr>            
          );
        })}        
      </tbody>
    </table>

    <div className="paginacion">
      <p>
        <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </p>
      <div className="pag-botones">
        <button className='btn-pagin' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <BsChevronBarLeft color='white' width={10} height={10}/>
        </button>
        <button className='btn-pagin' onClick={() => previousPage()} disabled={!canPreviousPage}>
          <BsChevronLeft color='white' width={10} height={10}/>
        </button>
        <button className='btn-pagin' onClick={() => nextPage()} disabled={!canNextPage}>
          <BsChevronRight color='white' width={10} height={10}/>
        </button>
        <button className='btn-pagin' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <BsChevronBarRight color='white' width={10} height={10}/>
        </button> 
      </div>     
      <select className="select"
        value={state.pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[5, 10, 20].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      
    </div>
  </div>
  </>    
  );
}
export { Table };
