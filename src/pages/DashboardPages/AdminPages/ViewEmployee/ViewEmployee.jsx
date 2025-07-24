import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const ViewEmployee = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isEmployeeLoading, setIsEmployeeLoading] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Fetch a specific user
  const {
    isPending: isUserLoading,
    data: user = {},
    refetch,
  } = useQuery({
    queryKey: ["employeeId", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getUserById/${id}`);
      return res?.data && res?.data?.data;
    },
    refetchOnWindowFocus: true,
  });

  //   Handle user "Employee" role
  const handleUserEmployeeRole = async (id) => {
    setIsEmployeeLoading(true);

    let role = user?.role === "Employee" ? "Customer" : "Employee";

    try {
      const res = await axiosPublic.put(`/updateUserRole/${id}`, {
        role,
      });

      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      refetch();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsEmployeeLoading(false);
    }
  };

  //   Handle user "Admin" role
  const handleUserAdminRole = async (id) => {
    setIsAdminLoading(true);

    let role = user?.role === "Admin" ? "Customer" : "Admin";

    try {
      const res = await axiosPublic.put(`/updateUserRole/${id}`, {
        role,
      });

      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      refetch();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsAdminLoading(false);
    }
  };

  // Permission Component List
  const permissionComponents = [
    {
      key: "Products",
      value: "/dashboard/products",
    },
    {
      key: "Add Product",
      value: "/dashboard/add-new-product",
    },
    {
      key: "Update Product",
      value: "/dashboard/update-product/:id",
    },
    {
      key: "All Orders",
      value: "/dashboard/all-order",
    },
    {
      key: "Preview Order",
      value: "/dashboard/view-order/:id",
    },
    {
      key: "Categories",
      value: "/dashboard/categories",
    },
    {
      key: "Banners",
      value: "/dashboard/banners",
    },
    {
      key: "Promo Codes",
      value: "/dashboard/promo-codes",
    },
    {
      key: "Contact Info",
      value: "/dashboard/contact-info",
    },
    {
      key: "Features",
      value: "/dashboard/features",
    },
    {
      key: "Video Ads",
      value: "/dashboard/video-player",
    },
    {
      key: "Discount Offer",
      value: "/dashboard/discount-offer",
    },
  ];

  // Handle the form submission
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await axiosPublic.put(`/updateEmployeePermission/${id}`, data);
      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      refetch();
      reset();
      navigate("/dashboard/employee-list");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(user);

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

  if (isUserLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Helmet>
        <title>FreeFeel | Dashboard | User - {user?.name} </title>
        <meta name="description" content="Explore a user profile on the FreeFeel Dashboard." />
      </Helmet>

      {/* Page Title */}
      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 mb-5 bg-gray-100 dark:bg-gray-800 rounded flex justify-between items-center">
        <h3 className="font-primary text-lg font-semibold">View Profile</h3>

        {/* Back Icon */}
        <Link to="/dashboard/employee-list">
          <MdOutlineClose size={24} className="text-red-500"></MdOutlineClose>
        </Link>
      </div>

      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 mb-5 bg-gray-100 dark:bg-dark rounded">
        {/* View User Image and Name */}
        <div className="flex flex-col justify-center items-center gap-2.5 mb-5 lg:mb-7 2xl:mb-10">
          {user?.image ? (
            <>
              <img
                src={user?.image}
                className="w-[100px] h-[100px] rounded-full object-cover"
                alt={user?.name ? user?.name : "User Name"}
              />
            </>
          ) : (
            <>
              <FaCircleUser size={100}></FaCircleUser>
            </>
          )}

          <h1 className="text-2xl font-bold">
            {user?.name ? user?.name : <span className="text-gray-600">User Name</span>}
          </h1>
        </div>

        {/* View User Basic Info */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-5">
          <div className="w-full lg:w-2/3 space-y-5">
            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-dynamic text-[15px] font-medium">
              <p>{user?.email ? user?.email : <span className="text-gray-600">Email Address</span>}</p>
            </div>

            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-dynamic text-[15px] font-medium">
              <p>{user?.phone ? user?.phone : <span className="text-gray-600">Phone Number</span>}</p>
            </div>

            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-dynamic text-[15px] font-medium">
              <p>{user?.gender ? user?.gender : <span className="text-gray-600">Gender</span>}</p>
            </div>

            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-dynamic text-[15px] font-medium">
              <p>{user?.dateOfBirth ? user?.dateOfBirth : <span className="text-gray-600">Date Of Birth</span>}</p>
            </div>

            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-dynamic text-[15px] font-medium">
              <p>{user?.address ? user?.address : <span className="text-gray-600">Address</span>}</p>
            </div>

            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-dynamic text-[15px] font-medium">
              <p>{user?.country ? user?.country : <span className="text-gray-600">Country</span>}</p>
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-5">
            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-primary text-[15px] font-medium">
              <p>Joining Date: {formatDate(user?.addedAt)}</p>
            </div>

            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-primary text-[15px] font-medium">
              <p>UID: {user?.uid}</p>
            </div>

            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-primary text-[15px] font-medium">
              <p>DB _ID: {user?._id}</p>
            </div>

            <div className="w-full h-12 rounded bg-light dark:bg-gray-800 flex items-center pl-2.5 md:pl-3 lg:pl-5 font-primary text-[15px] font-medium">
              <p>Role: {user?.role}</p>
            </div>

            <button
              onClick={() => handleUserEmployeeRole(user?._id)}
              className={
                user?.role === "Employee"
                  ? "w-full h-12 rounded bg-red-500 dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-600 transition-colors duration-300 text-white dark:text-white flex justify-center items-center pl-2.5 md:pl-3 lg:pl-5 font-primary text-center text-[15px] font-medium"
                  : "w-full h-12 rounded bg-yellow-500 dark:bg-yellow-500 hover:bg-yellow-600 dark:hover:bg-yellow-600 transition-colors duration-300 text-white dark:text-white flex justify-center items-center pl-2.5 md:pl-3 lg:pl-5 font-primary text-center text-[15px] font-medium"
              }
            >
              {user?.role === "Employee" ? (
                <p>{isEmployeeLoading ? "Loading... Please Wait!" : "Remove From Employee"}</p>
              ) : (
                <p>{isEmployeeLoading ? "Loading... Please Wait!" : "Make Employee"}</p>
              )}
            </button>

            <button
              onClick={() => handleUserAdminRole(user?._id)}
              className={
                user?.role === "Admin"
                  ? "w-full h-12 rounded bg-red-500 dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-600 transition-colors duration-300 text-white dark:text-white flex justify-center items-center pl-2.5 md:pl-3 lg:pl-5 font-primary text-center text-[15px] font-medium"
                  : "w-full h-12 rounded bg-green-500 dark:bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 transition-colors duration-300 text-white dark:text-white flex justify-center items-center pl-2.5 md:pl-3 lg:pl-5 font-primary text-center text-[15px] font-medium"
              }
            >
              {user?.role === "Admin" ? (
                <p>{isAdminLoading ? "Loading... Please Wait!" : "Remove From Admin"}</p>
              ) : (
                <p>{isAdminLoading ? "Loading... Please Wait!" : "Make Admin"}</p>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Set Employee Role */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded">
        <h3 className="font-primary text-lg font-semibold px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600">
          Employee Permissions
        </h3>

        <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full h-full space-y-5">
              {permissionComponents?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={option?.value}
                      {...register("components", { required: true })}
                      defaultChecked={user?.components?.includes(option?.value)}
                      className="w-4 h-4 border border-gray-300 rounded-md bg-gray-100 checked:bg-blue-600 checked:border-blue-600  hover:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
                    />
                  </label>
                  <p className="font-primary text-[15px] font-medium">{option?.key}</p>
                </div>
              ))}
            </div>

            <div className="relative w-full h-full">
              {errors.components?.type === "required" && (
                <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                  Please select at least on option
                </p>
              )}
            </div>

            <div className="relative w-full h-full flex justify-end col-span-12">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 font-primary text-[15px] font-medium text-white py-1.5 px-2.5 rounded"
              >
                {isLoading ? "Processing..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
