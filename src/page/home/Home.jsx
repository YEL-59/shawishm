import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ReportsChart from '../../components/reportschart/ReportsChart';
import PatientsChart from '../../components/patientschart/PatientsChart';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {


   

    return (
        <>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p>Welcome to the Dashboard!</p>

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
