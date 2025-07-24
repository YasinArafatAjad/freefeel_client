import { FaRegEdit } from "react-icons/fa";
import UpdateSettings from "../UpdateSettings/UpdateSettings";
import { useState } from "react";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

const DiscountOffer = () => {
  const [isUpdateInfo, setIsUpdateInfo] = useState("");

  const { websiteInfo, isWebsiteInfoLoading } = useWebsiteInfo();

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded">
      <Helmet>
        <title>FreeFeel | Dashboard - Discount Offer</title>
        <meta name="description" content="Explore discount offer on the FreeFeel Dashboard." />
      </Helmet>
      {isUpdateInfo ? (
        <div>
          <UpdateSettings isUpdateInfo={isUpdateInfo} setIsUpdateInfo={setIsUpdateInfo}></UpdateSettings>
        </div>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
            <h3 className="font-primary text-lg font-medium">Discount Offer</h3>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsUpdateInfo("Discount Offer")}
                className="w-auto h-9 flex justify-center items-center gap-1.5 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-2.5 rounded text-white dark:text-white"
              >
                <FaRegEdit size={16}></FaRegEdit>
                <span className="text-[15px] font-primary font-medium">Update</span>
              </button>
            </div>
          </div>

          <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 space-y-5">
            <div className="bg-white dark:bg-black rounded-lg shadow p-5 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <p className="font-primary text-lg font-medium mb-5">Home Page</p>

              <div className="flex items-center gap-2 mb-3.5">
                <IoCheckmarkCircleOutline size={24} className="text-green-500"></IoCheckmarkCircleOutline>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Discount Code: {websiteInfo.discountCode}
                </h4>
              </div>
              <p className="text-[15px] text-light dark:text-dark mb-2">{websiteInfo.discountOfferEng}</p>
              <p className="text-[15px] text-light dark:text-dark">{websiteInfo.discountOfferBan}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiscountOffer;
