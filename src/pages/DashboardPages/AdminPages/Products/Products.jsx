import { FaPlus, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";

const Products = () => {
  const axiosSecure = useAxiosSecure();
  const [isResetQueryLoading, setIsResetQueryLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limitPerPage, setLimitPerPage] = useState("5");

  // Fetch all category
  const { isPending: isCategoriesLoading, data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories", {
        params: { language: "eng" },
      });

      return res?.data && res?.data?.data;
    },
  });

  // Fetch all product
  const {
    isLoading: isAllProductLoading,
    data: allProductResponse = {}, // Default to an empty object
    refetch,
    isPreviousData,
  } = useQuery({
    queryKey: ["allProduct", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get("/allProduct", {
        params: { currentPage, limitPerPage, searchQuery, selectedCategory },
      });
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, limitPerPage, searchQuery, selectedCategory]);

  const handleResetAllQuery = () => {
    setIsResetQueryLoading(true); // Start the loading animation
    try {
      // Reset all states
      setSearchQuery("");
      setSelectedCategory("");
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

  // Destructure data and hasMore
  const { data: allProduct = [], totalProducts, hasMore } = allProductResponse;

  // Delete product
  const handleDeleteProduct = (id) => {
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
          const res = await axiosSecure.delete(`/deleteProduct/${id}`);
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

  if (isAllProductLoading || isCategoriesLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  // console.log(allProduct);

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded">
      <Helmet>
        <title>FreeFeel | Dashboard - All Products</title>
        <meta name="description" content="Explore all products on the FreeFeel Dashboard." />
      </Helmet>
      {/* Search and reset button */}
      <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
        <div className="w-full lg:w-1/2 flex justify-between items-center">
          <h3 className="w-full font-primary text-lg font-medium text-start">Total Products {totalProducts}</h3>

          <Link
            to="/dashboard/add-new-product"
            className="relative w-auto h-9 flex justify-center items-center lg:hidden gap-1.5 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-2.5 rounded text-white dark:text-white text-nowrap"
          >
            <FaPlus size={12}></FaPlus>
            <span className="text-[15px] font-primary font-medium">Add New</span>
          </Link>
        </div>

        <div className="w-full lg:w-1/2 flex justify-between items-center gap-2.5">
          <div className="w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a product..."
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
          </div>

          <button
            onClick={handleResetAllQuery}
            className="relative w-12 h-9 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 flex justify-center items-center rounded text-nowrap"
          >
            <TfiReload size={15} className={isResetQueryLoading ? "text-white animate-spin" : "text-white"}></TfiReload>
          </button>

          <Link
            to="/dashboard/add-new-product"
            className="relative w-auto h-9 hidden lg:flex justify-center items-center gap-1.5 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-2.5 rounded text-white dark:text-white text-nowrap"
          >
            <FaPlus size={12}></FaPlus>
            <span className="text-[15px] font-primary font-medium">Add New</span>
          </Link>
        </div>
      </div>

      {/* Filter, sort and pagination query */}
      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <div className="flex justify-between items-center">
          <div>
            {/* All Category Selected */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
              >
                <option value="">All Category</option>
                {categories?.map((category) => (
                  <option key={category?._id} value={category?.category}>
                    {category?.category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            {/* Products limit per page selected */}
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
          <table className="table text-center">
            <thead>
              <tr className="bg-white dark:bg-black border-none">
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">#</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">Product</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">Category</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">Price</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">Discount</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">Quantity</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">Stock Status</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">Style Number</th>
                <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-x">Action</th>
              </tr>
            </thead>
            <tbody>
              {allProduct?.map((product, index) => (
                <tr key={index+1} className="border-b border-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:border-gray-600">
                  <th className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">
                    {currentPage * limitPerPage + index + 1}
                  </th>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">
                    <div className="flex items-center gap-2.5 ">
                      <div className="h-14 w-12 flex items-center">
                        <LazyLoadImage
                          src={product?.images[0]}
                          alt={product?.titleEng}
                          effect="blur"
                          className="object-cover"
                        />
                      </div>

                      <div className="w-full">
                        <div className="text-[15px] font-primary font-medium text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-300 mb-2.5">
                          <Link to={`/product-details/${product?.productUrl}`} className="block">
                            {product?.titleEng}
                          </Link>
                        </div>
                        <div className="text-[15px] font-secondary font-medium text-light dark:text-dark opacity-50">
                          {product?.titleBan}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center border-l">
                    {product?.category}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center border-l">
                    ৳ {product?.regularPrice}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center border-l">
                    {product?.discountPercentage} %
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center border-l">
                    {product?.quantity}
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark text-center border-l">
                    <span
                      className={
                        product?.stockStatus === "In Stock"
                          ? "text-green-500"
                          : product?.stockStatus === "Pre-Order"
                          ? "text-blue-500"
                          : product?.stockStatus === "Limited Stock"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {product?.stockStatus}
                    </span>

                    
                  </td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark border-l">{product?.styleNumber}</td>
                  <td className="text-[15px] font-primary font-medium text-light dark:text-dark border-x">
                    <div className="flex justify-center items-center gap-2.5">
                      <Link to={`/dashboard/update-product/${product?._id}`} title="Update">
                        <FaRegEdit className="text-light dark:text-dark" size={18}></FaRegEdit>
                      </Link>
                      <button title="Delete" onClick={() => handleDeleteProduct(product?._id)}>
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

export default Products;
