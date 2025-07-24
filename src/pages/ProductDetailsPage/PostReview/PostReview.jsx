import { useForm } from "react-hook-form";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser/useUser";
import useAuth from "../../../hooks/useAuth/useAuth";

const PostReview = ({ id }) => {
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [isRatingWarning, setIsRatingWarning] = useState(false);
  const { profileData } = useUser();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const handleRatingClick = (newRating) => {
    setRatings(newRating);
    setIsRatingWarning(false);
  };

  // Preview the selected photos
  const photosImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPhotos((prevPhotos) => [...prevPhotos, ...Array.from(e.target.files)]);
      trigger("photos");
    }
  };

  // Clear a single photo
  const removeSelectedPhoto = (index) => {
    setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  // Handle the form submission
  const onSubmit = async (data) => {
    setIsLoading(true);

    if (ratings <= 0) {
      setIsRatingWarning(true);
      setIsLoading(false);
      return;
    } else {
      setIsRatingWarning(false);
    }

    if (!user) {
      Swal.fire({
        text: t("postReview.loginMessage"),
        icon: "warning",
      });
      navigate("/sign-in-with-email-address");
      return;
    }

    const formData = new FormData();

    // Append each file in `photos` (multiple files)
    selectedPhotos.forEach((file) => {
      formData.append("photos", file);
    });

    // Append other form fields
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append others data
    formData.append("ratings", ratings);
    formData.append("email", profileData?.email);
    formData.append("profileImage", profileData?.imageUrl);

    try {
      const res = await axiosPublic.put(`/postReview/${id}`, formData);

      Swal.fire({
        text: res?.data?.message || "Success",
        icon: "success",
      });

      reset();
      setSelectedPhotos([]);
      setRatings(0);
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <h1 className="font-dynamic text-xl font-semibold text-center my-2.5">{t("postReview.title")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        {/* Ratings */}
        <div className="w-full h-full relative">
          <div className="flex justify-center items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} onClick={() => handleRatingClick(star)} className="focus:outline-none">
                {ratings >= star ? (
                  <IoIosStar size={20} className="text-yellow-500 cursor-pointer transition-all" />
                ) : (
                  <IoIosStarOutline size={20} className="text-black dark:text-white cursor-pointer transition-all" />
                )}
              </div>
            ))}
          </div>

          {isRatingWarning && (
            <p role="alert" className="font-primary text-[15px] font-medium text-red-500 text-center mt-1">
              This Field is Required
            </p>
          )}
        </div>

        <div className="w-full h-full relative flex flex-col lg:flex-row justify-center items-center gap-2.5">
          {/* Your Name */}
          <div className="w-full lg:w-1/2">
            <input
              id="yourName"
              {...register("yourName", { required: true })}
              placeholder={t("postReview.yourName")}
              aria-invalid={errors.yourName ? "true" : "false"}
              className="w-full h-10 bg-gray-100 dark:bg-dark text-light dark:text-dark rounded focus:outline-none border border-transparent focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
            {errors.yourName?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/* Order ID */}
          <div className="w-full lg:w-1/2">
            <input
              id="orderId"
              {...register("orderId", { required: true })}
              placeholder={t("postReview.orderId")}
              aria-invalid={errors.orderId ? "true" : "false"}
              className="w-full h-10 bg-gray-100 dark:bg-dark text-light dark:text-dark rounded focus:outline-none border border-transparent focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
            {errors.orderId?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>
        </div>

        {/* Comment Filed */}
        <div className="w-full h-full relative">
          <textarea
            id="comment"
            {...register("comment", { required: true })}
            placeholder={t("postReview.comment")}
            aria-invalid={errors.comment ? "true" : "false"}
            className="w-full h-20 lg:h-10 bg-gray-100 dark:bg-dark text-light dark:text-dark rounded focus:outline-none border border-transparent focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 pt-1.5 font-primary text-[15px] font-medium"
          />

          {errors.comment?.type === "required" && (
            <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
              This Field is Required
            </p>
          )}
        </div>

        {/* File Upload Section */}
        <div className="w-full h-full relative">
          <h3 className="text-[15px] font-medium font-dynamic mb-2.5">Upload Photos (jpg/jpeg/png/webp)</h3>

          <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded p-2.5 flex flex-col items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <label htmlFor="photos" className="w-full flex flex-col items-center hover:cursor-pointer">
              <IoImageOutline size={25} className="text-gray-500 dark:text-gray-300 mb-1" />
              <span className="text-sm font-primary font-medium text-gray-600 dark:text-gray-400">
                Click to select images
              </span>
              <input
                {...register("photos", { required: true })}
                id="photos"
                type="file"
                multiple
                onChange={photosImageChange}
                accept="image/jpg, image/jpeg, image/png, image/webp"
                className="hidden"
              />
            </label>
          </div>

          {errors.photos && <p className="text-red-500 text-sm mt-2">This field is required</p>}

          {/* Image Preview Section */}
          {selectedPhotos.length > 0 && (
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-2.5 mt-2.5">
              {selectedPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(photo)} alt="Selected" className="h-28 lg:h-16 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeSelectedPhoto(index)}
                    className="absolute top-0.5 right-0.5 bg-red-500 text-white p-1 lg:p-0.5 rounded-full"
                  >
                    <MdDeleteForever size={12} className="hidden lg:block" />
                    <MdDeleteForever size={15} className="block lg:hidden" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full h-full relative">
          <button
            type="submit"
            className="w-full h-10 lg:h-12 bg-black dark:bg-black text-white dark:text-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors duration-300 border-2 border-black rounded flex justify-center items-center font-dynamic text-xl font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : t("postReview.submit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostReview;
