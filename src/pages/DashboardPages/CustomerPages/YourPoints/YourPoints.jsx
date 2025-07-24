import { Helmet } from "react-helmet-async";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import useUser from "../../../../hooks/useUser/useUser";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";

const YourPoints = () => {
  const { t } = useTranslation();
  const { profileData, isProfileDataLoading } = useUser();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();

  if (isProfileDataLoading || isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-10 lg:px-20 2xl:px-24 py-5 relative w-full h-screen bg-light dark:bg-dark">
      <Helmet>
        <title>FreeFeel | Your Points - {profileData?.name}</title>
      </Helmet>
      {/* Back Icon */}
      <Link to="/dashboard/profile" className="absolute right-2.5 top-2.5">
        <MdOutlineClose size={24} className="text-red-500"></MdOutlineClose>
      </Link>

      <h1 className="text-2xl font-bold text-center font-dynamic mb-5 lg:mb-7 2xl:mb-10">
        {t("customerDashboard.yourPoints")}: <span className="font-primary text-red-500">{profileData?.points}</span>
      </h1>

      <h1 className="text-lg font-semibold text-center font-dynamic mb-5 lg:mb-7 2xl:mb-10">
        {t("youPoints.instructionOne")}{" "}
        <Link to={`tel:${websiteInfo?.contactNumber}`} className="text-blue-500 dark:text-blue-500">
          {websiteInfo?.contactNumber}
        </Link>{" "}
        {t("youPoints.instructionTwo")}
      </h1>
    </div>
  );
};

export default YourPoints;
