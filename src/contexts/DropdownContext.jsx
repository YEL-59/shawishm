import React, { createContext, useState, useContext } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [dropdownData, setDropdownData] = useState({
    modality: 'All',
    image: 'All',
    location: 'All',
    reportStatus: 'All',
    filterDate: 'All',
  });
  

  const updateDropdown = (key, value) => {
    setDropdownData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetDropdowns = () => {
    setDropdownData({
      modality: '',
      image: '',
      location: '',
      reportStatus: '',
      filterDate: '',
    });
  };

  return (
    <DropdownContext.Provider value={{ dropdownData, updateDropdown, resetDropdowns }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);
