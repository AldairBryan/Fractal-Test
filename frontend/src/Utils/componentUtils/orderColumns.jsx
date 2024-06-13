import { useMemo } from 'react';
import { SelectColumnFilter } from '../../components/Table/SelectColumnFilter';


export default function orderColumns() {
    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",                
            },
            {
                Header: "Order Number",
                accessor: "orderNumber",                
            },
            {
                Header: "Date",
                accessor: "date",                
            },
            {
                Header: "Number Of Products",
                accessor: "numberOfProducts",                
            },
            {
                Header: "Final Price",
                accessor: "finalPrice",                
            },
            {
                Header: "Status",
                accessor: "status",
                Filter: SelectColumnFilter,
                filter: 'includes',                
            },
        ],
        []
    );
    return columns;
}