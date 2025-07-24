import { Outlet } from "react-router-dom";
import { useState } from "react";
import DashboardNavbar from "../../pages/DashboardPages/AdminPages/DashboardNavbar/DashboardNavbar";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import DashboardSidebar from "../../pages/DashboardPages/AdminPages/DashboardSidebar/DashboardSidebar";

const AdminDashboard = () => {
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFullWidth = () => {
    setIsFullWidth(!isFullWidth);
  };

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative w-full h-screen">
      <ScrollToTop></ScrollToTop>
      <div className="flex h-full">
        {/* Large Device Sidebar */}
        <div
          className={
            isFullWidth
              ? "hidden"
              : "hidden lg:block fixed top-16 left-0 z-[1000] lg:w-[17%] 2xl:w-[20%] bg-white text-light dark:bg-black dark:text-dark h-full"
          }
        >
          <DashboardSidebar></DashboardSidebar>
        </div>

        {/* Small Device Sidebar */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed top-16 left-0 z-[1002] bg-white text-light dark:bg-black dark:text-dark w-2/3 h-full">
            <DashboardSidebar handleSidebar={handleSidebar}></DashboardSidebar>
          </div>
        )}

        {/* Main Content */}
        <div
          className={
            isFullWidth
              ? "w-full h-full bg-gray-100 overflow-y-auto relative"
              : "w-full lg:ml-[17%] 2xl:ml-[20%] lg:w-[83%] 2xl:w-[80%] bg-gray-100 h-full overflow-y-auto relative"
          }
        >
          {/* Navbar */}
          <div className="w-full h-16 bg-white text-light dark:bg-black dark:text-dark fixed top-0 left-0 right-0 z-[1000]">
            <DashboardNavbar
              handleFullWidth={handleFullWidth}
              handleSidebar={handleSidebar}
              isFullWidth={isFullWidth}
            ></DashboardNavbar>
          </div>

          {/* Main Content Area */}
          <div className="relative pt-[74px] lg:pt-[84px] p-2.5 lg:p-5 bg-white text-light dark:bg-dark dark:text-dark h-screen overflow-y-auto">
            {/* Adjust margin-top to match navbar height */}
            <div>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
