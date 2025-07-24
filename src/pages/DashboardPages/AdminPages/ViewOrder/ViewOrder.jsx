import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LuPrinter } from "react-icons/lu";
import useTheme from "../../../../hooks/useTheme/useTheme";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { MdOutlineClose } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure/useAxiosSecure";
import { useReactToPrint } from "react-to-print";

const ViewOrder = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [theme] = useTheme();
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Fetch a specific order
  const {
    isPending: isOrderLoading,
    data: order = {},
    refetch,
  } = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getOrderById/${id}`);
      return res?.data && res?.data?.data;
    },
    refetchOnWindowFocus: true,
  });

  // Update discounted price by admin
  const onSubmit = async (data) => {
    setIsLoading(true);

    const updatedData = {
      ...data,
      id: order._id,
    };

    try {
      const res = await axiosSecure.put("/discountUsingPoints", updatedData);
      const successMessage = res?.data?.message || "Success";
      toast.success(successMessage);
      reset();
      refetch();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour
    const formattedTime = `${hours}:${minutes}${ampm}`;

    return `${day}-${month}-${year} at ${formattedTime}`;
  };

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  if (isOrderLoading || isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Helmet>
        <title>FreeFeel | Dashboard | Order - {order?.name} </title>
        <meta name="description" content="Explore a order details on the FreeFeel Dashboard." />
      </Helmet>

      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5 mb-5 bg-gray-100 dark:bg-gray-800 rounded flex justify-between items-center">
        <h3 className="font-primary font-semibold text-xl">Order Overview</h3>

        {/* Back Icon */}
        <Link to="/dashboard/all-order">
          <MdOutlineClose size={24} className="text-red-500"></MdOutlineClose>
        </Link>
      </div>

      {/* Invoice */}
      <div
        ref={contentRef}
        className="printContent bg-white dark:bg-gray-800 rounded border-b border-dashed border-gray-300 dark:border-gray-600 p-10"
      >
        {/* Company Information */}
        <div className="border-b border-dashed border-gray-300 dark:border-gray-600 pb-10">
          <div className="w-full h-auto text-center">
            <LazyLoadImage
              src={theme === "light" ? websiteInfo?.logoLight : websiteInfo?.logoDark}
              className="w-[80px] h-[40px] object-cover"
              effect="blur"
              alt="FreeFeel Logo"
            />
            <p className="font-primary font-medium text-sm mb-1">
              Phone: <span>{websiteInfo?.contactNumber}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Email: <span>{websiteInfo?.infoEmail}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Address: <span>{websiteInfo?.address}</span>
            </p>
          </div>
        </div>

        {/* Customer Details, Shipping Address, Invoice Details  */}
        <div className="w-full h-full flex justify-center items-stretch">
          <div className="w-full h-auto flex-grow px-2.5 py-5 lg:p-5 text-center border-b border-r border-gray-300 dark:border-gray-600 border-dashed">
            <h3 className="font-primary font-semibold text-xl mb-2.5">Customer Details:</h3>

            <p className="font-primary font-medium text-sm mb-1">
              Name: <span>{order?.name}</span>
            </p>
            {order?.email && (
              <p className="font-primary font-medium text-sm mb-1">
                Email: <span>{order?.email}</span>
              </p>
            )}
            <p className="font-primary font-medium text-sm mb-1">
              Phone: <span>{order?.number}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Address: <span>{order?.address}</span>
            </p>
          </div>

          <div className="w-full h-auto flex-grow px-2.5 py-5 lg:p-5 text-center border-b border-r border-gray-300 dark:border-gray-600 border-dashed">
            <h3 className="font-primary font-semibold text-xl mb-2.5">Shipping Address:</h3>

            <p className="font-primary font-medium text-sm mb-1">
              Name: <span>{order?.name}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Phone: <span>{order?.number}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Zilla: <span>{order?.zilla}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Thana: <span>{order?.thana}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Address: <span>{order?.address}</span>
            </p>
          </div>

          <div className="w-full h-auto flex-grow px-2.5 py-5 lg:p-5 text-center border-b border-gray-300 dark:border-gray-600 border-dashed">
            <h3 className="font-primary font-semibold text-xl mb-2.5">Invoice Details:</h3>

            <p className="font-primary font-medium text-sm mb-1">
              Invoice No. <span>{order?.orderId}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Oder Date: <span>{formatDate(order?.addedAt)}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Payment Type: <span>{order?.paymentMethod}</span>
            </p>
            <p className="font-primary font-medium text-sm mb-1">
              Payment Status:{" "}
              <span
                className={
                  order?.paymentStatus === "Unpaid"
                    ? "text-red-500"
                    : order?.paymentStatus === "Paid"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {order?.paymentStatus}
              </span>
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="w-full h-auto mt-5">
          <div className="w-full max-w-full overflow-y-hidden truncate overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr className="bg-white dark:bg-black">
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    No
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600 px-0">
                    Images
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    Products
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    Color
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    Size
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    Qty
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    Price
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    Promo
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    Discount
                  </th>
                  <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-gray-300 dark:border-gray-600">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((product, index) => (
                  <tr key={index} className="border-b border-dashed border-gray-300 dark:border-gray-600">
                    <th className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      {index + 1}
                    </th>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap p-0 w-14 h-16">
                      <div className="w-14 h-16">
                        <LazyLoadImage
                          src={product?.thumbnail}
                          className="w-full h-full object-cover"
                          effect="blur"
                          alt={product?.title}
                        />
                      </div>
                    </td>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      <Link to={`/product-details/${product?.productUrl}`} className="hover:text-blue-500">
                        {product?.title}
                      </Link>
                    </td>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      {product?.selectedColor}
                    </td>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      {product?.selectedSize}
                    </td>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      {product?.selectedQuantity}
                    </td>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      ৳ {product?.regularPrice}
                    </td>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      {product?.promoCode}
                    </td>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      {product?.totalDiscount} %
                    </td>
                    <td className="text-sm font-primary font-medium text-light dark:text-dark text-center border border-dashed border-gray-300 dark:border-gray-600 text-nowrap">
                      ৳ {product?.calculatedPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Net total and total amount count */}
        <div className="pt-5 w-full h-auto flex flex-col lg:flex-row justify-between items-start gap-2.5 lg:gap-5">
          <div className="hidden lg:block w-full lg:w-2/3 order-2 lg:order-1">
            <p className="text-sm font-primary font-medium">{order?.comment}</p>
          </div>

          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <div className="font-primary text-sm font-medium mb-2.5 flex justify-between items-center gap-10 md:gap-12 lg:gap-16 2xl:gap-20">
              <p>Net Total:</p> <p>৳ {order?.totalPrice}</p>
            </div>
            <div className="font-primary text-sm font-medium mb-2.5 flex justify-between items-center gap-10 md:gap-12 lg:gap-16 2xl:gap-20">
              <p>Delivery Charge:</p> <p>৳ {order?.deliveryCharge}</p>
            </div>
            <div className="font-primary text-sm font-medium mb-2.5 flex justify-between items-center gap-10 md:gap-12 lg:gap-16 2xl:gap-20">
              <p>Points Discount:</p> <p>- ৳ {order?.discountUsingPoints}</p>
            </div>
            <div className="font-primary text-sm font-medium mb-2.5 flex justify-between items-center gap-10 md:gap-12 lg:gap-16 2xl:gap-20">
              <p> Total:</p> <p>৳ {order?.totalCost}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discount Using Points Form and Print Button */}
      <div className="p-2.5 lg:p-5 mb-5 bg-gray-100 dark:bg-gray-800 rounded flex justify-between items-center gap-5">
        {order?.discountUsingPoints > 0 ? (
          <p className="font-primary text-[15px] font-medium text-red-500">Points Already Used!</p>
        ) : (
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full h-full flex justify-center items-center gap-2.5 lg:gap-5"
            >
              <div className="relative w-full h-full flex flex-col">
                <input
                  id="discountedPoints"
                  type="number"
                  min={0}
                  placeholder="Discount Using Points"
                  {...register("discountedPoints", { required: true })}
                  aria-invalid={errors.discountedPoints ? "true" : "false"}
                  className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 font-primary text-[15px] font-medium text-white py-1.5 px-2.5 rounded"
              >
                {isLoading ? "Processing..." : "Apply"}
              </button>
            </form>
          </div>
        )}

        <button
          onClick={reactToPrintFn}
          className="font-primary text-[15px] font-medium px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white flex justify-center items-center gap-1"
        >
          <LuPrinter size={20}></LuPrinter> Print
        </button>
      </div>
    </div>
  );
};

export default ViewOrder;
