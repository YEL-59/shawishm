import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import RightArrowIcon from '../../assets/icons/RightArrowIcon';
const ReportChartNav = () => {


    const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open

    const handleSelectChange = (type, value) => {
        console.log(`${type} selected: ${value}`);
    };

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const dropdownIconClass = (dropdown) =>
        openDropdown === dropdown ? "rotate-180" : "rotate-0";
    return (
        <>

            <div className="section-top flex items-center justify-between">
                <div className="section-top-left flex items-center gap-4 p-4 bg-white  rounded-md">
                    {/* Title and Icon */}
                    <h3 className="section-title text-[#404a60] text-lg font-bold flex items-center gap-2">
                        Total Number of Reports Per Year
                        <span className="text-blue-500">
                            <RightArrowIcon />
                        </span>
                    </h3>

                    {/* Date */}
                    <p className="section-date text-[#818181] text-sm font-medium ml-auto">
                        December, 2025
                    </p>
                </div>

                <div>
                    <div className="flex justify-between gap-20">
                        <div>
                            <div className="flex gap-2">
                                {/* Day Dropdown */}
                                <div className="relative">
                                    <select
                                        onChange={(e) => handleSelectChange("Day", e.target.value)}
                                        onClick={() => toggleDropdown("Day")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 appearance-none pr-8"
                                    >
                                        <option value="" disabled selected>
                                            Select Day
                                        </option>
                                        {Array.from({ length: 31 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className={`absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 ${dropdownIconClass(
                                            "Day"
                                        )}`}
                                    >
                                        <IoIosArrowDown />
                                    </span>
                                </div>

                                {/* Month Dropdown */}
                                <div className="relative">
                                    <select
                                        onChange={(e) => handleSelectChange("Month", e.target.value)}
                                        onClick={() => toggleDropdown("Month")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 appearance-none pr-8"
                                    >
                                        <option value="" disabled selected>
                                            Select Month
                                        </option>
                                        {[
                                            "January",
                                            "February",
                                            "March",
                                            "April",
                                            "May",
                                            "June",
                                            "July",
                                            "August",
                                            "September",
                                            "October",
                                            "November",
                                            "December",
                                        ].map((month, index) => (
                                            <option key={index + 1} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className={`absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 ${dropdownIconClass(
                                            "Month"
                                        )}`}
                                    >
                                        <IoIosArrowDown />
                                    </span>
                                </div>

                                {/* Year Dropdown */}
                                <div className="relative">
                                    <select
                                        onChange={(e) => handleSelectChange("Year", e.target.value)}
                                        onClick={() => toggleDropdown("Year")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 appearance-none pr-8"
                                    >
                                        <option value="" disabled selected>
                                            Select Year
                                        </option>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i} value={2024 - i}>
                                                {2024 - i}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className={`absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 ${dropdownIconClass(
                                            "Year"
                                        )}`}
                                    >
                                        <IoIosArrowDown />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <select
                                    onChange={(e) => handleSelectChange("alldepartment", e.target.value)}
                                    onClick={() => toggleDropdown("alldepartment")}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 appearance-none pr-8"
                                >
                                    <option value="" disabled selected>
                                        All Department
                                    </option>
                                    {[
                                        "January",
                                        "February",
                                        "March",

                                    ].map((month, index) => (
                                        <option key={index + 1} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <span
                                    className={`absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 ${dropdownIconClass(
                                        "alldepartment"
                                    )}`}
                                >
                                    <IoIosArrowDown />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ReportChartNav 