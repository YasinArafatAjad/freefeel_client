import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import useLanguage from "../../../../hooks/useLanguage/useLanguage";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BlurText from "../../../../animation/BlurText";
import { motion } from 'framer-motion';

const PopularCategories = () => {
  const axiosPublic = useAxiosPublic();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const { isPending: isPopularCategoriesLoading, data: popularCategories = [] } = useQuery({
    queryKey: [language, "language"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popularCategories", {
        params: { language, categoryStatus: "Public" },
      });

      return res?.data && res?.data?.data;
    },
  });
  // console.log(popularCategories);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    breakpoints: {
      "(min-width: 390px)": {
        slides: { perView: 3, spacing: 8 },
      },
      "(min-width: 601px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 6, spacing: 12 },
      },
      "(min-width: 1536px)": {
        slides: { perView: 6, spacing: 20 },
      },
    },
  });

  if (isPopularCategoriesLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="bg-light dark:bg-dark text-light dark:text-dark mt-8">
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 pb-5 lg:pb-10">
        
        {/* <div className="tittle flex justify-center items-center gap-5 mb-8">
          {/* line0" /> /}
          <motion.div 
            className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
          <BlurText
            text={t("popularCategoriesHome.title")}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-xl md:text-2xl lg:text-3xl font-bold"
          />
          {/* line0 " /> *}
          <motion.div 
            className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
        </div> */}
        
        <div className="relative w-full h-full">
          {popularCategories?.length > 0 ? (
            <div ref={sliderRef} className="keen-slider py-3 flex items-center justify-center">
              {popularCategories?.map((category) => (
                <Link
                  key={category?._id}
                  to={`/category/${category?.categoryUrl}`}
                  className="keen-slider__slide categorieItem bg-white dark:bg-black rounded w-full h-full relative"
                >
                  <LazyLoadImage
                    src={category?.imageUrl}
                    effect="blur"
                    className="w-full h-[150px] lg:h-[250px] object-cover object-center mx-auto rounded-t"
                    alt={category?.category}
                  />

                  <p className="font-dynamic text-[15px] font-medium text-center lg:pt-1.5">{category?.category}</p>
                  <p className="font-dynamic text-[15px] font-medium text-center pb-1 lg:pb-1.5 text-gray-500 dark:text-gray-500">
                    {category?.productCount} {t("popularCategoriesHome.items")}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <p className="font-primary text-[15px] font-medium text-center">
                We are sorry, but there are no categories available at the moment!
              </p>
            </div>
          )}

          <div
            className={`${popularCategories?.length > 3 ? "block" : "hidden"} ${popularCategories?.length > 4 ? "lg:block" : "lg:hidden"
              } ${popularCategories?.length > 6 ? "2xl:block" : "2xl:hidden"}`}
          >
            <button
              onClick={() => slider.current?.prev()}
              className="absolute top-[40%] left-0 py-1 px-0.5 bg-black dark:bg-black border border-black dark:border-black hover:bg-transparent dark:hover:bg-transparent text-white hover:text-black dark:hover:text-white transition-colors duration-300 rounded-r"
            >
              <MdOutlineArrowBackIosNew size={15}></MdOutlineArrowBackIosNew>
            </button>

            <button
              onClick={() => slider.current?.next()}
              className="absolute top-[40%] right-0 py-1 px-0.5 bg-black dark:bg-black border border-black dark:border-black hover:bg-transparent dark:hover:bg-transparent text-white hover:text-black dark:hover:text-white transition-colors duration-300 rounded-l"
            >
              <MdArrowForwardIos size={15}></MdArrowForwardIos>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
