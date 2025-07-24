import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";

const UpdatePromoCode = ({ id, setIsUpdatePromoCode, setPromoCodeId, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  //   Fetch specific promo code
  const { isPending: isPromoCodeLoading, data: promoCode = {} } = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getPromoCodeById/${id}`);
      return res?.data && res?.data?.data;
    },
    refetchOnWindowFocus: true,
  });

  // Fetch all category
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

  // Update PromoCode
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await axiosPublic.put(`/updatePromoCode/${id}`, data);
      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      reset();
      setIsUpdatePromoCode(false);
      refetch();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Update PromoCode Component Close
  const handleCloseUpdatePromoCode = () => {
    setPromoCodeId(null);
    setIsUpdatePromoCode(false);
  };

  if (isPromoCodeLoading || isCategoriesLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-primary text-lg font-medium px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600">
        Update A Promo Code
      </h3>

      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Write Promo Code */}
          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="promoCode" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Write Promo Code
            </label>
            <input
              id="promoCode"
              {...register("promoCode", { required: true })}
              aria-invalid={errors.promoCode ? "true" : "false"}
              defaultValue={promoCode?.promoCode}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            />
            {errors.promoCode?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/*  Discount Percentage */}
          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="discountPercentage" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Discount Percentage
            </label>
            <input
              type="number"
              min={0}
              id="discountPercentage"
              {...register("discountPercentage", { required: true })}
              aria-invalid={errors.discountPercentage ? "true" : "false"}
              defaultValue={promoCode?.discountPercentage}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-secondary text-[15px] font-medium"
            />
            {errors.discountPercentage?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/* Start Date */}
          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="expiryDate" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("startDate", { required: true })}
              defaultValue={promoCode?.startDate ? new Date(promoCode.startDate).toISOString().split("T")[0] : ""}
              aria-invalid={errors.startDate ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-secondary text-[15px] font-medium"
            />
            {errors.startDate?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/* Expiry Date */}
          <div className="relative w-full h-full flex flex-col">
            <label htmlFor="expiryDate" className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("expiryDate", { required: true })}
              defaultValue={promoCode?.expiryDate ? new Date(promoCode.expiryDate).toISOString().split("T")[0] : ""}
              aria-invalid={errors.expiryDate ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-secondary text-[15px] font-medium"
            />
            {errors.expiryDate?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/* Discount Categories */}
          <div className="relative w-full h-full flex flex-col">
            <label className="font-primary text-[15px] font-medium mb-1 lg:mb-1.5">Discount Categories</label>

            <div>
              {categories?.map((category) => (
                <div key={category?._id} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    value={category?.category}
                    defaultChecked={promoCode?.categories?.includes(category?.category)}
                    {...register("categories", { required: true })}
                    aria-invalid={errors.categories ? "true" : "false"}
                    className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 hover:cursor-pointer"
                  />
                  <p className="font-primary text-[15px] font-normal text-gray-700 dark:text-gray-300">
                    {category?.category}
                  </p>
                </div>
              ))}
            </div>

            {errors.categories?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          <div className="relative w-full h-full flex justify-end gap-2.5">
            <button
              onClick={handleCloseUpdatePromoCode}
              className="bg-red-600 hover:bg-red-700 font-primary text-[15px] font-medium text-white py-1.5 px-2.5 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 font-primary text-[15px] font-medium text-white py-1.5 px-2.5 rounded"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePromoCode;
