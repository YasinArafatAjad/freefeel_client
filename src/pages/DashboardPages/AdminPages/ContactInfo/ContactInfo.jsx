import { FaRegEdit } from "react-icons/fa";
import UpdateSettings from "../UpdateSettings/UpdateSettings";
import { useState } from "react";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";

const ContactInfo = () => {
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
        <title>FreeFeel | Dashboard - Contact Info</title>
        <meta name="description" content="Explore contact info on the FreeFeel Dashboard." />
      </Helmet>
      {isUpdateInfo ? (
        <div>
          <UpdateSettings isUpdateInfo={isUpdateInfo} setIsUpdateInfo={setIsUpdateInfo}></UpdateSettings>
        </div>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
            <h3 className="font-primary text-lg font-medium">Contact Info</h3>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsUpdateInfo("Contact Info")}
                className="w-auto h-9 flex justify-center items-center gap-1.5 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-2.5 rounded text-white dark:text-white"
              >
                <FaRegEdit size={16}></FaRegEdit>
                <span className="text-[15px] font-primary font-medium">Update</span>
              </button>
            </div>
          </div>

          <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 grid grid-cols-12 gap-5">
            {/* Contact Number  */}
            <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4">
              <p className="font-primary text-[15px] font-medium">Contact Number</p>
              <p className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium flex justify-start items-center">
                {websiteInfo?.contactNumber}
              </p>
            </div>

            {/* Customer Care Number  */}
            <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4">
              <p className="font-primary text-[15px] font-medium">Customer Care Number</p>
              <p className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium flex justify-start items-center">
                {websiteInfo?.customerCareNumber}
              </p>
            </div>

            {/* WhatsApp Number  */}
            <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4">
              <p className="font-primary text-[15px] font-medium">WhatsApp Number</p>
              <p className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium flex justify-start items-center">
                {websiteInfo?.whatsappNumber}
              </p>
            </div>

            {/* Support Email  */}
            <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4">
              <p className="font-primary text-[15px] font-medium">Support Email</p>
              <p className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium flex justify-start items-center">
                {websiteInfo?.supportEmail}
              </p>
            </div>

            {/*  Info Email  */}
            <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4">
              <p className="font-primary text-[15px] font-medium">Info Email</p>
              <p className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium flex justify-start items-center">
                {websiteInfo?.infoEmail}
              </p>
            </div>

            {/*  Career Email  */}
            <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4">
              <p className="font-primary text-[15px] font-medium">Career Email</p>
              <p className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium flex justify-start items-center">
                {websiteInfo?.careerEmail}
              </p>
            </div>

            {/*  Shop Address  */}
            <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4">
              <p className="font-primary text-[15px] font-medium">Shop Address</p>
              <p className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium flex justify-start items-center">
                {websiteInfo?.address}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactInfo;
