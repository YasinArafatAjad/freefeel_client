import { MdArrowForwardIos, MdOutlineArrowBackIosNew, MdOutlineClose } from "react-icons/md";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { Link } from "react-router-dom";
import ProductCardThree from "../../../ProductCards/ProductCardThree/ProductCardThree";

const SavedProductsList = () => {
  const { t } = useTranslation();
  const [cartProducts, setCartProducts] = useState([]);

  // Fetch products from localStorage when the component mounts
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("FreeFeel")) || [];
    setCartProducts(storedProducts);
  }, []);

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
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 1536px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
    slides: { perView: 1 },
  });

  return (
    <div className="px-2.5 md:px-3 lg:px-4 2xl:px-5 py-5 relative w-full h-screen">
      {/* Back Icon */}
      <Link to="/dashboard/profile" className="absolute right-2.5 top-2.5">
        <MdOutlineClose size={24} className="text-red-500"></MdOutlineClose>
      </Link>

      <h1 className="text-2xl font-bold text-center font-dynamic mb-5 lg:mb-7 2xl:mb-10">
        {t("customerDashboard.savedProductsList")}
      </h1>

      <div className="relative w-full h-full">
        {cartProducts?.length > 0 ? (
          <div ref={sliderRef} className="keen-slider">
            {cartProducts?.map((product, index) => (
              <div key={product?._id} className="keen-slider__slide">
                <ProductCardThree product={product} index={index}></ProductCardThree>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>We are sorry, but there are no products available at the moment!</p>
          </div>
        )}

        <div
          className={`${cartProducts?.length > 2 ? "block" : "hidden"} ${
            cartProducts.length > 3 ? "lg:block" : "lg:hidden"
          } ${cartProducts?.length > 4 ? "2xl:block" : "2xl:hidden"}`}
        >
          <button
            onClick={() => slider.current?.prev()}
            className="absolute top-[113px] md:top-[168px] lg:top-[232px] 2xl:top-[197px] left-0 py-1 px-0.5 bg-black bg-opacity-50 hover:bg-opacity-75 dark:bg-black dark:bg-opacity-50 dark:hover:bg-opacity-75 transition-colors duration-300 rounded-r"
          >
            <MdOutlineArrowBackIosNew className="text-lg md:text-xl lg:text-2xl text-white"></MdOutlineArrowBackIosNew>
          </button>

          <button
            onClick={() => slider.current?.next()}
            className="absolute top-[113px] md:top-[168px] lg:top-[232px] 2xl:top-[197px] right-0 py-1 px-0.5 bg-black bg-opacity-50 hover:bg-opacity-75 dark:bg-black dark:bg-opacity-50 dark:hover:bg-opacity-75 transition-colors duration-300 rounded-l"
          >
            <MdArrowForwardIos className="text-lg md:text-xl lg:text-2xl text-white"></MdArrowForwardIos>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedProductsList;
