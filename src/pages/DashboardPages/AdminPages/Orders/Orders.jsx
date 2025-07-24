import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import { IoEyeOutline } from "react-icons/io5";
import Loader from "../../../../components/Loader/Loader";
import useAdmin from "../../../../hooks/useAdmin/useAdmin";
import useEmployee from "../../../../hooks/useEmployee/useEmployee";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const [isResetQueryLoading, setIsResetQueryLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const [limitPerPage, setLimitPerPage] = useState("5");
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  // States for update delivery status
  const [isDeliveryStatusLoading, setIsDeliveryStatusLoading] = useState(false);
  const [deliveryStatusUpdateProductId, setDeliveryStatusUpdateProductId] = useState("");
  // States for update payment status
  const [isPaymentStatusLoading, setIsPaymentStatusLoading] = useState(false);
  const [paymentStatusUpdateProductId, setPaymentStatusUpdateProductId] = useState("");

  const { isAdmin, isAdminLoading } = useAdmin();
  const { isEmployee, isEmployeeLoading } = useEmployee();

  // Fetch all order
  const {
    isLoading: isAllOrderLoading,
    data: allOrderResponse = {},
    refetch,
    isPreviousData,
  } = useQuery({
    queryKey: ["allOrder", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get("/allOrder", {
        params: { currentPage, limitPerPage, searchQuery, deliveryStatus, paymentStatus },
      });
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, limitPerPage, searchQuery, deliveryStatus, paymentStatus]);

  // Destructure data and hasMore
  const { data: allOrder = [], totalOrders, hasMore } = allOrderResponse;

  // Reset all search, filter and sort query
  const handleResetAllQuery = () => {
    setIsResetQueryLoading(true); // Start the loading animation
    try {
      // Reset all states
      setSearchQuery("");
      setDeliveryStatus("");
      setPaymentStatus("");
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

  // Delete an order
  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/deleteAnOrder/${id}`);
          const successMessage = res?.data?.message || "Success";
          Swal.fire({
            title: "Deleted!",
            text: successMessage,
            icon: "success",
          });
          refetch();
        } catch (error) {
          const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
          Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error",
          });
        }
      }
    });
  };

  // Update Delivery Status
  const handleUpdateDeliveryStatus = async (deliveryStatus, productId) => {
    setIsDeliveryStatusLoading(true);
    setDeliveryStatusUpdateProductId(productId);

    try {
      const res = await axiosSecure.put(`/updateDeliveryStatus/${productId}`, {
        deliveryStatus,
      });

      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      refetch();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsDeliveryStatusLoading(false);
      setDeliveryStatusUpdateProductId("");
      setDeliveryStatus("");
    }
  };

  // Update Payment Status
  const handleUpdatePaymentStatus = async (paymentStatus, productId) => {
    setIsPaymentStatusLoading(true);
    setPaymentStatusUpdateProductId(productId);

    try {
      const res = await axiosSecure.put(`/updatePaymentStatus/${productId}`, {
        paymentStatus,
      });

      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      refetch();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsPaymentStatusLoading(false);
      setPaymentStatusUpdateProductId("");
    }
  };

  const formatDate = (dateString) => {
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  if (isAllOrderLoading || isAdminLoading || isEmployeeLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  // console.log(allOrder);

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded">
      <Helmet>
        <title>FreeFeel | Dashboard - All Orders</title>
        <meta name="description" content="Explore all orders on the FreeFeel Dashboard." />
      </Helmet>
      {/* Search and reset button */}
      <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
        <h3 className="font-primary text-lg font-medium text-start">Your Orders {totalOrders}</h3>

        <div className="w-full lg:w-1/3 flex justify-between items-center gap-2.5">
          <div className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search an order..."
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

      {/* Filter, sort and pagination query */}
      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            {/* Delivery Status Selected */}
            <div className="relative">
              <select
                value={deliveryStatus}
                onChange={(e) => setDeliveryStatus(e.target.value)}
                className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
              >
                <option value="">All Orders</option>
                {["Pending", "Confirmed", "Delivered", "Cancelled"]?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Status Selected */}
            <div className="relative">
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
              >
                <option value="">Payment</option>
                {["Paid", "Unpaid"]?.map((option, index) => (
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
                Show
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
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  #
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Order ID
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Date
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Customer
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Phone Number
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Products
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Amount
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Delivery Status
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Payment Status
                </th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrder?.map((order, index) => (
                <tr key={order?._id} className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                    {currentPage * limitPerPage + index + 1}
                  </th>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap underline">
                    #{order?.orderId}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                    {formatDate(order?.addedAt)}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                    {order?.name}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                    {order?.number}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                    {order?.products?.length}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center text-wrap lg:text-nowrap">
                    ৳ {order?.totalCost}
                  </td>

                  <td>
                    <div className="relative">
                      <select
                        value={order?.deliveryStatus || deliveryStatus}
                        onChange={(e) => handleUpdateDeliveryStatus(e.target.value, order?._id)}
                        className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
                      >
                        {["Pending", "Confirmed", "Delivered", "Cancelled"]?.map((option, index) => (
                          <option key={index} value={option}>
                            {deliveryStatusUpdateProductId == order?._id && isDeliveryStatusLoading ? "Wait..." : option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td>
                    <div className="relative">
                      <select
                        value={order?.paymentStatus}
                        onChange={(e) => handleUpdatePaymentStatus(e.target.value, order?._id)}
                        className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
                      >
                        {["Unpaid", "Paid"]?.map((option, index) => (
                          <option key={index} value={option}>
                            {paymentStatusUpdateProductId == order?._id && isPaymentStatusLoading ? "Wait..." : option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    <div className="flex justify-center items-center gap-2.5">
                      <Link to={isAdmin || isEmployee ? `/dashboard/view-order/${order?._id}` : "/"} title="View">
                        <IoEyeOutline className="text-light dark:text-dark" size={22}></IoEyeOutline>
                      </Link>
                      <button title="Delete" onClick={() => handleDeleteOrder(order?._id)}>
                        <RiDeleteBin6Line className="text-red-500" size={18}></RiDeleteBin6Line>
                      </button>
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

export default Orders;
