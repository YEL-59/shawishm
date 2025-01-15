import  { useState } from 'react';
import { useDropdown } from '../../contexts/DropdownContext';


const DateFilter = () => {
  const { updateDateRange, dropdownData } = useDropdown(); 
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(dropdownData.startDate || ''); 
  const [endDate, setEndDate] = useState(dropdownData.endDate || ''); 

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    updateDateRange(newStartDate, endDate); 
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    updateDateRange(startDate, newEndDate); 
  };

  return (
    <div className="relative">
      {/* Button to toggle the date range picker */}
      <button
        onClick={handleToggle}
        className="bg-blue-500 text-white py-2 px-4 rounded-md border focus:outline-none"
      >
        {startDate && endDate
          ? `${startDate} - ${endDate}`
          : 'Select Date Range'}
      </button>

      {/* Date range picker dropdown */}
      {isOpen && (
        <div className="absolute mt-2 p-4 bg-white border rounded-md shadow-lg w-72 z-50">
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleToggle}
                className="bg-gray-300 text-gray-700 py-1 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleToggle}
                className="bg-blue-500 text-white py-1 px-4 rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
