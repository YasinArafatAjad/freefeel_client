import { Helmet } from "react-helmet-async";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import useUser from "../../../../hooks/useUser/useUser";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";

const MyRefer = () => {
  const { t } = useTranslation();
  const { profileData, isProfileDataLoading, refetch } = useUser();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Update discounted price by admin
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await axiosSecure.put(`/referralCodeApply/${profileData?._id}`, data);
      const successMessage = res?.data?.message || "Well done! You've received 1 Point as your referral bonus.";

      Swal.fire({
        text: successMessage,
        icon: "success",
      });
      refetch();
      reset();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      Swal.fire({
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const share = `https://freefeel.aminulislamemon.com/sign-up-with-email-address`;

  if (isProfileDataLoading || isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-10 lg:px-20 2xl:px-24 py-10 lg:py-5 relative w-full h-screen bg-light dark:bg-dark">
      <Helmet>
        <title>FreeFeel | My Refer - {profileData?.name}</title>
      </Helmet>
      {/* Back Icon */}
      <Link to="/dashboard/profile" className="absolute right-2.5 top-2.5">
        <MdOutlineClose size={24} className="text-red-500"></MdOutlineClose>
      </Link>

      <h1 className="text-2xl font-bold text-center font-dynamic mb-5 lg:mb-7 2xl:mb-10">
        {t("myRefer.yourReferCode")}: <span className="font-primary text-red-500">{profileData?.referralCode}</span>
      </h1>

      <h1 className="text-lg font-semibold text-center font-dynamic mb-5 lg:mb-7 2xl:mb-10">
        {t("myRefer.instructionOne")} <span className="text-red-500 font-primary">{websiteInfo?.referrerPoints}</span>{" "}
        {t("myRefer.instructionTwo")}
      </h1>

      {/* Discount Using Points Form and Print Button */}
      <div className="mb-5 lg:mb-7 2xl:mb-10">
        {profileData?.referralCodeUsed ? (
          <div className="w-full lg:w-1/2 lg:mx-auto h-full p-2.5 lg:p-5 bg-gray-100 dark:bg-gray-800 rounded flex justify-center items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full h-full flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-0"
            >
              <div className="relative w-full h-full flex flex-col">
                <input
                  id="referralCode"
                  type="text"
                  placeholder={t("myRefer.placeholder")}
                  {...register("referralCode", { required: true })}
                  aria-invalid={errors.referralCode ? "true" : "false"}
                  className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:border-blue-600 dark:focus:border-blue-600 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-1/2 mx-auto bg-black border border-black font-primary text-[15px] font-medium text-white py-1.5 px-5 rounded-r"
              >
                {isLoading ? "Processing..." : t("myRefer.apply")}
              </button>
            </form>
          </div>
        ) : null}
      </div>

      {/* Share social media */}
      <div className="flex flex-col lg:flex-row justify-start items-center gap-2.5">
        <h3 className="text-nowrap font-dynamic text-base lg:text-lg font-medium">{t("myRefer.shareReferLink")}:</h3>

        {/* Social media for icon for large devices */}
        <div className="w-full flex justify-center lg:justify-start items-center gap-2.5">
          <FacebookShareButton url={share} hashtag="#FreeFeel #E-commerce">
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>

          <FacebookMessengerShareButton url={share} appId="7368381016619903">
            <FacebookMessengerIcon size={30} round={true} />
          </FacebookMessengerShareButton>

          <WhatsappShareButton
            url={share}
            title={`Join me on FreeFeel – the ultimate E-commerce experience!`}
            separator=" - "
          >
            <WhatsappIcon size={30} round={true} />
          </WhatsappShareButton>

          <TelegramShareButton url={share} title={`Discover FreeFeel! Sign up now for exclusive deals and rewards.`}>
            <TelegramIcon size={30} round={true} />
          </TelegramShareButton>

          <ViberShareButton url={share} title={`Start earning and shopping smart on FreeFeel!`} separator=" | ">
            <ViberIcon size={30} round={true} />
          </ViberShareButton>

          <TwitterShareButton
            url={share}
            title={`Sign up on FreeFeel and explore amazing earning opportunities!`}
            hashtag="#FreeFeel #E-commerce"
          >
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

export default MyRefer;
