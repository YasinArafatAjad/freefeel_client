import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import ImageMagnifier from "../../../_components/ImageMagnifier";


const ProductDetailsImagesSlide = ({ product }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(""); // State to track the selected image

  const [sliderRefOne, slider1] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1, spacing: 0 },
  });

  const [sliderRefTwo, slider2] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    breakpoints: {
      "(min-width: 390px)": {
        slides: { perView: 4, spacing: 5 },
      },
      "(min-width: 601px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 1536px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    if (product?.images?.length > 0) {
      // If there are images, set the initial image for the first slider
      slider1.current?.moveToIdx(currentIndex);
    }
  }, [currentIndex, product?.images?.length, slider1]);

  const handleImageSelect = (index) => {
    setCurrentIndex(index); // Update the current index when an image is selected from the second slider
    slider1.current?.moveToIdx(index); // Move the first slider to the selected image
  };


  const crumbs = [
    {
      path: "/",
      label: t("productDetails.home"),
    },
    {
      path: `/category/${product?.categoryEng}`,
      label: product?.categoryEng,
    },
    {
      path: `/product-details/${product?.productUrl}`,
      label: `Code: ${product?.styleNumber}`,
    },
    {
      path: "location",
      label:
        product?.quantity === "0"
          ? "Out Of Stock"
          : product?.quantity === "3"
            ? "Limited Stock"
            : product?.stockStatus,
    },
    {
      path: "location",
      label: product?.stockStatus === "Out Of Stock" ? "0" : product?.quantity
    },
  ];

  return (
    <div className="w-full h-full relative">
      <div className="hidden lg:block mb-5">
        <Breadcrumb crumbs={crumbs}></Breadcrumb>
      </div>

      <div className="relative">
        {product?.images?.length > 0 ? (
          <div ref={sliderRefOne} className="keen-slider w-full">
            {product?.images.map((image, index) => (
              <div key={index} className="keen-slider__slide w-full flex justify-center">
                {/* <LazyLoadImage
                  src={image}
                  alt={product?.name}
                  width={`100%`}
                  effect="blur" // Adds a blur effect while loading
                  className="w-full h-[450px] md:h-[850px] lg:h-[600px] 2xl:h-[750px] object-cover rounded"
                /> */}

                <ImageMagnifier 
                src={image}
                 width={`100%`}
                height={200}
                magnifierHeight={150}
                magnifierWidth={150}
                zoomLevel={2}
                alt="Sample Image"
            />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>We are sorry, but there are no image!</p>
          </div>
        )}

        <div>
          <button
            onClick={() => slider1.current?.prev()}
            className="absolute top-[213px] md:top-[413px] lg:top-[288px] 2xl:top-[363px] left-0 py-1 px-0.5 bg-black bg-opacity-50 hover:bg-opacity-75 dark:bg-black dark:bg-opacity-50 dark:hover:bg-opacity-75 transition-colors duration-300 rounded-r"
          >
            <MdOutlineArrowBackIosNew className="text-xl md:text-xl lg:text-2xl text-white" />
          </button>

          <button
            onClick={() => slider1.current?.next()}
            className="absolute top-[213px] md:top-[413px] lg:top-[288px] 2xl:top-[363px] right-0 py-1 px-0.5 bg-black bg-opacity-50 hover:bg-opacity-75 dark:bg-black dark:bg-opacity-50 dark:hover:bg-opacity-75 transition-colors duration-300 rounded-l"
          >
            <MdArrowForwardIos className="text-xl md:text-xl lg:text-2xl text-white" />
          </button>
        </div>
      </div>

      <div className="relative mt-[5px] lg:mt-[10px]">
        {product?.images?.length > 0 ? (
          <div ref={sliderRefTwo} className="keen-slider w-full">
            {product?.images.map((image, index) => (
              <div key={index} className="keen-slider__slide w-full">
                <LazyLoadImage
                  src={image}
                  alt={product?.name}
                  effect="blur"
                  className={
                    currentIndex === index
                      ? "w-full h-[120px] md:h-[220px] lg:h-[160px] 2xl:h-[180px] object-cover rounded hover:cursor-pointer border border-red-500"
                      : "w-full h-[120px] md:h-[220px] lg:h-[160px] 2xl:h-[180px] object-cover rounded hover:cursor-pointer border border-transparent"
                  }
                  onClick={() => handleImageSelect(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>We are sorry, but there are no image!</p>
          </div>
        )}

        {product?.images?.length > 4 && (
          <div>
            <button
              onClick={() => slider2.current?.prev()}
              className="absolute top-[45px] md:top-[85px] lg:top-[68px] 2xl:top-[75px] left-0 py-1 px-0.5 bg-black bg-opacity-50 hover:bg-opacity-75 dark:bg-black dark:bg-opacity-50 dark:hover:bg-opacity-75 transition-colors duration-300 rounded-r"
            >
              <MdOutlineArrowBackIosNew className="text-xl md:text-lg lg:text-lg text-white" />
            </button>

            <button
              onClick={() => slider2.current?.next()}
              className="absolute top-[45px] md:top-[85px] lg:top-[68px] 2xl:top-[75px] right-0 py-1 px-0.5 bg-black bg-opacity-50 hover:bg-opacity-75 dark:bg-black dark:bg-opacity-50 dark:hover:bg-opacity-75 transition-colors duration-300 rounded-l"
            >
              <MdArrowForwardIos className="text-xl md:text-lg lg:text-lg text-white" />
            </button>
          </div>
        )}
      </div>

      {/* How to order a product video */}
      <Link
        to="https://www.youtube.com/watch?v=FXflfh5jdIc"
        target="_blank"
        className="font-dynamic text-[15px] font-medium text-center bg-gray-200 dark:bg-gray-800 text-light dark:text-dark hover:bg-red-500 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-colors duration-300 w-full h-10 lg:h-12 rounded mt-2.5 flex justify-center items-center"
      >
        {t("productDetails.howToOrder")}
      </Link>
    </div>
  );
};

export default ProductDetailsImagesSlide;
