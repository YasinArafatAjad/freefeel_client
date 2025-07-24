import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignUp from "../GoogleSignUp/GoogleSignUp";
// import FacebookSignUp from "../FacebookSignUp/FacebookSignUp";
import useAuth from "../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Helmet } from "react-helmet-async";
import FacebookSignUp from "../FacebookSignUp/FacebookSignUp";

const EmailSignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { emailSignUp, updateName, emailVerification, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await emailSignUp(data?.email, data?.password);
      const user = res?.user;

      await updateName(data?.name);
      await emailVerification(user);

      // Save user email and password to localStorage if 'remember' is checked
      if (data.remember) {
        localStorage.setItem("rememberedEmail", data.email);
        localStorage.setItem("rememberedPassword", data.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      Swal.fire({
        text: t("emailSignUp.emailVerifyMessage"),
        icon: "info",
      });

      await logout();

      navigate("/sign-in-with-email-address");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          text: t("emailSignUp.existUserMessage"),
          icon: "warning",
        });
        navigate("/sign-in-with-email-address");
      } else {
        Swal.fire({
          text: "Registration Failed!",
          icon: "error",
        });
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | Sign Up</title>
      </Helmet>
      <div className="w-full h-full lg:max-w-2xl lg:mx-auto px-2.5 lg:px-0 py-10 lg:py-5 2xl:py-10">
        <div className="flex justify-center items-center mb-5">
          <h1 className="text-2xl font-bold">{t("emailSignUp.title")}</h1>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative w-full h-full">
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder={t("emailSignUp.namePlaceholder")}
                className="w-full h-12 rounded pl-14 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                aria-invalid={errors.name ? "true" : "false"}
              />

              <div className="absolute top-0 left-0 bg-black dark:bg-black w-12 h-12 flex justify-center items-center rounded-l">
                <FaRegUser className="text-2xl lg:text-3xl text-gray-200 dark:text-gray-800"></FaRegUser>
              </div>

              {errors.name && (
                <p role="alert" className="text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative w-full h-full">
              <input
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder={t("emailSignUp.emailPlaceholder")}
                className="w-full h-12 rounded pl-14 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                aria-invalid={errors.email ? "true" : "false"}
              />

              <div className="absolute top-0 left-0 bg-black dark:bg-black w-12 h-12 flex justify-center items-center rounded-l">
                <MdOutlineEmail className="text-2xl lg:text-3xl text-gray-200 dark:text-gray-800"></MdOutlineEmail>
              </div>

              {errors.email && (
                <p role="alert" className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative w-full h-full">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPass ? "text" : "password"}
                placeholder={t("emailSignUp.passwordPlaceholder")}
                className="w-full h-12 rounded pl-14 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                aria-invalid={errors.password ? "true" : "false"}
              />

              <div className="absolute top-0 left-0 bg-black dark:bg-black w-12 h-12 flex justify-center items-center rounded-l">
                <RiLockPasswordFill className="text-2xl lg:text-3xl text-gray-200 dark:text-gray-800"></RiLockPasswordFill>
              </div>

              <span
                onClick={() => setShowPass(!showPass)}
                className="text-2xl text-black absolute top-3.5 right-2.5 cursor-pointer"
              >
                {showPass ? <IoEye></IoEye> : <IoEyeOff></IoEyeOff>}
              </span>

              {errors.password && (
                <p role="alert" className="text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative w-full h-full">
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                type={showConfirmPass ? "text" : "password"}
                placeholder={t("emailSignUp.confirmPasswordPlaceholder")}
                className="w-full h-12 rounded pl-14 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />

              <div className="absolute top-0 left-0 bg-black dark:bg-black w-12 h-12 flex justify-center items-center rounded-l">
                <RiLockPasswordFill className="text-2xl lg:text-3xl text-gray-200 dark:text-gray-800"></RiLockPasswordFill>
              </div>

              <span
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="text-2xl text-black absolute top-3.5 right-2.5 cursor-pointer"
              >
                {showConfirmPass ? <IoEye></IoEye> : <IoEyeOff></IoEyeOff>}
              </span>

              {errors.confirmPassword && (
                <p role="alert" className="text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="relative w-full h-full flex items-center gap-2">
              <input type="checkbox" id="remember" {...register("remember")} className="w-4 h-4 hover:cursor-pointer" />
              <label htmlFor="remember" className="text-[15px] font-medium font-dynamic">
                {t("emailSignIn.rememberMe")}
              </label>
            </div>

            <p className="text-center lg:text-start text-[15px] font-medium">{t("emailSignUp.passwordInstructions")}</p>

            <button
              type="submit"
              className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white text-xl font-semibold flex justify-center items-center gap-2.5"
            >
              {isLoading && <CgSpinner size={24} className="animate-spin"></CgSpinner>}

              <span>{t("emailSignUp.signUpButton")}</span>
            </button>

            <p className="text-center lg:text-start text-[15px] font-medium">
              {t("emailSignUp.emailSignInPageNavigateInstruction")}{" "}
              <Link to="/sign-in-with-email-address" className="underline">
                {t("emailSignUp.clickHere")}
              </Link>
            </p>
          </form>

          {/* <Link
            to="/sign-up-with-phone-number"
            className="w-full h-12 mt-2.5 md:mt-3 lg:mt-5 rounded bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-xl font-semibold flex justify-center items-center gap-2.5"
          >
            <MdOutlinePhone className="text-3xl"></MdOutlinePhone>
            <span>ফোন নাম্বার দিয়ে সাইনআপ করুন</span>
          </Link> */}

          <GoogleSignUp></GoogleSignUp>
          <FacebookSignUp></FacebookSignUp>

          {/* How to order a product video */}
          <Link
            to="https://www.youtube.com/watch?v=FXflfh5jdIc"
            target="_blank"
            className="font-dynamic text-[15px] font-medium text-center bg-gray-200 dark:bg-gray-800 text-light dark:text-dark hover:bg-red-500 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-colors duration-300 w-full h-10 lg:h-12 rounded mt-2.5 flex justify-center items-center"
          >
            {t("emailSignUp.howToSignUp")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailSignUp;
