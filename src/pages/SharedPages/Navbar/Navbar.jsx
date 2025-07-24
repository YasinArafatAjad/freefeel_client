import useTheme from "../../../hooks/useTheme/useTheme";
import { useState } from "react";
import NavSidebar from "../NavSidebar/NavSidebar";
import ActiveLargeNav from "../../../components/ActiveLargeNav/ActiveLargeNav";
import { TiThMenu } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useLanguage from "../../../hooks/useLanguage/useLanguage";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import Loader from "../../../components/Loader/Loader";
import useWebsiteInfo from "../../../hooks/useWebsiteInfo/useWebsiteInfo";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false);
  const [theme] = useTheme();
  const axiosPublic = useAxiosPublic();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();

  const { isPending: isCategoriesLoading, data: categories = [] } = useQuery({
    queryKey: ["language", language],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories", {
        params: { language, categoryStatus: "Public" },
      });

      return res?.data && res?.data?.data;
    },
  });

  if (isCategoriesLoading || isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black text-light dark:text-dark">
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 lg:px-0 pb-2.5">
        <div>
          {/* Logo Sections */}
          <div className="relative flex justify-between lg:justify-center items-center">
            <div className="lg:hidden">
              <button onClick={() => setIsNavSidebarOpen(!isNavSidebarOpen)}>
                {isNavSidebarOpen ? (
                  <IoMdClose size={25} className="text-light dark:text-dark"></IoMdClose>
                ) : (
                  <TiThMenu size={25} className="text-light dark:text-dark"></TiThMenu>
                )}
              </button>
            </div>

            <Link to="/">
              <img
                src={theme === "light" ? websiteInfo?.logoLight : websiteInfo?.logoDark}
                className="w-[100px] h-[50px] 2xl:w-[120px] 2xl:h-[60px] object-cover my-2"
                alt="FreeFeel Logo"
              />
            </Link>

            <div className="lg:hidden">
              {language === "eng" ? (
                <button
                  onClick={() => setLanguage("ban")}
                  className="flex justify-center items-center gap-0.5 bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white w-[22px] h-[22px] text-[10px] font-primary font-medium text-center"
                >
                  বাং
                </button>
              ) : (
                <button
                  onClick={() => setLanguage("eng")}
                  className="flex justify-center items-center gap-0.5 bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white w-[22px] h-[22px] text-[10px] font-primary font-medium text-center"
                >
                  EN
                </button>
              )}
            </div>
          </div>

          {/* Nav Options */}
          <nav className="hidden lg:block">
            <ul className="flex justify-center items-center gap-2.5">
              <li className="block">
                <ActiveLargeNav to="/">{t("navOptions.home")}</ActiveLargeNav>
              </li>

              <>
                {categories?.map((category) => (
                  <li key={category?._id} className="pl-2.5 border-l border-red-950 block">
                    <ActiveLargeNav to={`/category/${category?.categoryUrl}`}>{category?.category}</ActiveLargeNav>
                  </li>
                ))}
              </>
            </ul>
          </nav>
        </div>
      </div>

      {isNavSidebarOpen && (
        <NavSidebar isNavSidebarOpen={isNavSidebarOpen} setIsNavSidebarOpen={setIsNavSidebarOpen}></NavSidebar>
      )}
    </div>
  );
};

export default Navbar;
