import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { IoImageOutline } from "react-icons/io5";
import Loader from "../../../../components/Loader/Loader";

const AddBanner = ({ refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to store image preview
  const axiosPublic = useAxiosPublic();

  const { isPending: isCategoriesLoading, data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories", {
        params: { language: "eng" },
      });

      return res?.data && res?.data?.data;
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
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

    // Append the image (single file)
    formData.append("image", selectedImage);

    // Append form fields
    for (const key in data) {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await axiosPublic.post("/postBanner", formData);
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

  if (isCategoriesLoading) {
    return (
      <div>
      <Loader></Loader>
    </div>
    );
  }

  return (
    <div>
      <h3 className="font-primary text-lg font-medium px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600 text-green-700">
        Add New Banner
      </h3>

      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="image" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Banner Image (jpg/jpeg/png/webp)
            </label>

            <label
              htmlFor="image"
              className="w-full h-20 2xl:h-28 flex flex-col justify-center items-center gap-2.5 cursor-pointer border"
            >
              <IoImageOutline size={28} />
              <span className="text-[15px] font-primary font-normal text-gray-500 dark:text-gray-400">
                Recommended Size (1920px × 950px)
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
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-full h-40 2xl:h-56 object-cover rounded"
                />

                <button type="button" onClick={removeSelectedImage} className="text-red-500 mt-2 text-sm">
                  Remove Image
                </button>
              </div>
            )}

            {errors.image?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="category" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Category Link
            </label>
            <select
              id="category"
              {...register("category", { required: true })}
              aria-invalid={errors.category ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category?._id} value={category?.category}>
                  {category?.category}
                </option>
              ))}
            </select>

            {errors.category?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This filed is required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="section" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Banner Section
            </label>
            <select
              id="section"
              {...register("section", { required: true })}
              aria-invalid={errors.section ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              <option value="">Select Section</option>
              <option value="Top Banner">Top Banner</option>
              <option value="Second Banner">Second Banner</option>
            </select>
            {errors.section?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
            <label htmlFor="top_section_layout" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
             Top Banner Section Layout
            </label>
            <select
              id="top_section_layout"
              {...register("top_section_layout", { required: true })}
              aria-invalid={errors.section ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              <option value="layout-1">Layout-1</option>
              <option value="layout-2">layout-2</option>
              <option value="layout-3">layout-3</option>
              <option value="layout-4">layout-4</option>
            </select>
            {
              errors.top_section_layout?.type === "required" && (
                <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                  This Field is Required
                </p>
              )
            }
            
          </div>

          <div className="relative w-full h-full flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 font-primary text-[15px] font-medium text-white py-1.5 px-2.5 rounded"
            >
              {isLoading ? "Processing..." : "Save Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
