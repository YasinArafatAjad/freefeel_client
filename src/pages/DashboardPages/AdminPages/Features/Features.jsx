import { FaRegEdit } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import UpdateSettings from "../UpdateSettings/UpdateSettings";
import { useState } from "react";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";

const Features = () => {
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
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded shadow-md">
      <Helmet>
        <title>FreeFeel | Dashboard - Features</title>
        <meta name="description" content="Explore features on the FreeFeel Dashboard." />
      </Helmet>
      {isUpdateInfo ? (
        <div>
          <UpdateSettings isUpdateInfo={isUpdateInfo} setIsUpdateInfo={setIsUpdateInfo}></UpdateSettings>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
            <h3 className="font-primary text-lg font-medium">Features</h3>
            <button
              onClick={() => setIsUpdateInfo("Features")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded text-white"
            >
              <FaRegEdit size={18}></FaRegEdit>
              <span className="text-sm font-medium">Update</span>
            </button>
          </div>

          {/* Features Cards */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Item */}
            {websiteInfo &&
              [
                {
                  title: "On-Time Delivery",
                  contentEng: websiteInfo?.oneTimeDeliveryEng,
                  contentBan: websiteInfo?.oneTimeDeliveryBan,
                },
                {
                  title: "Free Shipping",
                  contentEng: websiteInfo?.freeShippingEng,
                  contentBan: websiteInfo?.freeShippingBan,
                },
                {
                  title: "24/7 Support",
                  contentEng: websiteInfo?.supportMessageEng,
                  contentBan: websiteInfo?.supportMessageBan,
                },
                {
                  title: "Easy Payment",
                  contentEng: websiteInfo?.easyPaymentEng,
                  contentBan: websiteInfo?.easyPaymentBan,
                },
                {
                  title: "Safe Checkout",
                  contentEng: websiteInfo?.safeCheckoutEng,
                  contentBan: websiteInfo?.safeCheckoutBan,
                },
                {
                  title: "Exclusive Deals",
                  contentEng: websiteInfo?.exclusiveDealsEng,
                  contentBan: websiteInfo?.exclusiveDealsBan,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-black rounded-lg shadow p-5 flex flex-col items-start hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 mb-3.5">
                    <IoCheckmarkCircleOutline size={24} className="text-green-500"></IoCheckmarkCircleOutline>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{feature.title}</h4>
                  </div>
                  <p className="text-[15px] text-light dark:text-dark mb-2">{feature.contentEng}</p>
                  <p className="text-[15px] text-light dark:text-dark">{feature.contentBan}</p>
                </div>
              ))}
          </div>

          {/* Points System */}
          <div className="px-4 py-6">
            <h3 className="text-xl font-semibold text-center mb-4">Points System</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Referrer Points */}
              <div className="bg-white dark:bg-black rounded-lg shadow hover:shadow-lg p-5 flex flex-col items-center text-center">
                <p className="text-xl font-semibold">Referrer Points</p>
                <p className="text-2xl font-bold text-green-500 mt-2">{websiteInfo?.referrerPoints}</p>
              </div>

              {/* Referred Points */}
              <div className="bg-white dark:bg-black rounded-lg shadow hover:shadow-lg p-5 flex flex-col items-center text-center">
                <p className="text-xl font-semibold">Referred Points (New User)</p>
                <p className="text-2xl font-bold text-blue-500 mt-2">{websiteInfo?.referredPoints}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Features;
