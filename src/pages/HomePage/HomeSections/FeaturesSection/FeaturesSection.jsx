import { GrLike } from "react-icons/gr";
import { LiaShippingFastSolid } from "react-icons/lia";
import { Ri24HoursLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { TbBasketDiscount } from "react-icons/tb";

const FeaturesSection = () => {
  const { t } = useTranslation();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-dark text-light dark:text-dark">
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0">
        <div className="lg:border-t-8 lg:border-b-8 border-black py-5 lg:py-0">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-0">
            <div className="flex flex-col justify-start items-center text-center border-b lg:border-b-0 border-r border-red-950 dark:border-red-600 py-2.5 lg:py-3.5 px-1 lg:px-2.5 2xl:px-3.5">
              <GrLike className="text-3xl md:text-4xl lg:text-5xl mb-2.5 2xl:mb-3.5 text-red-950 dark:text-red-600"></GrLike>
              <h3 className="text-base lg:text-lg 2xl:text-xl font-semibold mb-2 font-dynamic">
                {t("featureHome.featureTitle1")}
              </h3>
              <p className="text-sm font-dynamic font-medium text-center">{websiteInfo?.oneTimeDelivery}</p>
            </div>

            <div className="flex flex-col justify-start items-center text-center border-b lg:border-b-0 border-r border-red-950 dark:border-red-600 py-2.5 lg:py-3.5 px-1 lg:px-2.5 2xl:px-3.5">
              <LiaShippingFastSolid className="text-3xl md:text-4xl lg:text-5xl mb-2.5 2xl:mb-3.5 text-red-950 dark:text-red-600"></LiaShippingFastSolid>
              <h3 className="text-base lg:text-lg 2xl:text-xl font-semibold mb-2 font-dynamic">
                {t("featureHome.featureTitle2")}
              </h3>
              <p className="text-sm font-dynamic font-medium text-center">{websiteInfo?.freeShipping}</p>
            </div>

            <div className="flex flex-col justify-start items-center text-center border-b lg:border-b-0 lg:border-r border-red-950 dark:border-red-600 py-2.5 lg:py-3.5 px-1 lg:px-2.5 2xl:px-3.5">
              <Ri24HoursLine className="text-3xl md:text-4xl lg:text-5xl mb-2.5 2xl:mb-3.5 text-red-950 dark:text-red-600"></Ri24HoursLine>
              <h3 className="text-base lg:text-lg 2xl:text-xl font-semibold mb-2 font-dynamic">
                {t("featureHome.featureTitle3")}
              </h3>
              <p className="text-sm font-dynamic font-medium text-center">{websiteInfo?.supportMessage}</p>
            </div>

            <div className="flex flex-col justify-start items-center text-center border-r border-red-950 dark:border-red-600 py-2.5 lg:py-3.5 px-1 lg:px-2.5 2xl:px-3.5">
              <MdOutlinePayment className="text-3xl md:text-4xl lg:text-5xl mb-2.5 2xl:mb-3.5 text-red-950 dark:text-red-600"></MdOutlinePayment>
              <h3 className="text-base lg:text-lg 2xl:text-xl font-semibold mb-2 font-dynamic">
                {t("featureHome.featureTitle4")}
              </h3>
              <p className="text-sm font-dynamic font-medium text-center">{websiteInfo?.easyPayment}</p>
            </div>

            <div className="flex flex-col justify-start items-center text-center border-r border-red-950 dark:border-red-600 py-2.5 lg:py-3.5 px-1 lg:px-2.5 2xl:px-3.5">
              <IoCartOutline className="text-3xl md:text-4xl lg:text-5xl mb-2.5 2xl:mb-3.5 text-red-950 dark:text-red-600"></IoCartOutline>
              <h3 className="text-base lg:text-lg 2xl:text-xl font-semibold mb-2 font-dynamic">
                {t("featureHome.featureTitle5")}
              </h3>
              <p className="text-sm font-dynamic font-medium text-center">{websiteInfo?.safeCheckout}</p>
            </div>

            <div className="flex flex-col justify-start items-center text-center py-2.5 lg:py-3.5 px-1 lg:px-2.5 2xl:px-3.5">
              <TbBasketDiscount className="text-3xl md:text-4xl lg:text-5xl mb-2.5 2xl:mb-3.5 text-red-950 dark:text-red-600"></TbBasketDiscount>
              <h3 className="text-base lg:text-lg 2xl:text-xl font-semibold mb-2 font-dynamic">
                {t("featureHome.featureTitle6")}
              </h3>
              <p className="text-sm font-dynamic font-medium text-center">{websiteInfo?.exclusiveDeals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
