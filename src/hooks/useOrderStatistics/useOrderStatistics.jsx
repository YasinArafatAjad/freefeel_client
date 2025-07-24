
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useOrderStatistics = () => {
     const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["orderStatistics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getOrdersStatistics");
      return res?.data || [];
    },
    refetchInterval: 3000, // ⏱️ auto-refresh every 3s
  });
};

export default useOrderStatistics;