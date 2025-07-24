import Loader from "../../../../components/Loader/Loader";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import "./DiscountCode.css";

const DiscountCode = () => {
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[200px] lg:max-w-[1280px] 2xl:max-w-[1920px] lg:mx-auto px-2.5 md:px-5 lg:px-0 2xl:px-14 mb-5 lg:mb-10 lg:py-12 2xl:py-16 bg-white dark:bg-gray-800 rounded-none lg:rounded flex justify-center items-center"
      style={{
        backgroundImage: `url(${websiteInfo?.discountBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row justify-center items-center gap-2.5 p-5 rounded-lg">
        <h1 className="text-white dark:text-white text-xl md:text-2xl lg:text-3xl font-bold text-center font-dynamic">
          {websiteInfo?.discountOffer}
        </h1>

        <div className="box">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{websiteInfo?.discountCode}</h1>
        </div>
      </div>
    </div>
  );
};

export default DiscountCode;
