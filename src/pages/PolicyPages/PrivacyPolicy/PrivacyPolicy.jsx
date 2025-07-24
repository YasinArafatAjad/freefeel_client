import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useWebsiteInfo from "../../../hooks/useWebsiteInfo/useWebsiteInfo";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { TbSquareDotFilled } from "react-icons/tb";

const PrivacyPolicy = () => {
  const location = useLocation();
  const { websiteInfo, isWebsiteInfoLoading } = useWebsiteInfo();
  const { t } = useTranslation();

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
                    <span className="font-dynamic text-[15px] font-bold">{parts[0]}:</span>
                    <span className="font-dynamic text-[15px] font-medium">{parts?.slice(1).join(":")}</span>
                  </>
                ) : (
                  <span className="font-dynamic text-[15px] font-medium">{paragraph}</span>
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
    <div className="bg-gray-100 dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | Privacy Policy</title>
        <meta
          name="description"
          content="Read the FreeFeel Privacy Policy to understand how we handle your personal information, ensuring transparency and security for all our users."
        />
        <link rel="canonical" href={`${import.meta.env.VITE_REACT_APP_BASE_URL}${location?.pathname}`} />
      </Helmet>

      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 py-10 lg:py-5 2xl:py-10">
        <h3 className="text-base lg:text-lg font-medium font-dynamic bg-black text-center py-2.5 text-white mb-2.5">
          {t("footer.privacyPolicy")}
        </h3>

        <p className="text-[15px] text-light dark:text-dark">{renderDescription(websiteInfo.privacyPolicy)}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
