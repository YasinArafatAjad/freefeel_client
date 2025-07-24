import React, { useState, useCallback, useEffect } from 'react';

import {
  LuImage,
  LuVideo,
  LuType,
  LuFileText,

  LuSettings,
  LuLayers,

  LuLanguages
} from 'react-icons/lu';
import { FiAlertCircle } from 'react-icons/fi';
// import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic'

import { useQuery } from '@tanstack/react-query';






// Move InputField component outside to prevent recreation
const InputField = React.memo(
  ({
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    icon: Icon,
    multiline = false,
    fieldName,
    required = false,
  }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative group">
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-400 dark:group-focus-within:text-blue-400 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        {multiline ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            data-field={fieldName}
            rows={4}
            className={`w-full ${Icon ? "pl-12" : "pl-4"} pr-4 py-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white/80 dark:focus:bg-gray-800/90 transition-all duration-300 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${error ? "border-red-500 dark:border-red-500 bg-red-50/50 dark:bg-red-900/30" : ""}`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            data-field={fieldName}
            className={`w-full ${Icon ? "pl-12" : "pl-4"} pr-4 py-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white/80 dark:focus:bg-gray-800/90 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${error ? "border-red-500 dark:border-red-500 bg-red-50/50 dark:bg-red-900/30" : ""}`}
          />
        )}
        {required && (
          <span className="absolute right-4 top-4 text-red-500 dark:text-red-400 text-sm">*</span>
        )}
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2 ml-1 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/30"
        >
          <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  )
);

InputField.displayName = "InputField";

const SelectField = React.memo(({ value, onChange, error, options, icon: Icon, fieldName, required = false }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative group">
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-400 dark:group-focus-within:text-blue-400 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      )}

      <select
        value={value}
        onChange={onChange}
        data-field={fieldName}
        className={`w-full ${Icon ? "pl-12" : "pl-4"} pr-4 py-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white/80 dark:focus:bg-gray-800/90 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${error ? "border-red-500 dark:border-red-500 bg-red-50/50 dark:bg-red-900/30" : ""}`}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {required && (
        <span className="absolute right-4 top-4 text-red-500 dark:text-red-400 text-sm">*</span>
      )}
    </div>

    {error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2 ml-1 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/30"
      >
        <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{error}</span>
      </motion.div>
    )}
  </motion.div>
));

SelectField.displayName = "SelectField";
// Move SlideSection component outside to prevent recreation

