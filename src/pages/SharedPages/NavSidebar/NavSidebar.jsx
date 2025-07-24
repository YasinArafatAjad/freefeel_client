import { useQuery } from "@tanstack/react-query";
import ActiveSmallNav from "../../../components/ActiveSmallNav/ActiveSmallNav";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import useLanguage from "../../../hooks/useLanguage/useLanguage";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import Loader from "../../../components/Loader/Loader";

const NavSidebar = ({ isNavSidebarOpen, setIsNavSidebarOpen }) => {
  const handleSidebar = () => {
    setIsNavSidebarOpen(!isNavSidebarOpen);
  };
  const axiosPublic = useAxiosPublic();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const { isPending: isCategoriesLoading, data: categories = [] } = useQuery({
    queryKey: ["language", language],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories", {
        params: { language, categoryStatus: "Public" },
      });

      return res?.data && res?.data?.data;
    },
  });

  return (
    <div
      className={`fixed top-[112px] bottom-[50px] left-0 z-[1000] h-auto overflow-hidden overflow-y-auto w-7/12 bg-white dark:bg-black text-base text-light dark:text-dark border-b border-gray-400 dark:border-gray-600 mb-1 py-2.5shadow-lg transform transition-transform duration-300 ${
        isNavSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li onClick={handleSidebar} className="border-b border-gray-400 dark:border-gray-600 mb-1 py-2.5">
              <ActiveSmallNav to="/">{t("navOptions.home")}</ActiveSmallNav>
            </li>

            {isCategoriesLoading ? (
              <>
                <li>
                  <Loader></Loader>
                </li>
              </>
            ) : (
              <>
                {categories.map((category) => (
                  <li
                    key={category?._id}
                    onClick={handleSidebar}
                    className="border-b border-gray-400 dark:border-gray-600 mb-1 py-2.5"
                  >
                    <ActiveSmallNav to={`/category/${category?.categoryUrl}`}>{category?.category}</ActiveSmallNav>
                  </li>
                ))}
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavSidebar;
