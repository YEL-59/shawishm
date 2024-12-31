import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useDraggableColumns = (initialColumns) => {
  const [columns, setColumns] = useState(initialColumns);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedColumns = reorder(columns, result.source.index, result.destination.index);
    setColumns(reorderedColumns);
  };

  return { columns, setColumns, onDragEnd };
};
export default useDraggableColumns;
