import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlay, FaTimes, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import BlurText from "../../../../animation/BlurText";

const YoutubeAddVideo = () => {
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Demo video URL - replace with your actual video
  const videoUrl = websiteInfo?.youtubeVideo;
  const thumbnailUrl = websiteInfo?.youtubeVideoThumbnail;
  // console.log(websiteInfo?.youtubeVideoThumbnail, "youtubeVideoThumbnail");
  // console.log(websiteInfo?.youtubeVideo, "youtubeVideo");

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <>
      <div className="bg-light dark:bg-dark text-light dark:text-dark">
        <div className="tittle flex justify-center items-center gap-5 -mb-12">
          {/* line0" /> */}
          <motion.div 
            className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
          <BlurText
            text='Watch Now'
            delay={150}
            animateBy="words"
            direction="top"
            className="text-xl md:text-2xl lg:text-3xl font-bold"
          />
          {/* line0" /> */}
          <motion.div 
            className="tittleLine h-[3px] w-full mt-1.5 bg-red-500"
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <section className="py-20 bg-gradient-to-br from-dark-900 via-black to-primary-900 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-500/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* for home page */}
            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative max-w-[1200px]  mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {!isPlaying ? (
                  // Video Thumbnail
                  <div
                    className="relative aspect-video bg-cover bg-center cursor-pointer group max-h-[65vh] w-full"
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

                    {/* Play Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-24 h-24 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300">
                        <FaPlay className="w-8 h-8 text-white ml-1" />
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  // Video Player
                  <div className="relative aspect-video bg-black max-h-[65vh] w-full">
                    <video
                      src={videoUrl}
                      autoPlay
                      muted={isMuted}
                      controls
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlaying(false)}
                    />

                    {/* Custom Controls Overlay */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors duration-300"
                      >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                      </button>
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors duration-300"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-8 -left-8 w-16 h-16 border-4 border-rose-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-12 h-12 bg-rose-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default YoutubeAddVideo;
