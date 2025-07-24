import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoImageOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

const AddCategory = ({ refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [selectedImage, setSelectedImage] = useState(null); // State to store image preview

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  // preview the selected image
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      trigger("image");
    }
  };

  // Clear the preview / selected image
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // Post Category
  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();

    // Append the image (single file)
    formData.append("image", selectedImage);

    // Append form fields
    for (const key in data) {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await axiosPublic.post("/postCategory", formData);
      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      reset();
      refetch();
      setSelectedImage(null);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-primary text-lg font-medium px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600">
        Add New Category
      </h3>

      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="image" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Category Image (jpg/jpeg/png/webp)
            </label>

            <div className="flex flex-col lg:flex-row justify-start items-center gap-5">
              <label
                htmlFor="image"
                className="w-[125px] h-[125px] flex flex-col justify-center items-center gap-2.5 cursor-pointer border"
              >
                <IoImageOutline size={20} />
                <span className="text-[12px] font-primary font-normal text-gray-500 dark:text-gray-400 text-center">
                  Recommended Size (250 × 250px)
                </span>
                <input
                  {...register("image", { required: true })}
                  id="image"
                  type="file"
                  onChange={imageChange}
                  accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                  style={{ display: "none" }}
                />
              </label>

              {selectedImage && (
                <div className="mt-2 relative">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-[125px] h-[125px] object-cover rounded"
                  />

                  <button
                    type="button"
                    onClick={removeSelectedImage}
                    className="text-red-500 text-sm absolute top-1 right-1"
                  >
                    <MdDeleteForever size={20}></MdDeleteForever>
                  </button>
                </div>
              )}
            </div>

            {errors.image?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="categoryEng" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Category (English)
            </label>
            <input
              id="categoryEng"
              {...register("categoryEng", { required: true })}
              aria-invalid={errors.categoryEng ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
            {errors.categoryEng?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="categoryBan" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Category (Bangla)
            </label>
            <input
              id="categoryBan"
              {...register("categoryBan", { required: true })}
              aria-invalid={errors.categoryBan ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-secondary text-[15px] font-medium"
            />
            {errors.categoryBan?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="categoryUrl" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Category URL
            </label>
            <input
              id="categoryUrl"
              {...register("categoryUrl", { required: true })}
              aria-invalid={errors.categoryUrl ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
            {errors.categoryUrl?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="status" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Category Status
            </label>
            <select
              id="status"
              {...register("status", { required: true })}
              aria-invalid={errors.status ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              <option value="Public">Public</option>
              <option value="Hidden">Hidden</option>
            </select>
            {errors.status?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="offerEng" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Offer (English)
            </label>
            <textarea
              id="offerEng"
              rows={4}
              {...register("offerEng", { required: false })}
              aria-invalid={errors.offerEng ? "true" : "false"}
              className="w-full bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
            {errors.offerEng?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="offerBan" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Offer (Bangla)
            </label>
            <textarea
              id="offerBan"
              rows={4}
              {...register("offerBan", { required: false })}
              aria-invalid={errors.offerBan ? "true" : "false"}
              className="w-full bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-secondary text-[15px] font-medium"
            />
            {errors.offerBan?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 font-primary text-[15px] font-medium text-white py-1.5 px-2.5 rounded"
            >
              {isLoading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
