import React, { useState } from 'react';
import { useDropdown } from '../../contexts/DropdownContext';
import MinasIcon from '../../assets/icons/MinasIcon.';
import { useVisibility } from '../../contexts/VisibilityContext';

const Tabledropdown = ({ data }) => {
  const { dropdownData, updateDropdown, resetDropdowns } = useDropdown();
  const [openDropdown, setOpenDropdown] = useState(null);
    const { isVisible, toggleVisibility } = useVisibility();

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleSelect = (key, value) => {
    updateDropdown(key, value);
    setOpenDropdown(null);
  };

  const handleFilter = () => {
    console.log('Filter applied with:', dropdownData);
    const filteredData = filterData();
    console.log('Filtered Data:', filteredData);
  };

  const filterData = () => {
    return data.filter((item) => {
      const { modality, image, location, reportStatus, filterDate } = dropdownData;
  
      // Debugging to inspect values
      console.log("Dropdown reportStatus:", reportStatus);
      console.log("Item Report Status:", item["Report Status"]);
  
      
      const modalityMatch = modality === 'All' || item.Modality === modality;
      const imageMatch = image === 'All' || item.Image === image;
      const locationMatch = location === 'All' || item.Institution === location;
      const reportMatch = reportStatus === 'All' || (item["Report Status"] && item["Report Status"].trim().toLowerCase() === reportStatus.trim().toLowerCase())

      const filterDateMatch = checkDateFilter(item['Study Date'], filterDate);
  
      return modalityMatch && imageMatch && locationMatch && reportMatch && filterDateMatch;
    });
  };
  

  const checkDateFilter = (studyDate, filterDate) => {
    const today = new Date();
    const studyDateObj = new Date(studyDate);

    switch (filterDate) {
      case 'Today':
        return today.toDateString() === studyDateObj.toDateString();
      case 'This Week':
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() + 6));
        return studyDateObj >= startOfWeek && studyDateObj <= endOfWeek;
      case 'This Month':
        return today.getMonth() === studyDateObj.getMonth() && today.getFullYear() === studyDateObj.getFullYear();
      default:
        return true;
    }
  };

  const dropdownOptions = {
    modality: ['All', 'CR', 'CT', 'X-Ray', 'MRI'],
    image: ['All', 'With Image', 'Without Image'],
    location: ['All', 'XYZ Hospital', 'ABC Medical Center', 'Texas'],
    reportStatus: ['All', 'Partial','Verified','Completed','Pending', 'None'],
    filterDate: ['All', 'Today', 'This Week', 'This Month'],
  };

  return (
    <div className="mt-4 p-4 bg-white border rounded shadow-lg">
      <div className="flex justify-center items-center gap-6">
        {Object.keys(dropdownOptions).map((key) => (
          <div className="relative" key={key}>
            <button
              onClick={() => toggleDropdown(key)}
              className="bg-white border px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between"
              aria-label={`Select ${key}`}
            >
              {dropdownData[key] || 'All'}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openDropdown === key && (
              <ul className="absolute bg-white border rounded-md shadow-md mt-1 w-32 z-10">
                {dropdownOptions[key].map((option) => (
                  <li
                    key={option}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(key, option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
         <div className="flex justify-center gap-4 ">
        {/* <button
          onClick={filterData}
          className="px-4 py-2 rounded bg-blue-500 text-black"
        >
          Filter
        </button> */}
        <button
          onClick={resetDropdowns}
          className="px-4 py-2 rounded bg-[#00CCFF] text-white"
        >
          Reset
        </button>
      </div>
      <div onClick={toggleVisibility} className=" items-center gap-6  cursor-pointer">
        <MinasIcon/>
      </div>
      </div>
      
     
    </div>
  );
};

export default Tabledropdown;
