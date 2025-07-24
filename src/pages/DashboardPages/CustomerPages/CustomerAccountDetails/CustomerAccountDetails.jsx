import { FaCircleUser } from "react-icons/fa6";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import useUser from "../../../../hooks/useUser/useUser";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CustomerAccountDetails = () => {
  const { t } = useTranslation();
  const { profileData, isProfileDataLoading } = useUser();

  if (isProfileDataLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-10 lg:px-20 2xl:px-24 py-5 relative w-full h-full">
      <Helmet>
        <title>FreeFeel | Account Details - {profileData?.name}</title>
      </Helmet>
      {/* Back Icon */}
      <Link to="/dashboard/profile" className="absolute right-2.5 top-2.5">
        <MdOutlineClose size={24} className="text-red-500"></MdOutlineClose>
      </Link>

      <div className="flex flex-col justify-center items-center gap-2.5 mb-5 lg:mb-7 2xl:mb-10">
        {profileData?.imageUrl ? (
          <LazyLoadImage
            src={profileData?.imageUrl}
            alt={profileData?.name}
            effect="blur"
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
        ) : (
          <FaCircleUser size={100}></FaCircleUser>
        )}

        <h1 className="text-2xl font-bold">{profileData?.name}</h1>
      </div>

      <div className="space-y-5">
        <div className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600 flex items-center">
          <p>{profileData?.name ? profileData?.name : t("customerDashboard.yourFullName")}</p>
        </div>

        <div className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600 flex items-center">
          <p>{profileData?.gender ? profileData?.gender : t("customerDashboard.gender")}</p>
        </div>

        <div className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600 flex items-center">
          <p>{profileData?.email ? profileData?.email : t("customerDashboard.email")}</p>
        </div>

        <div className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600 flex items-center">
          <p>{profileData?.mobileNumber ? profileData?.mobileNumber : t("customerDashboard.mobileNumber")}</p>
        </div>

        <div className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600 flex items-center">
          <p>{profileData?.dateOfBirth ? profileData?.dateOfBirth : t("customerDashboard.dateOfBirth")}</p>
        </div>

        <div className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600 flex items-center">
          <p>{profileData?.address ? profileData?.address : t("customerDashboard.fullAddress")}</p>
        </div>

        <div className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600 flex items-center">
          <p>{profileData?.country ? profileData?.country : t("customerDashboard.country")}</p>
        </div>
      </div>

      <Link
        to="/dashboard/update-customer-account-details/:1"
        className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white text-xl font-semibold flex justify-center items-center mt-5 lg:mt-10"
      >
        {t("customerDashboard.updateAccount")}
      </Link>
    </div>
  );
};

export default CustomerAccountDetails;
