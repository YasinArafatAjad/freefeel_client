import { motion } from 'framer-motion';

const SlideImage = ({ banner,slide }) => {

  const images =banner?.slideImageUrl?.split(',') || [];

  const gradients = [
    "from-blue-500/30 to-purple-500/30",
    "from-emerald-500/30 to-teal-500/30",
    "from-orange-500/30 to-red-500/30"
  ];

  const floatingColors = [
    { primary: "from-yellow-400 to-orange-500", secondary: "from-pink-400 to-red-500" },
    { primary: "from-emerald-400 to-teal-500", secondary: "from-blue-400 to-indigo-500" },
    { primary: "from-orange-400 to-red-500", secondary: "from-purple-400 to-pink-500" }
  ];

  return (
    <motion.div
      className="w-full flex justify-center items-center px-4 lg:px-0"
      key={`image-container-${slide}`}
      initial={{ x: 100, opacity: 0, scale: 0.8 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 100, opacity: 0, scale: 0.8 }}
      transition={{ 
        delay: 0.5, 
        duration: 0.8,
        type: "spring",
        stiffness: 100 
      }}
    >
      <div className="relative">
        {/* Main Product Image */}
        <motion.div
          className="relative z-10"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <motion.img
            src={images[slide]}
            alt={`Premium Product ${slide + 1}`}
            className="w-64 h-32 lg:h-auto sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl lg:rounded-3xl shadow-2xl"
            loading="lazy"
            key={`image-${slide}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>
        {/* Floating elements */}
        <motion.div
          className={`absolute -top-4 -left-4 lg:-top-8 lg:-left-8 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-br ${floatingColors[slide].primary} rounded-full opacity-80`}
          key={`float1-${slide}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.8, 1, 0.8],
            scale: [0, 1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />

        <motion.div
          className={`absolute -bottom-3 -right-3 lg:-bottom-6 lg:-right-6 w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-br ${floatingColors[slide].secondary} rounded-full opacity-70`}
          key={`float2-${slide}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            opacity: [0.7, 1, 0.7],
            scale: [0, 1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.3,
          }}
        />
      </div>
    </motion.div>
  );
};

export default SlideImage;