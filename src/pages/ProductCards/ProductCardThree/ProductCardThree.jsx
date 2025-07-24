import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
import { SlideUp } from "../../../animation/animation";
import { motion } from 'framer-motion';

const ProductCardThree = ({ product, index }) => {
  const [imageUrl, setImageUrl] = useState(product?.images?.[0]);

  const handleShowImage = (productId) => {
    if (productId === product?._id) {
      setImageUrl(product?.images?.[1] || product?.images?.[0]);
    }
  };

  const handleResetImage = () => {
    setImageUrl(product?.images?.[0]);
  };
  
  const delay = index * 0.2;
  const discountedPrice = product?.regularPrice - (product?.regularPrice * product?.discountPercentage * 0.01 ) ;

  return (
    <motion.div
      variants={SlideUp(delay)}
      initial="initial"
      whileInView="animate"
      className="relative w-full h-full rounded-md text-light dark:text-dark"
    >
      {/* Product Image */}
      <button
        onMouseEnter={() => handleShowImage(product?._id)}
        onMouseLeave={handleResetImage}
        className="w-full"
      >
        <Link to={`/product-details/${product?.productUrl}`}>
          <LazyLoadImage
            effect="blur"
            delayTime={300}
            src={imageUrl}
            className="w-full h-[250px] md:h-[350px] lg:h-[490px] 2xl:h-[470px] object-cover "
            alt={product?.title}
          />
        </Link>
      </button>

      <Link to={`/product-details/${product?.productUrl}`}>
        <p className="text-[15px] font-primary font-medium text-center mt-1.5">
          {product?.title}
        </p>
      </Link>
      {product?.styleNumber && (
          <div className=" text-gray-500 flex justify-center items-center">
            <span className="text-sm font-primary font-extralight text-center">
              Code: {product?.styleNumber}
            </span>
          </div>
        )} 
        <div className="flex  justify-center items-center gap-2.5 -ml-2">
        {product?.discountPercentage > 0 && (
          <div className="line-through text-gray-500">
            <span className="text-lg font-primary font-bold text-center">
              ৳{product?.regularPrice}
            </span>
          </div>
        )} 
        <div>
          <span className="text-lg font-primary font-bold text-center">
            ৳{product?.discountPercentage !== "" ?  discountedPrice : (product?.regularPrice) }
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardThree;