import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../useAuth/useAuth";

const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    isPending: isProfileDataLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "profileData"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUserByEmail/${user?.email}`);
      return res.data || [];
    },
    initialData: false,
  });

  const profileData = data?.data;

  return { profileData, isProfileDataLoading, refetch };
};

export default useUser;
