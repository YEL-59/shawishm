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
import { Link, useNavigate } from "react-router-dom";
import { usePagination } from "../../contexts/PaginationContext";
import Pagination from "../paginationcontrol/PaginationControls";
import ModalContainer from "../modalContainer/ModalContainer";
import { useDropdown } from "../../contexts/DropdownContext";
import axiosInstance from "../../utils/axiosInstance";

const initialColumns = [
  "Action",
  "#",
  "Name",
  "Study Date",
  "Patient ID",
  "Report Status",
  "Modality",
  "report verifier",
  "Viewed",
  "Branch",
  "Image",
  "Gender",
  "Series",
  "RefPhysician",
  "Institution Name",
  "Radiologist Group",
  "Procedure",
  "Other Comments",
  "Proc Start",
  "radiologist Name",
  "Study Bodyparts",
  "Report Url",
  "Branch Name",
  "Machine Name",
  "Procedure Name",
  "Study Directory",
  "Study Description",
];

const SortableColumn = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    "font-weight": "500",
  };

  return (
    <th
      className="p-5 text-md font-semibold"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {id}
    </th>
  );
};

const DragAndDropTable = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState([]); // To store the API data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any errors

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
  const filteredDataList = data.filter((row) => {
    const { modality, image, location, reportStatus, filterDate } =
      dropdownData;

    return (
      (!modality || modality === "All" || row.modality === modality) &&
      (!image || image === "All" || row.images === image) &&
      (!location || location === "All" || row.institution_name === location) &&
      (!reportStatus ||
        reportStatus === "All" ||
        row.status_reported === reportStatus) &&
      (!filterDate || filterDate === "All" || row.studydate === filterDate)
    );
  });

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredDataList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
  const handleActionClick = (action, row) => {
    if (action === "Edit") {
      useNavigate("/editstudy");
    } else if (action === "Delete") {
      handleOpenModal("Delete");
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto">
        <table border="1" className="w-full text-center ">
          <thead>
            <SortableContext
              items={columns}
              strategy={verticalListSortingStrategy}
            >
              <tr className="text-md  truncate">
                {columns.map((column) => (
                  <SortableColumn
                    key={column}
                    id={column}
                    className="font-semibold"
                  />
                ))}
              </tr>
            </SortableContext>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "" : "bg-gray-200"}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={columnIndex}
                    className="py-5 relative text-sm font-normal"
                  >
                    {column === "Action" ? (
                      <>
                        <BsThreeDotsVertical
                          onClick={() => handleActionDropdownToggle(rowIndex)}
                        />
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
                        <div
                          className="cursor-pointer"
                          onClick={() => handleCommentsDropdownToggle(rowIndex)}
                        >
                          {row[column] || "No Comments"}
                        </div>
                        {commentsDropdownOpen === rowIndex && (
                          <div
                            ref={commentsDropdownRef}
                            className="absolute bg-white border-2 p-2 z-10 flex flex-col"
                          >
                            <button
                              onClick={() => handleActionClick("Edit", row)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleActionClick("Delete", row)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    ) : column === "Name" ? (
                      <span>
                        {row.pat_inc_id_det
                          ? row.pat_inc_id_det.Pat_Name
                          : "N/A"}
                      </span>
                    ) : column === "Study Date" ? (
                      <span>{row.studydate ? row.studydate : "N/A"}</span>
                    ) : column === "Patient ID" ? (
                      <span>
                        {row.pat_inc_id_det ? row.pat_inc_id_det.Pat_ID : "N/A"}
                      </span>
                    ) : column === "Report Status" ? (
                      <span>
                        {row.status_reported ? row.status_reported : "N/A"}
                      </span>
                    ) : column === "Modality" ? (
                      <span>{row.modality ? row.modality : "N/A"}</span>
                    ) : column === "Branch" ? (
                      <span>{row.branch_name ? row.branch_name : "N/A"}</span>
                    ) : column === "Image" ? (
                      <span>{row.images ? row.images : "N/A"}</span>
                    ) : column === "Gender" ? (
                      <span>
                        {row.pat_inc_id_det
                          ? row.pat_inc_id_det.Pat_Sex
                          : "N/A"}
                      </span>
                    ) : column === "Series" ? (
                      <span>{row.series ? row.series : "N/A"}</span>
                    ) : column === "Radiologist Group" ? (
                      <span>
                        {/* Check if radiology_group exists and display Rg_Name procedure_name studydate status_reported  */}
                        {row.radiology_group
                          ? row.radiology_group.Rg_Name
                          : "N/A"}
                      </span>
                    ) : column === "RefPhysician" ? (
                      <span>
                        {row.ref_inc ? row.ref_inc.Ref_Phy_Name : "N/A"}
                      </span>
                    ) : column === "Procedure" ? (
                      <span>
                        {row.procedure_name ? row.procedure_name : "N/A"}
                      </span>
                    ) : column === "Proc Start" ? (
                      <span>{row.proc_start ? row.proc_start : "N/A"}</span>
                    ) : column === "radiologist Name" ? (
                      <span>
                        {row.radiologist_name ? row.radiologist_name : "N/A"}
                      </span>
                    ) : column === "Study Bodyparts" ? (
                      <span>
                        {row.study_bodyparts ? row.study_bodyparts : "N/A"}
                      </span>
                    ) : column === "Report Url" ? (
                      <span>{row.report_url ? row.report_url : "N/A"}</span>
                    ) : column === "Branch Name" ? (
                      <span>{row.branch_name ? row.branch_name : "N/A"}</span>
                    ) : column === "Machine Name" ? (
                      <span>{row.machine_name ? row.machine_name : "N/A"}</span>
                    ) : column === "Procedure Name" ? (
                      <span>
                        {row.procedure_name ? row.procedure_name : "N/A"}
                      </span>
                    ) : column === "Institution Name" ? (
                      <span>
                        {row.institution_name ? row.institution_name : "N/A"}
                      </span>
                    ) : column === "Study Description" ? (
                      <span>
                        {row.study_description ? row.study_description : "N/A"}
                      </span>
                    ) : column === "Study Directory" ? (
                      <span>
                        {row.study_directory ? row.study_directory : "N/A"}
                      </span>
                    ) : column === "Institution" ? (
                      <span>
                        {row.institution_name ? row.institution_name : "N/A"}
                      </span>
                    ) : column === "report verifier" ? (
                      <span>
                        {row.report_verifier ? row.report_verifier : "N/A"}
                      </span>
                    ) : column === "Viewed" ? (
                      <div className="cursor-pointer text-center flex items-center justify-center">
                        <IoEyeOutline
                          onClick={() => handleActionClick("Edit", row)}
                        />
                      </div>
                    ) : column === "Report Status" ? (
                      <span
                        className={`font-semibold ${
                          row[column] === "Completed"
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                      >
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
        <div className="mt-5 mb-5">
          <Pagination />
        </div>
      </div>
      {activeModal && (
        <ModalContainer
          modalRef={modalRef}
          handleCloseModal={handleCloseModal}
        />
      )}
    </DndContext>
  );
};

export default DragAndDropTable;
