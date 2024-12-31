import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ReportsChart from '../../components/reportschart/ReportsChart';
import PatientsChart from '../../components/patientschart/PatientsChart';
import { useVisibility } from '../../contexts/VisibilityContext';



// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {

    const { isVisible, response, toggleVisibility } = useVisibility(); 


    return (
        <>


            {isVisible && (<div id="dropdown-content" class=" mt-4 p-4 bg-white border rounded shadow-lg mb-4">
                <div class="flex justify-center items-center gap-20">
                    <div class="flex justify-center gap-5">
                        <div class="relative">
                            <button onclick="toggleDropdown(this)"
                                class="dropdown-btn bg-white border px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between">
                                All
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"
                                    viewBox="0 0 24 24">
                                    <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                            <ul
                                class="dropdown hidden absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10 max-h-48 overflow-y-auto custom-scrollbar">
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'January')">
                                    Modalities
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'February')">
                                    February
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'March')">
                                    March
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'April')">
                                    April
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'May')">
                                    May
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'June')">
                                    June
                                </li>
                            </ul>
                        </div>



                        <div class="relative">
                            <button onclick="toggleDropdown(this)"
                                class="dropdown-btn bg-white border px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between">
                                All
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"
                                    viewBox="0 0 24 24">
                                    <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                            <ul
                                class="dropdown hidden absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10 max-h-48 overflow-y-auto custom-scrollbar">
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'January')">
                                    Modalities
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'February')">
                                    February
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'March')">
                                    March
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'April')">
                                    April
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'May')">
                                    May
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'June')">
                                    June
                                </li>
                            </ul>
                        </div>
                        <div class="relative">
                            <button onclick="toggleDropdown(this)"
                                class="dropdown-btn bg-white border px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between">
                                All
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"
                                    viewBox="0 0 24 24">
                                    <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                            <ul
                                class="dropdown hidden absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10 max-h-48 overflow-y-auto custom-scrollbar">
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'January')">
                                    Modalities
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'February')">
                                    February
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'March')">
                                    March
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'April')">
                                    April
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'May')">
                                    May
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'June')">
                                    June
                                </li>
                            </ul>
                        </div>




                        <div class="relative">
                            <button onclick="toggleDropdown(this)"
                                class="dropdown-btn bg-white border px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between">
                                All
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none"
                                    viewBox="0 0 24 24">
                                    <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                            <ul
                                class="dropdown hidden absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10 max-h-48 overflow-y-auto custom-scrollbar">
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'January')">
                                    Modalities
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'February')">
                                    February
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'March')">
                                    March
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'April')">
                                    April
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'May')">
                                    May
                                </li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'June')">
                                    June
                                </li>
                            </ul>
                        </div>





                        <div class="relative">
                            <button onclick="toggleDropdown(this)"
                                class="dropdown-btn bg-white border  px-3 py-2 rounded-md text-sm w-32 text-left flex items-center justify-between truncate">
                                Filter by Date
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M15.8333 3.3335H4.16667C3.24619 3.3335 2.5 4.07969 2.5 5.00016V16.6668C2.5 17.5873 3.24619 18.3335 4.16667 18.3335H15.8333C16.7538 18.3335 17.5 17.5873 17.5 16.6668V5.00016C17.5 4.07969 16.7538 3.3335 15.8333 3.3335Z"
                                        stroke="#4D4D4D" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M13.3335 1.6665V4.99984" stroke="#4D4D4D" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.6665 1.6665V4.99984" stroke="#4D4D4D" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.5 8.3335H17.5" stroke="#4D4D4D" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <ul
                                class="dropdown hidden absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 w-32 z-10">
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'January')">
                                    January</li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'February')">
                                    February</li>
                                <li class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onclick="selectOption(this, 'March')">March
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div onClick={toggleVisibility}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" onclick="toggleDiv()">
                            <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="#4D4D4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 12H16" stroke="#4D4D4D" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>

                </div>
            </div>)}
            




            <div className=' space-y-5'>
              {/* Reports Chart */}
              <div className="bg-white p-4 rounded shadow overflow-x-auto">
                <div className="section-top flex items-center justify-between">
                    <div className="section-top-left flex items-center gap-4">
                        <h3 className="section-title text-[#404a60] text-lg font-bold leading-6">
                            Total Number of Reports Per Year
                        </h3>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path
                                    d="M9.64941 11.3332L12.9827 7.99984L9.64941 4.6665"
                                    stroke="#DFE0E4"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M4.98291 11.3332L8.31624 7.99984L4.98291 4.6665"
                                    stroke="#DFE0E4"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </span>
                        <p className="section-date text-[#818181] text-sm font-normal leading-4">December, 2025</p>
                    </div>
                </div>

                <div className="underline border-b-2 border-dashed border-[#5d69f4] opacity-30 mt-8 mb-4"></div>

                {/* Chart Container */}
                <div>
                    <ReportsChart />


                </div>
            </div>
             {/* Reports Chart */}
             <div className="bg-white p-4 rounded shadow overflow-x-auto">
                <div className="section-top flex items-center justify-between">
                    <div className="section-top-left flex items-center gap-4">
                        <h3 className="section-title text-[#404a60] text-lg font-bold leading-6">
                            Total Number of Reports Per Year
                        </h3>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path
                                    d="M9.64941 11.3332L12.9827 7.99984L9.64941 4.6665"
                                    stroke="#DFE0E4"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                                <path
                                    d="M4.98291 11.3332L8.31624 7.99984L4.98291 4.6665"
                                    stroke="#DFE0E4"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </span>
                        <p className="section-date text-[#818181] text-sm font-normal leading-4">December, 2025</p>
                    </div>
                </div>

                <div className="underline border-b-2 border-dashed border-[#5d69f4] opacity-30 mt-8 mb-4"></div>

                {/* Chart Container */}
                <div>
                    <PatientsChart/>


                </div>
            </div>

          </div>


        </>
    );
};

export default Home;
