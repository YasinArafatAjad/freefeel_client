import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../../components/Loader/Loader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import moment from "moment";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure/useAxiosSecure";

const YearlySalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("Sales");
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const {
    isLoading: isYearlySalesReportLoading,
    data: yearlySales = {},
    refetch,
  } = useQuery({
    queryKey: ["yearlySalesReport", selectedYear],
    queryFn: async () => {
      const res = await axiosSecure.get("/yearlySalesReport", {
        params: { year: selectedYear },
      });
      return res?.data || {};
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const {
        month,
        totalOrders,
        totalSalesCost,
        deliveredOrders,
        totalDeliveredOrdersCost,
        canceledOrders,
        totalCanceledOrdersCost,
      } = payload[0].payload;
      return (
        <div className="bg-white text-light dark:bg-black dark:text-dark p-2.5 rounded font-primary text-[15px] font-medium space-y-1">
          <p>
            <strong className="text-black dark:text-white">Month:</strong> {month} {yearlySales?.year}
          </p>
          <p>
            <strong className="text-blue-600">Total Orders:</strong> {totalOrders} / ৳{totalSalesCost}
          </p>
          <p>
            <strong className="text-green-600">Delivered Orders:</strong> {deliveredOrders} / ৳{totalDeliveredOrdersCost}
          </p>
          <p>
            <strong className="text-red-600">Canceled Orders:</strong> {canceledOrders} / ৳{totalCanceledOrdersCost}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isYearlySalesReportLoading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full h-full p-2.5 lg:p-5">
      <div className="mb-2.5 lg:mb-5">
        <select
          className="p-2 bg-white dark:bg-black text-light dark:text-dark border border-blue-500 rounded text-[15px] font-primary font-medium"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {[...Array(10)].map((_, index) => {
            const year = moment().year() - index;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      {activeTab === "Sales" && (
        <div className="relative w-full h-[400px] mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlySales?.reports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={customTooltip} />
              {/* <Legend /> */}
              <Bar dataKey="totalSalesCost" fill="#2563EB" />
              <Bar dataKey="totalDeliveredOrdersCost" fill="#16A34A" />
              <Bar dataKey="totalCanceledOrdersCost" fill="#DC2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "Orders" && (
        <div className="relative w-full h-[400px] mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlySales?.reports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={customTooltip} />
              {/* <Legend /> */}
              <Bar dataKey="totalOrders" fill="#2563EB" />
              <Bar dataKey="deliveredOrders" fill="#16A34A" />
              <Bar dataKey="canceledOrders" fill="#DC2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

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

export default YearlySalesReport;
