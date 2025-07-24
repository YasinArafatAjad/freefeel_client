import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
   MapPin,
  Download, Share2, Monitor, Smartphone, Tablet
} from "lucide-react";


import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

import CustomPieChart from "./charts/PieChart";
import StatsCard from "./StatsCard";
import { CiUser } from "react-icons/ci";

const dateRanges = [
  { value: "1d", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

const AnalyticsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [dateRange, setDateRange] = useState("7d");

  // Queries
  const { data: activeUsersData = [],  } = useQuery({
    queryKey: ["activeUsers", dateRange],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/active-users?range=${dateRange}`);
      return res?.data?.rows || [];
    },
  });

  const { data: deviceStats = [], isPending: loadingDevices } = useQuery({
    queryKey: ["deviceCategory", dateRange],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/device-category?range=${dateRange}`);
      return res?.data || [];
    },
  });

  const { data: topCountriesData = [], } = useQuery({
    queryKey: ["topCountries", dateRange],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/top-countries?range=${dateRange}`);
      return res?.data || [];
    },
  });

  // const { data: activeUsers = [],} = useQuery({
  //   queryKey: ["realtimeUsers"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/analytics/realtime-users");
  //     return res?.data?.rows || [];
  //   },
  //   refetchInterval: 30000,
  // });

  // Format Data
  const deviceData = deviceStats.map(row => ({
    name: row.dimensionValues[0]?.value,
    value: parseInt(row.metricValues[0]?.value),
  }));

  const topCountries = topCountriesData.map(row => {
    const name = row.dimensionValues[0]?.value;
    const visitors = parseInt(row.metricValues[0]?.value);
    return { country: name, visitors, flag: "🌐" };
  });

  const totalVisitors = activeUsersData[0]?.metricValues[0]?.value || "0";

  return (
    <div title="Analytics Dashboard">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-dark-700 rounded-lg"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
          onClick={()=>window.print()}
           className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-rose-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
          {/* <motion.button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
            <Share2 className="w-4 h-4" />
            <span>Share Report</span>
          </motion.button> */}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="flex flex-wrap gap-6 mb-8">
        <StatsCard title="Total Visitors" value={totalVisitors} change="+15.3%" changeType="increase" icon={CiUser } color="primary" />

        {/* <StatsCard title="Page Views" value="28,456" change="+8.7%" changeType="increase" icon={Eye} color="blue" />
        
        <StatsCard title="Avg. Session Duration" value="3m 42s" change="+12.1%" changeType="increase" icon={Clock} color="green" />
        <StatsCard title="Bounce Rate" value="34.2%" change="-5.4%" changeType="decrease" icon={TrendingUp} color="purple" /> */}
      </div>

      {/* Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CustomLineChart title="Visitor Trends" data={deviceData} loading={loadingDevices} />
        <CustomBarChart title="Top Pages" data={deviceData} loading={loadingDevices} />
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CustomPieChart title="Device Types" data={deviceData} loading={loadingDevices} />
        <CustomPieChart title="Traffic Sources" data={[]} loading={false} />
        {/* <motion.div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            Real-time Activity
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Coming soon...</p>
        </motion.div> */}
      </div>

      {/* Geographic Data */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> Top Countries
          </h3>
          <div className="space-y-4">
            {topCountries.map((country, index) => {
              const percentage = ((country.visitors / topCountries[0]?.visitors) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{country.visitors.toLocaleString()}</p>
                    <div className="w-20 h-2 bg-gray-200 dark:bg-dark-600 rounded-full mt-1">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Device Breakdown *}
                <motion.div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Device Breakdown
          </h3>
          <div className="space-y-4">
            {deviceData.map((device, index) => {
              const iconMap = {
                desktop: Monitor,
                mobile: Smartphone,
                tablet: Tablet,
              };
              const IconComponent = iconMap[device.name?.toLowerCase()] || Monitor;

              const total = deviceData.reduce((sum, d) => sum + d.value, 0);
              const percentage = ((device.value / total) * 100).toFixed(1);

              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="p-2 bg-primary-500 rounded-lg">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {device.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {percentage}% ({device.value})
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-dark-600 rounded-full">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div> */}

      {/* Performance Metrics */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Page Load Time', value: '1.2s', status: 'good', color: 'text-green-600' },
              { label: 'First Contentful Paint', value: '0.8s', status: 'good', color: 'text-green-600' },
              { label: 'Largest Contentful Paint', value: '2.1s', status: 'needs-improvement', color: 'text-yellow-600' },
              { label: 'Cumulative Layout Shift', value: '0.05', status: 'good', color: 'text-green-600' },
            ].map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {metric.label}
                </p>
                <p className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </p>
                <div
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    metric.status === 'good'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                  }`}
                >
                  {metric.status === 'good' ? 'Good' : 'Needs Improvement'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div> */}
    </div>
  );
};

export default AnalyticsPage;