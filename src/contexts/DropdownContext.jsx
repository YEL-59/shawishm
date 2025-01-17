import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [dropdownData, setDropdownData] = useState({
    modality: "All",
    image: "All",
    location: "All",
    reportStatus: "All",
    startDate: null,
    endDate: null,
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    modality: [],
    image: [],
    location: [],
    reportStatus: [],
  });

  const fetchDropdownOptions = async () => {
    try {
      // Fetch data from the API
      const response = await axiosInstance.get("studies/");

      if (response.status === 200 && response.data.success) {
        const data = response.data.data;

        // Extract unique modalities and locations
        const modalities = Array.from(
          new Set(data.map((item) => item.modality).filter(Boolean))
        );
        const locations = Array.from(
          new Set(data.map((item) => item.institution_name).filter(Boolean))
        );
        const reportStatuses = Array.from(
          new Set(data.map((item) => item.status_reported).filter(Boolean))
        );
        // const imageses = Array.from(
        //   new Set(data.map((item) => item.images).filter(Boolean))
        // );

        // Update dropdown options with "All" added after fetching
        setDropdownOptions({
          modality: ["All", ...modalities],
          location: ["All", ...locations],
          reportStatus: ["All", ...reportStatuses],
          image: ["All" ,"With Image","Without Images", ],
        });
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Failed to fetch dropdown options:", error);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  const updateDropdown = (key, value) => {
    setDropdownData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateDateRange = (startDate, endDate) => {
    setDropdownData((prev) => ({
      ...prev,
      startDate,
      endDate,
    }));
  };

  const resetDropdowns = () => {
    setDropdownData({
      modality: "All",
      image: "All",
      location: "All",
      reportStatus: "All",
      startDate: null,
      endDate: null,
    });
  };

  return (
    <DropdownContext.Provider
      value={{
        dropdownData,
        dropdownOptions,
        updateDropdown,
        resetDropdowns,
        updateDateRange,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);
