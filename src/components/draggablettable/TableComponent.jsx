import React from 'react';
import { useDropdown } from '../../contexts/DropdownContext';


const TableComponent = () => {
  const { dropdownData } = useDropdown();

  const filterTableData = (data) => {
    return data.filter((item) =>
      Object.keys(dropdownData).every((key) =>
        !dropdownData[key] || dropdownData[key] === 'All' || item[key] === dropdownData[key]
      )
    );
  };
  

  // Example table data
  const tableData = [
    { modality: 'Modalities', study: 'January', location: 'New York', report: 'Weekly', filterDate: 'Today' },
    { modality: 'Modalities', study: 'February', location: 'California', report: 'Monthly', filterDate: 'This Week' },
    { modality: 'X-Ray', study: 'March', location: 'Texas', report: 'Yearly', filterDate: 'This Month' },
    { modality: 'CT', study: 'April', location: 'Florida', report: 'Weekly', filterDate: 'Today' },
    { modality: 'MRI', study: 'May', location: 'New York', report: 'Monthly', filterDate: 'This Week' },
    { modality: 'Ultrasound', study: 'June', location: 'California', report: 'Yearly', filterDate: 'This Month' },
    { modality: 'PET', study: 'July', location: 'Texas', report: 'Weekly', filterDate: 'Today' },
    { modality: 'Nuclear', study: 'August', location: 'Florida', report: 'Monthly', filterDate: 'This Week' },
    { modality: 'CT', study: 'September', location: 'New York', report: 'Yearly', filterDate: 'This Month' },
    { modality: 'MRI', study: 'October', location: 'California', report: 'Weekly', filterDate: 'Today' },
  ];
  

  const filteredData = filterTableData(tableData);
  console.log('Filtered Data:', filteredData);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Modality</th>
            <th>Study</th>
            <th>Location</th>
            <th>Report</th>
            <th>Filter Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.modality}</td>
                <td>{row.study}</td>
                <td>{row.location}</td>
                <td>{row.report}</td>
                <td>{row.filterDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
};

export default TableComponent;
