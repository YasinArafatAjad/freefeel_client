import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { isPending: isEmployeeLoading, data: isEmployee } = useQuery({
    queryKey: [user?.email, "isEmployee"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/${user?.email}`);
      return res?.data && res?.data?.isEmployee || [];
    },
  });

  return { isEmployee, isEmployeeLoading };
};

export default useEmployee;
