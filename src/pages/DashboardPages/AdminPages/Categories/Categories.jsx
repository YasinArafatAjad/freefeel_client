import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import AddCategory from "../AddCategory/AddCategory";
import UpdateCategory from "../UpdateCategory/UpdateCategory";
import { IoClose } from "react-icons/io5";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const Categories = () => {
  const [isUpdateCategory, setIsUpdateCategory] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    isPending: isAllCategoryLoading,
    data: allCategory = [],
    refetch,
  } = useQuery({
    queryKey: ["allCategory"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allCategory");
      return res?.data && res?.data?.data;
    },
  });

  // Delete Category
  const handleDeleteCategory = (id) => {
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
          const res = await axiosSecure.delete(`/deleteCategory/${id}`);
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

  // Update Category Component Open
  const handleOpenUpdateCategory = (id) => {
    setCategoryId(id);
    setIsUpdateCategory(true);
  };

  // Update Category Component Close
  const handleCloseUpdateCategory = () => {
    setCategoryId(null);
    setIsUpdateCategory(!isUpdateCategory);
  };

  if (isAllCategoryLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Helmet>
        <title>FreeFeel | Dashboard - All Categories</title>
        <meta name="description" content="Explore all categories on the FreeFeel Dashboard." />
      </Helmet>
      <div className="flex flex-col lg:flex-row justify-center gap-2.5 lg:gap-5">
        {/* Add New Category */}
        <div className="w-full lg:w-1/3 bg-gray-100 dark:bg-gray-800 rounded">
          {isUpdateCategory ? (
            <UpdateCategory
              id={categoryId}
              refetch={refetch}
              setIsUpdateCategory={setIsUpdateCategory}
              setCategoryId={setCategoryId}
            ></UpdateCategory>
          ) : (
            <AddCategory refetch={refetch}></AddCategory>
          )}
        </div>

        {/* All Categories */}
        <div className="w-full lg:w-2/3 bg-gray-100 dark:bg-gray-800 rounded">
          <h3 className="font-primary text-lg font-medium px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600">
            All Categories
          </h3>

          <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="bg-white dark:bg-black border-none">
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">#</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">Category Image</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">Category (English)</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">Category (Bangla)</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">Status</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategory?.map((category, index) => (
                    <tr key={category?._id} className="border-b border-gray-300 dark:border-gray-600">
                      <th className="text-[15px] font-primary font-medium text-light dark:text-dark">{index + 1}</th>
                      <td className="text-[15px] font-primary font-medium text-light dark:text-dark py-1 px-0">
                        <div className="w-[80px] h-[80px] overflow-hidden">
                          <LazyLoadImage
                            src={category?.imageUrl}
                            alt={category?.categoryUrl}
                            effect="blur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="text-[15px] font-primary font-medium text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-300">
                        <Link to={`/category/${category?.categoryUrl}`} className="block">
                          {category?.categoryEng}
                        </Link>
                      </td>
                      <td className="text-[15px] font-secondary font-medium text-light dark:text-dark">
                        {category?.categoryBan}
                      </td>
                      <td className="text-[15px] font-primary font-medium text-light dark:text-dark">{category?.status}</td>
                      <td>
                        <div className="flex justify-center items-center gap-2.5">
                          {isUpdateCategory ? (
                            <>
                              {category?._id === categoryId ? (
                                <button title="Cancel" onClick={handleCloseUpdateCategory}>
                                  <IoClose className="text-light dark:text-dark" size={18}></IoClose>
                                </button>
                              ) : (
                                <div title="Update">
                                  <FaRegEdit className="text-gray-300 dark:text-gray-600" size={18}></FaRegEdit>
                                </div>
                              )}
                            </>
                          ) : (
                            <button title="Update" onClick={() => handleOpenUpdateCategory(category?._id)}>
                              <FaRegEdit className="text-light dark:text-dark" size={18}></FaRegEdit>
                            </button>
                          )}

                          <button title="Delete" onClick={() => handleDeleteCategory(category?._id)}>
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
        </div>
      </div>
    </div>
  );
};

export default Categories;
