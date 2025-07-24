import { useQuery } from "@tanstack/react-query";
import "keen-slider/keen-slider.min.css";
import useLanguage from "../../hooks/useLanguage/useLanguage";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import Loader from "../../components/Loader/Loader";
import ProductCardTwo from "../ProductCards/ProductCardTwo/ProductCardTwo";
import { useState } from "react";
 
const RelatedProducts = ({ selectedCategory }) => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic();
  const [visibleProducts, setVisibleProducts] = useState(8);

  //   Fetch products by category using category url
  const { isLoading: isRelatedCategoryProductsLoading, data: productsByRelatedCategory = [] } = useQuery({
    queryKey: ["productsByRelatedCategory", selectedCategory, language],
    queryFn: async () => {
      const res = await axiosPublic.get("/products", {
        params: { selectedCategory, language, visibility: "Public" },
      });
      return res?.data && res?.data?.data;
    },
  });

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  const handleScrollToTop = () => {
    setVisibleProducts(8);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isRelatedCategoryProductsLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 py-2.5 md:py-5 lg:py-10 2xl:py-12 text-light dark:text-dark">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5 lg:mb-10">
          {t("relatedProducts.relatedProducts")}
        </h1>

        <div className="relative w-full h-full">
          {productsByRelatedCategory?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3 lg:gap-4 2xl:gap-5">
              {productsByRelatedCategory?.slice(0, visibleProducts).map((product, index) => (
                <div key={product?._id} className="keen-slider__slide">
                  <ProductCardTwo product={product} index={index} ></ProductCardTwo>
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
            {visibleProducts < productsByRelatedCategory?.length && (
              <button
                onClick={handleLoadMore}
                className="w-auto h-auto px-2.5 md:px-3.5 lg:px-5 2xl:px-6 py-1.5 md:py-2.5 lg:py-2.5 2xl:py-3 rounded bg-black dark:bg-black text-base text-white dark:text-white mt-5 lg:mt-10"
              >
                {t("allProductsHome.showMoreProducts")}
              </button>
            )}

            {productsByRelatedCategory?.length > 8 && visibleProducts >= productsByRelatedCategory.length && (
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

export default RelatedProducts;
