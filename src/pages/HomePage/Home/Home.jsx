import AllProducts from "../HomeSections/AllProducts/AllProducts";
import TopBanner from "../HomeSections/TopBanner/TopBanner";
import DiscountCode from "../HomeSections/DiscountCode/DiscountCode";
import MostPopularSlide from "../HomeSections/MostPopularSlide/MostPopularSlide";
import NewArrivalSlide from "../HomeSections/NewArrivalSlide/NewArrivalSlide";
import YoutubeAddVideo from "../HomeSections/YoutubeAddVideo/YoutubeAddVideo";
import FeaturesSection from "../HomeSections/FeaturesSection/FeaturesSection";
import { Helmet } from "react-helmet-async";
import PopularCategories from "../HomeSections/PopularCategories/PopularCategories";
// import SecondBanner from "../HomeSections/SecondBanner/SecondBanner";
import useWebsiteInfo from "../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../components/Loader/Loader";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Home = () => {
  const location = useLocation();
  useEffect(() => {
    // Initialize Google Analytics
   ReactGA.initialize(import.meta.env.VITE_REACT_APP_GA_MEASUREMENT_ID);
   

   ReactGA.send({
     hitType: "pageview",
     page: location.pathname,
     title: document.title,
   });

   ReactGA.event({
     category: "Page View",
     action: "Home Page",
   });
  }, [ location.pathname]);

  // console.log(import.meta.env.VITE_REACT_APP_GA_MEASUREMENT_ID);


  
  const { websiteInfo, isWebsiteInfoLoading } = useWebsiteInfo();

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const sections = websiteInfo?.sections || [];

  return (
    <div>
      <Helmet>
        <title>FreeFeel | E-commerce Shopping Platform</title>
      </Helmet>

      {/* Dynamically Render Sections Based on `sections` Array */}
      {sections.includes("Top Banner") && <TopBanner />}
      {sections.includes("Categories") && <PopularCategories />}
      {sections.includes("All Products") && <AllProducts />}
      {sections.includes("New Arrival") && <NewArrivalSlide />}
      {sections.includes("Second Banner") && <TopBanner />}
      {sections.includes("Most Popular") && <MostPopularSlide />}
      {sections.includes("Video Ads") && <YoutubeAddVideo />}
      {sections.includes("Discount Offer") && <DiscountCode />}
      {sections.includes("Features") && <FeaturesSection />}
    </div>
  );
};

export default Home;
