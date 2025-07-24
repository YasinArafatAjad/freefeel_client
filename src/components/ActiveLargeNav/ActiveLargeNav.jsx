import { NavLink } from "react-router-dom";

const ActiveLargeNav = ({ children, to }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "text-[15px] font-dynamic font-medium text-red-500 dark:text-red-500 border-b border-red-500 transition-colors duration-300"
          : "text-[15px] font-dynamic font-medium text-light hover:text-red-500 dark:hover:text-red-500 dark:text-dark border-b border-transparent hover:border-red-500 transition-colors duration-300"
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default ActiveLargeNav;
