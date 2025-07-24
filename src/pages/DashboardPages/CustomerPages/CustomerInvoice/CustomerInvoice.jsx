import { Link } from "react-router-dom";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { IoMdArrowForward } from "react-icons/io";

const CustomerInvoice = ({ order }) => {
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const calculateTotalQuantity = (products) => {
    return products?.reduce((total, product) => total + product?.selectedQuantity, 0);
  };

  return (
    <div className="relative w-full h-full overflow-x-auto bg-white dark:bg-gray-800 pb-10 lg:pb-0">
      {/* Order Id, Order Date, Total Cost and Payment Type */}
      <div className="py-2.5 flex justify-around items-center">
        <div className="w-full h-full flex justify-center items-center py-1 px-5 lg:px-10 border-r-2 border-black">
          <div className="w-full">
            <p className="text-[15px] text-nowrap font-dynamic font-medium text-center mb-1">{t("invoice.orderNumber")}</p>

            <p className="bg-black dark:bg-black text-white dark:text-white text-center py-1 w-full rounded font-primary text-[15px] text-nowrap px-2.5 lg:px-0">
              {order?.orderId}
            </p>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center py-1 px-5 lg:px-10 border-r-2 border-black">
          <div className="w-full">
            <p className="text-[15px] text-nowrap font-dynamic font-medium text-center mb-1"> {t("invoice.date")}</p>

            <p className="bg-black dark:bg-black text-white dark:text-white text-center py-1 w-full rounded font-primary text-[15px] text-nowrap px-2.5 lg:px-0">
              {formatDate(order?.addedAt)}
            </p>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center py-1 px-5 lg:px-10 border-r-2 border-black">
          <div className="w-full">
            <p className="text-[15px] text-nowrap font-dynamic font-medium text-center mb-1">{t("invoice.totalCost")}</p>

            <p className="bg-black dark:bg-black text-white dark:text-white text-center py-1 w-full rounded font-primary text-[15px] text-nowrap px-2.5 lg:px-0">
              ৳ {order?.totalCost}
            </p>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center py-1 px-5 lg:px-10">
          <div className="w-full">
            <p className="text-[15px] text-nowrap font-dynamic font-medium text-center mb-1">{t("invoice.paymentType")}</p>

            <p className="bg-black dark:bg-black text-white dark:text-white text-center py-1 w-full rounded font-primary text-[15px] text-nowrap px-2.5 lg:px-0">
              {order?.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="py-2.5 overflow-x-auto">
        <table className="table table-cart table-pin-rows table-pin-cols border-separate border-spacing-y-5">
          <thead className="mb-10">
            <tr className="border-none">
              <td className="w-32 lg:w-[7%] text-nowrap h-10 lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-light dark:bg-dark text-black dark:text-white border-r-2 border-black lg:px-0 lg:mx-0">
                {t("cart.image")}
              </td>
              <td className="w-full lg:w-[41%] text-nowrap h-10 lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-light dark:bg-dark text-black dark:text-white border-r-2 border-black">
                {t("cart.productName")}
              </td>
              <td className="w-full lg:w-[13%] text-nowrap h-10 lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-light dark:bg-dark text-black dark:text-white border-r-2 border-black">
                {t("cart.size")}
              </td>
              <td className="w-full lg:w-[13%] text-nowrap h-10 lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-light dark:bg-dark text-black dark:text-white border-r-2 border-black">
                {t("cart.color")}
              </td>
              <td className="w-full lg:w-[13%] text-nowrap h-10 lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-light dark:bg-dark text-black dark:text-white border-r-2 border-black">
                {t("cart.quantity")}
              </td>
              <td className="w-full lg:w-[13%] text-nowrap h-10 lg:text-wrap text-center text-[15px] font-dynamic font-bold bg-light dark:bg-dark text-black dark:text-white">
                {t("cart.price")}
              </td>
            </tr>
          </thead>

          {order?.products?.length > 0 && (
            <>
              {order?.products?.map((product, index) => (
                <tbody key={index} className="bg-light dark:bg-dark">
                  <tr className="border-none h-20">
                    <td className="w-32 lg:w-[7%] p-0 m-0">
                      <img src={product?.thumbnail} className="w-32 lg:w-full h-20" alt="Product Name" />
                    </td>
                    <td className="w-full lg:w-[41%] text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium">
                      <Link
                        to={`/product-details/${product?.productUrl}`}
                        className="hover:text-blue-500 transition-colors duration-300"
                      >
                        {product?.title}
                      </Link>
                    </td>
                    <td className="w-full lg:w-[13%] text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium">
                      {product?.selectedSize}
                    </td>
                    <td className="w-full lg:w-[13%] text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium">
                      {product?.selectedColor}
                    </td>
                    <td className="w-full lg:w-[13%] text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium">
                      {product?.selectedQuantity}
                    </td>
                    <td className="w-full lg:w-[13%] text-nowrap lg:text-wrap text-center text-[15px] font-primary font-medium">
                      ৳ {product?.calculatedPrice}
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          )}
        </table>

        {/* Price including total quantity */}
        <div className="w-full h-20 relative bg-light dark:bg-dark text-light dark:text-dark px-2.5 py-2.5 lg:py-0 lg:ps-5 lg:flex items-center mb-5">
          <div className="w-[85%] lg:w-[74%] flex justify-center items-center">
            <h3 className="w-auto block font-dynamic font-bold text-[15px] flex-grow-0">{t("cart.priceIncludeQuantity")}</h3>
            <span className="ml-4 border-[1.2px] border-black w-[24px] flex-grow inline-block"></span>
            <IoMdArrowForward className="text-black ml-[-5px] p-0" size={24} />
          </div>

          <div className="w-auto lg:w-[13%] lg:h-20 absolute right-2.5 top-2.5 lg:top-0 lg:right-[13%] flex justify-center items-center">
            <p className="text-[15px] font-primary font-medium">
              {calculateTotalQuantity(order?.products)} {t("invoice.pcs")}
            </p>
          </div>

          <div className="w-full lg:w-[13%] lg:h-20 lg:absolute lg:right-0 flex justify-center items-center gap-2.5 lg:gap-0 mt-2">
            <p className="text-[15px] font-primary font-medium">৳ {order?.totalPrice}</p>
            <p className="block lg:hidden text-[15px] font-dynamic font-medium">{t("cart.only")}</p>
          </div>
        </div>

        {/* Delivery Charge */}
        <div className="w-full h-20 relative bg-light dark:bg-dark text-light dark:text-dark px-2.5 py-2.5 lg:py-0 lg:ps-5 lg:flex items-center mb-5">
          <div className="w-[85%] lg:w-[74%] flex justify-center items-center">
            <h3 className="w-auto block font-dynamic font-bold text-[15px] flex-grow-0">{t("invoice.deliveryCharge")}</h3>
            <span className="ml-4 border-[1.2px] border-black w-[24px] flex-grow inline-block"></span>
            <IoMdArrowForward className="text-black ml-[-5px] p-0" size={24} />
          </div>

          <div className="w-auto lg:w-[13%] lg:h-20 absolute right-2.5 top-2.5 lg:top-0 lg:right-[13%] flex justify-center items-center">
            <p className="text-[15px] font-primary font-medium">{order?.deliveryArea}</p>
          </div>

          <div className="w-full lg:w-[13%] lg:h-20 lg:absolute lg:right-0 flex justify-center items-center gap-2.5 lg:gap-0 mt-2">
            <p className="text-[15px] font-primary font-medium">৳ {order?.deliveryCharge}</p>
            <p className="block lg:hidden text-[15px] font-dynamic font-medium">{t("cart.only")}</p>
          </div>
        </div>

        {/* Total Cost */}
        <div className="w-full h-12 lg:h-20 relative bg-light dark:bg-dark text-light dark:text-dark px-2.5 py-2.5 lg:py-0 lg:ps-5 lg:flex items-center mb-5">
          <div className="w-[70%] lg:w-[87%] flex justify-center items-center">
            <h3 className="w-auto block font-dynamic font-bold text-[15px] flex-grow-0">{t("checkout.totalCost")}</h3>
            <span className="ml-4 border-[1.2px] border-black w-[24px] flex-grow inline-block"></span>
            <IoMdArrowForward className="text-black ml-[-5px] p-0" size={24} />
          </div>

          <div className="w-auto lg:w-[13%] lg:h-20 absolute right-2.5 top-2.5 lg:top-auto lg:right-0 flex justify-center items-center gap-2.5 lg:gap-0">
            <p className="text-[15px] font-primary font-medium">৳ {order?.totalCost}</p>
            <p className="block lg:hidden text-[15px] font-dynamic font-medium">{t("checkout.only")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInvoice;
