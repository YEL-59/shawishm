import React, { useState } from 'react';
import { useDropdown } from '../../contexts/DropdownContext';

const Tabledropdown = () => {
  const { dropdownData, updateDropdown } = useDropdown();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleSelect = (key, value) => {
    updateDropdown(key, value);
    setOpenDropdown(null);
  };

  const dropdownOptions = {
    modality: ['All', 'CR', 'CT', 'Modatily',"X-Ray","MRI"],
    study: ['All', 'January', 'February', 'March'],
    location: ['All', 'New York', 'California', 'Texas'],
    report: ['All', 'Weekly', 'Monthly', 'Yearly'],
    filterDate: ['All', 'Today', 'This Week', 'This Month'],
  };

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
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabledropdown;
