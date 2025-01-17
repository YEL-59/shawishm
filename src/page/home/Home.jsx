import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import ReportsChart from "../../components/reportschart/ReportsChart";
import PatientsChart from "../../components/patientschart/PatientsChart";

import ReportChartNav from "../../components/reportchartnav/ReportChartNav";
import PatientChartNav from "../../components/patientchartnav/PatientChartNav";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  return (
    <>
      <div className=" space-y-5">
        {/* Reports Chart */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <ReportChartNav />

          <div className="underline border-b-2 border-dashed border-[#5d69f4] opacity-30 mt-8 mb-4"></div>

          {/* Chart Container */}
          <div>
            <ReportsChart />
          </div>
        </div>
        {/* Reports Chart */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <PatientChartNav />

          <div className="underline border-b-2 border-dashed border-[#5d69f4] opacity-30 mt-8 mb-4"></div>

          {/* Chart Container */}
          <div>
            <PatientsChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
