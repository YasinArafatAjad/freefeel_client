import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { isPending: isAdminLoading, data: isAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/${user?.email}`);
      return res?.data && res?.data?.isAdmin || [];
    },
  });

  return { isAdmin, isAdminLoading };
};

export default useAdmin;
