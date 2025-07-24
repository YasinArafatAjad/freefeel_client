import { useForm } from "react-hook-form";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import useWebsiteInfo from "../../hooks/useWebsiteInfo/useWebsiteInfo";
import { BiSolidPhoneCall } from "react-icons/bi";
import { AddressContext } from "../../providers/AddressProvider/AddressProvider";
import { IoMdArrowDropdown } from "react-icons/io";

const Address = () => {
  const location = useLocation();
  const orderInfo = location?.state?.data || [];
  const axiosPublic = useAxiosPublic();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const { t } = useTranslation();
  const addresses = useContext(AddressContext);
  const [thanaNames, setThanaNames] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Function to handle zilla change
  const handleZillaChange = (selectedZilla) => {
    const selectedThanaNames = addresses[selectedZilla] || [];
    setThanaNames(selectedThanaNames);
  };

  // Order submit
  const onSubmit = async (data) => {
    setIsLoading(true);

    const postOrder = {
      ...orderInfo,
      ...data,
      email: user?.email || "",
    };

    // console.log(postOrder);

    try {
      const res = await axiosPublic.post("/postNewOrder", postOrder);
      const successMessage = res?.data?.message || "Success!";

      Swal.fire({
        title: successMessage,
        icon: "success",
        draggable: true,
      });
      reset();
      navigate("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      Swal.fire({
        title: errorMessage,
        icon: "error",
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | Billing Address</title>
      </Helmet>
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 py-5 lg:py-5 2xl:py-10">
        <h1 className="bg-black dark:bg-black text-white dark:text-white py-2.5 lg:py-5 font-dynamic text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5 lg:mb-5 2xl:mb-10">
          {t("billingAddress.title")}
        </h1>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full relative grid grid-cols-12 gap-5">
            {/* Name Field */}
            <div className="w-full h-full relative col-span-12 space-y-2">
              <p className="font-dynamic text-[15px] font-medium">{t("billingAddress.nameLabel")}</p>
              <input
                type="text"
                {...register("name", { required: "true" })}
                placeholder={t("billingAddress.namePlaceholder")}
                className="w-full h-14 rounded px-2.5 lg:px-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark font-primary font-medium text-[15px] focus:outline-none"
                aria-invalid={errors.name ? "true" : "false"}
              />

              {errors.name?.type === "required" && (
                <span role="alert" className="text-red-500 font-secondary text-base font-medium mt-2">
                  Name is required
                </span>
              )}
            </div>

            {/* Mobile Number Field */}
            <div className="w-full relative col-span-12 space-y-1">
              <p className="font-dynamic text-[15px] font-medium">{t("billingAddress.numberLabel")}</p>
              <div className="relative w-full flex items-center bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <span className="pl-4 mt-[2px] font-primary text-[15px] font-bold text-nowrap">BD +88</span>
                <input
                  type="number"
                  min={0}
                  {...register("number", {
                    required: "Please Enter Phone Number",
                    validate: (value) => /^01[3-9]\d{8}$/.test(value) || "Please enter a valid phone number",
                  })}
                  className="w-full h-14 pl-1 pr-2.5 lg:pr-5 bg-transparent text-gray-900 dark:text-white font-primary font-bold text-[15px] focus:outline-none"
                  aria-invalid={errors.number ? "true" : "false"}
                />
              </div>
              {errors?.number && (
                <p className="text-red-500 font-secondary text-sm font-medium mt-1">{errors.number.message}</p>
              )}
            </div>

            <div className="w-full h-full relative col-span-12 flex justify-between items-center gap-5">
              {/* Zilla Field */}
              <div className="w-full lg:w-1/2 h-full relative space-y-2">
                <p className="font-dynamic text-[15px] font-medium">{t("billingAddress.zillaLabel")}</p>
                <select
                  type="text"
                  {...register("zilla", { required: "true" })}
                  placeholder={t("billingAddress.zillaPlaceholder")}
                  onChange={(e) => handleZillaChange(e.target.value)}
                  className="w-full h-12 lg:h-14 rounded px-2.5 lg:px-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark font-primary font-medium text-[15px] focus:outline-none appearance-none"
                  aria-invalid={errors.zilla ? "true" : "false"}
                >
                  <option value="">{t("billingAddress.selectZilla")}</option>
                  {Object.keys(addresses).map((zilla) => (
                    <option key={zilla} value={zilla}>
                      {zilla}
                    </option>
                  ))}
                </select>

                <IoMdArrowDropdown
                  className="absolute top-[32px] lg:top-[35px] right-1 lg:right-2"
                  size={30}
                ></IoMdArrowDropdown>

                {errors.zilla?.type === "required" && (
                  <span role="alert" className="text-red-500 font-secondary text-base font-medium mt-2">
                    Zilla is required
                  </span>
                )}
              </div>

              {/* Thana Field */}
              <div className="w-full lg:w-1/2 h-full relative space-y-2">
                <p className="font-dynamic text-[15px] font-medium">{t("billingAddress.thanaLabel")}</p>
                <select
                  type="text"
                  {...register("thana", { required: "true" })}
                  placeholder={t("billingAddress.thanaPlaceholder")}
                  className="w-full h-12 lg:h-14 rounded px-2.5 lg:px-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark font-primary font-medium text-[15px] focus:outline-none appearance-none"
                  aria-invalid={errors.thana ? "true" : "false"}
                >
                  <option value="">{t("billingAddress.selectThana")}</option>
                  {thanaNames?.map((thana) => (
                    <option key={thana} value={thana}>
                      {thana}
                    </option>
                  ))}
                </select>

                <IoMdArrowDropdown
                  className="absolute top-[32px] lg:top-[35px] right-1 lg:right-2"
                  size={30}
                ></IoMdArrowDropdown>

                {errors.thana?.type === "required" && (
                  <span role="alert" className="text-red-500 font-secondary text-base font-medium mt-2">
                    Thana is required
                  </span>
                )}
              </div>
            </div>

            {/* Address Field */}
            <div className="w-full h-full relative col-span-12 space-y-2">
              <p className="font-dynamic text-[15px] font-medium">{t("billingAddress.addressLabel")}</p>
              <textarea
                {...register("address", { required: "true" })}
                placeholder={t("billingAddress.addressPlaceholder")}
                className="w-full h-20 lg:h-14 rounded px-2.5 lg:px-5 pt-3.5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark font-primary font-medium text-[15px] focus:outline-none"
                aria-invalid={errors.address ? "true" : "false"}
              />
              {errors.address?.type === "required" && (
                <span role="alert" className="text-red-500 font-secondary text-base font-medium mt-2">
                  Address is required
                </span>
              )}
            </div>

            {/* Comment Field */}
            <div className="w-full h-full relative col-span-12 space-y-2">
              <p className="font-dynamic text-[15px] font-medium">{t("billingAddress.commentLabel")}</p>
              <textarea
                {...register("comment")}
                placeholder={t("billingAddress.commentPlaceholder")}
                className="w-full h-20 lg:h-14 rounded px-2.5 lg:px-5 pt-3.5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark font-primary font-medium text-[15px] focus:outline-none"
                aria-invalid={errors.comment ? "true" : "false"}
              />
            </div>

            {/* Submit Button */}
            <div className="w-full h-full relative col-span-12 space-y-2">
              <button
                type="submit"
                className="w-full h-14 rounded bg-black dark:bg-black text-white dark:text-white font-dynamic text-lg md:text-xl lg:text-2xl font-semibold lg:font-bold"
              >
                {isLoading ? <p>Please Wait..</p> : <p>{t("billingAddress.submitButton")}</p>}
              </button>
            </div>

            <div className="w-full h-full relative col-span-12 space-y-2">
              <p className="text-[15px] font-dynamic font-medium text-center">
                {t("billingAddress.orderSuccessInstructions")}
              </p>
            </div>

            {/* Contact Number */}
            <div className="w-full h-full relative col-span-12 space-y-2">
              <Link
                to={`tel:${websiteInfo?.contactNumber}`}
                className="w-full h-14 relative border border-black dark:border-black text-black dark:text-white text-[13px] md:text-lg lg:text-2xl font-semibold lg:font-bold flex justify-center items-center gap-1 mb-5 text-center"
              >
                {t("checkout.helpingMessage")}: <br className="lg:hidden" />
                <BiSolidPhoneCall size={15} className="mt-1 text-blue-500 lg:hidden"></BiSolidPhoneCall>
                <BiSolidPhoneCall size={20} className="mt-1 text-blue-500 hidden lg:block"></BiSolidPhoneCall>
                {websiteInfo?.contactNumber}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
