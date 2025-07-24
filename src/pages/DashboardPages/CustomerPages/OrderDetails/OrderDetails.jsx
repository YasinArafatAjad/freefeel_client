import { Helmet } from "react-helmet-async";
import Loader from "../../../../components/Loader/Loader";
import useUser from "../../../../hooks/useUser/useUser";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CustomerInvoice from "../CustomerInvoice/CustomerInvoice";

const OrderDetails = () => {
  const { profileData, isProfileDataLoading } = useUser();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  // Fetch a specific order
  const { isPending: isOrderLoading, data: order = {} } = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getOrderById/${id}`);
      return res?.data && res?.data?.data;
    },
    refetchOnWindowFocus: true,
  });

  //   console.log(order);

  if (isProfileDataLoading || isOrderLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-white dark:bg-black">
      <Helmet>
        <title>FreeFeel | Order History - {profileData?.name ? profileData?.name : "Your Name"}</title>
      </Helmet>

      <div className="px-2.5 py-1.5 lg:px-5 lg:py-2.5">
        <CustomerInvoice order={order}></CustomerInvoice>
      </div>
    </div>
  );
};

export default OrderDetails;
