import React, { useState, useEffect, useRef } from "react";
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
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { usePagination } from "../../contexts/PaginationContext";
import Pagination from "../paginationcontrol/PaginationControls";
import ModalContainer from "../modalContainer/ModalContainer";
import { useDropdown } from "../../contexts/DropdownContext";
import axiosInstance from "../../utils/axiosInstance";

const initialColumns = ["Action", "#", "Name", "Study Date", "Patient ID", "Report Status", "Modality", "Comment", "Viewed", "Branch", "Image", "Gender", "Series", "RefPhysician", "Institution", "Radiologist Group", "Procedure", "Other Comments"];

const SortableColumn = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    'font-weight': "500"
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

  const [dropdownOpen, setDropdownOpen] = useState(null); // To control dropdown visibility per row
  const dropdownRef = useRef(null); // Reference for dropdown
  const modalRef = useRef(null); // Reference for modal
  const [actionDropdownOpen, setActionDropdownOpen] = useState(null); // For Action column dropdown
  const [commentsDropdownOpen, setCommentsDropdownOpen] = useState(null); // For Other Comments column dropdown
  const actionDropdownRef = useRef(null); // Ref for Action dropdown
  const commentsDropdownRef = useRef(null); // Ref for Other Comments dropdown
  const { currentPage, itemsPerPage, setTotalItems } = usePagination();

  const { dropdownData } = useDropdown(); // Access dropdown data

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const [filteredData, setFilteredData] = useState([]); 

 



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
      
        const response = await axiosInstance.get("/studies/");

       
        if (response.data.success) {
          setData(response.data.data);
          setFilteredData(response.data.data); 
          setTotalItems(response.data.data.length); 
        } else {
          setError("Failed to load data");
        }
      } catch (error) {
  
        if (error.response && error.response.status === 401) {
          setError("Unauthorized. Please log in again.");
       
          window.location.href = "/login";
        } else {
          setError("Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setTotalItems]);

  // Filter data based on dropdown selections
  const filteredDataList = filteredData.filter((row) => {
    const { modality, image, location, reportStatus, filterDate } = dropdownData;

    return (
      (!modality || modality === "All" || row.Modality === modality) &&
      (!image || image === "All" || row.Image === image) &&
      (!location || location === "All" || row.Institution === location) &&
      (!reportStatus || reportStatus === "All" || row["Report Status"] === reportStatus) &&
      (!filterDate || filterDate === "All" || row.Date === filterDate)
    );
  });

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredDataList.slice(startIndex, startIndex + itemsPerPage);

  // Close dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target)) &&
        (commentsDropdownRef.current && !commentsDropdownRef.current.contains(event.target))
      ) {
        setActionDropdownOpen(null); // Close Action dropdown if clicked outside
        setCommentsDropdownOpen(null); // Close Other Comments dropdown if clicked outside
      }
    };

    // Add event listener for click outside
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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

  const handleActionDropdownToggle = (index) => {
    if (actionDropdownOpen === index) {
      setActionDropdownOpen(null); // Close if already open
    } else {
      setActionDropdownOpen(index);
      setCommentsDropdownOpen(null); // Close Other Comments dropdown if it's open
    }
  };

  const handleCommentsDropdownToggle = (index) => {
    if (commentsDropdownOpen === index) {
      setCommentsDropdownOpen(null); // Close if already open
    } else {
      setCommentsDropdownOpen(index);
      setActionDropdownOpen(null); // Close Action dropdown if it's open
    }
  };

  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
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
      <div className="">
        <table border="1" className="w-full text-center">
          <thead>
            <SortableContext items={columns} strategy={verticalListSortingStrategy}>
              <tr className="space-x-10 text-sm font-semibold">
                {columns.map((column) => (
                  <SortableColumn key={column} id={column} className="mr-10 border-r font-semibold last:border-r-0" />
                ))}
              </tr>
            </SortableContext>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "" : "bg-gray-200"}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className="py-5 relative text-sm font-normal">
                    {column === "Action" ? (
                      <>
                        <BsThreeDotsVertical onClick={() => handleActionDropdownToggle(rowIndex)} />
                        {actionDropdownOpen === rowIndex && (
                          <div
                            ref={actionDropdownRef}
                            className="absolute bg-white border border-gray-300 shadow-lg p-4 rounded-md mt-2 w-64 z-10"
                          >
                            {/* Dropdown Items */}
                          </div>
                        )}
                      </>
                    ) : column === "Other Comments" ? (
                      <>
                        <div className="cursor-pointer" onClick={() => handleCommentsDropdownToggle(rowIndex)}>
                          {row[column] || "No Comments"}
                        </div>
                        {commentsDropdownOpen === rowIndex && (
                          <div ref={commentsDropdownRef} className="absolute bg-white border-2 p-2 z-10 flex flex-col">
                            <button onClick={() => handleActionClick("Edit", row)}>Edit</button>
                            <button onClick={() => handleActionClick("Delete", row)}>Delete</button>
                          </div>
                        )}
                      </>
                    ) : column === "Viewed" ? (
                      <div className="cursor-pointer text-center flex items-center justify-center">
                        <IoEyeOutline onClick={() => handleActionClick("Edit", row)} />
                      </div>
                    ) : column === "Report Status" ? (
                      <span className={`font-semibold ${row[column] === "Completed" ? "text-blue-500" : "text-red-500"}`}>
                        {row[column]}
                      </span>
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
      {activeModal && <ModalContainer modalRef={modalRef} handleCloseModal={handleCloseModal} />}
    </DndContext>
  );
};

export default DragAndDropTable;
