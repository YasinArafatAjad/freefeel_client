import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { TfiReload } from "react-icons/tfi";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import useUser from "../../../../hooks/useUser/useUser";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";

const OrderHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { profileData, isProfileDataLoading } = useUser();
  const [isResetQueryLoading, setIsResetQueryLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [limitPerPage, setLimitPerPage] = useState("5");
  const { t } = useTranslation();

  // Fetch all order
  const {
    isLoading: isOrdersLoading,
    data: allOrderResponse = {},
    refetch,
    isPreviousData,
  } = useQuery({
    queryKey: [user?.email, "orders"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/getOrdersByEmail/${user?.email}`, {
        params: { currentPage, limitPerPage, searchQuery, deliveryStatus },
      });
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, limitPerPage, searchQuery, deliveryStatus, currentPage]);

  // Destructure data and hasMore
  const { data: orders = [], totalOrders, hasMore } = allOrderResponse;

  // Reset all search, filter and sort query
  const handleResetAllQuery = () => {
    setIsResetQueryLoading(true); // Start the loading animation
    try {
      // Reset all states
      setSearchQuery("");
      setDeliveryStatus("");
      setLimitPerPage("5");
      setCurrentPage(0);
    } catch (error) {
      console.error(error);
    } finally {
      // Delay stopping the animation slightly
      setTimeout(() => {
        setIsResetQueryLoading(false); // Stop the loading animation
      }, 500);
    }
  };

  const formatDate = (dateString) => {
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour
    const formattedTime = `${hours}:${minutes}${ampm}`;

    return `${day}-${month}-${year} at ${formattedTime}`;
  };

  if (loading || isOrdersLoading || isProfileDataLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative bg-gray-100 dark:bg-gray-800 rounded">
      <Helmet>
        <title>FreeFeel | Order History - {profileData?.name}</title>
      </Helmet>
      {/* Search and reset button */}
      <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
        <h3 className="font-primary text-lg font-medium text-start">
          {t("orderHistory.yourOrders")} {totalOrders}
        </h3>

        <div className="w-full lg:w-1/3 flex justify-between items-center gap-2.5">
          <div className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("orderHistory.searchPlaceholder")}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
          </div>

          <button
            onClick={handleResetAllQuery}
            className="w-9 h-9 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 flex justify-center items-center rounded"
          >
            <TfiReload size={15} className={isResetQueryLoading ? "text-white animate-spin" : "text-white"}></TfiReload>
          </button>
        </div>
      </div>

      {/*  Filter, sort and pagination query */}
      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <div className="flex justify-between items-center">
          <div>
            {/* All Category Selected */}
            <div className="relative">
              <select
                value={deliveryStatus}
                onChange={(e) => setDeliveryStatus(e.target.value)}
                className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
              >
                <option value="">{t("orderHistory.allOrders")}</option>
                {["Pending", "Confirmed", "Delivered", "Cancelled"]?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            {/* Orders limit per page selected */}
            <div className="relative flex items-center gap-2.5">
              <label htmlFor="limitPerPage" className="font-primary text-[15px] font-medium">
                {t("orderHistory.show")}
              </label>
              <select
                id="limitPerPage"
                value={limitPerPage}
                onChange={(e) => setLimitPerPage(e.target.value)}
                className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
              >
                {["5", "10", "20", "50", "100"]?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-white dark:bg-black border-none">
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">#</th>
                <th className="text-[15px] font-dynamic font-medium text-light dark:text-dark text-center">
                  {t("orderHistory.orderId")}
                </th>
                <th className="text-[15px] font-dynamic font-medium text-light dark:text-dark text-center">
                  {t("orderHistory.date")}
                </th>
                <th className="text-[15px] font-dynamic font-medium text-light dark:text-dark text-center">
                  {t("orderHistory.products")}
                </th>
                <th className="text-[15px] font-dynamic font-medium text-light dark:text-dark text-center">
                  {t("orderHistory.amount")}
                </th>
                <th className="text-[15px] font-dynamic font-medium text-light dark:text-dark text-center">
                  {t("orderHistory.deliveryStatus")}
                </th>
                <th className="text-[15px] font-dynamic font-medium text-light dark:text-dark text-center">
                  {t("orderHistory.paymentStatus")}
                </th>
                <th className="text-[15px] font-dynamic font-medium text-light dark:text-dark text-center">
                  {t("orderHistory.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={order?._id} className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    {currentPage * limitPerPage + index + 1}
                  </th>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center underline">
                    #{order?.orderId}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap 2xl:text-nowrap">
                    {formatDate(order?.addedAt)}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    {order?.products?.length}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    ৳ {order?.totalCost}
                  </td>
                  <td className="text-sm font-primary font-medium text-light dark:text-dark text-center">
                    <span
                      className={`rounded-full px-2.5 py-1 ${
                        order?.deliveryStatus === "Pending"
                          ? "bg-yellow-600 text-white"
                          : order?.deliveryStatus === "Delivered"
                          ? "bg-green-500 text-white"
                          : order?.deliveryStatus === "Cancel"
                          ? "bg-red-500 text-white"
                          : order?.deliveryStatus === "Return"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-dark"
                      }`}
                    >
                      {order?.deliveryStatus}
                    </span>
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    <span
                      className={`rounded-full px-2.5 py-1 ${
                        order?.paymentStatus === "Paid"
                          ? "text-green-500"
                          : order?.paymentStatus === "Unpaid"
                          ? "text-red-500"
                          : "text-light dark:text-dark"
                      }`}
                    >
                      {order?.paymentStatus}
                    </span>
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    <div className="flex justify-center items-center gap-2.5">
                      <Link to={`/dashboard/order-details/${order?._id}`} title="View">
                        <IoEyeOutline className="text-light dark:text-dark" size={22}></IoEyeOutline>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Button */}
      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 flex justify-center lg:justify-end items-center gap-2.5">
        <button
          className={currentPage === 0 ? "text-gray-300 dark:text-gray-600" : "text-black"}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          <IoIosArrowBack size={20}></IoIosArrowBack>
        </button>

        <span className="text-[15px] font-medium font-primary">{currentPage + 1}</span>

        <button
          className={isPreviousData || !hasMore ? "text-gray-300 dark:text-gray-600" : "text-black dark:text-black"}
          onClick={() => {
            if (!isPreviousData && hasMore) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
          disabled={isPreviousData || !hasMore}
        >
          <IoIosArrowForward size={20}></IoIosArrowForward>
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
