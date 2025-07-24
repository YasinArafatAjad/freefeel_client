// pages/DashboardPages/AdminPages/AdminHome/AdminHome.jsx
import { Helmet } from "react-helmet-async";
import SalesAnalytics from "../SalesAnalyticsPages/SalesAnalytics/SalesAnalytics";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import {
  FaBox,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Notifications from "../../../../_components/Notifications";
// import {showNotification} from '../DashboardNavbar/DashboardNavbar'

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(amount ?? 0);

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isPending: isOrderStatisticsLoading,
    data: orderStatistics = {},
  } = useQuery({
    queryKey: ["orderStatistics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getOrdersStatistics");
      return res?.data || {};
    },
  });

  if (isOrderStatisticsLoading) {
    return <Loader />;
  }
  return (
    <div className="relative w-full h-full bg-light dark:bg-gray-800">
      <Helmet>
        <title>FreeFeel | Dashboard Home</title>
      </Helmet>     
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-5">
        {/* Total Orders */}
        <StatCard
          icon={<FaBox size={22} className="text-blue-600 dark:text-blue-300" />}
          title="Orders"
          count={orderStatistics.totalOrders}
          amount={orderStatistics.totalOrderPrice}
        />

        {/* Pending Orders */}
        <StatCard
          icon={<FaClock size={22} className="text-yellow-600 dark:text-yellow-300" />}
          title="Pending"
          count={orderStatistics.pendingOrders}
          amount={orderStatistics.pendingOrderPrice}
        />

        {/* Delivered Orders */}
        <StatCard
          icon={<FaCheckCircle size={22} className="text-green-600 dark:text-green-300" />}
          title="Delivered"
          count={orderStatistics.deliveredOrders}
          amount={orderStatistics.deliveredOrderPrice}
        />

        {/* Cancelled Orders */}
        <StatCard
          icon={<FaTimesCircle size={22} className="text-red-600 dark:text-red-300" />}
          title="Cancelled"
          count={orderStatistics.cancelledOrders}
          amount={orderStatistics.cancelledOrderPrice}
        />
      </div>
      {/* <Notifications/> */}
      {/* notifications */}
      <div id="showNotification" className='bg-gray-100  dark:bg-dark  w-full h-full absolute -top-[300vh] right-0 transition-all ease-out duration-200 z-20'>
        <Notifications />
      </div>
      {/* <Notifications/> */}
      <SalesAnalytics />
    </div>
  );
};

const StatCard = ({ icon, title, count = 0, amount = 0 }) => (
  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-full bg-opacity-20">{icon}</div>
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
    </div>
    <div className="text-center space-y-2.5">
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {count ?? 0}
      </p>
      <p className="text-lg font-medium font-primary text-gray-500 dark:text-gray-400 mt-1">
        {formatCurrency(amount)}
      </p>
    </div>
  </div>
);

export default AdminHome;