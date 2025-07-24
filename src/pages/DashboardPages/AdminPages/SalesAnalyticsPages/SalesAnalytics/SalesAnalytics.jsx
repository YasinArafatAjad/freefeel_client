import { useState } from "react";
import WeeklySalesReport from "../WeeklySalesReport/WeeklySalesReport"
import MonthlySalesReport from "../MonthlySalesReport/MonthlySalesReport"
import YearlySalesReport from "../YearlySalesReport/YearlySalesReport";
import AnalyticsPage from "../../../../../_components/Analytics/AnalyticsPage";

const SalesAnalytics = () => {
  const [activeTab, setActiveTab] = useState("Monthly");

  return (
    <div className="relative w-full h-full">
      {/* 📊 Header */}
      <div className="flex justify-between items-center px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600">
        <h3 className="font-primary text-lg font-medium">📊 Sales Analytics with Delivery Charge</h3>

        {/* 🗂 Tab Controls */}
        <div className="flex items-center gap-2.5">
          {["Monthly", "Weekly", "Yearly"].map((option) => (
            <button
              key={option}
              onClick={() => setActiveTab(option)}
              className={
                activeTab === option
                  ? "font-primary text-[15px] font-medium border border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded bg-blue-500 text-white"
                  : "font-primary text-[15px] font-medium border border-gray-300 dark:border-gray-600 px-2.5 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* ⬇️ Dynamic View Switching */}
      <div className="mt-4">
        {activeTab === "Weekly" && <WeeklySalesReport />}
        {activeTab === "Monthly" && <MonthlySalesReport />}
        {activeTab === "Yearly" && <YearlySalesReport />}
      </div>

      {/* <AnalyticsPage/> */}
    </div>
  );
};

export default SalesAnalytics;