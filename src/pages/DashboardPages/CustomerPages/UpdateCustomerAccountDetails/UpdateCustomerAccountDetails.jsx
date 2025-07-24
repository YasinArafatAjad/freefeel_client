import { FaCircleUser } from "react-icons/fa6";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import useUser from "../../../../hooks/useUser/useUser";
import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import Loader from "../../../../components/Loader/Loader";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const UpdateCustomerAccountDetails = () => {
  const { t } = useTranslation();
  const { profileData, isProfileDataLoading, refetch } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // preview the selected image
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Clear the preview / selected image
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // Post Banner
  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    // Append the image url (single file)
    formData.append("imageUrl", selectedImage);

    // Append form fields
    for (const key in data) {
      if (key !== "imageUrl") {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await axiosPublic.put(`/updateProfile/${profileData?._id}`, formData);
      const successMessage = res?.data?.message || "Success";
      Swal.fire({
        text: successMessage,
        icon: "success",
      });
      refetch();
      navigate("/dashboard/customer-account-details");
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

  if (isProfileDataLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-10 lg:px-20 2xl:px-24 py-5 relative w-full h-full">
      <Helmet>
        <title>FreeFeel | Update Account - {profileData?.name}</title>
      </Helmet>
      {/* Back Icon */}
      <Link to="/dashboard/customer-account-details" className="absolute right-2.5 top-2.5">
        <MdOutlineClose size={24} className="text-red-500"></MdOutlineClose>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col justify-center items-center gap-2.5 mb-5 lg:mb-7 2xl:mb-10">
          <div className="relative w-full h-full flex flex-col">
            {selectedImage ? (
              <div className="flex flex-col justify-center items-center gap-2.5">
                <div className="w-[100px] h-[100px] relative">
                  <LazyLoadImage
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    effect="blur"
                    className="w-[100px] h-[100px] object-cover rounded-full"
                  />

                  <button type="button" onClick={removeSelectedImage} className="text-red-500 absolute top-0 -right-2.5">
                    <MdOutlineClose size={24}></MdOutlineClose>
                  </button>
                </div>
              </div>
            ) : profileData?.imageUrl ? (
              <div className="flex flex-col justify-center items-center gap-2.5">
                <label
                  htmlFor="imageUrl"
                  className="w-[100px] h-[100px] flex flex-col justify-center items-center gap-2.5 cursor-pointer"
                >
                  <LazyLoadImage
                    src={profileData?.imageUrl}
                    alt={profileData?.name}
                    effect="blur"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <input
                    {...register("imageUrl", { required: false })}
                    id="imageUrl"
                    type="file"
                    onChange={imageChange}
                    accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2.5">
                <label
                  htmlFor="imageUrl"
                  className="w-[100px] h-[100px] flex flex-col justify-center items-center gap-2.5 cursor-pointer"
                >
                  <FaCircleUser size={100}></FaCircleUser>
                  <input
                    {...register("imageUrl", { required: false })}
                    id="imageUrl"
                    type="file"
                    onChange={imageChange}
                    accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            )}

            {errors.imageUrl?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <h1 className="text-2xl font-bold">{profileData?.name}</h1>
        </div>

        {/* Name Filed */}
        <div className="relative w-full h-full">
          <input
            {...register("name", { required: "true" })}
            type="text"
            placeholder={t("customerDashboard.yourFullName")}
            defaultValue={profileData?.name}
            className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600"
            aria-invalid={errors.name ? "true" : "false"}
          />

          {errors.name?.type === "required" && <p role="alert">Name is required</p>}
        </div>

        {/* Gender Filed */}
        <div className="relative w-full h-full">
          <select
            {...register("gender", { required: "true" })}
            defaultValue={profileData?.gender}
            className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600"
          >
            <option value="">{t("customerDashboard.gender")}</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {errors.gender?.type === "required" && <p role="alert">Gender is required</p>}
        </div>

        {/* Name Filed */}
        <div className="relative w-full h-full">
          <input
            {...register("email", { required: "true" })}
            type="email"
            placeholder={t("customerDashboard.email")}
            defaultValue={profileData?.email}
            readOnly
            className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600 cursor-not-allowed"
            aria-invalid={errors.email ? "true" : "false"}
          />

          {errors.email?.type === "required" && <p role="alert">Email is required</p>}
        </div>

        {/* Mobile Number Filed */}
        <div className="relative w-full h-full">
          <input
            {...register("mobileNumber", { required: "true" })}
            defaultValue={profileData?.mobileNumber}
            min={1}
            type="number"
            placeholder={t("customerDashboard.mobileNumber")}
            className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600"
            aria-invalid={errors.mobileNumber ? "true" : "false"}
          />

          {errors.mobileNumber?.type === "required" && <p role="alert">Mobile Number is required</p>}
        </div>

        {/* Date Of Birth Field */}
        <div className="relative w-full h-full">
          <input
            {...register("dateOfBirth", { required: "true" })}
            defaultValue={profileData?.dateOfBirth}
            type="text"
            placeholder={t("customerDashboard.dateOfBirth")}
            className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600"
            aria-invalid={errors.dateOfBirth ? "true" : "false"}
          />
          {errors.dateOfBirth?.type === "required" && <p role="alert">Date Of Birth is required</p>}
        </div>

        {/* Full Address Filed */}
        <div className="relative w-full h-full">
          <input
            {...register("address", { required: "true" })}
            defaultValue={profileData?.address}
            type="text"
            placeholder={t("customerDashboard.fullAddress")}
            className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600"
            aria-invalid={errors.address ? "true" : "false"}
          />

          {errors.address?.type === "required" && <p role="alert">Full Address is required</p>}
        </div>

        {/* Country Filed */}
        <div className="relative w-full h-full">
          <input
            {...register("country", { required: "true" })}
            defaultValue={profileData?.country}
            type="text"
            placeholder={t("customerDashboard.country")}
            className="w-full h-12 rounded pl-5 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-[15px] font-primary font-medium focus:outline-none border border-gray-300 dark:border-gray-600"
            aria-invalid={errors.country ? "true" : "false"}
          />

          {errors.country?.type === "required" && <p role="alert">Country is required</p>}
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white text-xl font-semibold flex justify-center items-center gap-2.5"
        >
          {isLoading ? "Please wait..." : <p>{t("customerDashboard.updateAccount")}</p>}
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomerAccountDetails;
