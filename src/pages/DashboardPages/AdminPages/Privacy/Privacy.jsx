import { FaRegEdit } from "react-icons/fa";
import UpdateSettings from "../UpdateSettings/UpdateSettings";
import { useState } from "react";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { TbSquareDotFilled } from "react-icons/tb";

const Privacy = () => {
  const [isUpdateInfo, setIsUpdateInfo] = useState("");

  const { websiteInfo, isWebsiteInfoLoading } = useWebsiteInfo();

  // This function for giving actual space
  const renderDescription = (description) => {
    return (
      <ul className="list-none">
        {description?.split("\n").map((paragraph, index) => {
          const parts = paragraph.split(":");
          return (
            <li key={index} className="flex items-start py-2.5">
              {/* Fixed size Dot Icon */}
              <div className="flex-shrink-0 mr-2 mt-1">
                <TbSquareDotFilled size={15} className="text-red-500" />
              </div>
              <div className="flex-grow">
                {parts?.length > 1 ? (
                  <>
                    <span className="font-primary text-[15px] font-bold">{parts[0]}:</span>
                    <span className="font-primary text-[15px] font-medium">{parts?.slice(1).join(":")}</span>
                  </>
                ) : (
                  <span className="font-primary text-[15px] font-medium">{paragraph}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

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
        <title>FreeFeel | Dashboard - Privacy Policy</title>
        <meta name="description" content="Explore privacy on the FreeFeel Dashboard." />
      </Helmet>
      {isUpdateInfo ? (
        <div>
          <UpdateSettings isUpdateInfo={isUpdateInfo} setIsUpdateInfo={setIsUpdateInfo}></UpdateSettings>
        </div>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
            <h3 className="font-primary text-lg font-medium">Privacy Policy</h3>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsUpdateInfo("Privacy Policy")}
                className="w-auto h-9 flex justify-center items-center gap-1.5 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-2.5 rounded text-white dark:text-white"
              >
                <FaRegEdit size={16}></FaRegEdit>
                <span className="text-[15px] font-primary font-medium">Update</span>
              </button>
            </div>
          </div>

          <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 space-y-5">
            <div className="bg-white dark:bg-black rounded-lg shadow p-5 flex flex-col items-start">
              <p className="text-[15px] text-light dark:text-dark">{renderDescription(websiteInfo.privacyPolicyEng)}</p>
            </div>

            <div className="bg-white dark:bg-black rounded-lg shadow p-5 flex flex-col items-start">
              <p className="text-[15px] text-light dark:text-dark">{renderDescription(websiteInfo.privacyPolicyBan)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Privacy;
