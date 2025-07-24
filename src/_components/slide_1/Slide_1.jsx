import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Box } from '@mui/material';
import SlideContent from './SlideContent';
import SlideImage from './SlideImage';
import AnimatedSVG from './AnimatedSVG';

const Slide_1 = ({banner}) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const gradients = [
    "from-slate-900 via-purple-900 to-slate-900",
    "from-slate-900 via-emerald-900 to-slate-900",
    "from-slate-900 via-blue-900 to-slate-900"
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 700000); // 7 seconds per slide

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <>
      <div className={`slide_1 bg-gradient-to-br ${gradients[currentSlide]} h-[68vh] py-10 flex items-center justify-center overflow-hidden`}>
        <div className="slideWrapper flex flex-col-reverse lg:flex-row items-center justify-center gap-4">
          <div className="leftContetnt">
            <SlideContent slide={currentSlide} banner={banner} />
          </div>
          <div className="rightContent">
            <SlideImage slide={currentSlide} banner={banner} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slide_1;