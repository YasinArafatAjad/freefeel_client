// import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import { FaRegEdit } from "react-icons/fa";
// import AddBanner from "../AddBanner/AddBanner";
// import UpdateBanner from "../UpdateBanner/UpdateBanner";
// import { IoClose } from "react-icons/io5";
// import Loader from "../../../../components/Loader/Loader";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "react-helmet-async";
import "react-lazy-load-image-component/src/effects/blur.css";
import EditSlide from "../../../../_components/edit_slide/EditSlide";
import Banner from "../../../HomePage/HomeSections/TopBanner/TopBanner";









const Banners = () => {
  // const [isUpdateBanner, setIsUpdateBanner] = useState(false);
  // const [bannerId, setBannerId] = useState(null);
  const axiosPublic = useAxiosPublic();

  const {

    data: allBanners = [],

  } = useQuery({
    queryKey: ["allBanners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBanners");
      return res?.data && res?.data?.data;
    },
  });
  console.log(allBanners);

  // // Delete Banner
  // const handleDeleteBanner = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to delete this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const res = await axiosPublic.delete(`/deleteBanner/${id}`);
  //         const successMessage = res?.data?.message || "Success";
  //         Swal.fire({
  //           title: "Deleted!",
  //           text: successMessage,
  //           icon: "success",
  //         });
  //         refetch();
  //       } catch (error) {
  //         const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
  //         Swal.fire({
  //           title: "Error!",
  //           text: errorMessage,
  //           icon: "error",
  //         });
  //       }
  //     }
  //   });
  // };

  // Update Banner Component Open
  // const handleOpenUpdateBanner = (id) => {
  //   setBannerId(id);
  //   setIsUpdateBanner(true);
  // };

  // // Update Banner Component Close
  // const handleCloseUpdateBanner = () => {
  //   setBannerId(null);
  //   setIsUpdateBanner(!isUpdateBanner);
  // };

  // if (isAllBannersLoading) {
  //   return (
  //     <div>
  //       <Loader></Loader>
  //     </div>
  //   );
  // }

  // console.log(allBanners);

  return (
    <div className="w-full h-full relative">
      <Helmet>
        <title>FreeFeel | Dashboard - All Banners</title>
        <meta name="description" content="Explore all banners on the FreeFeel Dashboard." />
      </Helmet>
      {/* <div className="flex flex-col lg:flex-row justify-center gap-2.5 lg:gap-5 "> */}
      <div>
        {/* Add New Banner */}
        {/* <div className="w-full lg:w-1/3 bg-gray-100 dark:bg-gray-800 rounded">
          {isUpdateBanner ? (
            <UpdateBanner
              id={bannerId}
              refetch={refetch}
              isUpdateBanner={isUpdateBanner}
              setIsUpdateBanner={setIsUpdateBanner}
              setBannerId={setBannerId}
            ></UpdateBanner>
          ) : (
            <AddBanner refetch={refetch}></AddBanner>
          )}
        </div> */}

        {/* All Banners */}
        {/* <div className="w-full lg:w-2/3 bg-gray-100 dark:bg-gray-800 rounded">
          <h3 className="font-primary text-lg font-medium px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600">
            All Banners
          </h3>

          <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
            <div className="overflow-x-auto">
              <table className="table">
               
                <thead>
                  <tr className="bg-white dark:bg-black border-none">
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">#</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">Banner Image</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">Category</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark">Section</th>
                    <th className="text-[15px] font-primary font-medium text-light dark:text-dark text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allBanners?.map((banner, index) => (
                    <tr key={banner?._id} className="border-b border-gray-300 dark:border-gray-600">
                      <th className="text-[15px] font-primary font-medium text-light dark:text-dark">{index + 1}</th>
                      <td className="text-[15px] font-primary font-medium text-light dark:text-dark">
                        <div className="relative w-full h-full overflow-hidden">
                          <LazyLoadImage
                            src={banner?.imageUrl}
                            alt={banner?.titleEng}
                            effect="blur"
                            className="w-[200px] md:w-[240px] lg:w-[300px] h-[100px] md:h-[120px] 2xl:w-[400px] lg:h-[150px] 2xl:h-[200px] object-cover"
                          />
                        </div>
                      </td>
                      <td className="text-[15px] font-secondary font-medium text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-300 text-nowrap">
                        <Link to={`/category/${banner?.categoryUrl}`} className="block">
                          {banner?.category}
                        </Link>
                      </td>
                      <td className="text-[15px] font-secondary font-medium text-light dark:text-dark text-nowrap">
                        {banner?.section}
                      </td>
                      <td className="text-[15px] font-secondary font-medium text-light dark:text-dark">
                        <div className="flex justify-start items-center gap-2.5">
                          {isUpdateBanner ? (
                            <>
                              {banner?._id === bannerId ? (
                                <button title="Cancel" onClick={handleCloseUpdateBanner}>
                                  <IoClose className="text-light dark:text-dark" size={18}></IoClose>
                                </button>
                              ) : (
                                <div title="Update">
                                  <FaRegEdit className="text-gray-300 dark:text-gray-600" size={18}></FaRegEdit>
                                </div>
                              )}
                            </>
                          ) : (
                            <button title="Update" onClick={() => handleOpenUpdateBanner(banner?._id)}>
                              <FaRegEdit className="text-light dark:text-dark" size={18}></FaRegEdit>
                            </button>
                          )}

                          <button title="Delete" onClick={() => handleDeleteBanner(banner?._id)}>
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
        </div> */}


        {/* mohi code 2n developer */}










        <EditSlide></EditSlide>
        

        <Banner></Banner>





      </div>
    </div>
  );
};

export default Banners;
