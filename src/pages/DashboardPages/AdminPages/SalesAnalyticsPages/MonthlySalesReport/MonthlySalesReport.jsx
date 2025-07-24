import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../../components/Loader/Loader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import moment from "moment";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure/useAxiosSecure";

const MonthlySalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("Sales");
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1); // Default: Current Month (1-12)
  const [selectedYear, setSelectedYear] = useState(moment().year()); // Default: Current Year

  // Fetch monthly sales report based on selected month & year
  const {
    isLoading: isMonthlySalesReportLoading,
    data: monthlySales = {},
    refetch,
  } = useQuery({
    queryKey: ["monthlySalesReport", selectedMonth, selectedYear],
    queryFn: async () => {
      const res = await axiosSecure.get("/monthlySalesReport", {
        params: { month: selectedMonth, year: selectedYear },
      });
      return res?.data || {};
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, selectedMonth, selectedYear]);

  // Handle Month-Year Change
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Custom tooltip function to show day and date
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { day, fullDate, totalOrders, totalCost } = payload[0].payload;
      return (
        <div className="bg-white text-light dark:bg-black dark:text-dark p-2.5 rounded font-primary text-[15px] font-medium space-y-1">
          <p>
            <strong className="text-blue-600">Day:</strong> {day}
          </p>
          <p>
            <strong className="text-purple-600">Date:</strong> {fullDate}
          </p>
          <p>
            <strong className="text-red-600">Total Orders:</strong> {totalOrders}
          </p>
          <p>
            <strong className="text-green-600">Total Sales:</strong> ৳{totalCost}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isMonthlySalesReportLoading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full h-full p-2.5 lg:p-5">
      {/* Month-Year Selection Dropdown */}
      <div className="flex gap-3 mb-2.5 lg:mb-5">
        {/* Month Selector */}
        <select
          className="p-2 bg-white dark:bg-black text-light dark:text-dark border border-blue-500 rounded text-[15px] font-primary font-medium"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {moment.months().map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        {/* Year Selector */}
        <select
          className="p-2 bg-white dark:bg-black text-light dark:text-dark border border-blue-500 rounded text-[15px] font-primary font-medium"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {[...Array(10)].map((_, index) => {
            const year = moment().year() - index; // Last 10 years
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      {/* Sales Chart */}
      {activeTab === "Sales" && (
        <div className="relative w-full h-[400px] mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlySales?.reports} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" /> {/* Show numeric date on X-axis */}
              <YAxis />
              <Tooltip content={customTooltip} />
              <Area type="monotone" dataKey="totalCost" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Orders Chart */}
      {activeTab === "Orders" && (
        <div className="relative w-full h-[400px] mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlySales?.reports} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" /> {/* Show numeric date on X-axis */}
              <YAxis />
              <Tooltip content={customTooltip} />
              <Area type="monotone" dataKey="totalOrders" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Tab Buttons */}
      <div className="relative w-full h-full flex justify-center items-center gap-2.5">
        <button
          onClick={() => setActiveTab("Sales")}
          className={activeTab === "Sales" ? "text-blue-500 font-medium" : "hover:text-blue-500 transition-colors"}
        >
          Sales
        </button>
        <button
          onClick={() => setActiveTab("Orders")}
          className={activeTab === "Orders" ? "text-blue-500 font-medium" : "hover:text-blue-500 transition-colors"}
        >
          Orders
        </button>
      </div>
    </div>
  );
};

export default MonthlySalesReport;
