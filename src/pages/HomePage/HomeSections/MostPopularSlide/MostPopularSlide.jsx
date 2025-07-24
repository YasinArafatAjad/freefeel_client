import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCardOne from "../../../ProductCards/ProductCardOne/ProductCardOne";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import useLanguage from "../../../../hooks/useLanguage/useLanguage";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import BlurText from "../../../../animation/BlurText";
import { motion } from 'framer-motion';


const MostPopularSlide = () => {
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic();
  const { language } = useLanguage();

  //   Fetch products by Product Type = Most Popular
  const {
    isLoading: isMostPopularProductsLoading,
    data: mostPopularProducts = [],
  } = useQuery({
    queryKey: ["mostPopularProducts", language],
    queryFn: async () => {
      const res = await axiosPublic.get("/products", {
        params: { language, productType: "Most Popular", visibility: "Public" },
      });
      return res?.data && res?.data?.data;
    },
  });

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    breakpoints: {
      "(min-width: 390px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 601px)": {
        slides: { perView: 3, spacing: 12 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 4, spacing: 16 },
      },
      "(min-width: 1536px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
  });

  if (isMostPopularProductsLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-dark text-light dark:text-dark mt-8">
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 pb-5 lg::pb-10">
        <div className="tittle flex justify-center items-center gap-5 mb-8">
          <motion.div 
            className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
          <BlurText
            text={t("mostPopularSlideHome.title")}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-xl md:text-2xl lg:text-3xl font-bold"
          />
          <motion.div 
            className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        <div className="relative w-full h-full">
          {mostPopularProducts?.length > 0 ? (
            <div
              ref={sliderRef}
              className="keen-slider flex items-center justify-center"
            >
              {mostPopularProducts?.map((product, index) => (
                <div key={product?._id} className="keen-slider__slide">
                  <ProductCardOne
                    product={product}
                    index={index}
                  ></ProductCardOne>
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

          <div
            className={`${
              mostPopularProducts?.length > 2 ? "block" : "hidden"
            } ${mostPopularProducts?.length > 4 ? "lg:block" : "lg:hidden"} ${
              mostPopularProducts?.length > 4 ? "2xl:block" : "2xl:hidden"
            }`}
          >
            <button
              onClick={() => slider.current?.prev()}
              className="absolute top-[113px] md:top-[168px] lg:top-[232px] 2xl:top-[222px] left-0 py-1 px-0.5 bg-black bg-opacity-50 hover:bg-opacity-75 dark:bg-black dark:bg-opacity-50 dark:hover:bg-opacity-75 transition-colors duration-300 rounded-r"
            >
              <MdOutlineArrowBackIosNew className="text-lg md:text-xl lg:text-2xl text-white"></MdOutlineArrowBackIosNew>
            </button>

            <button
              onClick={() => slider.current?.next()}
              className="absolute top-[113px] md:top-[168px] lg:top-[232px] 2xl:top-[222px] right-0 py-1 px-0.5 bg-black bg-opacity-50 hover:bg-opacity-75 dark:bg-black dark:bg-opacity-50 dark:hover:bg-opacity-75 transition-colors duration-300 rounded-l"
            >
              <MdArrowForwardIos className="text-lg md:text-xl lg:text-2xl text-white"></MdArrowForwardIos>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularSlide;
