
import "keen-slider/keen-slider.min.css";


import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import Loader from "../../../../components/Loader/Loader";

import "react-lazy-load-image-component/src/effects/blur.css";
import Slide_1 from "../../../../_components/slide_1/Slide_1";
import Slide_2 from "../../../../_components/slide_2/Slide_2";
import Slide_3 from "../../../../_components/slide_3/Slide_3";
import Slide_4 from "../../../../_components/slide_4/Slides_4";


const Banner = () => {
  

  const axiosPublic = useAxiosPublic();


  const {
    isPending: isAllBannersLoading,
    data: allBanners = [],

  } = useQuery({
    queryKey: ["allBanners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBanners");
      return res?.data && res?.data?.data;
    },
  });
 



  if (isAllBannersLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="">
      {
        allBanners.map((banner) => (
        <div key={banner?._id}>
          {banner?.layout === "layout-1" && <Slide_1 banner={banner}  />}
          {banner?.layout === "layout-2" && <Slide_2 banner={banner}   />}
          {banner?.layout === "layout-3" && <Slide_3 banner={banner}  />}
          {banner?.layout === "layout-4" && <Slide_4 banner={banner}  />}
        </div>

        ))
      }
    </div>
  );
};

export default Banner;


