import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
import useLanguage from "../useLanguage/useLanguage";

const useWebsiteInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { language } = useLanguage();

  const {
    isPending: isWebsiteInfoLoading,
    data: websiteInfo = {},
    refetch,
  } = useQuery({
    queryKey: ["websiteInfo", language],
    queryFn: async () => {
      const res = await axiosPublic.get("getWebsiteProfileInformation", {
        params: { language },
      });
      return res?.data && res?.data?.data || [];
    },
    refetchOnWindowFocus: true,
  });

  return { refetch, isWebsiteInfoLoading, websiteInfo };
};

export default useWebsiteInfo;
