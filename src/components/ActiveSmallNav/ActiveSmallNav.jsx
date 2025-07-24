import { NavLink } from "react-router-dom";

const ActiveSmallNav = ({ children, to }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "text-[15px] font-dynamic font-medium text-red-500 dark:text-red-500 px-5" : "text-[15px] font-dynamic font-medium text-light dark:text-dark px-5"
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default ActiveSmallNav;
