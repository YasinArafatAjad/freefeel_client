import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useCustomer = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { isPending: isCustomerLoading, data: isCustomer } = useQuery({
    queryKey: [user?.email, "isCustomer"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/customer/${user?.email}`);
      return res?.data && res?.data?.isCustomer || [];
    },
  });

  return { isCustomer, isCustomerLoading };
};

export default useCustomer;
