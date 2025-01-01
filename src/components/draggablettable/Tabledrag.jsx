import React, { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"; 
import { CSS } from "@dnd-kit/utilities"; 

const initialColumns = ["Action", "#", "Name", "Study Date", "Patient ID", "Report Status", "Modality", "Comment", "Viewed", "Branch", "Image", "Gender", "Series", "RefPhysician", "Institution", "Radiologist Group", "Procedure", "Other Comments"];

const SortableColumn = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = 
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <th ref={setNodeRef} style={style} {...attributes} {...listeners}> 
      {id}
    </th>
  );
};

const DragAndDropTable = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState([]); // To store the API data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any errors

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Fetch data from the fake JSON file when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); 
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = columns.indexOf(active.id); 
      const newIndex = columns.indexOf(over.id);

      const updatedColumns = [...columns];
      updatedColumns.splice(oldIndex, 1);
      updatedColumns.splice(newIndex, 0, active.id);

      setColumns(updatedColumns);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <SortableContext items={columns} strategy={verticalListSortingStrategy}>
            <tr>
              {columns.map((column) => (
                <SortableColumn key={column} id={column} />
              ))}
            </tr>
          </SortableContext>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column] || "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DndContext>
  );
};

export default DragAndDropTable;
