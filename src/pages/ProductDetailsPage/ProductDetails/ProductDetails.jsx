import ProductDetailsImagesSlide from "../ProductDetailsImagesSlide/ProductDetailsImagesSlide";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ImMinus, ImPlus } from "react-icons/im";
import { MdArrowBackIos } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import useLanguage from "../../../hooks/useLanguage/useLanguage";
import { useContext, useEffect, useState } from "react";
import RelatedProducts from "../../RelatedProducts/RelatedProducts";
import Loader from "../../../components/Loader/Loader";
import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
import { CartContext } from "../../../providers/CartProvider/CartProvider";
import { Helmet } from "react-helmet-async";

import CustomerReview from "../CustomerReview/CustomerReview";
import PostReview from "../PostReview/PostReview";
import BlurText from "../../../animation/BlurText";
import DecryptedText from "../../../animation/DecryptedText";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const [isActiveTab, setIsActiveTab] = useState("Product Details");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { url } = useParams();
  const axiosPublic = useAxiosPublic();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { handleAddToCart } = useContext(CartContext);

  // Fetch Single product data
  const { isPending: isProductLoading, data: product = {} } = useQuery({
    queryKey: ["product", url, language],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getProductByUrl/${url}`, {
        params: { language },
      });

      return res?.data && res?.data?.data;
    },
    refetchOnWindowFocus: true,
  });

  // console.log(product);

  // Set default selected color & size when the product colors and sizes are available
  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]); // Set the first color as default
    }
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]); // Set the first size as default
    }
  }, [product]);

  const category = product?.category;

  const selectedProduct = {
    _id: product?._id,
    title: product?.title,
    regularPrice: product?.regularPrice,
    discountPercentage: product?.discountPercentage,
    thumbnail: product?.thumbnail,
    productUrl: product?.productUrl,
    styleNumber: product?.styleNumber,
    category: product?.category,
    deliveryStatus: product?.deliveryStatus,
    selectedQuantity,
    selectedColor,
    selectedSize,
  };

  // Calculate the discount amount: (regularPrice * discountPercentage) / 100
  function calculateDiscountedPrice(regularPrice, discountPercentage) {
    if (
      regularPrice < 0 ||
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      throw new Error(
        "Invalid input: prices must be positive and discount percentage between 0 and 100."
      );
    }

    const discountAmount = (regularPrice * discountPercentage) / 100;
    const discountedPrice = regularPrice - discountAmount;
    return discountedPrice;
  }

  // This function for giving actual space
  const renderDetails = (description) => {
    return (
      <ul className="list-none">
        {description?.split("\n").map((paragraph, index) => {
          const parts = paragraph.split(":");
          return (
            <li key={index} className="py-1">
              <div>
                {parts?.length > 1 ? (
                  <>
                    <span className="font-dynamic text-[15px] font-bold">
                      {parts[0]}:
                    </span>
                    <span className="font-dynamic text-[15px] font-medium ">
                      {parts?.slice(1).join(":")}
                    </span>
                  </>
                ) : (
                  <>
                    {/* <span className="font-dynamic text-[15px] font-medium ">
                    {paragraph}
                  </span> */}
                    <DecryptedText
                      text={paragraph}
                      speed={100}
                      maxIterations={20}
                      characters="ABCD1234!?"
                      className="revealed font-dynamic text-[15px] font-medium"
                      parentClassName="all-letters"
                      encryptedClassName="encrypted"
                      animateOn="view"
                    />
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const productLink = `https://freefeel.aminulislamemon.com/product-details/${product?.productUrl}`;

  if (isProductLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  const crumbs = [
    {
      path: "/",
      label: "Home",
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
      label: product?.stockStatus,
    },
  ];

  // console.log("Product Details Page Rendered", product);
  return (
    <div className="bg-light dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | {product?.metaTitle || product?.title}</title>
        <link rel="canonical" href={productLink} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content={product?.metaDescription || product?.description}
        />
        <meta
          name="keywords"
          content={product?.metaFocusKeywords || "FreeFeel"}
        />

        {/* Open Graph (OG) Tags */}
        <meta
          property="og:title"
          content={product?.metaTitle || product?.title}
        />
        <meta
          property="og:description"
          content={product?.metaDescription || product?.description}
        />
        <meta property="og:image" content={product?.thumbnail} />
        <meta property="og:url" content={productLink} />

        {/*  Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={product?.metaTitle || product?.title}
        />
        <meta
          name="twitter:description"
          content={product?.metaDescription || product?.description}
        />
        <meta name="twitter:image" content={product?.thumbnail} />
      </Helmet>

      <div className="w-full h-full lg:max-w-[1000px] 2xl:max-w-[1200px] lg:mx-auto px-2.5 md:px-3.5 lg:px-0 2xl:px-14 py-2.5 md:py-3.5 lg:py-5 2xl:py-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 lg:gap-8 2xl:gap-10">
          <div className="w-full relative order-2 lg:order-1 z-30">
            {/* Product Images */}
            <ProductDetailsImagesSlide
              product={product}
            ></ProductDetailsImagesSlide>
          </div>

          {/* Desktop Product Details */}
          <div className="w-full relative lg:block order-3 lg:order-2 z-20">
            <div className="hidden lg:block">
              {/* Product Details */}
              {/* <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-3.5 md:mb-5 lg:mb-5 2xl:mb-8">
                {product?.title}
              </h1> */}
              <div className="flex justify-center items-center md:max-w-[640px] mx-auto ">
                <BlurText
                  text={product?.title}
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-3.5 md:mb-5 lg:mb-5 2xl:mb-8"
                />
              </div>

              {/* Price Part */}
              <div className="flex justify-between items-center gap-2 mb-3.5 md:mb-5 lg:mb-5 2xl:mb-8">
                {/* <div className="flex-grow border border-gray-800 dark:border-gray-500 mt-1.5"></div> */}
                <motion.div
                  className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                />
                <div className="flex-grow-0">
                  <h3 className="font-primary text-2xl md:text-3xl lg:text-4xl font-bold flex">
                    <span>
                      {calculateDiscountedPrice(
                        product?.regularPrice,
                        product?.discountPercentage
                      )}{" "}
                    </span>
                    <span>/-</span>
                  </h3>
                </div>
                <motion.div
                  className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
                  initial={{ x: "100%", opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                />
                {/* <div className="flex-grow border border-gray-800 dark:border-gray-500 mt-1.5"></div> */}
              </div>
            </div>

            {/* Select Size & Color */}
            {(product?.sizes?.length > 0 || product?.colors?.length > 0) && (
              <div className="h-10 lg:h-12 border-2 border-black dark:border-black mb-2.5 flex justify-center items-center">
                {product?.sizes?.length > 0 && (
                  <div className="w-full relative h-full border-r-2 border-black dark:border-black flex justify-center items-center">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full h-full bg-light dark:bg-dark appearance-none focus:outline-none pl-2.5"
                    >
                      {product?.sizes?.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>

                    <div className="absolute right-0 h-full w-10 pointer-events-none bg-black flex justify-center items-center">
                      <MdArrowBackIos
                        size={20}
                        className="-rotate-90 text-white mb-2"
                      ></MdArrowBackIos>
                    </div>
                  </div>
                )}

                {product?.colors?.length > 0 && (
                  <div className="w-full relative h-full flex justify-center items-center">
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full h-full bg-light dark:bg-dark appearance-none focus:outline-none pl-2.5"
                    >
                      {product?.colors?.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>

                    <div className="absolute right-0 h-full w-10 pointer-events-none bg-black flex justify-center items-center">
                      <MdArrowBackIos
                        size={20}
                        className="-rotate-90 text-white mb-2"
                      ></MdArrowBackIos>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Select Product Quantity & Add To Cart button */}

            <div className="h-10 lg:h-12 border-2 border-black dark:border-black mb-2.5 flex justify-center items-center">
              <div className="w-1/2 h-full border-r-2 border-black dark:border-black px-2.5 flex justify-between items-center">
                <button
                  onClick={() => setSelectedQuantity(selectedQuantity - 1)}
                  disabled={selectedQuantity === 1}
                >
                  <ImMinus size={15}></ImMinus>
                </button>

                <span className="font-primary font-medium text-lg">
                  {selectedQuantity}
                </span>
                <button
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  disabled={selectedQuantity >= product?.quantity}
                >
                  <ImPlus size={15}></ImPlus>
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="w-1/2 h-full font-dynamic text-[15px] font-medium hover:bg-black dark:hover:bg-black hover:text-white dark:hover:text-white transition-colors duration-300"
              >
                {t("productDetails.addToCart")}
              </button>
            </div>

            {/* Order Now Link */}
            {product?.stockStatus !== "Out Of Stock" &&
            product?.quantity > 0 ? (
              <Link
                to="/checkout"
                state={{ data: [selectedProduct] }}
                className="w-full h-10 lg:h-12 bg-black dark:bg-black text-white dark:text-white hover:bg-green-500 hover:text-black dark:hover:bg-green-400  dark:hover:text-white transition-colors duration-300 border-2 border-black rounded flex justify-center items-center font-dynamic text-xl font-semibold mb-3.5 md:mb-5 lg:mb-5 2xl:mb-8"
              >
                {t("productDetails.orderNowLink")}
              </Link>
            ) : (
              <p className="w-full h-10 lg:h-12 bg-red-500 dark:bg-red-500 text-white dark:text-white flex justify-center items-center font-dynamic text-xl font-semibold mb-3.5 md:mb-5 lg:mb-5 2xl:mb-8 capitalize">
                this product is currently out of stock now
              </p>
            )}

            {/* Customer Review, Product Details, Product Description, Size Guideline tabs */}
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  setIsActiveTab(
                    isActiveTab === "Product Details" ? null : "Product Details"
                  )
                }
                className={
                  isActiveTab === "Product Details"
                    ? "text-[12px] md:text-[15px] font-medium pb-1 border-b-2 border-red-500 -mb-0.5 transition-colors duration-300"
                    : "text-[12px] md:text-[15px] font-medium pb-1 border-b-2 border-black hover:border-red-500 -mb-0.5 transition-colors duration-300"
                }
              >
                {t("productDetails.productDetails")}
              </button>

              <button
                onClick={() =>
                  setIsActiveTab(
                    isActiveTab === "Product Description"
                      ? null
                      : "Product Description"
                  )
                }
                className={
                  isActiveTab === "Product Description"
                    ? "text-[12px] md:text-[15px] font-medium pb-1 border-b-2 border-red-500 -mb-0.5 transition-colors duration-300"
                    : "text-[12px] md:text-[15px] font-medium pb-1 border-b-2 border-black hover:border-red-500 -mb-0.5 transition-colors duration-300"
                }
              >
                {t("productDetails.productDescription")}
              </button>

              <button
                onClick={() =>
                  setIsActiveTab(
                    isActiveTab === "Customer Review" ? null : "Customer Review"
                  )
                }
                className={
                  isActiveTab === "Customer Review"
                    ? "text-[12px] md:text-[15px] font-medium pb-1 border-b-2 border-red-500 -mb-0.5 transition-colors duration-300"
                    : "text-[12px] md:text-[15px] font-medium pb-1 border-b-2 border-black hover:border-red-500 -mb-0.5 transition-colors duration-300"
                }
              >
                {t("productDetails.customerReview")}
              </button>

              <button
                onClick={() =>
                  setIsActiveTab(
                    isActiveTab === "Size Guideline" ? null : "Size Guideline"
                  )
                }
                className={
                  isActiveTab === "Size Guideline"
                    ? "text-[12px] md:text-[15px] font-medium pb-1 border-b-2 border-red-500 -mb-0.5 transition-colors duration-300"
                    : "text-[12px] md:text-[15px] font-medium pb-1 border-b-2 border-black hover:border-red-500 -mb-0.5 transition-colors duration-300"
                }
              >
                {t("productDetails.sizeGuideline")}
              </button>
            </div>

            {/* Tab details */}
            <div className="w-full h-auto bg-white dark:bg-gray-800 my-5 rounded">
              {isActiveTab === "Customer Review" && (
                <div className="py-5 px-2.5">
                  <CustomerReview product={product}></CustomerReview>

                  <PostReview id={product?._id}></PostReview>

                  <p className="font-dynamic text-[15px] font-normal text-center pt-5">
                    {t("productDetails.productReviewBenefitMessage")}
                  </p>
                </div>
              )}
              {isActiveTab === "Product Details" && (
                <div className="p-2.5">
                  {product?.details ? (
                    <div>{renderDetails(product?.details)}</div>
                  ) : (
                    <p className="text-[15px] font-primary font-medium text-center">
                      Sorry! No data found!
                    </p>
                  )}
                </div>
              )}
              {isActiveTab === "Product Description" && (
                <div className="p-2.5">
                  {product?.description ? (
                    <>
                      {/* <p className="text-[15px] font-dynamic font-medium leading-8">{product?.description}</p> */}

                      <DecryptedText
                        text={product?.description}
                        speed={100}
                        maxIterations={20}
                        characters="ABCD1234!?"
                        className="revealed text-[15px] font-dynamic font-medium leading-8"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                        animateOn="view"
                      />
                    </>
                  ) : (
                    <p className="text-[15px] font-primary font-medium text-center">
                      Sorry! No data found!
                    </p>
                  )}
                </div>
              )}
              {isActiveTab === "Size Guideline" && (
                <div className="p-2.5">
                  {product?.sizeGuidelines ? (
                    <p className="text-[15px] font-dynamic font-medium leading-8">
                      {product?.sizeGuidelines}
                    </p>
                  ) : (
                    <p className="text-[15px] font-primary font-medium text-center">
                      Sorry! No data found!
                    </p>
                  )}
                  {/* {product?.sizeGuideline ? (
                    <img src={product?.sizeGuideline} className="w-full h-full rounded object-cover" alt="Size Guideline" />
                  ) : (
                    <p className="text-[15px] font-primary font-medium text-center">Sorry! No data found!</p>
                  )} */}
                </div>
              )}
            </div>

            {/* Share social media */}
            <div className="flex justify-start items-center gap-2.5">
              <h3 className="text-nowrap font-dynamic text-base lg:text-lg font-medium">
                {t("productDetails.shareNow")}:
              </h3>

              {/* Social media for icon for large devices */}
              <div className="w-full hidden lg:flex justify-around items-center gap-2.5">
                <FacebookShareButton
                  url={productLink}
                  hashtag="#FreeFeel #E-commerce"
                >
                  <FacebookIcon size={30} round={true} />
                </FacebookShareButton>

                <FacebookMessengerShareButton
                  url={productLink}
                  appId="7368381016619903"
                >
                  <FacebookMessengerIcon size={30} round={true} />
                </FacebookMessengerShareButton>

                <WhatsappShareButton
                  url={productLink}
                  title={`Check out this amazing product: ${product?.title}!`}
                  separator=" - "
                >
                  <WhatsappIcon size={30} round={true} />
                </WhatsappShareButton>

                <TelegramShareButton
                  url={productLink}
                  title={`Discover this great product: ${product?.title}!`}
                >
                  <TelegramIcon size={30} round={true} />
                </TelegramShareButton>

                <ViberShareButton
                  url={productLink}
                  title={`Amazing deal: ${product?.title}!`}
                  separator=" | "
                >
                  <ViberIcon size={30} round={true} />
                </ViberShareButton>

                <TwitterShareButton
                  url={productLink}
                  title={`Don't miss out on ${product?.title}!`}
                  hashtag="#FreeFeel #E-commerce"
                >
                  <TwitterIcon size={30} round={true} />
                </TwitterShareButton>
              </div>

              {/* Social media for icon for small devices */}
              <div className="w-full flex justify-around items-center lg:hidden gap-2.5">
                <FacebookShareButton
                  url={productLink}
                  hashtag="#FreeFeel #E-commerce"
                >
                  <FacebookIcon size={20} round={true} />
                </FacebookShareButton>

                <FacebookMessengerShareButton
                  url={productLink}
                  appId="7368381016619903"
                >
                  <FacebookMessengerIcon size={20} round={true} />
                </FacebookMessengerShareButton>

                <WhatsappShareButton
                  url={productLink}
                  title={`Check out this amazing product: ${product?.title}!`}
                  separator=" - "
                >
                  <WhatsappIcon size={20} round={true} />
                </WhatsappShareButton>

                <TelegramShareButton
                  url={productLink}
                  title={`Discover this great product: ${product?.title}!`}
                >
                  <TelegramIcon size={20} round={true} />
                </TelegramShareButton>

                <ViberShareButton
                  url={productLink}
                  title={`Amazing deal: ${product?.title}!`}
                  separator=" | "
                >
                  <ViberIcon size={20} round={true} />
                </ViberShareButton>

                <TwitterShareButton
                  url={productLink}
                  title={`Don't miss out on ${product?.title}!`}
                  hashtag="#FreeFeel #E-commerce"
                >
                  <TwitterIcon size={20} round={true} />
                </TwitterShareButton>
              </div>
            </div>
          </div>

          {/* Mobile Product Details - 1 */}
          <div className="w-full relative order-1 lg:hidden">
            <div>
              <Breadcrumb crumbs={crumbs}></Breadcrumb>
            </div>

            {/* Product Details - Mobile */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center my-5">
              {product?.title}
            </h1>

            {/* Price Part - Mobile */}
            <div className="flex justify-between items-center gap-2">
              <motion.div
                className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
                initial={{ x: "-100%", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              />
              <div className="flex-grow-0">
                <h3 className="font-primary text-xl md:text-2xl lg:text-3xl font-extrabold flex">
                  <span>
                    {calculateDiscountedPrice(
                    product?.regularPrice,
                    product?.discountPercentage
                  )}{" "}
                  </span>
                  <span>/-</span>
                </h3>
              </div>
              <motion.div
                className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
                initial={{ x: "100%", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full relative">
        <RelatedProducts selectedCategory={category}></RelatedProducts>
      </div>
    </div>
  );
};

export default ProductDetails;
