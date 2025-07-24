import { IoClose } from "react-icons/io5";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { LuPlus } from "react-icons/lu";
import { HiOutlineMinusSm } from "react-icons/hi";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CartContext } from "../../../providers/CartProvider/CartProvider";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const { t } = useTranslation();
  const [cartProducts, setCartProducts] = useState([]);

  const { refetch } = useContext(CartContext);

  // Fetch products from localStorage when the component mounts
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("FreeFeel")) || [];
    setCartProducts(storedProducts);
  }, []);

  // Handle quantity increase
  const increaseQuantity = (index) => {
    const updatedCart = [...cartProducts];
    updatedCart[index].selectedQuantity += 1;
    setCartProducts(updatedCart);
    localStorage.setItem("FreeFeel", JSON.stringify(updatedCart));
  };

  // Handle quantity decrease
  const decreaseQuantity = (index) => {
    const updatedCart = [...cartProducts];
    if (updatedCart[index].selectedQuantity > 1) {
      updatedCart[index].selectedQuantity -= 1;
      setCartProducts(updatedCart);
      localStorage.setItem("FreeFeel", JSON.stringify(updatedCart));
    }
  };

  const calculateTotals = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    cartProducts.forEach((product) => {
      totalQuantity += product?.selectedQuantity;
      totalPrice += product?.regularPrice * product?.selectedQuantity * (1 - product?.discountPercentage / 100);
    });

    return { totalQuantity, totalPrice };
  };

  const { totalQuantity, totalPrice } = calculateTotals();

  // Handle product cancelled
  const cancelledProduct = (index) => {
    Swal.fire({
      title: t("cart.cancelConfirmationTitle"),
      text: t("cart.cancelConfirmationText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("cart.cancelConfirmButton"),
      cancelButtonText: t("cart.cancelCancelButton"),
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const updatedCart = cartProducts.filter((_, i) => i !== index);
          setCartProducts(updatedCart);
          localStorage.setItem("FreeFeel", JSON.stringify(updatedCart));

          Swal.fire({
            title: t("cart.productCancelConfirmationText"),
            icon: "success",
            confirmButtonText: t("cart.okayButton"),
          });
          refetch();
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: t("cart.productCancelFailedText"),
            text: t("cart.productCancelErrorText"),
            icon: "error",
            confirmButtonText: t("cart.okayButton"),
          });
        }
      }
    });
  };

  // If there are no products in cart then show this component
  if (cartProducts?.length === 0) {
    return (
      <div className="bg-white dark:bg-dark text-light dark:text-dark">
        <Helmet>
          <title>FreeFeel | {t("cart.noItemMessage")}</title>
        </Helmet>
        <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 py-5 lg:py-5 2xl:py-10">
          <h1 className="font-dynamic text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5 lg:mb-5 2xl:mb-10">
            {t("cart.noItemMessage")}
          </h1>

          <Link
            to="/"
            className="w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 mx-auto h-14 lg:h-14 relative bg-black dark:bg-black text-white dark:text-white text-xl lg:text-2xl font-bold flex justify-center items-center mb-5 rounded"
          >
            {t("cart.continueShoppingLink")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | Cart</title>
      </Helmet>

      <div className="w-full h-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto px-2.5 md:px-5 lg:px-0 py-5 lg:py-5 2xl:py-10">
        <h1 className="bg-black dark:bg-black text-white dark:text-white py-2.5 lg:py-5 font-dynamic text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5 lg:mb-5 2xl:mb-10">
          {t("cart.title")}
        </h1>

        {/* Cart Desktop Version */}
        <div className="hidden lg:block">
          {/* Cart Products Table */}
          <div className="overflow-x-auto">
            <table className="table table-cart table-pin-rows table-pin-cols border-separate border-spacing-y-5">
              <thead className="mb-10">
                <tr className="border-none">
                  <td className="w-32 lg:w-[5%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black lg:px-0 lg:mx-0">
                    {t("cart.image")}
                  </td>
                  <td className="w-full lg:w-[35%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                    {t("cart.productName")}
                  </td>
                  <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                    {t("cart.size")}
                  </td>
                  <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                    {t("cart.color")}
                  </td>
                  <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                    {t("cart.quantity")}
                  </td>
                  <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white border-r-2 border-black">
                    {t("cart.price")}
                  </td>
                  <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-white dark:bg-dark text-black dark:text-white">
                    {t("cart.cancel")}
                  </td>
                </tr>
              </thead>

              {cartProducts?.length > 0 && (
                <>
                  {cartProducts?.map((product, index) => (
                    <tbody key={index+1} className="bg-light dark:bg-gray-800">
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
                            <span className="mx-2">{product?.selectedQuantity}</span>
                            <button onClick={() => increaseQuantity(index)}>
                              <LuPlus size={20} />
                            </button>
                          </div>
                        </td>
                        <td className="w-full lg:w-[12%] text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium">
                          {t("cart.tk")}
                          {`${product?.regularPrice * product?.selectedQuantity * (1 - product?.discountPercentage / 100)}`}
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

          {/* Price including total quantity */}
          <div className="flex items-center  w-full h-14 relative bg-light dark:bg-gray-800 text-light dark:text-dark px-2.5 py-2.5 lg:py-0 lg:ps-5 mb-5">
            <div className="w-[85%] lg:w-[66%] flex justify-center items-center">
              <h3 className="w-auto block font-dynamic font-bold text-[15px] flex-grow-0">
                {t("cart.priceIncludeQuantity")}
              </h3>
              <span className="ml-4 border-[1.2px] border-red-500 w-[24px] flex-grow inline-block"></span>
              <IoMdArrowForward className="text-red-500 ml-[-5px] p-0" size={24} />
            </div>

            <div className="w-auto lg:w-[12%] lg:h-14 absolute right-2.5 top-2.5 lg:top-0 lg:right-[24%] flex justify-center items-center">
              <p className="text-[15px] font-primary font-medium">
                {totalQuantity} {t("cart.pcs")}
              </p>
            </div>

            <div className="w-full lg:w-[12%] lg:h-14 lg:absolute lg:right-[12%] flex justify-center items-center gap-2.5 lg:gap-0 mt-2">
              <p className="text-[15px] font-primary font-medium">
                {t("checkout.tk")}
                {totalPrice}
              </p>
              <p className="block lg:hidden text-[15px] font-dynamic font-medium">{t("cart.only")}</p>
            </div>

            <div className="hidden w-full lg:w-[12%] h-20 lg:absolute lg:right-[0%] lg:flex justify-center items-center">
              <p className="text-[15px] font-dynamic font-medium">{t("cart.only")}</p>
            </div>
          </div>
        </div>

        {/* Cart Mobile Version */}
        <div className="lg:hidden">
          {/* Cart Products Card  */}
          {cartProducts?.length > 0 && (
            <>
              {cartProducts?.map((product, index) => (
                <>
                  <div key={index+1} className="w-full h-full flex justify-between items-center gap-2.5 pb-2.5">
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
                        <div className="flex-grow border-2 border-gray-800 dark:border-gray-500"></div>
                        <div className="flex-grow-0">
                          <h3 className="font-primary text-xl md:text-2xl lg:text-3xl">
                            {t("cart.tk")}
                            {`${
                              product?.regularPrice * product?.selectedQuantity * (1 - product?.discountPercentage / 100)
                            }`}
                            /-
                          </h3>
                        </div>
                        <div className="flex-grow border-2 border-gray-800 dark:border-gray-500"></div>
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
                          {t("cart.cancel")}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-2/3 mx-auto h-full border-b border-red-500 mb-2.5"></div>
                </>
              ))}
            </>
          )}

          {/* Price including total quantity - Mobile */}
          <div className="my-5 flex justify-center items-center gap-2.5 py-2.5">
            <h3 className="w-auto block font-dynamic font-medium text-[15px] flex-grow-0">
              {t("cart.priceIncludeQuantity")}
            </h3>
            <p className="text-[15px] font-dynamic font-medium border border-gray-300 dark:border-gray-600 px-1">
              {totalQuantity} {t("cart.pcs")}
            </p>
            <p className="text-[15px] font-primary font-medium">
              {t("cart.tk")} {totalPrice}/- {t("cart.only")}
            </p>
          </div>
        </div>

        {/* Checkout navigate link */}
        <Link
          to="/checkout"
          state={{ data: cartProducts }}
          className="w-full h-14 lg:h-14 relative bg-black dark:bg-black text-white dark:text-white text-lg md:text-xl lg:text-2xl font-semibold lg:font-bold flex justify-center items-center mb-5"
        >
          {t("cart.checkOutLink")}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
