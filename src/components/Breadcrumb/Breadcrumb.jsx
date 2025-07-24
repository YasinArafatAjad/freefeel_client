import { NavLink, useLocation } from "react-router-dom";
import { PiLineVerticalBold } from "react-icons/pi";

const Breadcrumb = ({ crumbs }) => {
  const location = useLocation();
  // console.log(crumbs);

  return (
    <div className="flex justify-center items-center bg-black dark:bg-gray-800 w-full h-8 py-2">
      {crumbs?.map((crumb, index) => { 
        const isLast = index === crumbs.length - 1; // Check if it's the last crumb

        return (
          <div key={index} className="flex justify-start items-center">
            <NavLink
              to={crumb?.path === "location" ? location : crumb?.path}


              className={({ isActive }) => {
                
                return isActive
                  ? `block font-primary text-sm lg:text-lg font-medium cursor-default
                   ${crumb?.label === "In Stock"
                    ? "text-green-500"
                    : crumb?.label === "Pre-Order"
                      ? "text-blue-500"
                      : crumb?.label === "Limited Stock"
                        ? "text-yellow-500"
                        : crumb?.label === "Out Of Stock"
                          ? "text-red-500"
                          : "text-white"
                  }`
                  


                  : "block font-primary text-sm lg:text-lg font-medium text-white hover:text-blue-500 transition-colors duration-300";
              }}
            >
              {crumb?.label} 
            </NavLink>

            {/* Show arrow only if it's not the last crumb */}
            {!isLast && <PiLineVerticalBold className="mx-1 text-gray-300 text-sm lg:text-lg" />}
            
          </div>
        );
      })}
    </div >
  );
};

export default Breadcrumb;
