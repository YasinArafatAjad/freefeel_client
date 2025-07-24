import { useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import {
  getAuth,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  // FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithCredential
} from "firebase/auth";

const FacebookSignUp = () => {
  const { facebookSignUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { t } = useTranslation();

  const handleFacebookSignUp = async () => {
    setIsLoading(true);
    try {
      const res = await facebookSignUp(); // Sign in with Facebook
      const user = res?.user;
      console.log(user);
      // Post user information to db
      navigate("/");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = error.credential;
        const email = error.customData.email;

        fetchSignInMethodsForEmail(auth, email).then((methods) => {
          if (methods.includes("google.com")) {
            toast.warn("ফেসবুকের ইমেইলটি গুগল/ইমেইল অ্যাকাউন্ট দিয়ে আগে রেজিস্ট্রেশন করা হয়েছে। অন্য অপশন দিয়ে লগইন করুন।");

            const googleProvider = new GoogleAuthProvider();

            signInWithPopup(auth, googleProvider)
              .then((result) => {
                // Link Facebook credential
                return linkWithCredential(result.user, pendingCred);
              })
              .then(() => {
                toast.success("ফেসবুক অ্যাকাউন্ট সফলভাবে যুক্ত হয়েছে!");
                navigate("/");
              })
              .catch((linkError) => {
                console.error("Linking error:", linkError);
                toast.error("অ্যাকাউন্ট যুক্ত করতে সমস্যা হয়েছে।");
              });
          } else {
            toast.error("এই ইমেইলটি অন্য অ্যাকাউন্টের সাথে যুক্ত রয়েছে।");
          }
        });
      } else if (error.code === "auth/popup-closed-by-user") {
        toast.warn("আপনি লগইন পপআপ বন্ধ করে দিয়েছেন।");
      } else {
        toast.error("লগইন ব্যর্থ হয়েছে!");
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleFacebookSignUp}
        className="w-full h-12 mt-2.5 md:mt-3 lg:mt-5 rounded bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-xl font-semibold flex justify-center items-center gap-2.5"
      >
        {isLoading ? (
          <>
            <CgSpinner size={30} className="animate-spin" />
            <span>আপেক্ষা করুন, লগইন হচ্ছে</span>
          </>
        ) : (
          <>
          <div className="px-4 flex items-center justify-center gap-1">
            <FaFacebook size={30} className="text-blue-500" />
            <span className="hidden md:inline-block">{t("fbSignUp.buttonText")}</span>
          </div>
          </>
        )}
      </button>
    </div>
  );
};

export default FacebookSignUp;
