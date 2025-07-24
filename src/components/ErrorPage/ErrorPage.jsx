import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-full h-screen bg-light dark:bg-dark to-light dark:text-dark flex justify-center items-center">
      <div>
        <h3 className="font-primary text-xl md:text-2xl lg:text-3xl font-bold mb-2.5">404 - Page Not Found!</h3>

        <div className="flex justify-center items-center">
          <Link className="relative px-12 py-4 uppercase text-white text-center transition-all duration-500 bg-gradient-to-r from-[#D31027] via-[#EA384D] to-[#D31027] bg-[length:200%_auto] hover:bg-right shadow-lg shadow-gray-300 rounded-lg flex justify-center items-center gap-1.5">
            <GoHome size={20}></GoHome> Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
