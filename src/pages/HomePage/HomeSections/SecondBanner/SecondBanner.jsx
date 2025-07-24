import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import Loader from "../../../../components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";

const SecondBanner = () => {
  const axiosPublic = useAxiosPublic();

  const { isPending: isAllSecondBannersLoading, data: allSecondBanners = [] } = useQuery({
    queryKey: ["allSecondBanners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBanners", {
        params: { section: "Second Banner" },
      });
      return res?.data?.data || [];
    },
  });

  if (isAllSecondBannersLoading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full h-full mb-5 lg:mb-10">
      {allSecondBanners?.length > 0 ? (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full overflow-hidden"
        >
          {allSecondBanners?.map((slider) => (
            <SwiperSlide key={slider?._id} className="relative w-full h-full">
              <Link to={slider?.categoryUrl ? `/category/${slider?.categoryUrl}` : ""}>
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <img
                    src={slider?.imageUrl}
                    alt="Slider Image"
                    className="w-full lg:max-w-full xl:max-w-full 2xl:max-w-full h-[200px] md:h-[385px] lg:h-[475px] xl:h-[675px] 2xl:h-[950px] bg-center bg-cover"
                  />
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>
          <p className="font-primary text-[15px] font-medium text-center">
            We are sorry, but there are no images available at the moment!
          </p>
        </div>
      )}
    </div>
  );
};

export default SecondBanner;
