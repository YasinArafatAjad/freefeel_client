import { BiCategory, BiSolidOffer } from "react-icons/bi";
import ActiveDashboardLink from "../../../../components/ActiveDashboardLink/ActiveDashboardLink";
import {
  MdContactSupport,
  MdOutlineFeaturedPlayList,
  MdOutlineLocalShipping,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FiChevronDown, FiShoppingBag } from "react-icons/fi";
import { LiaSlidersHSolid } from "react-icons/lia";
import { TbCreditCardRefund, TbTruckDelivery } from "react-icons/tb";
import { CiDiscount1 } from "react-icons/ci";
import { IoMdVideocam } from "react-icons/io";
import { GrServices, GrUserSettings } from "react-icons/gr";
import useUser from "../../../../hooks/useUser/useUser";
import Loader from "../../../../components/Loader/Loader";
import { SiGnuprivacyguard } from "react-icons/si";
import { GiPapers } from "react-icons/gi";
import { FaRegUser, FaShop, FaUserShield } from "react-icons/fa6";
import { IoNotificationsCircle, IoSettingsOutline, IoShareSocial } from "react-icons/io5";
import { BsCash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAdmin from "../../../../hooks/useAdmin/useAdmin";
import { FaUpload } from "react-icons/fa";

const DashboardSidebar = ({ handleSidebar }) => {
  const { profileData, isProfileDataLoading } = useUser();
  const { isAdmin, isAdminLoading } = useAdmin();
  const [showPolicyPages, setShowPolicyPages] = useState(false);
  console.log("profileData", profileData);

  const availableRoutes = profileData?.components || [];


  // <IoAnalyticsSharp />

  const sidebarLinks = [
    { to: "/dashboard/products", Icon: MdOutlineProductionQuantityLimits, label: "Products" },
    { to: "/dashboard/all-order", Icon: FiShoppingBag, label: "All Order" },
    { to: "/dashboard/admin-list", Icon: FaUserShield, label: "Admin List" },
    { to: "/dashboard/employee-list", Icon: GrUserSettings, label: "Employee List" },
    { to: "/dashboard/customer-list", Icon: FaRegUser, label: "Customer List" },
    { to: "/dashboard/categories", Icon: BiCategory, label: "Categories" },
    { to: "/dashboard/banners", Icon: LiaSlidersHSolid, label: "Banners" },
    // mohi code
    { to: "/dashboard/analytics", Icon: LiaSlidersHSolid, label: "Analytics" },
    { to: "/dashboard/file-upload", Icon: FaUpload , label: "file-upload" },
    { to: "/dashboard/notifications", Icon: IoNotificationsCircle  , label: "Notifications" },


    { to: "/dashboard/promo-codes", Icon: BiSolidOffer, label: "Promo Codes" },
    { to: "/dashboard/contact-info", Icon: MdContactSupport, label: "Contact Info" },
    { to: "/dashboard/features", Icon: MdOutlineFeaturedPlayList, label: "Features" },
    { to: "/dashboard/delivery-charge", Icon: TbTruckDelivery, label: "Delivery Charge" },
    { to: "/dashboard/discount-offer", Icon: CiDiscount1, label: "Discount Offer" },
    { to: "/dashboard/video-player", Icon: IoMdVideocam, label: "video-player" },
    { to: "/dashboard/social-media", Icon: IoShareSocial, label: "Social Media" },
    { to: "/dashboard/settings", Icon: IoSettingsOutline, label: "Settings" },
  ];

  const policyLinks = [
    { to: "/dashboard/about-us", Icon: FaShop, label: "About Us" },
    { to: "/dashboard/privacy-policy", Icon: SiGnuprivacyguard, label: "Privacy Policy" },
    { to: "/dashboard/shipping-policy", Icon: MdOutlineLocalShipping, label: "Shipping Policy" },
    { to: "/dashboard/refund-policy", Icon: TbCreditCardRefund, label: "Refund Policy" },
    { to: "/dashboard/payment-policy", Icon: BsCash, label: "Payment Policy" },
    { to: "/dashboard/terms-of-service", Icon: GrServices, label: "Terms Of Service" },
    { to: "/dashboard/intellectual-property", Icon: GiPapers, label: "Intellectual Property" },
  ];

  // console.log(profileData);

  if (isProfileDataLoading || isAdminLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full border-r border-gray-300 dark:border-gray-600">
      <div className="h-full overflow-y-auto px-2.5 pb-16">
        <ul>
          {sidebarLinks
            ?.filter((link) => availableRoutes?.includes(link?.to))
            ?.map((link, index) => (
              <li key={index} onClick={handleSidebar}>
                <ActiveDashboardLink to={link?.to} Icon={link?.Icon}>
                  {link?.label}
                </ActiveDashboardLink>
              </li>
            ))}

          {isAdmin && (
            <li className="bg-light dark:bg-dark text-[15px] font-primary text-medium p-2.5 flex items-center gap-2.5 hover:text-blue-500 transition-colors duration-300 rounded">
              <button
                onClick={() => setShowPolicyPages(!showPolicyPages)}
                className="w-full h-full text-start flex justify-between items-center gap-1"
              >
                Policy Pages <FiChevronDown className={`w-4 h-4 ${showPolicyPages ? "transform rotate-180" : ""}`} />
              </button>
            </li>
          )}

          {showPolicyPages &&
            policyLinks
              ?.filter((link) => availableRoutes?.includes(link?.to))
              ?.map((link) => (
                <li key={link?.to} onClick={handleSidebar}>
                  <ActiveDashboardLink to={link?.to} Icon={link?.Icon}>
                    {link?.label}
                  </ActiveDashboardLink>
                </li>
              ))}

          <li>
            <Link
              to="/dashboard/profile"
              className="text-[15px] font-primary text-medium p-2.5 flex items-center gap-2.5 hover:text-blue-500 transition-colors duration-300"
            >
              <img src={profileData?.imageUrl} className="w-5 h-5 rounded-full object-cover" alt={profileData?.name} />
              {profileData?.name}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;


[
    "/dashboard",
    "/dashboard/admin",
    "/dashboard/categories",
    "/dashboard/add-new-product",
    "/dashboard/update-product/:id",
    "/dashboard/products",
    "/dashboard/admin-list",
    "/dashboard/view-user/:id",
    "/dashboard/customer-list",
    "/dashboard/employee-list",
    "/dashboard/view-employee/:id",
    "/dashboard/all-order",
    "/dashboard/view-order/:id",
    "/dashboard/banners",
    "/dashboard/promo-codes",
    "/dashboard/analytics",
    "/dashboard/file-upload",
    "/dashboard/notifications",
    "/dashboard/contact-info",
    "/dashboard/features",
    "/dashboard/delivery-charge",
    "/dashboard/discount-offer",
    "/dashboard/video-ads",
    "/dashboard/privacy-policy",
    "/dashboard/about-us",
    "/dashboard/social-media",
    "/dashboard/refund-policy",
    "/dashboard/shipping-policy",
    "/dashboard/payment-policy",
    "/dashboard/terms-of-service",
    "/dashboard/intellectual-property",
    "/dashboard/settings"
]