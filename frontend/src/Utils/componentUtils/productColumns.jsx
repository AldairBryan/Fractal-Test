import { useMemo } from 'react';
import { SelectColumnFilter } from '../../components/Table/SelectColumnFilter';


export default function productColumns() {
    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",                
            },
            {
                Header: "Name",
                accessor: "name",                
            },
            {
                Header: "Unit Price",
                accessor: "unitPrice",                
            },
        ],
        []
    );
    return columns;
}