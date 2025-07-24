import { FaCircleUser } from "react-icons/fa6";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { Link } from "react-router-dom";
import useUser from "../../../../hooks/useUser/useUser";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useAuth from "../../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import { CgLogOut } from "react-icons/cg";

const CustomerProfileHome = () => {
  const { t } = useTranslation();
  const { profileData, isProfileDataLoading } = useUser();
  const { logout } = useAuth();

  // User logged out
  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          text: t("navbarSearch.loggedOutSuccessMessage"),
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          text: t("navbarSearch.loggedOutFailedMessage"),
          icon: "error",
        });
        console.error(error);
      });
  };

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
        <title>FreeFeel | Dashboard - {profileData?.name ? profileData?.name : "Your Name"}</title>
      </Helmet>
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
        <Link
          to="/dashboard/customer-account-details"
          className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white flex justify-center items-center font-dynamic text-[15px] font-medium"
        >
          {t("customerDashboard.accountDetails")}
        </Link>

        <Link
          to="/dashboard/saved-products-list"
          className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white flex justify-center items-center font-dynamic text-[15px] font-medium"
        >
          {t("customerDashboard.saveProductList")}
        </Link>

        <Link
          to="/dashboard/order-history"
          className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white flex justify-center items-center font-dynamic text-[15px] font-medium"
        >
          {t("customerDashboard.orderHistory")}
        </Link>

        <Link
          to="/dashboard/my-refer"
          className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white flex justify-center items-center font-dynamic text-[15px] font-medium"
        >
          {t("customerDashboard.myRefer")}
        </Link>

        <Link
          to="/dashboard/your-points"
          className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white flex justify-center items-center font-dynamic text-[15px] font-medium"
        >
          {t("customerDashboard.yourPoints")}
        </Link>

        <button
          onClick={handleLogout}
          className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white flex justify-center items-center gap-2 font-dynamic text-[15px] font-medium"
        >
          <CgLogOut size={20}></CgLogOut> {t("customerDashboard.logout")}
        </button>
      </div>
    </div>
  );
};

export default CustomerProfileHome;
