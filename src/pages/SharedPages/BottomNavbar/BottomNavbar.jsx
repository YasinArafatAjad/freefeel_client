import { FaHome, FaMoon } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { CiLogin, CiLogout } from "react-icons/ci";
import useTheme from "../../../hooks/useTheme/useTheme";
import ActiveBottomNavbar from "../../../components/ActiveBottomNavbar/ActiveBottomNavbar";
import { BiSolidPhoneCall } from "react-icons/bi";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import useWebsiteInfo from "../../../hooks/useWebsiteInfo/useWebsiteInfo";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useAdmin from "../../../hooks/useAdmin/useAdmin";
import useUser from "../../../hooks/useUser/useUser";
import useCustomer from "../../../hooks/useCustomer/useCustomer";
import useEmployee from "../../../hooks/useEmployee/useEmployee";
import useAuth from "../../../hooks/useAuth/useAuth";
import { CartContext } from "../../../providers/CartProvider/CartProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const BottomNavbar = () => {
  const [theme, toggleTheme] = useTheme();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const { cartData } = useContext(CartContext);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { profileData, isProfileDataLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdmin();
  const { isCustomer, isCustomerLoading } = useCustomer();
  const { isEmployee, isEmployeeLoading } = useEmployee();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // User logged out
  const handleLogout = () => {
    setIsProfileDropdownOpen(false);

    logout()
      .then(() => {
        Swal.fire({
          text: t("bottomNavbar.loggedOutSuccessMessage"),
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          text: t("bottomNavbar.loggedOutFailedMessage"),
          icon: "error",
        });
        console.error(error);
      });
  };

  if (
    isWebsiteInfoLoading ||
    (user?.email && (isAdminLoading || isCustomerLoading || isEmployeeLoading || isProfileDataLoading))
  ) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-[10001] w-full h-auto bg-white dark:bg-black text-light dark:text-dark py-1.5">
        <div className="flex justify-around items-center">
          <ActiveBottomNavbar to="/" Icon={FaHome}>
            {t("bottomNavbar.home")}
          </ActiveBottomNavbar>

          <div className="relative">
            <ActiveBottomNavbar to="/shopping-cart" Icon={BsCart3}>
              {t("bottomNavbar.cart")}
            </ActiveBottomNavbar>

            {cartData?.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-xs font-medium font-primary px-1 rounded py-0">
                {cartData?.length}
              </span>
            )}
          </div>

          <Link to={`tel:${websiteInfo?.customerCareNumber}`} className="flex flex-col justify-center items-center gap-0.5">
            <BiSolidPhoneCall className="text-xl text-blue-500"></BiSolidPhoneCall>
            <p className="text-[15px] text-blue-500">{t("bottomNavbar.call")}</p>
          </Link>

          <button onClick={toggleTheme} className="flex flex-col justify-center items-center gap-0.5">
            {theme === "dark" ? <FiSun className="text-xl"></FiSun> : <FaMoon className="text-lg"></FaMoon>}

            <p className="text-[15px]">{t("bottomNavbar.theme")}</p>
          </button>

          {/* Profile Icon */}
          <button onClick={toggleProfileDropdown} className="flex flex-col justify-center items-center gap-0.5">
            <CgProfile className="text-lg"></CgProfile>

            {user?.emailVerified && profileData?.email && profileData?.emailVerified ? (
              <p className="text-[15px]">{t("bottomNavbar.profile")}</p>
            ) : (
              <p className="text-[15px]">{t("bottomNavbar.account")}</p>
            )}
          </button>
        </div>
      </div>

      {isProfileDropdownOpen && (
        <div className="lg:hidden w-44 h-auto fixed bottom-[58px] right-2.5 z-[10002] bg-white dark:bg-black text-black dark:text-white rounded-t p-2.5">
          {user?.emailVerified && profileData?.email && profileData?.emailVerified ? (
            <div className="space-y-2.5">
              <Link
                to={
                  isAdmin ? "/dashboard/admin" : isEmployee ? "/dashboard/employee" : isCustomer ? "/dashboard/profile" : "/"
                }
                className="w-full h-9 flex justify-start items-center gap-2 border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2 text-nowrap"
              >
                <CgProfile size={20}></CgProfile> <p className="text-[15px]">{t("bottomNavbar.dashboard")}</p>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full h-9 flex justify-start items-center gap-2 border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2 text-nowrap"
              >
                <CiLogout size={20}></CiLogout> <p className="text-[15px]">{t("bottomNavbar.logout")}</p>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <Link
                to="/sign-in-with-email-address"
                onClick={() => setIsProfileDropdownOpen(false)}
                className="w-full h-9 flex justify-start items-center gap-2 border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2 text-nowrap"
              >
                <CiLogin size={20}></CiLogin> <p className="text-[15px]">{t("bottomNavbar.logIn")}</p>
              </Link>

              <Link
                to="/sign-up-with-email-address"
                onClick={() => setIsProfileDropdownOpen(false)}
                className="w-full h-9 flex justify-start items-center gap-2 border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2 text-nowrap"
              >
                <CiLogin size={20}></CiLogin> <p className="text-[15px]">{t("bottomNavbar.signUp")}</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BottomNavbar;
