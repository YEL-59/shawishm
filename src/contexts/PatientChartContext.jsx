import { createContext, useContext, useState } from "react";


const PatientChartContext = createContext();


export const usePatientChartContext = () => useContext(PatientChartContext);


export const PatientChartProvider = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <PatientChartContext.Provider
      value={{
        selectedDay,
        setSelectedDay,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </PatientChartContext.Provider>
  );
};
