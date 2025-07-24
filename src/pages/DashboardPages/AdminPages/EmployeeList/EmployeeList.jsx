import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import { IoEyeOutline } from "react-icons/io5";
import Loader from "../../../../components/Loader/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaCircleUser } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [isResetQueryLoading, setIsResetQueryLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const [searchQuery, setSearchQuery] = useState("");
  const [limitPerPage, setLimitPerPage] = useState("5");

  // Fetch all employee
  const {
    isLoading: isAllEmployeeLoading,
    data: allEmployeeResponse = {}, // Default to an empty object
    refetch,
    isPreviousData,
  } = useQuery({
    queryKey: ["allEmployee", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUser", {
        params: { currentPage, limitPerPage, searchQuery, role: "Employee" },
      });
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, limitPerPage, searchQuery]);

  // Destructure data and hasMore
  const { data: allEmployee = [], totalUsers, hasMore } = allEmployeeResponse;

  const handleResetAllQuery = () => {
    setIsResetQueryLoading(true); // Start the loading animation
    try {
      // Reset all states
      setSearchQuery("");
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

  // Delete an user
  const handleDeleteUser = (id) => {
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
          const res = await axiosSecure.delete(`/deleteUser/${id}`);
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

  if (isAllEmployeeLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  // console.log(allEmployee);

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded">
      <Helmet>
        <title>FreeFeel | Dashboard - Employee List</title>
        <meta name="description" content="Explore all employee on the FreeFeel Dashboard." />
      </Helmet>
      {/* Search, reset button and pagination query  */}
      <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
        <div className="w-full lg:w-auto flex justify-between items-center">
          <h3 className="w-full font-primary text-lg font-medium text-start">Total - Employee {totalUsers}</h3>

          {/* Users limit per page selected */}
          <div className="w- flex items-center gap-2.5 lg:hidden">
            <label htmlFor="limitPerPage" className="font-primary text-[15px] font-medium">
              Show
            </label>
            <select
              id="limitPerPage"
              value={limitPerPage}
              onChange={(e) => setLimitPerPage(e.target.value)}
              className="w-16 h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              {["5", "10", "20", "50", "100"]?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-between items-center gap-2.5">
          <div className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search an user..."
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
          </div>

          <button
            onClick={handleResetAllQuery}
            className="w-12 h-9 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 flex justify-center items-center rounded"
          >
            <TfiReload size={15} className={isResetQueryLoading ? "text-white animate-spin" : "text-white"}></TfiReload>
          </button>

          {/* Users limit per page selected */}
          <div className="w-auto hidden lg:flex items-center gap-2.5">
            <label htmlFor="limitPerPage" className="font-primary text-[15px] font-medium">
              Show
            </label>
            <select
              id="limitPerPage"
              value={limitPerPage}
              onChange={(e) => setLimitPerPage(e.target.value)}
              className="w-16 h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
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

      {/* Employees Table */}
      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-white dark:bg-black border-none">
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">#</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Image</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">User</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Email</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Number</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Points</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Refer Code</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Role</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allEmployee?.map((user, index) => (
                <tr key={user?._id} className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    {currentPage * limitPerPage + index + 1}
                  </th>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    <div className="flex justify-center items-center">
                      {user?.imageUrl ? (
                        <LazyLoadImage
                          src={user?.imageUrl}
                          alt={user?.name}
                          effect="blur"
                          className="w-[30px] h-[30px] object-cover rounded-full"
                        />
                      ) : (
                        <FaCircleUser size={30}></FaCircleUser>
                      )}
                    </div>
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    {user?.name}
                  </td>
                  <td className="text-sm font-primary font-medium text-light dark:text-dark text-center">{user?.email}</td>
                  <td className="text-sm font-primary font-medium text-light dark:text-dark text-center">
                    {user?.mobileNumber}
                  </td>
                  <td className="text-sm font-primary font-medium text-light dark:text-dark text-center">{user?.points}</td>
                  <td className="text-sm font-primary font-medium text-light dark:text-dark text-center">
                    {user?.referralCode}
                  </td>
                  <td className="text-sm font-primary font-medium text-light dark:text-dark text-center">{user?.role}</td>

                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                    <div className="flex justify-center items-center gap-2.5">
                      <Link to={`/dashboard/view-employee/${user?._id}`} title="View">
                        <IoEyeOutline className="text-light dark:text-dark" size={22}></IoEyeOutline>
                      </Link>
                      <button title="Delete" onClick={() => handleDeleteUser(user?._id)}>
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

export default EmployeeList;
