import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";

const GoogleSignUp = () => {
  const { googleSignUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await googleSignUp()
        .then(async (res) => {
          const user = res?.user;

          const loggedUser = {
            name: user?.displayName,
            email: user?.email,
            uid: user?.uid,
            addedAt: new Date(user?.metadata?.creationTime).toISOString(),
            emailVerified: user?.emailVerified,
            imageUrl: user?.photoURL,
          };

          await axiosPublic
            .post(`/postUser`, loggedUser)
            .then((res) => {
              Swal.fire({
                text: `${res?.data?.message}` || t("emailSignIn.loginSuccessMessage"),
                icon: "success",
              });
            })
            .catch((error) => {
              const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
              Swal.fire({
                text: errorMessage,
                icon: "success",
              });
            });

          navigate(from, { replace: true });
        })
        .catch((error) => {
          Swal.fire({
            text: "Login Failed!",
            icon: "error",
          });
          console.log(error);
        });
    } catch (error) {
      Swal.fire({
        text: "This is an error!",
        icon: "error",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignUp}
        className="w-full h-12 mt-2.5 md:mt-3 lg:mt-5 rounded bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-xl font-semibold flex justify-center items-center gap-2.5"
      >
        {isLoading ? (
          <>
            <CgSpinner size={30} className="animate-spin"></CgSpinner>
            <span>{t("googleSignUp.loadingText")}</span>
          </>
        ) : (
          <>
           <div className="px-4 flex items-center justify-center gap-1">
             <FcGoogle size={30}></FcGoogle>
            <span className="hidden md:inline-block">{t("googleSignUp.buttonText")}</span>
           </div>
          </>
        )}
      </button>
    </div>
  );
};

export default GoogleSignUp;
