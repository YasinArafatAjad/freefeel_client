import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import "keen-slider/keen-slider.min.css";
import useLanguage from "../../hooks/useLanguage/useLanguage";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import ProductCardTwo from "../ProductCards/ProductCardTwo/ProductCardTwo";
import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import CategoryBreadcrumb from "../../components/CategoryBreadcrumb/CategoryBreadcrumb";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import BlurText from "../../animation/BlurText";
import { motion } from 'framer-motion';


const ProductsByCategory = () => {
  const { categoryUrl } = useParams();
  const { language } = useLanguage();
  const axiosPublic = useAxiosPublic();
  const [selectedSort, setSelectedSort] = useState("default");
  const [productType, setProductType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const [visibleProducts, setVisibleProducts] = useState(8);

  const handleSortChange = (type) => {
    setSelectedSort(type);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleProductTypeChange = (type) => {
    setProductType(type);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  //   Fetch products by category using category url
  const {
    isLoading: isCategoryProductsLoading,
    data: productsByCategory = [],
  } = useQuery({
    queryKey: [
      "productsByCategory",
      categoryUrl,
      language,
      selectedSort,
      productType,
    ],
    queryFn: async () => {
      const res = await axiosPublic.get("/products", {
        params: {
          categoryUrl,
          language,
          selectedSort,
          productType,
          visibility: "Public",
        },
      });
      return res?.data && res?.data?.data;
    },
  });

  //   Fetch products by category url
  const { isLoading: isCategoryLoading, data: category = {} } = useQuery({
    queryKey: ["category", categoryUrl, language],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/getCategoryByCategoryUrl/${categoryUrl}`,
        {
          params: { categoryUrl, language },
        }
      );
      return res?.data && res?.data?.data;
    },
  });

  // console.log(category);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  const handleScrollToTop = () => {
    setVisibleProducts(8);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const crumbs = [
    {
      path: "/",
      label: t("productsByCategory.home"),
    },
    {
      path: "location",
      label: category?.category,
    },
  ];

  if (isCategoryProductsLoading || isCategoryLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | {category?.category}</title>
        <meta
          name="description"
          content={`Discover the best products in the ${category?.category} category at FreeFeel. Browse a wide selection of high-quality items available for purchase. Shop now!`}
        />
      </Helmet>

      <>
        {category?.offer && (
          <h3 className="text-[15px] font-dynamic font-medium text-center w-full py-2.5 bg-black dark:bg-gray-800 text-white dark:text-white">
            {category?.offer}
          </h3>
        )}
      </>

      <div className="relative w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 py-2.5 md:py-3.5 lg:py-5 2xl:py-10">
        <div className="flex justify-between items-center pb-2.5 md:pb-3.5 lg:pb-5 2xl:pb-10">
          <div className="flex justify-start items-center z-30">
            <CategoryBreadcrumb crumbs={crumbs}></CategoryBreadcrumb>
          </div>

          <div className="tittle w-full px-4 flex justify-center items-center gap-5 z-20">
            <motion.div
              className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
            <BlurText
              text={category?.category}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-xl md:text-2xl lg:text-3xl font-bold"
            />
            <motion.div
              className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
              initial={{ x: "100%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </div>

          <div className="flex justify-end items-center z-30">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-end rounded-md"
            >
              <PiSlidersHorizontalFill className="mr-0.5 lg:mr-1 text-black dark:text-white" />
              <span className="w-max text-sm md:text-[15px] font-dynamic font-medium">
                {t("productsByCategory.filtersAndSort")}
              </span>
            </button>
          </div>
        </div>

        <div className="absolute top-14 right-0 z-[55]">
          {isDropdownOpen && (
            <div className="relative bg-white dark:bg-black shadow-lg rounded-md w-44 h-full py-1.5">
              <button
                onClick={() => handleSortChange("default")}
                className="w-full h-full text-start text-[15px] font-dynamic font-medium hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer px-5 py-1.5"
              >
                {t("productsByCategory.default")}
              </button>

              <button
                onClick={() => handleSortChange("price-high-to-low")}
                className="w-full h-full text-start text-[15px] font-dynamic font-medium hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer px-5 py-1.5"
              >
                {t("productsByCategory.priceHighToLow")}
              </button>

              <button
                onClick={() => handleSortChange("price-low-to-high")}
                className="w-full h-full text-start text-[15px] font-dynamic font-medium hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer px-5 py-1.5"
              >
                {t("productsByCategory.priceLowToHigh")}
              </button>

              <button
                onClick={() => handleProductTypeChange("New Arrivals")}
                className="w-full h-full text-start text-[15px] font-dynamic font-medium hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer px-5 py-1.5"
              >
                {t("productsByCategory.newArrivals")}
              </button>

              <button
                onClick={() => handleProductTypeChange("Most Popular")}
                className="w-full h-full text-start text-[15px] font-dynamic font-medium hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer px-5 py-1.5"
              >
                {t("productsByCategory.mostPopular")}
              </button>
            </div>
          )}
        </div>

        <div className="relative w-full h-full">
          {productsByCategory?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3 lg:gap-4 2xl:gap-5">
              {productsByCategory
                ?.slice(0, visibleProducts)
                .map((product, index) => (
                  <div key={product?._id} className="keen-slider__slide">
                    <ProductCardTwo
                      product={product}
                      index={index}
                    ></ProductCardTwo>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <p className="font-primary text-[15px] font-medium text-center">
                We are sorry, but there are no products available at the moment!
              </p>
            </div>
          )}

          <div className="flex justify-center items-center">
            {visibleProducts < productsByCategory?.length && (
              <button
                onClick={handleLoadMore}
                className="w-auto h-auto px-2.5 md:px-3.5 lg:px-5 2xl:px-6 py-1.5 md:py-2.5 lg:py-2.5 2xl:py-3 rounded bg-black dark:bg-black text-base text-white dark:text-white mt-5 lg:mt-10"
              >
                {t("allProductsHome.showMoreProducts")}
              </button>
            )}

            {productsByCategory?.length > 8 &&
              visibleProducts >= productsByCategory.length && (
                <button
                  onClick={handleScrollToTop}
                  className="w-auto h-auto px-2.5 md:px-3.5 lg:px-5 2xl:px-6 py-1.5 md:py-2.5 lg:py-2.5 2xl:py-3 rounded bg-black dark:bg-black text-base text-white dark:text-white mt-5 lg:mt-10"
                >
                  {t("allProductsHome.seePreviousProducts")}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
