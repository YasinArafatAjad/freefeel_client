import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import InputField from "../../../../components/InputField/InputField";
import TextareaField from "../../../../components/TextareaField/TextareaField";
import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [isActiveTab, setIsActiveTab] = useState("Details");
  const [selectedSizeGuideline, setSelectedSizeGuideline] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { isPending: isCategoriesLoading, data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories", {
        params: { language: "eng" },
      });

      return res?.data && res?.data?.data;
    },
  });

  // Bangla colors
  const banColors = [
    "লাল",
    "সবুজ",
    "নীল",
    "হলুদ",
    "কমলা",
    "কালো",
    "সাদা",
    "বেগুনি",
    "গোলাপি",
    "বাদামী",
    "ধূসর",
    "আকাশি",
    "সোনালি",
    "রূপালী",
    "চকলেট",
    "অ্যাকোয়া",
    "পেস্টেল পিঙ্ক",
    "ট্যান",
    "ফিরোজা",
    "মেরুন",
    "সীফোম",
    "টাইটান",
    "নীলকান্তমণি",
    "কফি",
  ];

  // English colors
  const engColors = [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Black",
    "White",
    "Purple",
    "Pink",
    "Brown",
    "Gray",
    "Sky Blue",
    "Gold",
    "Silver",
    "Chocolate",
    "Aqua",
    "Pastel Pink",
    "Tan",
    "Turquoise",
    "Maroon",
    "Seafoam",
    "Titan",
    "Sapphire",
    "Coffee",
  ];

  const engClothSizes = ["Extra Small", "Small", "Medium", "Large", "Extra Large", "2XL", "3XL"];
  const banClothSizes = ["এক্সটা স্মল", "স্মল", "মিডিয়াম", "লার্জ", "এক্সট্রা লার্জ", "টু-এক্সেল", "থ্রি-এক্সেল"];

  const engShoesSizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46"];
  const banShoesSizes = ["৩৮", "৩৯", "৪০", "৪১", "৪২", "৪৩", "৪৪", "৪৫", "৪৬"];

  const engVolumeSizes = [
    "100ml",
    "250ml",
    "500ml",
    "1Liter",
    "2Liter",
    "2.5Liter",
    "3Liter",
    "5Liter",
    "8Liter",
    "10Liter",
  ];
  const banVolumeSizes = [
    "১০০মিলি",
    "২৫০মিলি",
    "৫০০মিলি",
    "১লিটার",
    "২লিটার",
    "২.৫লিটার",
    "৩লিটার",
    "৫লিটার",
    "৮লিটার",
    "১০লিটার",
  ];

  const engWeightSizes = ["100g", "250g", "500g", "1kg", "2kg", "2.5kg", "5kg", "10kg", "15kg", "20kg", "25kg", "50kg"];

  const banWeightSizes = [
    "১০০গ্রাম",
    "২৫০গ্রাম",
    "৫০০গ্রাম",
    "১কেজি",
    "২কেজি",
    "২.৫কেজি",
    "৫কেজি",
    "১০কেজি",
    "১৫কেজি",
    "২০কেজি",
    "২৫কেজি",
    "৫০কেজি",
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  // preview the selected image
  const sizeGuidelineImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedSizeGuideline(e.target.files[0]);
      trigger("sizeGuideline");
    }
  };

  // Clear the preview / selected image
  const removeSelectedSizeGuideline = () => {
    setSelectedSizeGuideline(null);
  };

  // preview the selected image
  const thumbnailImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedThumbnail(e.target.files[0]);
      trigger("thumbnail");
    }
  };

  // Clear the preview / selected image
  const removeSelectedThumbnail = () => {
    setSelectedThumbnail(null);
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

  // Add Product
  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    // Append the sizeGuideline (single file)
    formData.append("sizeGuideline", selectedSizeGuideline);

    // Append the thumbnail (single file)
    formData.append("thumbnail", selectedThumbnail);

    // Append each file in `photos` (multiple files)
    selectedPhotos.forEach((file) => {
      formData.append("photos", file);
    });

    // Append other form fields
    for (const key in data) {
      if (key === "banColors" || key === "engColors" || key === "banSizes" || key === "engSizes") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await axiosPublic.post("/postProduct", formData);
      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      reset();
      navigate("/dashboard/products");
      setSelectedThumbnail(null);
      setSelectedSizeGuideline(null);
      setSelectedPhotos([]);
    } catch (error) {
      console.log(error);
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
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded">
      <Helmet>
        <title>FreeFeel | Dashboard - Add New Product</title>
        <meta name="description" content="Explore add new product page on the FreeFeel Dashboard." />
      </Helmet>
      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
        <h3 className="font-primary text-lg font-medium">Add New Product</h3>

        <div>
          <Link
            to="/dashboard/products"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 py-1.5 px-2.5 rounded text-white dark:text-white text-[15px] font-primary font-medium"
          >
            <span className="text-[15px] font-primary font-medium">View All</span>
          </Link>
        </div>
      </div>

      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-5">
          {/* Title (English) */}
          <div className="relative w-full h-full col-span-12">
            <InputField
              register={register}
              errors={errors}
              name="titleEng"
              label="Title (English)"
              type="text"
              required={true}
            ></InputField>
          </div>

          {/*  Title (Bangla) */}
          <div className="relative w-full h-full col-span-12">
            <InputField
              register={register}
              errors={errors}
              name="titleBan"
              label="Title (Bangla)"
              type="text"
              required={true}
            ></InputField>
          </div>

          {/* Product URL */}
          <div className="relative w-full h-full col-span-12">
            <InputField
              register={register}
              errors={errors}
              name="productUrl"
              label="Product URL"
              type="text"
              required={true}
            ></InputField>
          </div>

          {/* Regular Price */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <InputField
              register={register}
              errors={errors}
              name="regularPrice"
              label="Regular Price"
              type="number"
              min={1}
              required={true}
            ></InputField>
          </div>

          {/* Discount Percentage */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <InputField
              register={register}
              errors={errors}
              name="discountPercentage"
              label="Discount Percentage"
              type="number"
              min={0}
              required={false}
            ></InputField>
          </div>

          {/* Product Category */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <p className="font-primary text-[15px] font-medium">Product Category</p>
            <select
              {...register("category", { required: true })}
              aria-invalid={errors.category ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              <option value="">Select Product Category</option>
              {categories?.map((category) => (
                <option key={category?._id} value={category?.category}>
                  {category?.category}
                </option>
              ))}
            </select>
            {errors.category?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <InputField
              register={register}
              errors={errors}
              name="quantity"
              label="Quantity"
              type="text"
              required={false}
            ></InputField>
          </div>

          {/* Stock Status */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <p className="font-primary text-[15px] font-medium">Stock Status</p>
            <select
              {...register("stockStatus", { required: true })}
              aria-invalid={errors.stockStatus ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              <option value="">Select Stock Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out Of Stock">Out Of Stock</option>
            </select>
            {errors.stockStatus?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/* Style Number */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <InputField
              register={register}
              errors={errors}
              name="styleNumber"
              label="Style Number"
              type="text"
              required={false}
            ></InputField>
          </div>

          {/* Product Type */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <p className="font-primary text-[15px] font-medium">Product Type</p>
            <select
              {...register("productType", { required: false })}
              aria-invalid={errors.productType ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              <option value="">Select Product Type</option>
              <option value="New Arrivals">New Arrivals</option>
              <option value="Most Popular">Most Popular</option>
            </select>
            {errors.productType?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/* Product Visibility */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <p className="font-primary text-[15px] font-medium">Product Visibility</p>
            <select
              {...register("visibility", { required: true })}
              aria-invalid={errors.visibility ? "true" : "false"}
              className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
            >
              <option value="">Select Visibility</option>
              <option value="Public">Public</option>
              <option value="Hidden">Hidden</option>
            </select>
            {errors.visibility?.type === "required" && (
              <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                This Field is Required
              </p>
            )}
          </div>

          {/* Free Delivery */}
          <div className="relative w-full h-full space-y-2 col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3">
            <p className="font-primary text-[15px] font-medium">Free Delivery Offer</p>
            <div className="relative flex items-center gap-2">
              <input
                type="checkbox"
                value="Free Delivery"
                {...register("deliveryStatus", { required: false })}
                className="bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 w-8 h-8 hover:cursor-pointer"
              />
              <label className="font-primary text-[15px] font-medium text-gray-700 dark:text-gray-300">Free Delivery</label>
            </div>
          </div>

          {/* Media / Product Images */}
          <div className="relative w-full h-full col-span-12">
            <div className="w-full h-10 bg-blue-500 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300 rounded text-white dark:text-white flex justify-center items-center mb-2.5">
              Media
            </div>

            <div className="flex flex-col lg:flex-row justify-between items- gap-5">
              {/* Thumbnail input field */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-[15px] font-primary font-medium pb-2.5 border-b border-gray-300 dark:border-gray-600 mb-5">
                  Add thumbnail (jpg/jpeg/png/webp)
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2.5">
                  <div className="w-full h-48 border border-dashed border-gray-300 dark:border-gray-600 rounded">
                    <label htmlFor="thumbnail" className="w-full h-full flex justify-center items-center cursor-pointer">
                      <IoImageOutline size={40} />
                      <input
                        {...register("thumbnail", { required: true })}
                        id="thumbnail"
                        type="file"
                        onChange={thumbnailImageChange}
                        accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                        className="hidden"
                      />
                    </label>

                    {errors.thumbnail?.type === "required" && (
                      <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                        This Field is Required
                      </p>
                    )}
                  </div>

                  <div className="w-full h-48 flex justify-center items-center relative">
                    {selectedThumbnail && (
                      <div className="w-full h-48 relative">
                        <img
                          src={URL.createObjectURL(selectedThumbnail)}
                          alt="Selected"
                          className="w-full h-48 object-cover rounded"
                        />

                        {/* Delete Icon */}
                        <button
                          type="button"
                          onClick={removeSelectedThumbnail}
                          className="text-red-500 absolute top-2 right-2 z-10"
                        >
                          <MdDeleteForever size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Photos input field */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-[15px] font-primary font-medium pb-2.5 border-b border-gray-300 dark:border-gray-600 mb-5">
                  Add gallery (jpg/jpeg/png/webp)
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2.5">
                  <div className="w-full h-48 border border-dashed border-gray-300 dark:border-gray-600 rounded">
                    <label htmlFor="photos" className="w-full h-48 flex justify-center items-center cursor-pointer">
                      <IoImageOutline size={40} />
                      <input
                        {...register("photos", { required: true })}
                        id="photos"
                        type="file"
                        multiple
                        onChange={photosImageChange}
                        accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                        className="hidden"
                      />
                    </label>

                    {errors.photos?.type === "required" && (
                      <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                        This Field is Required
                      </p>
                    )}
                  </div>

                  {selectedPhotos?.map((photo, index) => (
                    <div key={index} className="relative w-full h-48">
                      <img src={URL.createObjectURL(photo)} alt="Selected" className="w-full h-48 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeSelectedPhoto(index)}
                        className="text-red-500 absolute top-2 right-2 z-10"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="relative w-full h-full col-span-12">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3.5 lg:gap-5">
              {[
                "Details",
                "Description",
                "Color",
                "Clothing Size",
                "Shoes Size",
                "Liter Unit",
                "KG Unit",
                "Size Guideline",
                "SEO Meta Tags",
              ].map((tab, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setIsActiveTab(tab)}
                  className={
                    isActiveTab === tab
                      ? "w-full h-10 bg-blue-500 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300 rounded text-white dark:text-white"
                      : "w-full h-10 border border-gray-300 dark:border-gray-600 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-colors duration-300 rounded text-light dark:text-dark"
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Content */}
          <div className="relative w-full h-full col-span-12">
            {isActiveTab === "Details" && (
              <div className="space-y-5">
                {/* Details (English) */}
                <div className="relative w-full col-span-12">
                  <TextareaField
                    register={register}
                    errors={errors}
                    name="detailsEng"
                    label="Details (English)"
                    required={true}
                    rows={10}
                  ></TextareaField>
                </div>

                {/* Details (Bangla) */}
                <div className="relative w-full col-span-12">
                  <TextareaField
                    register={register}
                    errors={errors}
                    name="detailsBan"
                    label="Details (Bangla)"
                    required={true}
                    rows={10}
                  ></TextareaField>
                </div>
              </div>
            )}

            {isActiveTab === "Description" && (
              <div className="space-y-5">
                {/* Description (English) */}
                <div className="relative w-full col-span-12">
                  <TextareaField
                    register={register}
                    errors={errors}
                    name="descriptionEng"
                    label="Description (English)"
                    required={true}
                    rows={10}
                  ></TextareaField>
                </div>

                {/* Description (Bangla) */}
                <div className="relative w-full col-span-12">
                  <TextareaField
                    register={register}
                    errors={errors}
                    name="descriptionBan"
                    label="Description (Bangla)"
                    required={true}
                    rows={10}
                  ></TextareaField>
                </div>
              </div>
            )}

            {isActiveTab === "Color" && (
              <div className="space-y-5">
                {/* English Colors */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox label="Color (English)" name="engColors" options={engColors} register={register}></Checkbox>
                </div>

                {/* Bangla Colors */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox label="Color (Bangla)" name="banColors" options={banColors} register={register}></Checkbox>
                </div>
              </div>
            )}

            {isActiveTab === "Clothing Size" && (
              <div className="space-y-5">
                {/* Clothing English Sizes */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox
                    label="Clothing Size (English)"
                    name="engSizes"
                    options={engClothSizes}
                    register={register}
                  ></Checkbox>
                </div>

                {/* Clothing Bangla Sizes */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox
                    label="Clothing Size (Bangla)"
                    name="banSizes"
                    options={banClothSizes}
                    register={register}
                  ></Checkbox>
                </div>
              </div>
            )}

            {isActiveTab === "Shoes Size" && (
              <div className="space-y-5">
                {/* Shoes English Sizes */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox
                    label="Shoes Size (English)"
                    name="engSizes"
                    options={engShoesSizes}
                    register={register}
                  ></Checkbox>
                </div>

                {/* Shoes Bangla Sizes */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox
                    label="Shoes Size (Bangla)"
                    name="banSizes"
                    options={banShoesSizes}
                    register={register}
                  ></Checkbox>
                </div>
              </div>
            )}

            {isActiveTab === "Liter Unit" && (
              <div className="space-y-5">
                {/* Volume English Sizes */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox
                    label="Liter Unit (English)"
                    name="engSizes"
                    options={engVolumeSizes}
                    register={register}
                  ></Checkbox>
                </div>

                {/* Volume Bangla Sizes */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox
                    label="Liter Unit (Bangla)"
                    name="banSizes"
                    options={banVolumeSizes}
                    register={register}
                  ></Checkbox>
                </div>
              </div>
            )}

            {isActiveTab === "KG Unit" && (
              <div className="space-y-5">
                {/* Weight English Sizes */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox
                    label="KG Unit (English)"
                    name="engSizes"
                    options={engWeightSizes}
                    register={register}
                  ></Checkbox>
                </div>

                {/* Weight Bangla Sizes */}
                <div className="relative w-full h-full col-span-12">
                  <Checkbox label="KG Unit (Bangla)" name="banSizes" options={banWeightSizes} register={register}></Checkbox>
                </div>
              </div>
            )}

            {isActiveTab === "SEO Meta Tags" && (
              <div className="space-y-5">
                {/* Meta Title */}
                <div className="relative w-full h-full col-span-12">
                  <InputField
                    register={register}
                    errors={errors}
                    name="metaTitle"
                    label="Meta Title"
                    type="text"
                    required={true}
                  ></InputField>
                </div>

                {/* Focus Keywords */}
                <div className="relative w-full h-full col-span-12">
                  <InputField
                    register={register}
                    errors={errors}
                    name="metaFocusKeywords"
                    label="Focus Keywords"
                    type="text"
                    required={true}
                  ></InputField>
                </div>

                {/* Meta Description */}
                <div className="relative w-full col-span-12">
                  <TextareaField
                    register={register}
                    errors={errors}
                    name="metaDescription"
                    label="Meta Description"
                    required={true}
                    rows={10}
                  ></TextareaField>
                </div>
              </div>
            )}

            {isActiveTab === "Size Guideline" && (
              <div className="space-y-5">
                {/* Size Guideline (English) */}
                <div className="relative w-full col-span-12">
                  <TextareaField
                    register={register}
                    errors={errors}
                    name="sizeGuidelinesEng"
                    label="Size Guideline (English)"
                    required={true}
                    rows={10}
                  ></TextareaField>
                </div>

                {/* Size Guideline (Bangla) */}
                <div className="relative w-full col-span-12">
                  <TextareaField
                    register={register}
                    errors={errors}
                    name="sizeGuidelinesBan"
                    label="Size Guideline (Bangla)"
                    required={true}
                    rows={10}
                  ></TextareaField>
                </div>
              </div>
            )}

            {isActiveTab === "Size Guideline Image" && (
              <div className="space-y-5">
                {/* Size Guideline input field */}
                <div className="w-full">
                  <h3 className="text-[15px] font-primary font-medium pb-2.5">Add Size Guideline (jpg/jpeg/png/webp)</h3>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3.5 lg:gap-5">
                    <div className="w-full h-full py-5 border border-dashed border-gray-300 dark:border-gray-600 rounded">
                      <label
                        htmlFor="sizeGuideline"
                        className="w-full h-full flex justify-center items-center cursor-pointer"
                      >
                        <IoImageOutline size={30} />
                        <input
                          {...register("sizeGuideline", { required: true })}
                          id="sizeGuideline"
                          type="file"
                          onChange={sizeGuidelineImageChange}
                          accept="image/jpg, image/jpeg, image/png, image/webp, image/gif"
                          className="hidden"
                        />
                      </label>

                      {errors.sizeGuideline?.type === "required" && (
                        <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
                          This Field is Required
                        </p>
                      )}
                    </div>

                    <div className="w-full h-full flex justify-center items-center relative">
                      {selectedSizeGuideline && (
                        <div className="w-full h-full relative">
                          <img
                            src={URL.createObjectURL(selectedSizeGuideline)}
                            alt="Selected"
                            className="w-full h-full object-cover rounded"
                          />

                          {/* Delete Icon */}
                          <button
                            type="button"
                            onClick={removeSelectedSizeGuideline}
                            className="text-red-500 absolute top-2 right-2 z-10"
                          >
                            <MdDeleteForever size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative w-full h-full flex justify-end col-span-12">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 font-primary text-[15px] font-medium text-white py-1.5 px-2.5 rounded"
            >
              {isLoading ? "Processing..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;