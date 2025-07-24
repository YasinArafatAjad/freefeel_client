import { IoSearchOutline } from "react-icons/io5";
import ActiveBottomNavbar from "../../../components/ActiveBottomNavbar/ActiveBottomNavbar";
import { BsCart3 } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import useTheme from "../../../hooks/useTheme/useTheme";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth/useAuth";
import useLanguage from "../../../hooks/useLanguage/useLanguage";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import useWebsiteInfo from "../../../hooks/useWebsiteInfo/useWebsiteInfo";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useAdmin from "../../../hooks/useAdmin/useAdmin";
import useCustomer from "../../../hooks/useCustomer/useCustomer";
import useEmployee from "../../../hooks/useEmployee/useEmployee";
import useUser from "../../../hooks/useUser/useUser";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../providers/CartProvider/CartProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import './NavbarSearch.css'

const NavbarSearch = () => {
  const [theme, toggleTheme] = useTheme();
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const { cartData } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const axiosPublic = useAxiosPublic();
  const { profileData, isProfileDataLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdmin();
  const { isEmployee, isEmployeeLoading } = useEmployee();
  const { isCustomer, isCustomerLoading } = useCustomer();

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

  //   Fetch products by Product Type = New Arrivals
  const {
    isLoading: isMatchingProductsLoading,
    data: matchingProducts = [],
    refetch,
  } = useQuery({
    queryKey: ["matchingProducts", language],
    queryFn: async () => {
      const res = await axiosPublic.get("/products", {
        params: { language, visibility: "Public", searchQuery },
      });
      return res?.data && res?.data?.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, searchQuery]);

  const handleClickProductName = () => {
    setSearchQuery("");
  };

  if (
    isWebsiteInfoLoading ||
    isMatchingProductsLoading ||
    (user?.email &&
      (isAdminLoading ||
        isCustomerLoading ||
        isEmployeeLoading ||
        isProfileDataLoading))
  ) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }


  return (
    <div className="bg-white dark:bg-black text-light dark:text-dark">
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 lg:px-0 pb-1">
        <div className="w-full mx-auto flex justify-center items-center gap-5">
          <div className="relative hidden lg:flex justify-center items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="h-9 flex justify-center items-center gap-1 border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2"
            >
              {theme === "dark" ? <FiSun className="text-xl"></FiSun> : <FaMoon className="text-lg"></FaMoon>}
              <p className="text-[15px]">{t("navbarSearch.theme")}</p>
            </button>

            {/* <div className="">
              <input id="checkbox" type="checkbox" onClick={toggleTheme}/>
              <label htmlFor="checkbox" className="sky">
                <div id="sun_wrapper">
                  <div className="ray"></div>
                  <div className="ray"></div>
                  <div className="ray"></div>
                  <div id="sun">
                    <div id="moon">
                      <div className="spot"></div>
                      <div className="spot"></div>
                      <div className="spot"></div>
                    </div>
                  </div>
                </div>
                <div className="cloud_wrapper">
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                </div>
                <div className="cloud_wrapper">
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                  <div className="cloud"></div>
                </div>
                <div id="stars">
                  {[...Array(9)].map((_, i) => (
                    <div className="star" key={`star-${i}`}>
                      <div className="base"></div>
                      <div className="ray"></div>
                      <div className="ray"></div>
                      <div className="ray"></div>
                      <div className="ray"></div>
                    </div>
                  ))}
                </div>
              </label>
            </div> */}

            {language === "eng" ? (
              <button
                onClick={() => setLanguage("ban")}
                className="h-9 flex justify-center items-center gap-0.5 border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2"
              >
                <TbWorld className="text-xl"></TbWorld>
                <p className="text-[15px]">বাংলা</p>
              </button>
            ) : (
              <button
                onClick={() => setLanguage("eng")}
                className="h-9 flex justify-center items-center gap-0.5 border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2"
              >
                <TbWorld className="text-xl"></TbWorld>
                <p className="text-[15px]">ENG</p>
              </button>
            )}

            <Link
              to={`tel:${websiteInfo?.customerCareNumber}`}
              className="h-9 flex justify-center items-center border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2"
            >
              <BiSolidPhoneCall className="text-2xl"></BiSolidPhoneCall>
            </Link>
          </div>

          {/* Search Field */}
          <div className="relative flex justify-center items-center w-full h-full">
            <input
              type="text"
              placeholder={t("navbarSearch.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-4 text-[15px] bg-white dark:bg-black text-light dark:text-dark rounded border border-gray-200 dark:border-gray-600 shadow-sm focus:outline-none transition duration-200"
            />

            <button className="absolute top-0 right-0 w-12 h-9 bg-black dark:bg-gray-800 flex justify-center items-center rounded-r border border-gray-200 dark:border-gray-600">
              <IoSearchOutline className="text-2xl text-gray-300 dark:text-gray-600"></IoSearchOutline>
            </button>
          </div>

          <div className="relative hidden lg:flex justify-center items-center gap-2.5">
            <div className="relative">
              <ActiveBottomNavbar
                to="/shopping-cart"
                Icon={BsCart3}
              ></ActiveBottomNavbar>

              {cartData?.length > 0 && (
                <span className="absolute -top-2 right-0 bg-green-500 text-white text-sm font-medium font-primary px-1.5 rounded py-0">
                  {cartData?.length}
                </span>
              )}
            </div>

            {user?.emailVerified &&
            profileData?.email &&
            profileData?.emailVerified ? (
              <>
                <ActiveBottomNavbar
                  to={
                    isAdmin
                      ? "/dashboard/admin"
                      : isEmployee
                      ? "/dashboard/employee"
                      : isCustomer
                      ? "/dashboard/profile"
                      : "/"
                  }
                  Icon={CgProfile}
                >
                  {t("navbarSearch.profile")}
                </ActiveBottomNavbar>

                <button
                  onClick={handleLogout}
                  className="h-9 flex justify-center items-center gap-0.5 border border-gray-200 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300 rounded-md py-1 px-2 text-nowrap"
                >
                  <p className="text-[15px]">{t("navbarSearch.logout")}</p>
                </button>
              </>
            ) : (
              <>
                <ActiveBottomNavbar to="/sign-in-with-email-address">
                  {t("navbarSearch.logIn")}
                </ActiveBottomNavbar>
                <ActiveBottomNavbar to="/sign-up-with-email-address">
                  {t("navbarSearch.signUp")}
                </ActiveBottomNavbar>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-full flex justify-center items-center">
        {matchingProducts?.length > 0 && searchQuery && (
          <div className="w-auto lg:max-w-[752px] mx-auto bg-white dark:bg-black absolute z-[1001] top-[112px] lg:top-[136px] left-2.5 right-2.5 lg:-left-[88px] rounded-b p-1.5 md:p-2.5 space-y-2.5">
            {matchingProducts.map((product) => (
              <div
                key={product?._id}
                className="text-[15px] font-primary font-medium text-light dark:text-dark hover:underline hover:text-blue-500 transition-colors duration-300"
                onClick={handleClickProductName}
              >
                <Link to={`/product-details/${product?.productUrl}`}>
                  {product?.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarSearch;