const SlideSection = React.memo(({ formData, onInputChange, errors }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/30 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-600/30 shadow-xl">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
        <LuLayers className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Slider Configuration</h3>
        <p className="text-gray-600 dark:text-gray-400 lowercase">Configure content for this slide</p>
      </div>
    </div>

    <div className="grid gap-8">
      {/* Image URL */}
      <InputField
        value={formData.slideImageUrl}
        onChange={onInputChange}
        fieldName="slideImageUrl"
        icon={LuImage}
         placeholder={`https://example.com/image.jpg, https://example.com/image2.jpg, https://example.com/image3.jpg`}
        error={errors.slideImageUrl}
      />

      {/* English Content */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white">
            <LuType className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">English Content</h4>
        </div>
        <div className="space-y-6">
          <InputField
            value={formData.slideTitle}
            onChange={onInputChange}
            fieldName="slideTitle"
            icon={LuType}
       placeholder={`Enter an engaging title 1, Enter an engaging title 2, Enter an engaging title 3`}
            error={errors.slideTitle}
            required
          />
          <InputField
            value={formData.slideSubtitle}
            onChange={onInputChange}
            fieldName="slideSubtitle"
            icon={LuType}
          placeholder={`Enter a descriptive subtitle 1, Enter a descriptive subtitle 2, Enter a descriptive subtitle 3`}
            error={errors.slideSubtitle}
          />
        </div>
        <InputField
          value={formData.slideDescription}
          onChange={onInputChange}
          fieldName="slideDescription"
          icon={LuFileText}
          multiline
          placeholder={`Write detailed content for your slide 1..., Write detailed content for your slide 2..., Write detailed content for your slide 3...`}
          error={errors.slideDescription}
        />
      </div>

      {/* Bangla Content */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white">
            <LuLanguages className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">বাংলা কন্টেন্ট (Bangla Content)</h4>
        </div>
        <div className="space-y-6">
          <InputField
            value={formData.slideTitleBangla}
            onChange={onInputChange}
            fieldName="slideTitleBangla"
            icon={LuType}
            placeholder={`একটি আকর্ষণীয় শিরোনাম লিখুন 1, একটি আকর্ষণীয় শিরোনাম লিখুন 2, একটি আকর্ষণীয় শিরোনাম লিখুন 3`}
            error={errors.slideTitleBangla}
            required
          />
          <InputField
            value={formData.slideSubtitleBangla}
            onChange={onInputChange}
            fieldName="slideSubtitleBangla"
            icon={LuType}
             placeholder={`একটি বর্ণনামূলক উপশিরোনাম লিখুন 1, একটি বর্ণনামূলক উপশিরোনাম লিখুন 2, একটি বর্ণনামূলক উপশিরোনাম লিখুন 3`}
            error={errors.slideSubtitleBangla}
          />
        </div>
        <InputField
          value={formData.slideDescriptionBangla}
          onChange={onInputChange}
          fieldName="slideDescriptionBangla"
          icon={LuFileText}
          multiline
          placeholder={`আপনার স্লাইডের বিস্তারিত বিষয়বস্তু লিখুন 1..., আপনার স্লাইডের বিস্তারিত বিষয়বস্তু লিখুন 2..., আপনার স্লাইডের বিস্তারিত বিষয়বস্তু লিখুন 3...`}
          error={errors.slideDescriptionBangla}
        />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white">
            <LuLayers className="w-4 h-4" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200"> Slider Layout</h4>
        </div>


        {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Slide Layout
        </label> */}

        <select
          value={formData.layout}
          onChange={onInputChange}

          data-field="layout"
          className="w-full pl-4 pr-4 py-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white/80 dark:focus:bg-gray-800/90 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        >
          <option value="layout-1">Layout-1</option>
          <option value="layout-2">Layout-2</option>
          <option value="layout-3">Layout-3</option>
          <option value="layout-4">Layout-4</option>
        </select>

        {/* <select
            value={formData.category}
            onChange={onInputChange}

            data-field="category"
            className="w-full pl-4 pr-4 py-4 bg-white/50 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white/80 dark:focus:bg-gray-800/90 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          >
            <option value="Top Banner">Top Banner</option>
            <option value="Second Banner">Second Banner</option>
          </select> */}





      </div>
    </div>
  </motion.div>
));

SlideSection.displayName = "SlideSection";



function UpdateBanner() {

const axiosPublic = useAxiosPublic();

  const { data: allBanners = [], refetch } = useQuery({
    queryKey: ["allBanners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBanners");
      return res?.data?.data || [];
    },
  });






const [bannerId, setBannerId] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    backgroundImageUrl: "",
    backgroundVideoUrl: "",
    layout: "layout-1",
    slideImageUrl: "",
    slideTitle: "",
    slideSubtitle: "",
    slideDescription: "",
    slideTitleBangla: "",
    slideSubtitleBangla: "",
    slideDescriptionBangla: "",
  });


