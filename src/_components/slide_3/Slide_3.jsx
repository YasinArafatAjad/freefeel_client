import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideContent from './SlideContent';
import { getCurrentLanguage } from '../../hooks/translationLoader/translationLoader';


const Slide_3 = ({ banner }) => {

  
  // console.log(banner, "banner-3");
  const [currentSlide, setCurrentSlide] = useState(0);


 


  const language = getCurrentLanguage();
      const getLocalizedField = (en, bn) => {
        return language === "ban" && bn?.trim() ? bn : en;
      };
    
      const slideTitle = getLocalizedField(banner?.slideTitle, banner?.slideTitleBangla);
      const slideSubtitle = getLocalizedField(banner?.slideSubtitle, banner?.slideSubtitleBangla);
      const slideDescription = getLocalizedField(banner?.slideDescription, banner?.slideDescriptionBangla);

      const title=slideTitle?.split(',') || [];
      const subtitle=slideSubtitle?.split(',') || [];
      const description=slideDescription?.split(',') || [];

  const imageUrls = banner?.slideImageUrl?.split(',') || [];

  const slides = [
    {
      id: 1,
      title:[title[0] || "Summer Collection"],
      subtitle: [subtitle[0] || "Fashion Trends"],
      description:
        [description[0] || "Discover the latest trends in our summer collection with vibrant colors and styles."],
    },
    {
      id: 2,
      title:[title[1] || "Urban Vibes"],
      subtitle: [subtitle[1] || "Street Style"],
      description:[description[1] || "Embrace the city life with our urban-inspired outfits that blend comfort and style."],
    },
    {
      id: 3,
      title: [title[2] || "Luxury Line"],
      subtitle: [subtitle[2] || "Elegance Redefined"],
      description:
       [description[2] || "Experience the pinnacle of luxury with our meticulously crafted outfits that redefine sophistication."],
    },
  ].map((slide, index) => ({
    ...slide,
    image: imageUrls[index] || "", // fallback to empty string if image is missing
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className=" h-[65vh] lg:h-[70vh] relative overflow-hidden bg-black py-8">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <SlideContent
            slide={slides[currentSlide]}
            isActive={true}
            banner={banner}
          />
        </motion.div>
      </AnimatePresence>

      {/* Side Navigation */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-4">
          <motion.button
            className="w-12 h-12 rounded-full bg-black/70 bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <motion.button
            className="w-12 h-12 rounded-full bg-black/70 bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Slide_3;