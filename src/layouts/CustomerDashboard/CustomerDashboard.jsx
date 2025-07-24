import { Outlet } from "react-router-dom";
import Navbar from "../../pages/SharedPages/Navbar/Navbar";
import NavbarSearch from "../../pages/SharedPages/NavbarSearch/NavbarSearch";
import BottomNavbar from "../../pages/SharedPages/BottomNavbar/BottomNavbar";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ScrollToTop></ScrollToTop>
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Navbar></Navbar>
        <NavbarSearch></NavbarSearch>
      </div>
      <div className="pt-[112px] lg:pt-[140px] pb-10 lg:pb-0 w-full h-full bg-light dark:bg-dark text-light dark:text-dark lg:max-w-[1000px] 2xl:max-w-[1200px] lg:mx-auto">
        <Outlet></Outlet>
      </div>
      <BottomNavbar></BottomNavbar>
    </div>
  );
};

export default CustomerDashboard;
