import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'COLUMN';

const DraggableColumn = ({ column, index, moveColumn }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
        draggedItem.index = index;  // Update the index of the dragged item
      }
    },
  });

  return (
    <th
      ref={(node) => drop(ref(node))}
      style={{
        cursor: 'move',
        padding: '8px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
      }}
    >
      {column.label}
    </th>
  );
};

const DraggableTable = () => {
  const [columns, setColumns] = useState([
    { id: 'name', label: 'Name' },
    { id: 'calories', label: 'Calories' },
    { id: 'fat', label: 'Fat (g)' },
    { id: 'carbs', label: 'Carbs (g)' },
    { id: 'protein', label: 'Protein (g)' },
  ]);

  const [rows] = useState([
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  ]);

  const moveColumn = (fromIndex, toIndex) => {
    const updatedColumns = [...columns];
    // Swap the columns
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    setColumns(updatedColumns);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <DraggableColumn
                key={column.id}
                column={column}
                index={index}
                moveColumn={moveColumn}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.id}
                  style={{ padding: '8px', border: '1px solid #ddd' }}
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};

export default DraggableTable;
