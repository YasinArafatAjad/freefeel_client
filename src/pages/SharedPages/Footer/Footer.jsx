import { Link } from "react-router-dom";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";

import white_logo from "../../../assets/Footer-Logo/FreeFeel/Freefeel-B.png";
import black_logo from "../../../assets/Footer-Logo/FreeFeel/Freefeel-W.png";

// Delivery Partner
import Delivery_Tiger from "../../../assets/Footer-Logo/Delivery/Delivery-Tiger.jpg";
import E_courier from "../../../assets/Footer-Logo/Delivery/E-courier.jpg";
import Patho from "../../../assets/Footer-Logo/Delivery/Pathao.jpg";
import Red_X from "../../../assets/Footer-Logo/Delivery/Red-x.jpg";
import Stead_Fast from "../../../assets/Footer-Logo/Delivery/Stead-fast.jpg";

// Payment Partner
import Cash_On_Delivery from "../../../assets/Footer-Logo/Payment/Cash-o-Delivery.jpg";
import Bkash from "../../../assets/Footer-Logo/Payment/bkash.jpg";
import Nagad from "../../../assets/Footer-Logo/Payment/Nogod.jpg";
import Rocket from "../../../assets/Footer-Logo/Payment/Rocket.jpg";
import Upay from "../../../assets/Footer-Logo/Payment/upay.jpg";

