import { useState } from "react";
import ProductCardTwo from "../../../ProductCards/ProductCardTwo/ProductCardTwo";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import useLanguage from "../../../../hooks/useLanguage/useLanguage";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import { SlideUp } from "../../../../animation/animation";
import BlurText from "../../../../animation/BlurText";
import { motion } from 'framer-motion';

const AllProducts = () => {
  
  const [visibleProducts, setVisibleProducts] = useState(8);
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic();
  const { language } = useLanguage();

  //   Fetch products by Product Type = Most Popular
  const { isLoading: isAllProductsLoading, data: allProducts = [] } = useQuery({
    queryKey: ["allProducts", language],
    queryFn: async () => {
      const res = await axiosPublic.get("/products", {
        params: { language, visibility: "Public" },
      });
      return res?.data && res?.data?.data;
    },
  });
  // console.log(allProducts);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };

  const handleScrollToTop = () => {
    setVisibleProducts(8);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isAllProductsLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div
      id="all-Products"
      className="bg-light dark:bg-dark text-light dark:text-dark"
    >
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 pb-5 lg:pb-10 ">
       
        <div className="tittle flex justify-center items-center gap-5 mb-8">
          {/* line0" /> */}
          <motion.div 
            className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
          <BlurText
            text={t("allProductsHome.title")}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-xl md:text-2xl lg:text-3xl font-bold"
          />
          {/* line0" /> */}
          <motion.div 
            className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        <div className="relative w-full h-full">
          {allProducts?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3 lg:gap-4 2xl:gap-5">
              {allProducts?.slice(0, visibleProducts).map((product, index) => (
                <div key={product?._id} className="keen-slider__slide flex items-center justify-center">
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

          <motion.div
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            className="flex justify-center items-center"
          >
            {visibleProducts < allProducts?.length && (
              <button
                onClick={handleLoadMore}
                className="w-auto h-auto px-2.5 md:px-3.5 lg:px-5 2xl:px-6 py-1.5 md:py-2.5 lg:py-2.5 2xl:py-3 rounded bg-black dark:bg-black text-base text-white dark:text-white mt-5 lg:mt-10"
              >
                {t("allProductsHome.showMoreProducts")}
              </button>
            )}

            {allProducts?.length > 8 &&
              visibleProducts >= allProducts.length && (
                <button
                  onClick={handleScrollToTop}
                  className="w-auto h-auto px-2.5 md:px-3.5 lg:px-5 2xl:px-6 py-1.5 md:py-2.5 lg:py-2.5 2xl:py-3 rounded bg-black dark:bg-black text-base text-white dark:text-white mt-5 lg:mt-10"
                >
                  {t("allProductsHome.seePreviousProducts")}
                </button>
              )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
