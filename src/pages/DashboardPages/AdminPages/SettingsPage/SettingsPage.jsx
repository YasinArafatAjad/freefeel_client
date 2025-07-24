import { FaRegEdit } from "react-icons/fa";
import UpdateSettings from "../UpdateSettings/UpdateSettings";
import { useState } from "react";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { TbSquareDotFilled } from "react-icons/tb";

const SettingsPage = () => {
  const [isUpdateInfo, setIsUpdateInfo] = useState("");

  const { websiteInfo, isWebsiteInfoLoading } = useWebsiteInfo();

  // Home page preview sections list
  const previewSections = [
    "All Products",
    "New Arrival",
    "Most Popular",
    "Top Banner",
    "Second Banner",
    "Categories",
    "Video Ads",
    "Discount Offer",
    "Features",
    // "Offer Ads",
  ];

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
        <title>FreeFeel | Dashboard - Settings</title>
        <meta name="description" content="Explore settings on the FreeFeel Dashboard." />
      </Helmet>
      {isUpdateInfo ? (
        <div>
          <UpdateSettings isUpdateInfo={isUpdateInfo} setIsUpdateInfo={setIsUpdateInfo}></UpdateSettings>
        </div>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
            <h3 className="font-primary text-lg font-medium">Settings</h3>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsUpdateInfo("Settings")}
                className="w-auto h-9 flex justify-center items-center gap-1.5 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-2.5 rounded text-white dark:text-white"
              >
                <FaRegEdit size={16}></FaRegEdit>
                <span className="text-[15px] font-primary font-medium">Update</span>
              </button>
            </div>
          </div>

          <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 space-y-5">
            <div className="bg-white dark:bg-black rounded-lg shadow p-5 flex justify-around items-center gap-5">
              <div>
                <p className="font-primary text-lg font-medium mb-2.5 text-center">Logo Light</p>
                <div className="w-[200px] h-[100px]">
                  <img src={websiteInfo?.logoLight} alt="Selected" className="w-full h-full object-cover rounded" />
                </div>
              </div>
              <div>
                <p className="font-primary text-lg font-medium mb-2.5 text-center">Logo Dark</p>
                <div className="w-[200px] h-[100px]">
                  <img src={websiteInfo?.logoDark} alt="Selected" className="w-full h-full object-cover rounded" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black rounded-lg shadow p-5 flex flex-col items-start">
              <p className="font-primary text-lg font-medium mb-2.5">Preview Sections</p>

              <div className="space-y-3.5">
                {previewSections.map((section, index) => (
                  <div key={index} className="flex justify-start items-center gap-2.5">
                    {/* Check if section is in websiteInfo.sections */}
                    <TbSquareDotFilled
                      size={15}
                      className={websiteInfo?.sections?.includes(section) ? "text-green-500" : "text-red-500"}
                    />
                    <p className="font-primary text-[15px] font-medium">{section}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPage;
