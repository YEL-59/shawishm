import React, { useState } from 'react';
import { useDropdown } from '../../contexts/DropdownContext';

const Tabledropdown = () => {
  const { dropdownData, updateDropdown, resetDropdowns } = useDropdown();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleSelect = (key, value) => {
    updateDropdown(key, value);
    setOpenDropdown(null);
  };

  const handleFilter = () => {
    console.log('Filter applied with:', dropdownData);
    // Filtering logic
    const filteredData = filterData();
    console.log(filteredData);
  };
  

  const filterData = () => {
    const filtered = data.filter((item) => {
      const { modality, study, location, report, filterDate } = dropdownData;
  
      // Filter by Modality
      const modalityMatch = modality === 'All' || item.Modality === modality;
  
      // Filter by Study (Image)
      const studyMatch = study === 'All' || item.Image === study;
  
      // Filter by Location (Branch)
      const locationMatch = location === 'All' || item.Branch === location;
  
      // Filter by Report Status
      const reportMatch = report === 'All' || item['Report Status'] === report;
  
      // Filter by Filter Date (Today, This Week, This Month)
      const filterDateMatch = checkDateFilter(item['Study Date'], filterDate);
  
      return modalityMatch && studyMatch && locationMatch && reportMatch && filterDateMatch;
    });
  
    return filtered;
  };
  
  
  
  const checkDateFilter = (studyDate, filterDate) => {
    const today = new Date();
    const studyDateObj = new Date(studyDate);
  
    switch (filterDate) {
      case 'Today':
        return today.toDateString() === studyDateObj.toDateString();
      case 'This Week':
        const startOfWeek = today.getDate() - today.getDay();
        const endOfWeek = startOfWeek + 6;
        const weekStartDate = new Date(today.setDate(startOfWeek));
        const weekEndDate = new Date(today.setDate(endOfWeek));
        return studyDateObj >= weekStartDate && studyDateObj <= weekEndDate;
      case 'This Month':
        return today.getMonth() === studyDateObj.getMonth() && today.getFullYear() === studyDateObj.getFullYear();
      default:
        return true;
    }
  };
  

  const dropdownOptions = {
    modality: ['All', 'CR', 'CT', 'Modality', 'X-Ray', 'MRI'],
    image: ['All', 'With Image', 'Without Image'],  
    location: ['All', 'XYZ Hospital', 'ABC Medical Center	', 'Texas'], 
    report: ['All', 'Partial', 'Completed but not verified', 'Verified', 'None'],  
    filterDate: ['All', 'Today', 'This Week', 'This Month'],  
  };

  const isFilterDisabled = Object.values(dropdownData).some((value) => !value);

  return (
    <div id="dropdown-content" className="mt-4 p-4 bg-white border rounded shadow-lg mb-4">
      <div className="flex justify-center items-center gap-20">
        {Object.keys(dropdownOptions).map((key) => (
          <div className="relative" key={key}>
            <button
              onClick={() => toggleDropdown(key)}
              className="dropdown-btn bg-white border px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between"
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
              <ul className="dropdown absolute bg-white border rounded-md shadow-md mt-1 w-32 z-10">
                {dropdownOptions[key].map((option) => (
                  <li
                    key={option}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(key, option)}
                  >
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        checked={dropdownData[key] === option}
                        onChange={() => handleSelect(key, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleFilter}
          className={`px-4 py-2 rounded bg-gray-500 text-black border${
            isFilterDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isFilterDisabled}
        >
          Filter
        </button>
        <button
          onClick={resetDropdowns}
          className="px-4 py-2 rounded bg-gray-500 text-black border"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Tabledropdown;
