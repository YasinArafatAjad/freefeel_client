import FreeFeel_logo_light from "../../assets/logo/Loader/Loader-White-Logo.webp.webp";
import FreeFeel_logo_dark from "../../assets/logo/Loader/Loader-Black-Logo.webp";
import useTheme from "../../hooks/useTheme/useTheme";

const Loader = () => {
  const [theme] = useTheme();

  return (
    <div className="w-full h-full fixed z-[10000] top-0 left-0 bg-white dark:bg-black flex justify-center items-center">
      <img
        src={theme === "light" ? FreeFeel_logo_dark : FreeFeel_logo_light}
        className="w-[150px] h-[80px] lg:w-[200px] lg:h-[100px]"
        alt="FreeFeel logo"
      />
    </div>
  );
};

export default Loader;
