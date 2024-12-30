import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Define item type for drag and drop
const ITEM_TYPE = 'column';

const DraggableTableRow = ({ row, columnOrder }) => {
  return (
    <tr>
      {columnOrder.map((columnKey, index) => (
        <td key={index}>{row[columnKey]}</td>
      ))}
    </tr>
  );
};

const DraggableTableHeader = ({ column, index, moveColumn }) => {
  const [, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    hover: (item) => {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index; // Update the dragged item's index
      }
    },
  }));

  return (
    <th ref={(node) => drag(drop(node))} className="cursor-move">
      {column}
    </th>
  );
};

const DraggableTable = () => {
  const initialColumns = [
    'Action', '#', 'Name', 'Study Date', 'Patient ID', 'Report Status', 'Modality',
    'Comment', 'Viewed', 'Branch', 'Image', 'Gender', 'Series', 'Ref. Physician', 
    'Institution', 'Radiologist Group', 'Procedure', 'Other Comments'
  ];

  const [columnOrder, setColumnOrder] = useState(initialColumns);
  const [data, setData] = useState([
    {
      'Action': 'View', '#': 1, 'Name': 'John Doe', 'Study Date': '2024-01-01', 'Patient ID': '123', 'Report Status': 'Pending', 'Modality': 'MRI',
      'Comment': 'No comments', 'Viewed': 'Yes', 'Branch': 'Downtown', 'Image': 'image1.jpg', 'Gender': 'Male', 'Series': 'A1',
      'Ref. Physician': 'Dr. Smith', 'Institution': 'City Hospital', 'Radiologist Group': 'Group A', 'Procedure': 'CT Scan', 'Other Comments': 'None'
    },
    {
      'Action': 'View', '#': 2, 'Name': 'Jane Smith', 'Study Date': '2024-02-01', 'Patient ID': '456', 'Report Status': 'Completed', 'Modality': 'X-ray',
      'Comment': 'N/A', 'Viewed': 'No', 'Branch': 'Uptown', 'Image': 'image2.jpg', 'Gender': 'Female', 'Series': 'B1',
      'Ref. Physician': 'Dr. Johnson', 'Institution': 'Uptown Clinic', 'Radiologist Group': 'Group B', 'Procedure': 'X-ray', 'Other Comments': 'Follow-up needed'
    },
    // Add more rows as needed
  ]);

  const moveColumn = (fromIndex, toIndex) => {
    const updatedColumns = [...columnOrder];
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    setColumnOrder(updatedColumns);

    // Reorder data based on column order
    const updatedData = data.map((row) => {
      const reorderedRow = {};
      updatedColumns.forEach((col) => {
        reorderedRow[col] = row[col];
      });
      return reorderedRow;
    });
    setData(updatedData);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columnOrder.map((column, index) => (
              <DraggableTableHeader
                key={index}
                index={index}
                column={column}
                moveColumn={moveColumn}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <DraggableTableRow
              key={rowIndex}
              row={row}
              columnOrder={columnOrder}
            />
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};

export default DraggableTable;
