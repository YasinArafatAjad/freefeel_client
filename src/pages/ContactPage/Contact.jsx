import { useForm } from "react-hook-form";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineContactMail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import useWebsiteInfo from "../../hooks/useWebsiteInfo/useWebsiteInfo";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const { t } = useTranslation();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );}
  }

  return (
    <div className="bg-gray-100 dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | Contact With Us</title>
        <meta
          name="description"
          content="Get in touch with FreeFeel for support, inquiries, or feedback. We're here to help with all your questions and concerns!"
        />
        <link rel="canonical" href={`${import.meta.env.VITE_REACT_APP_BASE_URL}${location?.pathname}`} />
      </Helmet>

      <div className="w-full h-full lg:max-w-[1280px] lg:mx-auto px-2.5 md:px-5 lg:px-0 py-10 lg:py-5 2xl:py-10">
        <div className="flex flex-col lg:flex-row justify-center gap-10 ">
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold text-center lg:text-start mb-5">{t("contact.contactUsTitle")}</h1>

            <div className="space-y-5">
              {/* Mobile Number */}
              <div className="relative w-full h-12 bg-gray-200 dark:bg-gray-800 rounded">
                <div className="w-full h-12 pl-20 flex justify-start items-center">
                  <p className="text-base font-medium">{websiteInfo?.contactNumber}</p>
                </div>
                <div className="absolute top-0 left-0 w-14 h-12 bg-black dark:bg-black rounded-l flex justify-center items-center">
                  <BiSolidPhoneCall className="text-2xl text-white"></BiSolidPhoneCall>
                </div>
              </div>

              {/* Support Email */}
              <div className="relative w-full h-12 bg-gray-200 dark:bg-gray-800 rounded">
                <div className="w-full h-12 pl-20 flex justify-start items-center">
                  <p className="text-base font-medium">{websiteInfo?.supportEmail}</p>
                </div>
                <div className="absolute top-0 left-0 w-14 h-12 bg-black dark:bg-black rounded-l flex justify-center items-center">
                  <TfiEmail className="text-2xl text-white"></TfiEmail>
                </div>
              </div>

              {/* Job Email */}
              <div className="relative w-full h-12 bg-gray-200 dark:bg-gray-800 rounded">
                <div className="w-full h-12 pl-20 flex justify-start items-center">
                  <p className="text-base font-medium">{websiteInfo?.careerEmail}</p>
                </div>
                <div className="absolute top-0 left-0 w-14 h-12 bg-black dark:bg-black rounded-l flex justify-center items-center">
                  <MdOutlineContactMail className="text-2xl text-white"></MdOutlineContactMail>
                </div>
              </div>

              {/* Whatsapp Number */}
              <div className="relative w-full h-12 bg-gray-200 dark:bg-gray-800 rounded">
                <div className="w-full h-12 pl-20 flex justify-start items-center">
                  <p className="text-base font-medium">{websiteInfo?.whatsappNumber}</p>
                </div>
                <div className="absolute top-0 left-0 w-14 h-12 bg-black dark:bg-black rounded-l flex justify-center items-center">
                  <BsWhatsapp className="text-2xl text-white"></BsWhatsapp>
                </div>
              </div>

              {/* Shop Location */}
              <div className="relative w-full h-12 bg-gray-200 dark:bg-gray-800 rounded">
                <div className="w-full h-12 pl-20 flex justify-start items-center">
                  <p className="text-base font-medium">{websiteInfo?.address}</p>
                </div>
                <div className="absolute top-0 left-0 w-14 h-12 bg-black dark:bg-black rounded-l flex justify-center items-center">
                  <SlLocationPin className="text-2xl text-white"></SlLocationPin>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold text-center lg:text-start mb-5">{t("contact.contactFormTitle")}</h1>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="relative w-full h-full">
                  <input
                    {...register("name", { required: "true" })}
                    type="text"
                    placeholder={t("contact.namePlaceholder")}
                    className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                    aria-invalid={errors.name ? "true" : "false"}
                  />

                  {errors.name?.type === "required" && <p role="alert">This field is required</p>}
                </div>

                <div className="relative w-full h-full">
                  <input
                    {...register("email", { required: "true" })}
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                    aria-invalid={errors.email ? "true" : "false"}
                  />

                  {errors.email?.type === "required" && <p role="alert">This field is required</p>}
                </div>

                <div className="relative w-full h-full">
                  <input
                    {...register("phone", { required: "true" })}
                    type="text"
                    placeholder={t("contact.numberPlaceholder")}
                    className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                    aria-invalid={errors.phone ? "true" : "false"}
                  />

                  {errors.phone?.type === "required" && <p role="alert">This field is required</p>}
                </div>

                <div className="relative w-full h-full">
                  <textarea
                    {...register("message", { required: "true" })}
                    type="text"
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full h-[116px] rounded pl-5 pt-3 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                    aria-invalid={errors.message ? "true" : "false"}
                  />

                  {errors.message?.type === "required" && <p role="alert">This field is required</p>}
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white text-xl font-semibold"
                >
                  {t("contact.sendMessageButton")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
