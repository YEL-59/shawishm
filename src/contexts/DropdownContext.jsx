import React, { createContext, useState, useContext } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [dropdownData, setDropdownData] = useState({
    modality: 'All',
    study: 'All',
    location: 'All',
    report: 'All',
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
      study: '',
      location: '',
      report: '',
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