// Social Media
import Facebook from "../../../assets/Footer-Logo/Social/Facebook.jpg";
import Instagram from "../../../assets/Footer-Logo/Social/Instagram.jpg";
import Youtube from "../../../assets/Footer-Logo/Social/Youtube.jpg";
import Tik_Tok from "../../../assets/Footer-Logo/Social/tiktok.jpg";
import Linkedin from "../../../assets/Footer-Logo/Social/Linkdin.jpg";
import useWebsiteInfo from "../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../components/Loader/Loader";
import useTheme from "../../../hooks/useTheme/useTheme";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  const [theme] = useTheme();

  const { websiteInfo, isWebsiteInfoLoading } = useWebsiteInfo();

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-gray-800 text-light dark:text-dark">
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 py-5 md:py-8 lg:py-10">
        <div className="flex justify-center items-center mb-5 md:mb-8 lg:mb-10">
          <Link to="/">
            <img
              src={theme === "light" ? white_logo : black_logo}
              className="w-[150px] h-[30px] lg:w-[200px] lg:h-[40px] object-cover"
              alt="FreeFeel Logo"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-2 text-center lg:text-start lg:flex flex-row justify-center items-center lg:gap-5 mb-5">
          <li className="font-dynamic text-[15px] font-medium pr-5 border-r border-b lg:border-b-0 border-red-950 dark:border-red-600 py-2.5 lg:py-0">
            <Link
              to="/about-us"
              className="text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:underline"
            >
              {t("footer.aboutUs")}
            </Link>
          </li>

          <li className="font-dynamic text-[15px] font-medium pr-5 border-b lg:border-b-0 border-r-0 lg:border-r border-red-950 dark:border-red-600 py-2.5 lg:py-0">
            <Link
              to="/contact-with-us"
              className="text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:underline"
            >
              {t("footer.contact")}
            </Link>
          </li>

          <li className="font-dynamic text-[15px] font-medium pr-5 border-r border-b lg:border-b-0 border-red-950 dark:border-red-600 py-2.5 lg:py-0">
            <Link
              to="/privacy-policy"
              className="text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:underline"
            >
              {t("footer.privacyPolicy")}
            </Link>
          </li>

          <li className="font-dynamic text-[15px] font-medium pr-5 border-b lg:border-b-0 border-r-0 lg:border-r border-red-950 dark:border-red-600 py-2.5 lg:py-0">
            <Link
              to="/refund-policy"
              className="text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:underline"
            >
              {t("footer.refundPolicy")}
            </Link>
          </li>

          <li className="font-dynamic text-[15px] font-medium pr-5 border-r border-b lg:border-b-0 border-red-950 dark:border-red-600 py-2.5 lg:py-0">
            <Link
              to="/shipping-policy"
              className="text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:underline"
            >
              {t("footer.shippingPolicy")}
            </Link>
          </li>

          <li className="font-dynamic text-[15px] font-medium pr-5 border-b lg:border-b-0 border-r-0 lg:border-r border-red-950 dark:border-red-600 py-2.5 lg:py-0">
            <Link
              to="/payment-policy"
              className="text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:underline"
            >
              {t("footer.paymentPolicy")}
            </Link>
          </li>

          <li className="font-dynamic text-[15px] font-medium pr-5 lg:border-b-0 border-r border-red-950 dark:border-red-600 py-2.5 lg:py-0">
            <Link
              to="/terms-of-service"
              className="text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:underline"
            >
              {t("footer.termsOfService")}
            </Link>
          </li>

          <li className="font-dynamic text-[15px] font-medium border-red-950 dark:border-red-600 py-2.5 lg:py-0">
            <Link
              to="/intellectual-property"
              className="text-light dark:text-dark hover:text-blue-500 dark:hover:text-blue-500 transition-all duration-300 hover:underline"
            >
              {t("footer.intellectualProperty")}
            </Link>
          </li>
        </ul>

        <div className="hidden lg:flex justify-center items-center mb-5 w-full border border-black"></div>

        <div className="relative w-full lg:w-10/12 lg:mx-auto mb-5 grid grid-cols-12 gap-5">
          {/* Delivery Partners Section */}
          <div className="hidden lg:block w-full col-span-6 lg:col-span-4 order-2 lg:order-1">
            <h3 className="text-base lg:text-lg font-medium font-dynamic bg-black text-center py-0.5 text-white mb-2.5">
              {t("footer.deliveryPartner")}
            </h3>
            <div className="grid grid-cols-5 gap-1 bg-black relative p-1.5">
              <Link target="_blank" to="https://deliverytiger.com.bd/">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img
                    src={Delivery_Tiger}
                    className="w-full h-full object-cover rounded hover:opacity-90"
                    alt="Delivery Tiger"
                  />
                </div>
              </Link>
              <Link target="_blank" to="https://ecourier.com.bd/m">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={E_courier} className="w-full h-full object-cover rounded hover:opacity-90" alt="E Courier" />
                </div>
              </Link>
              <Link target="_blank" to="https://pathao.com/bn/">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Patho} className="w-full h-full object-cover rounded hover:opacity-90" alt="Patho" />
                </div>
              </Link>
              <Link target="_blank" to="https://redx.com.bd/">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Red_X} className="w-full h-full object-cover rounded hover:opacity-90" alt="Red X" />
                </div>
              </Link>
              <Link target="_blank" to="https://steadfast.com.bd/">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Stead_Fast} className="w-full h-full object-cover rounded hover:opacity-90" alt="Stead Fast" />
                </div>
              </Link>
            </div>
          </div>

          {/* Payment Partners Section */}
          <div className="hidden lg:block w-full col-span-6 lg:col-span-4 order-3 lg:order-2">
            <h3 className="text-base lg:text-lg font-medium font-dynamic bg-black text-center py-0.5 text-white mb-2.5">
              {t("footer.paymentPartner")}
            </h3>
            <div className="grid grid-cols-5 gap-1 bg-black relative p-1.5">
              <Link to="">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img
                    src={Cash_On_Delivery}
                    className="w-full h-full object-cover rounded hover:opacity-90"
                    alt="Cash on Delivery"
                  />
                </div>
              </Link>
              <Link target="_blank" to="https://www.bkash.com">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Bkash} className="w-full h-full object-cover rounded hover:opacity-90" alt="Bkash" />
                </div>
              </Link>
              <Link target="_blank" to="https://nagad.com.bd/">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Nagad} className="w-full h-full object-cover rounded hover:opacity-90" alt="Nagad" />
                </div>
              </Link>
              <Link target="_blank" to="https://www.dutchbanglabank.com/rocket/rocket.html">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Rocket} className="w-full h-full object-cover rounded hover:opacity-90" alt="Rocket" />
                </div>
              </Link>
              <Link target="_blank" to="https://www.upaybd.com/">
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Upay} className="w-full h-full object-cover rounded hover:opacity-90" alt="Upay" />
                </div>
              </Link>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="w-full col-span-12 lg:col-span-4 order-1 lg:order-3">
            <h3 className="text-base lg:text-lg font-medium font-dynamic bg-black text-center py-0.5 text-white mb-2.5">
              {t("footer.socialMedia")}
            </h3>
            <div className="grid grid-cols-5 gap-1 bg-black relative p-1.5">
              <Link target="_blank" to={websiteInfo?.facebook}>
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Facebook} className="w-full h-full object-cover rounded hover:opacity-90" alt="Facebook" />
                </div>
              </Link>
              <Link target="_blank" to={websiteInfo?.instagram}>
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Instagram} className="w-full h-full object-cover rounded hover:opacity-90" alt="Instagram" />
                </div>
              </Link>
              <Link target="_blank" to={websiteInfo?.youtube}>
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Youtube} className="w-full h-full object-cover rounded hover:opacity-90" alt="Youtube" />
                </div>
              </Link>
              <Link target="_blank" to={websiteInfo?.tiktok}>
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Tik_Tok} className="w-full h-full object-cover rounded hover:opacity-90" alt="Tik Tok" />
                </div>
              </Link>
              <Link target="_blank" to={websiteInfo?.linkedin}>
                <div className="p-0.5 bg-gray-900 rounded transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-gray-800">
                  <img src={Linkedin} className="w-full h-full object-cover rounded hover:opacity-90" alt="Linkedin" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="text-[15px] font-primary font-medium text-center bg-black text-white py-2 px-5 rounded mb-12 lg:mb-0">
            @ {year} freefeel.xyz. All Right Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
