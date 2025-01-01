// contexts/DropdownContext.js
import React, { createContext, useState, useContext } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [dropdownData, setDropdownData] = useState({
    dropdown1: '',
    dropdown2: '',
  });

  return (
    <DropdownContext.Provider value={{ dropdownData, setDropdownData }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);
