import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure/useAxiosSecure";
import useLanguage from "../hooks/useLanguage/useLanguage";
import Loader from "../components/Loader/Loader";
import { FaTrashAlt } from "react-icons/fa";
import { TfiCommentsSmiley, TfiFaceSad } from "react-icons/tfi";
import { MdCategory, MdNotificationsActive } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
import { motion } from "framer-motion";

const Notifications = () => {
  const axiosSecure = useAxiosSecure();
  const { language } = useLanguage();

  const { refetch: refetchPopularCategories } = useQuery({
    queryKey: ["popularCategories"],
    queryFn: async () => {
      const res = await axiosSecure.get("popularCategories", {
        params: { language: "eng", categoryStatus: "Public" }, // adjust if dynamic
      });
      return res?.data?.data || [];
    },
    enabled: false, // prevent it from running automatically
  });

  //   Fetch products by Product Type = Most Popular
  const { data: allProducts = [] } = useQuery({
    queryKey: ["allProducts", language],
    queryFn: async () => {
      const res = await axiosSecure.get("/products", {
        params: { language, visibility: "Public" },
      });
      return res?.data && res?.data?.data;
    },
  });

  const {
    data: notifications = [],
    refetch,
    isOrderStatisticsLoading,
  } = useQuery({
    queryKey: ["productNotifications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/productNotification");
      return res.data;
    },
  });
  // console.log(notifications);

  const deleteNotification = async (id) => {
    try {
      await axiosSecure.delete(`/productNotification/${id}`);
      refetch(); // Refresh notifications
      refetchPopularCategories(); // 🔁 Re-trigger backend check
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  if (isOrderStatisticsLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="  py-6 px-8 capitalize ">
      <div className="tittle overflow-hidden">
        <motion.div
          className="tittleLine h-[3px] w-[85%] mx-auto bg-red-500"
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        />
        <h2 className="font-primary text-lg font-medium text-center py-2">
          All Products Length: {allProducts.length}
        </h2>
        <motion.div
          className="tittleLine h-[3px] w-[85%] mx-auto bg-red-500"
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      {/* 📦 Order Notifications */}
      <div className="bg-green-400 dark:bg-green-900 flex flex-col gap-2 p-10 mt-8 rounded shadow-md">
        <h3 className="text-dark font-primary text-lg font-normal flex justify-center items-center gap-1">
          <MdNotificationsActive />
          <span>Order Notifications</span>
        </h3>

        {notifications.filter(
          (note) =>
            note.type === "order-placed" || note.type === "order-cancelled"
        ).length === 0 ? (
          <div className="flex justify-center items-center gap-2 text-dark mt-6">
            <TfiFaceSad />
            <p className="text-md text-center font-thin">
              No order Placed or Cancelled
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-center gap-x-6 gap-y-2">
            {/* 🛒 New Orders */}
            {notifications.some((note) => note.type === "order-placed") && (
              <div className="newOrderWrapper flex flex-col gap-2">
                <div className="flex  justify-between items-center py-3 px-10 mt-6 rounded bg-gray-50 dark:bg-gray-800  duration-300 hover:shadow-md w-full mx-auto">
                  <p className="text-lg w-full text-center py-6">
                    New order placed:{" "}
                    <span className="text-2xl font-bold ml-3 text-lime-700">
                      {
                        notifications.filter((n) => n.type === "order-placed")
                          .length
                      }
                    </span>
                  </p>
                </div>
                <div className=" flex justify-center items-center">
                  <button
                    onClick={() =>
                      notifications
                        .filter((n) => n.type === "order-placed")
                        .forEach((n) => deleteNotification(n._id))
                    }
                    className="px-6 py-2 font-light bg-red-500 hover:bg-red-700 rounded-md flex justify-center items-center gap-3 text-dark hover:shadow-md duration-200 transition-all ease-out"
                  >
                    <FaTrashAlt size={20} />
                    <span className="text-xl">Delete</span>
                  </button>
                </div>
              </div>
            )}
            {/* Cancelled Orders */}
            {notifications.some((note) => note.type === "order-cancelled") && (
              <div className="cancelledOrderWrapper flex flex-col gap-2">
                <div className="flex justify-between items-center py-3 px-10 mt-6 rounded bg-gray-50 dark:bg-gray-800 duration-300 hover:shadow-md w-full mx-auto">
                  <p className="text-lg w-full text-center py-6">
                    Order cancelled:{" "}
                    <span className="text-2xl font-bold ml-3 text-red-700">
                      {
                        notifications.filter(
                          (n) => n.type === "order-cancelled"
                        ).length
                      }
                    </span>
                  </p>
                </div>
                <div className=" flex justify-center items-center">
                  <button
                    onClick={async () => {
                      const cancelled = notifications.filter(
                        (n) => n.type === "order-cancelled"
                      );
                      await Promise.all(
                        cancelled.map((n) => deleteNotification(n._id))
                      );
                    }}
                    className="px-6 py-2 font-light bg-red-500 hover:bg-red-700 rounded-md flex justify-center items-center gap-3 text-dark hover:shadow-md duration-200 transition-all ease-out"
                  >
                    <FaTrashAlt size={20} />
                    <span className="text-xl">Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-2 mt-6">
        {/* 🔹 Product Stock Alerts */}
        <div className="bg-rose-400 dark:bg-rose-900 flex flex-col gap-2 p-10 w-full rounded shadow-lg">
          <h3 className="font-primary text-lg font-medium flex items-center gap-1">
            <AiOutlineStock />
            <span>Product Stock Alerts</span>
          </h3>
          {notifications.filter((note) => note.title).length === 0 && (
            <div className="flex items-center gap-2 text-dark mt-6">
              <TfiCommentsSmiley />
              <p className="text-md text-center font-thin">
                Wow ! You have sufficent Product
              </p>
            </div>
          )}
          {notifications
            .filter((note) => note.title)
            .map((note) => (
              <ul
                key={note._id}
                className="flex justify-between items-center py-3 px-5 rounded bg-gray-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:bg-gray-800 duration-300 hover:shadow-md"
              >
                <li className="text-sm  ">{note.message}</li>
                <button
                  onClick={() => deleteNotification(note._id)}
                  className="p-3 bg-red-600 rounded-full text-dark hover:bg--600 "
                >
                  <FaTrashAlt />
                </button>
              </ul>
            ))}
        </div>
        {/* 🔸 Category Stock Alerts */}
        <div className="bg-blue-400 dark:bg-blue-900 flex flex-col gap-2 p-10 w-full rounded shadow-lg">
          <h3 className="font-primary text-lg font-medium flex items-center gap-1">
            <MdCategory />
            <span>Category Stock Alerts</span>
          </h3>
          {notifications.filter((note) => note.category).length === 0 && (
            <div className="flex items-center gap-2 text-dark mt-6">
              <TfiCommentsSmiley />
              <p className="text-md text-center font-thin">
                Wow ! Your category have sufficent Product.
              </p>
            </div>
          )}
          {notifications
            .filter((note) => note.category)
            .map((note) => (
              <ul
                key={note._id}
                className="flex   justify-between items-center border py-3 px-5 rounded bg-gray-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:bg-gray-800 dark:border-none duration-300 hover:shadow-md"
              >
                <li className="text-sm  ">{note.message}</li>
                <button
                  onClick={() => deleteNotification(note._id)}
                  className="p-3 bg-red-600 rounded-full text-dark hover:bg--600 "
                >
                  <FaTrashAlt />
                </button>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
