import { NavLink } from "react-router-dom";

const ActiveBottomNavbar = ({ children, to, Icon }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "lg:h-9 text-nowrap text-red-500 dark:text-red-500 flex flex-col lg:flex-row justify-center items-center gap-1 lg:border lg:dark:border-gray-600 lg:rounded-md lg:py-1 lg:px-2"
          : "lg:h-9 text-nowrap text-light hover:text-red-500 dark:text-dark dark:hover:text-red-500 flex flex-col lg:flex-row justify-center items-center gap-1 lg:border lg:border-gray-200 lg:dark:border-gray-600 lg:rounded-md lg:py-1 lg:px-2 transition-colors duration-300"
      }
      to={to}
    >
      {Icon && <Icon className="text-xl"></Icon>}

      <p className="text-[15px]">{children}</p>
    </NavLink>
  );
};

export default ActiveBottomNavbar;
