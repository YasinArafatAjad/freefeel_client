import { IoClose } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { HiOutlineMinusSm } from "react-icons/hi";
import { IoMdArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useWebsiteInfo from "../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { BiSolidPhoneCall } from "react-icons/bi";

import Nagad from "../../assets/paymentOptionImage/Nagad.jpg"; // Assuming you have a nagad 
import Rocket from "../../assets/paymentOptionImage/roket.png"; // Assuming you have a rocket

import BkashPayment from "../../_components/Payment/BkashPayment";

//  image in your assets
const Checkout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [data, setData] = useState(location?.state?.data || []);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [code, setCode] = useState(null);
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const [disableConfirmButton, setDisableConfirmButton] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryArea: "",
    deliveryCharge: 0,
    paymentMethod: "Cash On Delivery",
  });

  useEffect(() => {
    if (data[0].deliveryStatus === "Free Delivery") {
      setDeliveryInfo((prevData) => ({
        ...prevData,
        deliveryArea: "Free Delivery",
      }));
      setDisableConfirmButton(false);
    }
  }, [data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (!data?.codeSmall && !data?.codeLarge) return; // Prevent empty submission
    // Check both fields and set the appropriate code

    if (data?.codeSmall) {
      setCode(data.codeSmall.trim());
    } else if (data?.codeLarge) {
      setCode(data.codeLarge.trim());
    } else {
      setCode(null); // If no value is provided
    }
  };

  // Fetch specific promo code
  const { data: promoPercentage = {}, refetch } = useQuery({
    queryKey: [code, "promoPercentage"],
    enabled: !!code, // Query runs only when code is truthy
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/getPromoCodeByCode/${code}`);

        // Check the status code
        if (res.status === 202) {
          // Show SweetAlert for invalid promo code
          Swal.fire({
            icon: "error",
            title: "Invalid Promo Code!",
            text: res.data.message || "Please check your promo code and try again.",
          });
          reset();
          return {}; // Return an empty object
        }

        // Handle successful response
        return res?.data?.data || {};
      } catch (error) {
        console.error(error);
        // Optionally, show an alert for server errors
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong while validating the promo code.",
        });
        reset();
        return {};
      }
    },
    refetchOnWindowFocus: false, // Optional: Disable refetch on window focus
  });

  useEffect(() => {
    if (code) {
      refetch(); // Fetch only if a promo code is present
    }
  }, [refetch, code]);

  // Handle quantity increase
  const increaseQuantity = (index) => {
    const updatedProducts = [...data];
    updatedProducts[index].selectedQuantity += 1;
    setData(updatedProducts);
  };

  // Handle quantity decrease
  const decreaseQuantity = (index) => {
    const updatedProducts = [...data];
    if (updatedProducts[index].selectedQuantity > 1) {
      updatedProducts[index].selectedQuantity -= 1;
      setData(updatedProducts);
    }
  };

  // Calculate total quantity, total price, and then update products data
  const calculateTotals = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    let mainPrice = 0;
    let priceIncludeQuantity = 0;
    let totalDiscountedPrice = 0;

    const updatedProducts = data?.map((product) => {
      const regularPrice = parseFloat(product?.regularPrice) || 0;
      const selectedQuantity = parseFloat(product?.selectedQuantity) || 0;
      const promoDiscount = parseFloat(promoPercentage?.discountPercentage || 0);
      const productDiscount = parseFloat(product?.discountPercentage || 0);

      let price = regularPrice;

      // Apply product discount first
      const discountedPrice = price * (1 - productDiscount / 100);

      // Check if promo discount is applicable
      const isPromoApplicable = promoPercentage?.categories?.includes(product?.category);

      // Apply promo discount only on the already discounted price
      const finalPricePerUnit = isPromoApplicable ? discountedPrice * (1 - promoDiscount / 100) : discountedPrice;

      // Calculate total price for the selected quantity
      const calculatedPrice = finalPricePerUnit * selectedQuantity;

      // Calculate the promo discount for this product
      const totalPromoForProduct = isPromoApplicable ? selectedQuantity * (discountedPrice - finalPricePerUnit) : 0;

      // Add to totals
      totalQuantity += selectedQuantity;
      totalPrice += calculatedPrice;
      mainPrice = discountedPrice * selectedQuantity;
      priceIncludeQuantity += mainPrice;
      totalDiscountedPrice += totalPromoForProduct;

      // Include additional promo details if applicable
      return {
        ...product,
        mainPrice,
        totalDiscount: isPromoApplicable ? promoDiscount + productDiscount : productDiscount || 0,
        priceIncludeQuantity,
        totalDiscountedPrice,
        calculatedPrice: calculatedPrice.toFixed(2),
        finalPricePerUnit: finalPricePerUnit.toFixed(2),
        promoCode: isPromoApplicable ? promoPercentage.promoCode : null,
        promoDiscountPercentage: isPromoApplicable ? promoPercentage.discountPercentage : null,
      };
    });

    return { updatedProducts, totalQuantity, totalPrice, priceIncludeQuantity, totalDiscountedPrice };
  };

  const { updatedProducts, totalQuantity, totalPrice, priceIncludeQuantity, totalDiscountedPrice } = calculateTotals();

  // Delivery Location charge
  const handleDeliveryLocationChange = (value) => {
    let deliveryCharge = 0;

    if (value === "Free Delivery") {
      deliveryCharge = websiteInfo?.freeDelivery || 0;
    } else if (value === "Inside Dhaka") {
      deliveryCharge = websiteInfo?.insideDhaka || 0;
    } else if (value === "Outside Dhaka") {
      deliveryCharge = websiteInfo?.outsideDhaka || 0;
    }

    setDeliveryInfo((prevData) => ({
      ...prevData,
      deliveryArea: value,
      deliveryCharge: parseFloat(deliveryCharge),
    }));

    setDisableConfirmButton(false);

    return deliveryCharge;
  };

  // Payment Method change
  const handlePaymentMethodChange = (value) => {
    setDeliveryInfo((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
  };

  // Calculate Total Coast
  const totalCost = totalPrice + parseFloat(deliveryInfo?.deliveryCharge);

  // Handle product cancelled
  const cancelledProduct = (index) => {
    Swal.fire({
      title: t("checkout.cancelConfirmationTitle"),
      text: t("checkout.cancelConfirmationText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("checkout.cancelConfirmButton"),
      cancelButtonText: t("checkout.cancelCancelButton"),
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const updatedProducts = data.filter((_, i) => i !== index);
          setData(updatedProducts);
          Swal.fire({
            title: t("checkout.productCancelConfirmationText"),
            icon: "success",
            confirmButtonText: t("checkout.okayButton"),
          });

          // If no products left, show a message and redirect to home
          if (updatedProducts.length === 0) {
            Swal.fire({
              title: t("checkout.allProductsCancellingTitle"),
              text: t("checkout.allProductsCancellingText"),
              icon: "warning",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/"); // Redirect to homepage
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: t("checkout.productCancelFailedText"),
            text: t("checkout.productCancelErrorText"),
            icon: "error",
            confirmButtonText: t("checkout.okayButton"),
          });
        }
      }
    });
  };

  const orderInfo = {
    products: updatedProducts,
    totalPrice: totalPrice,
    totalCost: totalCost,
    discountUsingPoints: 0,
    ...deliveryInfo,
  };

  // console.log(orderInfo);

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | Checkout</title>
      </Helmet>
      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 py-5 lg:py-5 2xl:py-10">
        <h1 className="bg-black dark:bg-black text-white dark:text-white py-2.5 lg:py-5 font-dynamic text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5 lg:mb-5 2xl:mb-10">
          {t("checkout.title")}
        </h1>

        {/* Checkout Desktop Version */}
        <div className="hidden lg:block">
          {/* Checkout Products Table */}
          <div className="overflow-x-auto">
            <div>
              <table className="table table-pin-rows table-pin-cols border-separate border-spacing-y-5">
                <thead className="mb-10">
                  <tr className="border-none">
                    <td className="w-32 lg:w-[5%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black lg:px-0 lg:mx-0">
                      {t("checkout.image")}
                    </td>
                    <td className="w-full lg:w-[35%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                      {t("checkout.productName")}
                    </td>
                    <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                      {t("checkout.size")}
                    </td>
                    <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                      {t("checkout.color")}
                    </td>
                    <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                      {t("checkout.quantity")}
                    </td>
                    <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                      {t("checkout.price")}
                    </td>
                    <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white">
                      {t("checkout.cancel")}
                    </td>
                  </tr>
                </thead>

                {updatedProducts?.length > 0 && (
                  <>
                    {updatedProducts?.map((product, index) => (
                      <tbody key={index} className="bg-light dark:bg-gray-800">
                        <tr className="border-none h-20">
                          <td className="w-32 lg:w-[5%] p-0 m-0">
                            <img src={product?.thumbnail} className="w-32 lg:w-full h-20" alt="Product Name" />
                          </td>
                          <td className="w-full lg:w-[35%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-medium">
                            <Link
                              to={`/product-details/${product?.productUrl}`}
                              className="hover:text-blue-500 transition-colors duration-300"
                            >
                              {product?.title}
                            </Link>
                          </td>
                          <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-medium">
                            {product?.selectedSize}
                          </td>
                          <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-medium">
                            {product?.selectedColor}
                          </td>
                          <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium">
                            <div className="flex items-center justify-center">
                              <button onClick={() => decreaseQuantity(index)}>
                                <HiOutlineMinusSm size={20} />
                              </button>
                              <span className="mx-2">{product.selectedQuantity}</span>
                              <button onClick={() => increaseQuantity(index)}>
                                <LuPlus size={20} />
                              </button>
                            </div>
                          </td>
                          <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium">
                            {t("checkout.tk")}
                            {product?.mainPrice}
                          </td>
                          <td className="w-full lg:w-[12%] text-center">
                            <button onClick={() => cancelledProduct(index)}>
                              <IoClose size={24} className="text-red-500" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </>
                )}
              </table>
            </div>
          </div>

          {/* Price including total quantity */}
          <div className="w-full h-14 relative bg-light dark:bg-gray-800 text-light dark:text-dark px-2.5 lg:ps-5 lg:flex items-center mb-5">
            <div className="w-[83%] lg:w-[66%] flex justify-center items-center">
              <h3 className="w-auto block font-dynamic font-bold text-[15px] flex-grow-0">
                {t("checkout.priceIncludeQuantity")}
              </h3>
              <span className="ml-4 border-[1.2px] border-red-500 w-[24px] flex-grow inline-block"></span>
              <IoMdArrowForward className="text-red-500 ml-[-5px] p-0" size={24} />
            </div>

            <div className="w-auto lg:w-[12%] lg:h-14 absolute right-2.5 top-2.5 lg:top-0 lg:right-[24%] flex justify-center items-center">
              <p className="text-[15px] font-primary font-medium">
                {totalQuantity} {t("checkout.pcs")}
              </p>
            </div>

            <div className="w-full lg:w-[12%] lg:h-14 lg:absolute lg:right-[12%] flex justify-center items-center gap-2.5 lg:gap-0 mt-2">
              <p className="text-[15px] font-primary font-medium">
                {t("checkout.tk")}
                {priceIncludeQuantity}
              </p>
              <p className="block lg:hidden text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
            </div>

            <div className="hidden w-full lg:w-[12%] h-14 lg:absolute lg:right-[0%] lg:flex justify-center items-center">
              <p className="text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="relative w-full h-14 bg-light dark:bg-gray-800 text-light dark:text-dark px-2.5 lg:ps-5 lg:flex items-center mb-5">
            <h3 className="font-dynamic font-bold text-[15px] mb-2.5 lg:mb-2.5">{t("checkout.deliveryLocation")}</h3>

            <div className="w-auto lg:w-[24%] lg:h-14 lg:absolute right-2.5 top-2.5 lg:top-0 lg:right-[36%] flex justify-around  items-center ">
              {updatedProducts[0].deliveryStatus === "Free Delivery" ? (
                <>
                  {/* Free Delivery */}
                  <div className="flex justify-center items-center gap-2.5">
                    <input
                      type="checkbox"
                      name="deliveryArea"
                      value="Free Delivery"
                      checked={
                        deliveryInfo.deliveryArea === "Free Delivery" ||
                        updatedProducts[0].deliveryStatus === "Free Delivery"
                      }
                      onChange={() => handleDeliveryLocationChange("Free Delivery")}
                      className="checkbox"
                    />
                    <p className="text-[15px] font-primary font-medium">{t("checkout.freeDelivery")}</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Inside of Dhaka */}
                  <div className="flex justify-center items-center gap-2.5">
                    <input
                      type="checkbox"
                      name="deliveryArea"
                      value="Inside Dhaka"
                      checked={deliveryInfo.deliveryArea === "Inside Dhaka"}
                      onChange={() => handleDeliveryLocationChange("Inside Dhaka")}
                      className="checkbox"
                    />
                    <p className="text-[15px] font-primary font-medium">{t("checkout.insideOfDhaka")}</p>
                  </div>

                  {/* Outside of Dhaka */}
                  <div className="flex justify-center items-center gap-2.5">
                    <input
                      type="checkbox"
                      name="deliveryArea"
                      value="Outside Dhaka"
                      checked={deliveryInfo.deliveryArea === "Outside Dhaka"}
                      onChange={() => handleDeliveryLocationChange("Outside Dhaka")}
                      className="checkbox"
                    />
                    <p className="text-[15px] font-primary font-medium">{t("checkout.outsideOfDhaka")}</p>
                  </div>
                </>
              )}
            </div>

            <div className="w-full lg:w-[12%] lg:h-14 lg:absolute lg:right-[12%] flex justify-center items-center gap-2.5 lg:gap-0 mt-2.5">
              <p className="text-[15px] font-primary font-medium">
                +{t("checkout.tk")}
                {deliveryInfo?.deliveryCharge}
              </p>
              <p className="text-[15px] font-dynamic font-medium lg:hidden">{t("checkout.only")}</p>
            </div>

            <div className="hidden lg:w-[12%] lg:h-14 lg:absolute lg:right-[0%] lg:flex justify-center items-center">
              <p className="text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
            </div>
          </div>

          {/* Discount Code */}
          <div className="relative w-full h-14 bg-light dark:bg-gray-800 text-light dark:text-dark px-2.5 lg:ps-5 lg:flex items-center mb-5">
            <h3 className="font-dynamic font-bold text-[15px] mb-2.5 lg:mb-2.5">{t("checkout.discountCode")}</h3>

            <div className="lg:ps-20">
              <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center gap-2.5 lg:gap-5">
                <div className="w-3/4 lg:w-[12%] h-10 lg:absolute lg:left-[18%]">
                  <input
                    type="code"
                    {...register("codeLarge")}
                    placeholder={t("checkout.placeholder")}
                    className="w-full lg:w-[95%] h-10 rounded pl-5 bg-gray-200 dark:bg-dark text-light dark:text-dark font-dynamic font-bold text-[15px] focus:outline-none"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                </div>

                <button
                  type="submit"
                  className="w-1/4 lg:w-[12%] h-10 lg:absolute lg:right-[48%] rounded bg-black dark:bg-black text-white dark:text-white font-dynamic font-bold text-[15px] lg:px-10"
                >
                  {t("checkout.button")}
                </button>
              </form>

              <div className="w-auto lg:w-[12%] lg:h-14 absolute right-2.5 top-2.5 lg:top-0 lg:right-[24%] flex justify-center items-center">
                <p className="text-[15px] font-primary font-medium">
                  {totalQuantity} {t("checkout.pcs")}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[12%] lg:h-14 lg:absolute lg:right-[12%] flex justify-center items-center gap-2.5 lg:gap-0 mt-2.5">
              <p className="text-[15px] font-primary font-medium">
                -{t("checkout.tk")}
                {totalDiscountedPrice}
              </p>
              <p className="text-[15px] font-dynamic font-medium lg:hidden">{t("checkout.only")}</p>
            </div>

            <div className="hidden lg:w-[12%] lg:h-14 lg:absolute lg:right-[0%] lg:flex justify-center items-center">
              <p className="text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
            </div>
          </div>

          {/* Total Cost */}
          <div className="w-full h-14 relative bg-light dark:bg-gray-800 text-light dark:text-dark px-2.5 lg:ps-5 lg:flex items-center mb-5">
            <div className="w-[70%] lg:w-[78%] flex justify-center items-center">
              <h3 className="w-auto block font-dynamic font-bold text-[15px] flex-grow-0">{t("checkout.totalCost")}</h3>
              <span className="ml-4 border-[1.2px] border-red-500 w-[24px] flex-grow inline-block"></span>
              <IoMdArrowForward className="text-red-500 ml-[-5px] p-0" size={24} />
            </div>

            <div className="w-auto lg:w-[12%] lg:h-14 absolute right-2.5 top-2.5 lg:top-auto lg:right-[12%] flex justify-center items-center gap-2.5 lg:gap-0">
              <p className="text-[15px] font-primary font-medium">
                {t("checkout.tk")}
                {totalCost}
              </p>
              <p className="block lg:hidden text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
            </div>

            <div className="hidden w-full lg:w-[12%] h-14 lg:absolute lg:right-[0%] lg:flex justify-center items-center">
              <p className="text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="relative w-full h-[90px] bg-light dark:bg-gray-800 text-light dark:text-dark px-2.5 py-2.5 lg:py-0 lg:ps-5 lg:flex justify-start items-center gap-2.5 mb-5">
            <h3 className="w-auto block text-nowrap font-dynamic font-bold text-[15px]flex-grow-0 mb-2.5 lg:mb-0">
              {t("checkout.paymentMethod")}
            </h3>

            <div className="w-full lg:h-14 flex justify-start items-center flex-grow">
              <div className="flex justify-center items-center gap-2.5">
                <input
                  type="checkbox"
                  name="paymentMethod"
                  value="Cash On Delivery"
                  checked={deliveryInfo.paymentMethod === "Cash On Delivery"}
                  onChange={() => handlePaymentMethodChange("Cash On Delivery")}
                  className="radio radio-success dark:radio-success"
                />
                <p className="text-[15px] font-primary font-medium text-emerald-600">{t("checkout.cashOnDelivery")}</p>


                {/* <img src={Bkash} onClick={() => console.log("Bkash")}
                alt="payment" className="w-[150px] h-[80px] cursor-pointer object-cover" /> */}
                <BkashPayment></BkashPayment>
                <img src={Nagad}
                  onClick={() => console.log("Nagad")}
                  alt="payment" className="w-[150px] h-[80px] cursor-pointer object-cover" />

                <img src={Rocket}
                  onClick={() => console.log("Rocket")}
                  alt="payment" className="w-[150px] h-[80px] cursor-pointer object-cover" />



              </div>

            </div>



          </div>

        </div>

        {/* Checkout Mobile Version */}
        <div className="block lg:hidden">
          {/* Checkout Products Card  */}
          {updatedProducts?.length > 0 && (
            <>
              {updatedProducts?.map((product, index) => (
                <div key={index}>
                  <div className="w-full h-full flex justify-between items-center gap-2.5 pb-2.5">
                    <div className="w-1/3 h-full">
                      <img src={product?.thumbnail} alt={product?.title} className="w-full h-[147px] object-cover" />
                    </div>

                    <div className="w-2/3 h-full">
                      <h3 className="font-primary font-bold text-lg mb-2.5">{product?.title}</h3>

                      {/* Color and size */}
                      <div className="flex justify-around items-center gap-2.5 mb-2.5">
                        <span className="bg-black dark:bg-black py-1 w-1/2 text-center font-primary text-[15px] font-medium text-white dark:text-white">
                          {product?.selectedSize}
                        </span>
                        <span className="bg-black dark:bg-black py-1 w-1/2 text-center font-primary text-[15px] font-medium text-white dark:text-white">
                          {product?.selectedColor}
                        </span>
                      </div>

                      {/* Sub total amount */}
                      <div className="flex justify-between items-center gap-2 mb-2.5">
                        <div className="flex-grow border border-gray-800 dark:border-gray-500"></div>
                        <div className="flex-grow-0">
                          <h3 className="font-primary text-xl md:text-2xl lg:text-3xl font-bold">
                            {t("checkout.tk")}
                            {`${product?.regularPrice * product?.selectedQuantity * (1 - product?.discountPercentage / 100)
                              }`}
                            /-
                          </h3>
                        </div>
                        <div className="flex-grow border border-gray-800 dark:border-gray-500"></div>
                      </div>

                      {/* Quantity and cancel buttons */}
                      <div className="flex justify-around items-center gap-2.5">
                        <span className="w-1/2 text-black dark:text-white text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium border border-gray-300 dark:border-gray-600 flex items-center justify-around">
                          <button
                            onClick={() => decreaseQuantity(index)}
                            className="w-1/3 border-r border-gray-300 dark:border-gray-600 flex justify-center items-center py-1"
                          >
                            <HiOutlineMinusSm size={20} />
                          </button>
                          <span className="mx-2">{product?.selectedQuantity}</span>
                          <button
                            onClick={() => increaseQuantity(index)}
                            className="w-1/3 border-l border-gray-300 dark:border-gray-600 flex justify-center items-center py-1"
                          >
                            <LuPlus size={20} />
                          </button>
                        </span>
                        <button
                          onClick={() => cancelledProduct(index)}
                          className="bg-black dark:bg-black py-1 w-1/2 text-center font-dynamic text-[15px] font-medium text-red-500 dark:text-red-500"
                        >
                          {t("checkout.cancel")}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-2/3 mx-auto h-full border-b border-red-500 mb-2.5"></div>
                </div>
              ))}
            </>
          )}

          {/* Delivery Location */}
          <div className="w-full h-full flex justify-between items-center gap-2.5 mb-5">
            <div className="w-1/3 h-full">
              <h3 className="font-dynamic font-bold text-sm">{t("checkout.deliveryLocation")}</h3>
            </div>

            <div className="w-2/3 h-full">
              {updatedProducts[0].deliveryStatus === "Free Delivery" ? (
                <div className="flex justify-start items-center">
                  {/* Free Delivery */}
                  <div className="flex justify-center items-center gap-1">
                    <input
                      type="checkbox"
                      name="deliveryArea"
                      value="Free Delivery"
                      checked={
                        deliveryInfo.deliveryArea === "Free Delivery" ||
                        updatedProducts[0].deliveryStatus === "Free Delivery"
                      }
                      onChange={() => handleDeliveryLocationChange("Free Delivery")}
                      className="checkbox"
                    />
                    <p className="text-[15px] font-primary font-medium">{t("checkout.freeDelivery")}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  {/* Inside of Dhaka */}
                  <div className="flex justify-center items-center gap-1">
                    <input
                      type="checkbox"
                      name="deliveryArea"
                      value="Inside Dhaka"
                      checked={deliveryInfo.deliveryArea === "Inside Dhaka"}
                      onChange={() => handleDeliveryLocationChange("Inside Dhaka")}
                      className="checkbox"
                    />
                    <p className="text-[15px] font-primary font-medium">{t("checkout.insideOfDhaka")}</p>
                  </div>

                  {/* Outside of Dhaka */}
                  <div className="flex justify-center items-center gap-1">
                    <input
                      type="checkbox"
                      name="deliveryArea"
                      value="Outside Dhaka"
                      checked={deliveryInfo.deliveryArea === "Outside Dhaka"}
                      onChange={() => handleDeliveryLocationChange("Outside Dhaka")}
                      className="checkbox"
                    />
                    <p className="text-[15px] font-primary font-medium">{t("checkout.outsideOfDhaka")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Discount Code */}
          <div className="w-full h-full flex justify-between items-center gap-2.5 mb-5">
            <div className="w-1/3 h-full">
              <h3 className="font-dynamic font-bold text-sm">{t("checkout.discountCode")}:</h3>
            </div>

            <div className="w-2/3 h-full">
              <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center gap-2.5">
                <div className="w-1/2">
                  <input
                    type="code"
                    {...register("codeSmall")}
                    placeholder={t("checkout.placeholder")}
                    className="w-full py-1 pl-2.5 bg-gray-200 dark:bg-gray-700 text-light dark:text-dark font-dynamic font-medium text-[15px] focus:outline-none"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                </div>

                <button
                  type="submit"
                  className="w-1/2 py-1 bg-black dark:bg-black text-white dark:text-white font-dynamic font-medium text-[15px] px-2.5"
                >
                  {t("checkout.button")}
                </button>
              </form>
            </div>
          </div>

          {/* Payment Method */}
          <div className="w-full h-full flex justify-between items-center gap-2.5 mb-5">
            <div className="w-1/3 h-full">
              <h3 className="font-dynamic font-bold text-sm">{t("checkout.paymentMethod")}</h3>
            </div>

            <div className="w-2/3 h-full">
              <div className="flex justify-start items-start gap-2.5">
                <input
                  type="checkbox"
                  name="paymentMethod"
                  value="Cash On Delivery"
                  checked={deliveryInfo.paymentMethod === "Cash On Delivery"}
                  onChange={() => handlePaymentMethodChange("Cash On Delivery")}
                  className="radio radio-success dark:radio-success"
                />
                <p className="text-[15px] font-primary font-medium text-emerald-600">{t("checkout.cashOnDelivery")}</p>
              </div>
            </div>
          </div>

          {/* Sub-total, Delivery Fee, Discount, Total Coast */}
          <div className="w-full h-full">
            <div className="w-full h-full flex justify-between items-center gap-2.5 py-2.5 border-b border-gray-300 dark:border-gray-600">
              <div className="w-1/3 h-full">
                <h3 className="font-dynamic font-bold text-sm">{t("checkout.subTotal")}:</h3>
              </div>
              <div className="w-2/3 h-full flex justify-end items-center gap-2.5">
                <p className="text-[15px] font-primary font-medium">
                  {t("checkout.tk")}
                  {priceIncludeQuantity}
                </p>
                <p className="text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
              </div>
            </div>
            <div className="w-full h-full flex justify-between items-center gap-2.5 py-2.5 border-b border-gray-300 dark:border-gray-600">
              <div className="w-1/3 h-full">
                <h3 className="font-dynamic font-bold text-sm">{t("checkout.deliveryFee")}:</h3>
              </div>
              <div className="w-2/3 h-full flex justify-end items-center gap-2.5">
                <p className="text-[15px] font-primary font-medium">
                  +{t("checkout.tk")}
                  {deliveryInfo?.deliveryCharge}
                </p>
                <p className="text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
              </div>
            </div>
            <div className="w-full h-full flex justify-between items-center gap-2.5 py-2.5 border-b border-gray-300 dark:border-gray-600">
              <div className="w-1/3 h-full">
                <h3 className="font-dynamic font-bold text-sm">{t("checkout.discount")}:</h3>
              </div>
              <div className="w-2/3 h-full flex justify-end items-center gap-2.5">
                <p className="text-[15px] font-primary font-medium">
                  -{t("checkout.tk")}
                  {totalDiscountedPrice}
                </p>
                <p className="text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
              </div>
            </div>
            <div className="w-full h-full flex justify-between items-center gap-2.5 pb-5 pt-2.5">
              <div className="w-1/3 h-full">
                <h3 className="font-dynamic font-bold text-sm">{t("checkout.totalCost")}:</h3>
              </div>
              <div className="w-2/3 h-full flex justify-end items-center gap-2.5">
                <p className="text-[15px] font-primary font-medium">
                  {t("checkout.tk")}
                  {totalCost}
                </p>
                <p className="text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {disableConfirmButton && showWarning ? (
            <p className="mb-5 font-dynamic font-medium text-[15px] text-red-500">
              {t("checkout.productDeliveryLocationWarningMessage")}
            </p>
          ) : (
            <></>
          )}
        </div>

        {/* Order Now navigate link */}
        {disableConfirmButton ? (
          <button
            onClick={() => setShowWarning(true)}
            className="w-full h-14 lg:h-14 relative bg-black dark:bg-black text-white dark:text-white text-xl lg:text-2xl font-bold flex justify-center items-center mb-5"
          >
            {t("checkout.orderNowLink")}
          </button>
        ) : (
          <Link
            to="/billing-address"
            state={{ data: orderInfo }}
            className="w-full h-14 lg:h-14 relative bg-black dark:bg-black text-white dark:text-white text-xl lg:text-2xl font-bold flex justify-center items-center mb-5"
          >
            {t("checkout.orderNowLink")}
          </Link>
        )}

        {/* Contact Number */}
        <Link
          to={`tel:${websiteInfo?.contactNumber}`}
          className="w-full h-14 relative bg-gray-200 dark:bg-gray-700 border border-black dark:border-black text-black dark:text-white text-[13px] md:text-lg lg:text-2xl font-semibold lg:font-bold flex justify-center items-center gap-1 mb-5 text-center"
        >
          {t("checkout.helpingMessage")}: <br className="lg:hidden" />
          <BiSolidPhoneCall size={15} className="mt-1 text-blue-500 lg:hidden"></BiSolidPhoneCall>
          <BiSolidPhoneCall size={20} className="mt-1 text-blue-500 hidden lg:block"></BiSolidPhoneCall>
          {websiteInfo?.contactNumber}
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
