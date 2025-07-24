import { NavLink } from "react-router-dom";

const ActiveDashboardLink = ({ children, to, Icon }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "text-[15px] font-primary text-medium p-2.5 flex items-center gap-2.5 bg-gray-100 dark:bg-gray-800 w-full text-blue-500"
          : "text-[15px] font-primary text-medium p-2.5 flex items-center gap-2.5 hover:text-blue-500 transition-colors duration-300"
      }
      to={to}
    >
      <Icon></Icon> {children}
    </NavLink>
  );
};

export default ActiveDashboardLink;
