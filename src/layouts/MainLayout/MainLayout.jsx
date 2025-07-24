import { Outlet } from "react-router-dom";
import Navbar from "../../pages/SharedPages/Navbar/Navbar";
import BottomNavbar from "../../pages/SharedPages/BottomNavbar/BottomNavbar";
import NavbarSearch from "../../pages/SharedPages/NavbarSearch/NavbarSearch";
import Footer from "../../pages/SharedPages/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <ScrollToTop></ScrollToTop>
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Navbar></Navbar>
        <NavbarSearch></NavbarSearch>
      </div>
      <div className="mt-[112px] lg:mt-[140px] 2xl:mt-[155px]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <BottomNavbar></BottomNavbar>
      
    </div>
  );
};

export default MainLayout;