useEffect(() => {
    let isMounted = true;

    const fetchBanner = async () => {
      try {
        const res = await axiosPublic.get("/getSingleBanner");
        const banner = res?.data?.data;

        if (isMounted && banner) {
          setFormData((prev) => ({ ...prev, ...banner }));
          setBannerId(banner._id);
        }
      } catch (error) {
        toast.error("Failed to load banner data.");
        console.error("Banner fetch error:", error);
        refetch();
      }
    };

    fetchBanner();
    return () => {
      isMounted = false;
    };
  }, [axiosPublic, refetch]);

  const handleInputChange = useCallback(
    (e) => {
      const fieldName = e.target.dataset.field;
      const value = e.target.value;

      setFormData((prev) => ({ ...prev, [fieldName]: value }));

      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
    [errors]
  );


  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };


  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.slideTitle.trim() && !formData.slideTitleBangla.trim()) {
      newErrors.slideTitle = "Please provide a title in English or Bangla";
      newErrors.slideTitleBangla = "Please provide a title in English or Bangla";
    }

    const urlFields = [
      { field: "slideImageUrl", label: "Slide Image URL" },
      { field: "backgroundImageUrl", label: "Background Image URL" },
      { field: "backgroundVideoUrl", label: "Background Video URL" },
    ];

    urlFields.forEach(({ field, label }) => {
      const value = formData[field]?.trim();
      if (value && !isValidUrl(value)) {
        newErrors[field] = `Please enter a valid URL for ${label}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);


   const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const isValid = validateForm();
      if (!isValid) {
        const firstError = Object.keys(errors)[0];
        if (firstError) {
          const errorElement = document.querySelector(`[data-field="${firstError}"]`);
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
            errorElement.focus();
          }
        }
        return;
      }

      try {
        const { _id, ...payload } = formData;
        const res = await axiosPublic.put(`/updateBanner/${bannerId}`, payload);

        toast.success(res?.data?.message || "🎉 Banner updated successfully!");
        refetch();
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message || error?.message || "❌ Something went wrong!";
        toast.error(errorMessage);
      }
    },
    [formData, validateForm, errors, bannerId, axiosPublic, refetch]
  );

  const hasErrors = Object.keys(errors).length > 0;




  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border-b border-white/20 dark:border-gray-600/20 z-10"
      >
        <div className="relative max-w-7xl mx-auto px-4 py-8">

          <div className="flex items-center gap-4 ">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white shadow-lg">
              <LuSettings className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Slide Editor
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create stunning bilingual slideshows with ease
              </p>
            </div>
          </div>






        </div>
      </motion.header>

      {/* Error Summary */}
      {hasErrors && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 pt-6"
        >
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 dark:text-red-300 font-semibold">
                  Please fix the following errors:
                </h3>
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                  {Object.keys(errors).length} field{Object.keys(errors).length > 1 ? "s" : ""} need
                  your attention
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Background Media */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-600/20 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                  <LuImage className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Background Media
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Configure background image and video settings
                  </p>
                </div>
              </div>

              <div className="grid gap-6">
                <InputField
                  value={formData.backgroundImageUrl}
                  onChange={handleInputChange}
                  fieldName="backgroundImageUrl"
                  icon={LuImage}
                   placeholder={`https://example.com/image.jpg`}
                  error={errors.backgroundImageUrl}
                />

                <InputField
                  value={formData.backgroundVideoUrl}
                  onChange={handleInputChange}
                  fieldName="backgroundVideoUrl"
                  icon={LuVideo}
                 placeholder={`https://example.com/background.mp4`}
                  error={errors.backgroundVideoUrl}
                />
              </div>
            </motion.div>

            {/* Slide 1 Section */}
            <SlideSection
              formData={{
                slideImageUrl: formData.slideImageUrl,
                slideTitle: formData.slideTitle,
                slideSubtitle: formData.slideSubtitle,
                slideDescription: formData.slideDescription,
                slideTitleBangla: formData.slideTitleBangla,
                slideSubtitleBangla: formData.slideSubtitleBangla,
                slideDescriptionBangla: formData.slideDescriptionBangla,
                layout: formData.layout,
                // category: formData.category,
              }}

              onInputChange={handleInputChange}
              errors={{
                layout: errors.layout,
                // category: errors.category,
                slideImageUrl: errors.slideImageUrl,
                slideTitle: errors.slideTitle,
                slideSubtitle: errors.slideSubtitle,
                slideDescription: errors.slideDescription,
                slideTitleBangla: errors.slideTitleBangla,
                slideSubtitleBangla: errors.slideSubtitleBangla,
                slideDescriptionBangla: errors.slideDescriptionBangla,
              }}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex justify-center pt-8"
          >

            <button
              type="submit"
              className="group relative inline-flex items-center justify-center gap-4 px-16 py-5 bg-white dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 font-semibold text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700/80 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-400"
            >



              {/* Button Text */}
              <span className="text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                update slider
              </span>



              {/* Subtle Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-blue-50/50 dark:from-blue-500/0 dark:via-purple-500/0 dark:to-blue-500/0 dark:group-hover:from-blue-500/10 dark:group-hover:via-purple-500/5 dark:group-hover:to-blue-500/10 rounded-2xl transition-all duration-300 -z-10"></div>
            </button>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default UpdateBanner;
