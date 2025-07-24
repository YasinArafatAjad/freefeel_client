import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../../components/Loader/Loader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure/useAxiosSecure";

const WeeklySalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("Sales");

  // Fetch weekly sells report
  const { isLoading: isWeeklySalesReportLoading, data: weeklySales = {} } = useQuery({
    queryKey: ["weeklySalesReport"],
    queryFn: async () => {
      const res = await axiosSecure.get("/weeklySalesReport");
      return res?.data || {};
    },
  });

  // Custom tooltip function to show day and date
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { day, date, totalOrders, totalCost } = payload[0].payload;
      return (
        <div className="bg-white text-light dark:bg-black dark:text-dark p-2.5 rounded font-primary text-[15px] font-medium space-y-1">
          <p>
            <strong className="text-blue-600">Day:</strong> {day}
          </p>
          <p>
            <strong className="text-purple-600">Date:</strong> {date}
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

  if (isWeeklySalesReportLoading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full h-full p-2.5 lg:p-5">
      {/* Sales Chart */}
      {activeTab === "Sales" && (
        <div className="relative w-full h-[400px] mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySales?.reports} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" /> {/* Show date on X-axis */}
              <YAxis />
              <Tooltip content={customTooltip} /> {/* Custom Tooltip */}
              <Area type="monotone" dataKey="totalCost" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Orders Chart */}
      {activeTab === "Orders" && (
        <div className="relative w-full h-[400px] mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySales?.reports} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" /> {/* Show date on X-axis */}
              <YAxis />
              <Tooltip content={customTooltip} /> {/* Custom Tooltip */}
              <Area type="monotone" dataKey="totalOrders" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="relative w-full h-full flex justify-center items-center gap-2.5">
        <button
          onClick={() => setActiveTab("Sales")}
          className={
            activeTab === "Sales"
              ? "font-primary text-[15px] font-medium text-blue-500 dark:text-blue-500"
              : "font-primary text-[15px] font-medium text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-300"
          }
        >
          Sales
        </button>
        <button
          onClick={() => setActiveTab("Orders")}
          className={
            activeTab === "Orders"
              ? "font-primary text-[15px] font-medium text-blue-500 dark:text-blue-500"
              : "font-primary text-[15px] font-medium text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-300"
          }
        >
          Orders
        </button>
      </div>
    </div>
  );
};

export default WeeklySalesReport;
