import { useForm } from "react-hook-form";
import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import InputField from "../../../../components/InputField/InputField";
import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import { toast } from "react-toastify";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import TextareaField from "../../../../components/TextareaField/TextareaField";
import { IoImageOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

const UpdateSettings = ({ isUpdateInfo, setIsUpdateInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { isWebsiteInfoLoading, websiteInfo, refetch } = useWebsiteInfo();
  // State to store discount bg image preview
  const [selectedDiscountBgImage, setSelectedDiscountBgImage] = useState(null);
  // State to store logo light image preview
  const [selectedLogoLightImage, setSelectedLogoLightImage] = useState(null);
  // State to store logo dark image preview
  const [selectedLogoDarkImage, setSelectedLogoDarkImage] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  // preview the discount bg selected image
  const discountBgImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedDiscountBgImage(e.target.files[0]);
      trigger("discountBg");
    }
  };

  // Clear the discount bg preview / selected image
  const removeSelectedImage = () => {
    setSelectedDiscountBgImage(null);
  };

  // preview the logo light selected image
  const logoLightImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedLogoLightImage(e.target.files[0]);
      trigger("discountBg");
    }
  };

  // Clear the logo light preview / selected image
  const removeLogoLightSelectedImage = () => {
    setSelectedLogoLightImage(null);
  };

  // preview the logo dark selected image
  const logoDarkImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedLogoDarkImage(e.target.files[0]);
      trigger("discountBg");
    }
  };

  // Clear the logo dark preview / selected image
  const removeLogoDarkSelectedImage = () => {
    setSelectedLogoDarkImage(null);
  };

  // Home page preview sections list
  const previewSections = [
    "All Products",
    "New Arrival",
    "Most Popular",
    "Top Banner",
    "Second Banner",
    "Categories",
    "Video Ads",
    "Discount Offer",
    "Features",
    // "Offer Ads",
  ];

  // Handle the form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    // Append the discountBg (single file)
    if (selectedDiscountBgImage) {
      formData.append("discountBg", selectedDiscountBgImage);
    }
    // Append the logoLight (single file)
    if (selectedLogoLightImage) {
      formData.append("logoLight", selectedLogoLightImage);
    }
    // Append the logoDark (single file)
    if (selectedLogoDarkImage) {
      formData.append("logoDark", selectedLogoDarkImage);
    }

    // Append form fields (except files)
    for (const key in data) {
      if (key !== "discountBg" && key !== "logoLight" && key !== "logoDark") {
        if (key === "sections") {
          // Convert array to JSON string
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    try {
      const res = await axiosPublic.put("updateWebsiteProfileInfo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      reset();
      refetch();
      setIsUpdateInfo("");
      setSelectedDiscountBgImage(null);
      setSelectedLogoLightImage(null);
      setSelectedLogoDarkImage(null);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded">
      <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
        <h3 className="font-primary text-lg font-medium flex items-center">
          <span>{isUpdateInfo}</span> <IoIosArrowForward></IoIosArrowForward> <span>Update</span>
        </h3>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsUpdateInfo("")}
            className="w-auto h-9 flex justify-center items-center gap-1.5 bg-red-500 hover:bg-red-600 transition-colors duration-300 px-2.5 rounded text-white dark:text-white"
          >
            <IoMdClose size={16}></IoMdClose>
            <span className="text-[15px] font-primary font-medium">Cancel</span>
          </button>
        </div>
      </div>

      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {isUpdateInfo === "Contact Info" && (
            <div className="grid grid-cols-12 gap-5">
              {/* Contact Number  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="contactNumber"
                  defaultValue={websiteInfo?.contactNumber}
                  label="Contact Number"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Customer Care Number  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="customerCareNumber"
                  defaultValue={websiteInfo?.customerCareNumber}
                  label="Customer Care Number"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* WhatsApp Number  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="whatsappNumber"
                  defaultValue={websiteInfo?.whatsappNumber}
                  label="WhatsApp Number"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Support Email  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="supportEmail"
                  defaultValue={websiteInfo?.supportEmail}
                  label="Support Email"
                  type="email"
                  required={true}
                ></InputField>
              </div>

              {/* Info Email  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="infoEmail"
                  defaultValue={websiteInfo?.infoEmail}
                  label="Info Email"
                  type="email"
                  required={true}
                ></InputField>
              </div>

              {/* Career Email  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="careerEmail"
                  defaultValue={websiteInfo?.careerEmail}
                  label="Career Email"
                  type="email"
                  required={true}
                ></InputField>
              </div>

              {/* Shop Address  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="address"
                  defaultValue={websiteInfo?.address}
                  label="Shop Address"
                  type="text"
                  required={true}
                ></InputField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Features" && (
            <div className="space-y-5">
              {/* On-Time Delivery Message - English  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="oneTimeDeliveryEng"
                  defaultValue={websiteInfo?.oneTimeDeliveryEng}
                  label="On-Time Delivery Message (English)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* On-Time Delivery Message - Bangla  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="oneTimeDeliveryBan"
                  defaultValue={websiteInfo?.oneTimeDeliveryBan}
                  label="On-Time Delivery Message (Bangla)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Free Shipping Message English  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="freeShippingEng"
                  defaultValue={websiteInfo?.freeShippingEng}
                  label="Free Shipping Message (English)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Free Shipping Message Bangla  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="freeShippingBan"
                  defaultValue={websiteInfo?.freeShippingBan}
                  label="Free Shipping Message (Bangla)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* 24/7 Support Message - English  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="supportMessageEng"
                  defaultValue={websiteInfo?.supportMessageEng}
                  label="24/7 Support Message (English)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* 24/7 Support Message - Bangla */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="supportMessageBan"
                  defaultValue={websiteInfo?.supportMessageBan}
                  label="24/7 Support Message (Bangla)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Easy Payment Message - English  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="easyPaymentEng"
                  defaultValue={websiteInfo?.easyPaymentEng}
                  label="Easy Payment Message (English)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Easy Payment Message - Bangla  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="easyPaymentBan"
                  defaultValue={websiteInfo?.easyPaymentBan}
                  label="Easy Payment Message (Bangla)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Safe Checkout Message - English  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="safeCheckoutEng"
                  defaultValue={websiteInfo?.safeCheckoutEng}
                  label="Safe Checkout Message (English)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Safe Checkout Message - Bangla */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="safeCheckoutBan"
                  defaultValue={websiteInfo?.safeCheckoutBan}
                  label="Safe Checkout Message (Bangla)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Exclusive Deals Message - English  */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="exclusiveDealsEng"
                  defaultValue={websiteInfo?.exclusiveDealsEng}
                  label="Exclusive Deals Message (English)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Exclusive Deals Message - Bangla */}
              <div className="relative w-full h-full">
                <InputField
                  register={register}
                  errors={errors}
                  name="exclusiveDealsBan"
                  defaultValue={websiteInfo?.exclusiveDealsBan}
                  label="Exclusive Deals Message (Bangla)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              <div className="grid grid-cols-12 gap-5">
                {/* Referrer Points */}
                <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-6">
                  <InputField
                    register={register}
                    errors={errors}
                    name="referrerPoints"
                    defaultValue={websiteInfo?.referrerPoints}
                    label="Referrer Points"
                    type="number"
                    min={0}
                    required={true}
                  ></InputField>
                </div>

                {/* Referred Points  */}
                <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-6">
                  <InputField
                    register={register}
                    errors={errors}
                    name="referredPoints"
                    defaultValue={websiteInfo?.referredPoints}
                    label="Referred Points (New User)"
                    type="number"
                    min={0}
                    required={true}
                  ></InputField>
                </div>
              </div>
            </div>
          )}

          {isUpdateInfo === "Delivery Charge" && (
            <div className="grid grid-cols-12 gap-5">
              {/* Inside of Dhaka */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-6">
                <InputField
                  register={register}
                  errors={errors}
                  name="insideDhaka"
                  defaultValue={websiteInfo?.insideDhaka}
                  label="Delivery Charge (Inside of Dhaka)"
                  type="number"
                  min={0}
                  required={true}
                ></InputField>
              </div>

              {/* Out side of Dhaka  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-6">
                <InputField
                  register={register}
                  errors={errors}
                  name="outsideDhaka"
                  defaultValue={websiteInfo?.outsideDhaka}
                  label="Delivery Charge (Outside of Dhaka)"
                  type="number"
                  min={0}
                  required={true}
                ></InputField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Discount Offer" && (
            <div className="grid grid-cols-12 gap-5">
              <div className="relative w-full h-full col-span-12">
                <p className="font-primary text-lg font-medium">Discount Offer On Home Page</p>
              </div>

              {/* Discount Offer On Home Page - English */}
              <div className="relative w-full h-full col-span-12">
                <InputField
                  register={register}
                  errors={errors}
                  name="discountOfferEng"
                  defaultValue={websiteInfo?.discountOfferEng}
                  label="Discount Offer Message (English)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Discount Offer On Home Page - Bangla  */}
              <div className="relative w-full h-full col-span-12">
                <InputField
                  register={register}
                  errors={errors}
                  name="discountOfferBan"
                  defaultValue={websiteInfo?.discountOfferBan}
                  label="Discount Offer Message (Bangla)"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Discount Code On Home Page  */}
              <div className="relative w-full h-full col-span-12">
                <InputField
                  register={register}
                  errors={errors}
                  name="discountCode"
                  defaultValue={websiteInfo?.discountCode}
                  label="Discount Code"
                  type="text"
                  required={true}
                ></InputField>
              </div>

              {/* Bg Image */}
              <div className="relative w-full h-full col-span-12">
                <p className="font-primary text-[15px] font-medium mb-2.5">Bg Image (jpg/jpeg/png/webp)</p>

                <label
                  htmlFor="discountBg"
                  className="w-full h-24 2xl:h-28 flex flex-col justify-center items-center gap-2.5 cursor-pointer border"
                >
                  <IoImageOutline size={28} />
                  <span className="text-[15px] font-primary font-normal text-gray-500 dark:text-gray-400">
                    Recommended Size (1280 × 200px)
                  </span>
                  <input
                    {...register("discountBg", { required: false })}
                    id="discountBg"
                    type="file"
                    onChange={discountBgImageChange}
                    accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                    style={{ display: "none" }}
                  />
                </label>

                {selectedDiscountBgImage ? (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(selectedDiscountBgImage)}
                      alt="Selected"
                      className="w-full h-[50px] md:h-[100px] lg:h-[200px] object-cover rounded"
                    />

                    <button type="button" onClick={removeSelectedImage} className="text-red-500 mt-2 text-sm">
                      Remove Image
                    </button>
                  </div>
                ) : websiteInfo?.discountBg ? (
                  <div className="mt-2">
                    <img
                      src={websiteInfo?.discountBg}
                      alt="Selected"
                      className="w-full h-[50px] md:h-[100px] lg:h-[200px] object-cover rounded"
                    />
                  </div>
                ) : (
                  <></>
                )}

                {errors.discountBg?.type === "required" && (
                  <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                    This Field is Required
                  </p>
                )}
              </div>

              <div className="relative w-full h-full col-span-12">
                <p className="font-primary text-lg font-medium">Discount Offer On Category Page</p>
              </div>
            </div>
          )}

          {isUpdateInfo === "Video Ads" && (
            <div className="grid grid-cols-12 gap-5">
              {/* Home page YouTube video Ads URL  */}
              <div className="relative w-full h-full col-span-12">
                

                <InputField
                  register={register}
                  errors={errors}
                  name="youtubeVideoThumbnail"
                  defaultValue={websiteInfo?.youtubeVideoThumbnail}
                  label="Home page YouTube video thumbnail Ads URL"
                  type="text"
                  required={true}
                ></InputField>

                <InputField
                  register={register}
                  errors={errors}
                  name="youtubeVideo"
                  defaultValue={websiteInfo?.youtubeVideo}
                  label="Home page YouTube video Ads URL"
                  type="text"
                  required={true}
                ></InputField>

              </div>
            </div>
          )}

          {isUpdateInfo === "About Us" && (
            <div className="space-y-5">
              {/* About Us (English) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="aboutUsEng"
                  defaultValue={websiteInfo?.aboutUsEng}
                  label="About Us (English)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>

              {/* About Us (Bangla) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="aboutUsBan"
                  defaultValue={websiteInfo?.aboutUsBan}
                  label="About Us (Bangla)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Social Media" && (
            <div className="grid grid-cols-12 gap-5">
              {/* Facebook  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="facebook"
                  defaultValue={websiteInfo?.facebook}
                  label="Facebook"
                  type="url"
                  required={true}
                ></InputField>
              </div>

              {/* Instagram  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="instagram"
                  defaultValue={websiteInfo?.instagram}
                  label="Instagram"
                  type="url"
                  required={true}
                ></InputField>
              </div>

              {/* YouTube  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="youtube"
                  defaultValue={websiteInfo?.youtube}
                  label="YouTube"
                  type="url"
                  required={true}
                ></InputField>
              </div>

              {/* Tik Tok  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="tiktok"
                  defaultValue={websiteInfo?.tiktok}
                  label="Tik Tok"
                  type="url"
                  required={true}
                ></InputField>
              </div>

              {/* Linkedin  */}
              <div className="relative w-full h-full col-span-12 md:col-span-6 lg:col-span-4">
                <InputField
                  register={register}
                  errors={errors}
                  name="linkedin"
                  defaultValue={websiteInfo?.linkedin}
                  label="Linkedin"
                  type="url"
                  required={true}
                ></InputField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Privacy Policy" && (
            <div className="space-y-5">
              {/* Privacy Policy (English) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="privacyPolicyEng"
                  defaultValue={websiteInfo?.privacyPolicyEng}
                  label="Privacy Policy (English)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>

              {/* Privacy Policy (Bangla) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="privacyPolicyBan"
                  defaultValue={websiteInfo?.privacyPolicyBan}
                  label="Privacy Policy (Bangla)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Refund Policy" && (
            <div className="space-y-5">
              {/* Refund Policy (English) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="refundPolicyEng"
                  defaultValue={websiteInfo?.refundPolicyEng}
                  label="Refund Policy (English)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>

              {/* Refund Policy (Bangla) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="refundPolicyBan"
                  defaultValue={websiteInfo?.refundPolicyBan}
                  label="Refund Policy (Bangla)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Shipping Policy" && (
            <div className="space-y-5">
              {/* Shipping Policy (English) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="shippingPolicyEng"
                  defaultValue={websiteInfo?.shippingPolicyEng}
                  label="Shipping Policy (English)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>

              {/* Shipping Policy (Bangla) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="shippingPolicyBan"
                  defaultValue={websiteInfo?.shippingPolicyBan}
                  label="Shipping Policy (Bangla)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Payment Policy" && (
            <div className="space-y-5">
              {/* Payment Policy (English) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="paymentPolicyEng"
                  defaultValue={websiteInfo?.paymentPolicyEng}
                  label="Payment Policy (English)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>

              {/* Payment Policy (Bangla) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="paymentPolicyBan"
                  defaultValue={websiteInfo?.paymentPolicyBan}
                  label="Payment Policy (Bangla)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Terms Of Service" && (
            <div className="space-y-5">
              {/* Terms Of Service (English) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="termsOfServiceEng"
                  defaultValue={websiteInfo?.termsOfServiceEng}
                  label="Terms Of Service (English)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>

              {/* Terms Of Service (Bangla) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="termsOfServiceBan"
                  defaultValue={websiteInfo?.termsOfServiceBan}
                  label="Terms Of Service (Bangla)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Intellectual Property" && (
            <div className="space-y-5">
              {/* Intellectual Property (English) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="intellectualPropertyEng"
                  defaultValue={websiteInfo?.intellectualPropertyEng}
                  label="Intellectual Property (English)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>

              {/* Intellectual Property (Bangla) */}
              <div className="relative w-full col-span-12">
                <TextareaField
                  register={register}
                  errors={errors}
                  name="intellectualPropertyBan"
                  defaultValue={websiteInfo?.intellectualPropertyBan}
                  label="Intellectual Property (Bangla)"
                  required={true}
                  rows={15}
                ></TextareaField>
              </div>
            </div>
          )}

          {isUpdateInfo === "Settings" && (
            <div className="space-y-5">
              <div className="flex justify-between items-center gap-5">
                {/* Logo Light */}
                <div className="relative w-full lg:w-1/2 h-full col-span-12">
                  <p className="font-primary text-[15px] font-medium mb-2.5">Logo Light (jpg/jpeg/png/webp)</p>

                  <div className="flex justify-start items-center gap-5">
                    <label
                      htmlFor="logoLight"
                      className="w-[200px] h-[100px] flex flex-col justify-center items-center gap-2.5 cursor-pointer border"
                    >
                      <IoImageOutline size={28} />
                      <span className="text-[15px] font-primary font-normal text-gray-500 dark:text-gray-400">
                        Size (800 × 400px)
                      </span>
                      <input
                        {...register("logoLight", { required: false })}
                        id="logoLight"
                        type="file"
                        onChange={logoLightImageChange}
                        accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                        style={{ display: "none" }}
                      />
                    </label>

                    {selectedLogoLightImage ? (
                      <div className="mt-2 w-[200px] h-[100px] relative">
                        <img
                          src={URL.createObjectURL(selectedLogoLightImage)}
                          alt="Selected"
                          className="w-full h-full object-cover rounded"
                        />

                        <button type="button" onClick={removeLogoLightSelectedImage} className="absolute top-1 right-1">
                          <MdDeleteForever size={20} className="text-red-500"></MdDeleteForever>
                        </button>
                      </div>
                    ) : websiteInfo?.logoLight ? (
                      <div className="w-[200px] h-[100px]">
                        <img src={websiteInfo?.logoLight} alt="Selected" className="w-full h-full object-cover rounded" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  {errors.logoLight?.type === "required" && (
                    <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                      This Field is Required
                    </p>
                  )}
                </div>

                {/* Logo Dark */}
                <div className="relative w-full lg:w-1/2 h-full col-span-12">
                  <p className="font-primary text-[15px] font-medium mb-2.5">Logo Dark (jpg/jpeg/png/webp)</p>

                  <div className="flex justify-start items-center gap-5">
                    <label
                      htmlFor="logoDark"
                      className="w-[200px] h-[100px] flex flex-col justify-center items-center gap-2.5 cursor-pointer border"
                    >
                      <IoImageOutline size={28} />
                      <span className="text-[15px] font-primary font-normal text-gray-500 dark:text-gray-400">
                        Size (800 × 400px)
                      </span>
                      <input
                        {...register("logoDark", { required: false })}
                        id="logoDark"
                        type="file"
                        onChange={logoDarkImageChange}
                        accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                        style={{ display: "none" }}
                      />
                    </label>

                    {selectedLogoDarkImage ? (
                      <div className="mt-2 w-[200px] h-[100px] relative">
                        <img
                          src={URL.createObjectURL(selectedLogoDarkImage)}
                          alt="Selected"
                          className="w-full h-full object-cover rounded"
                        />

                        <button type="button" onClick={removeLogoDarkSelectedImage} className="absolute top-1 right-1">
                          <MdDeleteForever size={20} className="text-red-500"></MdDeleteForever>
                        </button>
                      </div>
                    ) : websiteInfo?.logoDark ? (
                      <div className="w-[200px] h-[100px]">
                        <img src={websiteInfo?.logoDark} alt="Selected" className="w-full h-full object-cover rounded" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  {errors.logoDark?.type === "required" && (
                    <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                      This Field is Required
                    </p>
                  )}
                </div>
              </div>

              {/* Home Page Sections Management */}
              <div className="relative w-full col-span-12">
                <p className="font-primary text-lg font-medium mb-2.5">Preview Sections</p>

                <div className="relative w-full h-full space-y-3.5">
                  {previewSections?.map((section, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value={section}
                          {...register("sections", { required: true })}
                          defaultChecked={websiteInfo?.sections?.includes(section)}
                          className="w-4 h-4 border border-gray-300 rounded-md bg-gray-100 checked:bg-blue-600 checked:border-blue-600  hover:border-blue-500 focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
                        />
                      </label>
                      <p className="font-primary text-[15px] font-medium">{section}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="relative w-full h-full flex justify-end col-span-12 mt-5">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 font-primary text-[15px] font-medium text-white py-1.5 px-2.5 rounded"
            >
              {isLoading ? "Processing..." : "Update Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSettings;
