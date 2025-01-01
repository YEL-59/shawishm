import * as React from 'react';
import {
    randomCity,
    randomEmail,
    randomId,
    randomInt,
    randomTraderName,
    randomUserName,
} from '@mui/x-data-grid-generator';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'username', headerName: 'Username' },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'age', type: 'number', headerName: 'Age' },
];

const rows = [];

function getRow() {
    return {
        id: randomId(),
        name: randomTraderName(),
        city: randomCity(),
        username: randomUserName(),
        email: randomEmail(),
        age: randomInt(10, 80),
    };
}

for (let i = 0; i < 10; i += 1) {
    rows.push(getRow());
}

const pinnedRows = {
    top: [getRow(), getRow()],
    bottom: [getRow()],
};

export default function RowPinning() {
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid columns={columns} rows={rows} pinnedRows={pinnedRows} /> 
        </div>
    );
}
