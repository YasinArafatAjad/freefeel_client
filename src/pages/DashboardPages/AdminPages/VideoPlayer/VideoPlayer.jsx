import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaPlay, FaVolumeMute, FaVolumeUp, FaTimes, FaRegEdit } from "react-icons/fa";
import UpdateSettings from "../UpdateSettings/UpdateSettings";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";

const VideoPlayer = () => {
  const { isWebsiteInfoLoading, websiteInfo } = useWebsiteInfo();
  const [isUpdateInfo, setIsUpdateInfo] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoUrl = websiteInfo?.youtubeVideo;
  const thumbnailUrl = websiteInfo?.youtubeVideoThumbnail;

  if (isWebsiteInfoLoading) {
    return <Loader />;
  }

  if (!videoUrl || !thumbnailUrl) {
    return (
      <div className="text-center text-white py-20">
        <p>🚫 Unable to load video content. Please update video settings or check ad blockers.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded">
      <Helmet>
        <title>FreeFeel | Dashboard - Video Ads</title>
        <meta name="description" content="Explore video ads on the FreeFeel Dashboard." />
      </Helmet>
      {isUpdateInfo ? (
        <div>
          <UpdateSettings isUpdateInfo={isUpdateInfo} setIsUpdateInfo={setIsUpdateInfo}></UpdateSettings>
        </div>
      ) : (<>
        <div className="px-4 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
          <h3 className="font-primary text-lg font-medium">Video Ads</h3>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsUpdateInfo("Video Ads")}
              className="w-auto h-9 flex justify-center items-center gap-1.5 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 px-2.5 rounded text-white dark:text-white"
            >
              <FaRegEdit size={16}></FaRegEdit>
              <span className="text-[15px] font-primary font-medium">Update</span>
            </button>
          </div>
        </div>
        <section className="py-20 bg-gradient-to-br from-dark-900 via-black to-primary-900 relative overflow-hidden">
          {/* Background floating particles */}
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

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {!isPlaying ? (
                  <div
                    className="relative aspect-video bg-cover bg-center cursor-pointer group"
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                    onClick={() => setIsPlaying(true)}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-24 h-24 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center shadow-lg">
                        <FaPlay className="w-8 h-8 text-white ml-1" />
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="relative aspect-video bg-black">
                    <video
                      src={videoUrl}
                      autoPlay
                      muted={isMuted}
                      controls
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlaying(false)}
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg"
                      >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                      </button>
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

      </>
      )}
    </div>
  );
};


export default VideoPlayer;