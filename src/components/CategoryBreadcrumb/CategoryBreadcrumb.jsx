import { NavLink, useLocation } from "react-router-dom";
import { PiLineVerticalBold } from "react-icons/pi";

const CategoryBreadcrumb = ({ crumbs }) => {
  const location = useLocation();

  return (
    <div className="flex justify-center items-center">
      {crumbs?.map((crumb, index) => {
        const isLast = index === crumbs.length - 1; // Check if it's the last crumb

        return (
          <div key={index} className="flex justify-start items-center">
            <NavLink
              to={crumb?.path === "location" ? location : crumb?.path}
              className={({ isActive }) => {
                return isActive
                  ? "block font-dynamic text-sm lg:text-[15px] font-medium text-black dark:text-white"
                  : "block font-dynamic text-sm lg:text-[15px] font-medium text-black dark:text-white hover:text-blue-500 transition-colors duration-300";
              }}
            >
              {crumb?.label}
            </NavLink>

            {/* Show arrow only if it's not the last crumb */}
            {!isLast && <PiLineVerticalBold className="mx-0.5 text-black dark:text-white text-base lg:text-lg" />}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBreadcrumb;
