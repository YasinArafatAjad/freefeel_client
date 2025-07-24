import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosMoon } from "react-icons/io";
import { IoNotificationsSharp, IoSunnyOutline } from "react-icons/io5";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useTheme from "../../../../hooks/useTheme/useTheme";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useAdmin from "../../../../hooks/useAdmin/useAdmin";
import useEmployee from "../../../../hooks/useEmployee/useEmployee";
import Loader from "../../../../components/Loader/Loader";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import useLanguage from "../../../../hooks/useLanguage/useLanguage";
import { showNotification } from "./showNotification.js";

const DashboardNavbar = ({ handleFullWidth, handleSidebar, isFullWidth }) => {
  const [theme, toggleTheme] = useTheme();
  const { isAdmin, isAdminLoading } = useAdmin();
  const { isEmployee, isEmployeeLoading } = useEmployee();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const { language, setLanguage } = useLanguage();
  if (isAdminLoading || isEmployeeLoading || isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full border-b border-gray-300 dark:border-gray-600 flex items-center justify-between relative">
      {/* Logo Part - All Device */}
      <div
        className={
          isFullWidth
            ? "hidden"
            : "order-2 lg:order-1 lg:w-[17%] 2xl:w-[20%] h-16 lg:border-r border-dashed border-gray-300 dark:border-gray-600 flex justify-center items-center"
        }
      >
        <Link
          to={
            isAdmin
              ? "/dashboard/admin"
              : isEmployee
              ? "/dashboard/employee"
              : "/"
          }
        >
          <LazyLoadImage
            src={
              theme === "light" ? websiteInfo?.logoLight : websiteInfo?.logoDark
            }
            className="w-[80px] h-[40px] object-cover"
            effect="blur"
            alt="FreeFeel Logo"
          />
        </Link>
      </div>

      <div
        className={
          isFullWidth
            ? "order-1 lg:order-2 w-full px-2.5 lg:px-5 flex justify-between items-center"
            : "order-1 lg:order-2 lg:w-[83%] 2xl:w-[80%] px-2.5 lg:px-5 flex justify-between items-center"
        }
      >
        {/* Left side nav options - All Device */}
        <div className="h-16 flex items-center gap-5 lg:gap-3">
          <button onClick={handleFullWidth} className="hidden lg:block">
            <BiMenuAltLeft size={40}></BiMenuAltLeft>
          </button>

          <button onClick={handleSidebar} className="lg:hidden">
            <BiMenuAltLeft size={30}></BiMenuAltLeft>
          </button>

          <Link
            to="/"
            className="lg:flex justify-start items-center lg:gap-1.5 lg:py-1 lg:px-2.5 lg:bg-blue-500 lg:hover:bg-blue-600 transition-colors duration-300 text-black lg:text-white dark:text-white lg:rounded"
          >
            <HiHome size={28} className="lg:hidden"></HiHome>
            <HiHome size={15} className="hidden lg:block"></HiHome>
            <p className="hidden lg:flex text-[15px] font-primary font-medium">
              Home Page
            </p>
          </Link>

          <div className="">
            {language === "eng" ? (
              <button
                onClick={() => setLanguage("ban")}
                className="flex justify-center items-center gap-0.5 bg-white text-black dark:bg-black dark:text-white border-2  border-black dark:border-white w-[32px] h-[32px] text-[14px] font-primary font-medium text-center"
              >
                বাং
              </button>
            ) : (
              <button
                onClick={() => setLanguage("eng")}
                className="flex justify-center items-center gap-0.5 bg-white text-black dark:bg-black dark:text-white border-2  border-black dark:border-white w-[32px] h-[32px] text-[14px] font-primary font-medium text-center"
              >
                EN
              </button>
            )}
          </div>
        </div>

        {/* Right side nav options - Large Device */}
        <div className="h-16 hidden lg:flex items-center gap-3 lg:gap-5 px-2.5 lg:px-5">
          <button onClick={() => showNotification()}>
            <IoNotificationsSharp size={23} />
          </button>
          <button onClick={toggleTheme}>
            {theme === "light" ? (
              <IoIosMoon size={25}></IoIosMoon>
            ) : (
              <IoSunnyOutline size={25}></IoSunnyOutline>
            )}
          </button>
        </div>
      </div>

      {/* Right side nav options - Small Device */}
      <div className="order-3 h-16 flex items-center gap-1.5 lg:gap-2.5 px-2.5 lg:px-5 lg:hidden">
        <button onClick={() => showNotification()}>
          <IoNotificationsSharp size={23} />
        </button>
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <IoIosMoon size={25}></IoIosMoon>
          ) : (
            <IoSunnyOutline size={25}></IoSunnyOutline>
          )}
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
