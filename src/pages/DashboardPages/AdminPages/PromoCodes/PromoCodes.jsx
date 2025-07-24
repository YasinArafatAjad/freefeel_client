import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import AddPromoCode from "../AddPromoCode/AddPromoCode";
import UpdatePromoCode from "../UpdatePromoCode/UpdatePromoCode";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const PromoCodes = () => {
  const [isUpdatePromoCode, setIsUpdatePromoCode] = useState(false);
  const [promoCodeId, setPromoCodeId] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    isPending: isAllPromoCodeLoading,
    data: allPromoCode = [],
    refetch,
  } = useQuery({
    queryKey: ["allPromoCode"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allPromoCode");
      return res?.data && res?.data?.data;
    },
  });

  // console.log(allPromoCode);

  // Delete PromoCode
  const handleDeletePromoCode = (id) => {
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
          const res = await axiosSecure.delete(`/deletePromoCode/${id}`);
          const successMessage = res?.data?.message || "Success";
          Swal.fire({
            title: "Deleted!",
            text: successMessage,
            icon: "success",
          });
          refetch();
        } catch (error) {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong!";
          Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error",
          });
        }
      }
    });
  };

  // Update PromoCode Component Open
  const handleOpenUpdatePromoCode = (id) => {
    setPromoCodeId(id);
    setIsUpdatePromoCode(true);
  };

  // Update PromoCode Component Close
  const handleCloseUpdatePromoCode = () => {
    setPromoCodeId(null);
    setIsUpdatePromoCode(!isUpdatePromoCode);
  };

  if (isAllPromoCodeLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Helmet>
        <title>FreeFeel | Dashboard - All Promo Codes</title>
        <meta
          name="description"
          content="Explore all promo codes on the FreeFeel Dashboard."
        />
      </Helmet>
      <div className="flex flex-col lg:flex-row justify-center gap-2.5 lg:gap-5">
        {/* Add New PromoCode */}
        <div className="w-full lg:w-1/3 bg-gray-100 dark:bg-gray-800 rounded">
          {isUpdatePromoCode ? (
            <UpdatePromoCode
              id={promoCodeId}
              refetch={refetch}
              setIsUpdatePromoCode={setIsUpdatePromoCode}
              setPromoCodeId={setPromoCodeId}
            ></UpdatePromoCode>
          ) : (
            <AddPromoCode refetch={refetch}></AddPromoCode>
          )}
        </div>

        {/* All Promo Codes */}
        <div className="w-full lg:w-2/3 bg-gray-100 dark:bg-gray-800 rounded">
          <h3 className="font-primary text-lg font-medium px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600">
            All Promo Codes
          </h3>

          <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="bg-white dark:bg-black border-none">
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                      #
                    </th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                      Code
                    </th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                      Discount
                    </th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                      Start / Expiry Date
                    </th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                      Categories
                    </th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allPromoCode?.map((code, index) => (
                    <tr
                      key={code?._id}
                      className="border-b border-gray-300 dark:border-gray-600"
                    >
                      <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                        {index + 1}
                      </th>
                      <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                        {code?.promoCode}
                      </td>
                      <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                        {code?.discountPercentage}
                      </td>
                      <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">
                        <div className="space-y-1">
                          <p>{code?.startDate} </p>
                          <p className="text-red-500 dark:text-red-500">
                            {code?.expiryDate}
                          </p>
                        </div>
                      </td>

                      <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center w-full">
                        {Array.isArray(code?.categories) &&
                        code.categories.length > 0 ? (
                          <div className="flex flex-wrap gap-2.5">
                            {code?.categories?.map((category, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 rounded-full text-sm text-center text-nowrap"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">
                            N/A
                          </p>
                        )}
                      </td>

                      <td>
                        <div className="w-full h-full flex justify-center items-center gap-2.5">
                          {isUpdatePromoCode ? (
                            <>
                              {code?._id === promoCodeId ? (
                                <button
                                  title="Cancel"
                                  onClick={handleCloseUpdatePromoCode}
                                >
                                  <IoClose
                                    className="text-light dark:text-dark"
                                    size={18}
                                  ></IoClose>
                                </button>
                              ) : (
                                <div title="Update">
                                  <FaRegEdit
                                    className="text-gray-300 dark:text-gray-600"
                                    size={18}
                                  ></FaRegEdit>
                                </div>
                              )}
                            </>
                          ) : (
                            <button
                              title="Update"
                              onClick={() =>
                                handleOpenUpdatePromoCode(code?._id)
                              }
                            >
                              <FaRegEdit
                                className="text-light dark:text-dark"
                                size={18}
                              ></FaRegEdit>
                            </button>
                          )}

                          <button
                            title="Delete"
                            onClick={() => handleDeletePromoCode(code?._id)}
                          >
                            <RiDeleteBin6Line
                              className="text-red-500"
                              size={18}
                            ></RiDeleteBin6Line>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodes;
