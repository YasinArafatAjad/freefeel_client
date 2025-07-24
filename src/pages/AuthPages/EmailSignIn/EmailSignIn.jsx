import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleUser } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignUp from "../GoogleSignUp/GoogleSignUp";
// import FacebookSignUp from "../FacebookSignUp/FacebookSignUp";
import useAuth from "../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import FacebookSignUp from "../FacebookSignUp/FacebookSignUp";

const EmailSignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { emailSignIn, emailVerification } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail && rememberedPassword) {
      // Set values to default form values
      reset({
        email: rememberedEmail,
        password: rememberedPassword,
      });
    }
  }, [reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await emailSignIn(data?.email, data?.password);
      const user = res?.user;

      if (!user.emailVerified) {
        await emailVerification(user);
        Swal.fire({
          text: t("emailSignIn.existUserMessage"),
          icon: "warning",
        });
        return;
      }

      // Post user information to db
      const loggedUser = {
        name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        addedAt: new Date(user?.metadata?.creationTime).toISOString(),
        emailVerified: user?.emailVerified,
      };

      await axiosPublic
        .post(`/postUser`, loggedUser)
        .then((res) => {
          // Save user email and password to localStorage if 'remember' is checked
          if (data.remember) {
            localStorage.setItem("rememberedEmail", data.email);
            localStorage.setItem("rememberedPassword", data.password);
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
          }

          Swal.fire({
            text:
              `${res?.data?.message}` || t("emailSignIn.loginSuccessMessage"),
            icon: "success",
          });
        })
        .catch((error) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong!";
          Swal.fire({
            text: errorMessage,
            icon: "success",
          });
        });

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-credential") {
        Swal.fire({
          text: t("emailSignIn.emailNotRegisterMessage"),
          icon: "warning",
        });
        navigate("/sign-up-with-email-address");
      } else {
        Swal.fire({
          text: "Login Failed!",
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
        <title>FreeFeel | Sign In</title>
      </Helmet>
      <div className="w-full h-full lg:max-w-2xl lg:mx-auto px-2.5 lg:px-0 py-10 lg:py-5 2xl:py-10">
        <div className="flex flex-col justify-center items-center gap-2.5 mb-5">
          <FaCircleUser className="text-7xl"></FaCircleUser>
          <h1 className="text-2xl font-bold">{t("emailSignIn.title")}</h1>
        </div>

        <div>
          <div className="flex  gap-x-4 justify-center items-center">
            <GoogleSignUp></GoogleSignUp>
            <FacebookSignUp></FacebookSignUp>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
            <div className="relative w-full h-full">
              <input
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder={t("emailSignIn.emailPlaceholder")}
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
                placeholder={t("emailSignIn.passwordPlaceholder")}
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
            <div className="flex items-center justify-between">
            <div className="relative flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="w-4 h-4 hover:cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-[15px] font-medium font-dynamic"
              >
                {t("emailSignIn.rememberMe")}
              </label>
            </div>

              <Link to="/forgot-password" className="underline hover:text-red-500 transition-all ease-linear duration-300">
              {t("emailSignIn.forgotPasswordPageNavigateInstruction")}{" "}
              </Link>
            {/* </p> */}
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white text-xl font-semibold flex justify-center items-center gap-2.5"
            >
              {isLoading && (
                <CgSpinner size={24} className="animate-spin"></CgSpinner>
              )}

              <span>{t("emailSignIn.signInButton")}</span>
            </button>

            <p className="text-center lg:text-center text-[15px] font-medium">
              {t("emailSignIn.emailSignUpPageNavigateInstruction")}{" "}
              <Link to="/sign-up-with-email-address" className="underline">
                {t("emailSignIn.clickHere")}
              </Link>
            </p>
          </form>

          {/* How to order a product video */}
          <Link
            to="https://www.youtube.com/watch?v=FXflfh5jdIc"
            target="_blank"
            className="font-dynamic text-[15px] font-medium text-center bg-gray-200 dark:bg-gray-800 text-light dark:text-dark hover:bg-red-500 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-colors duration-300 w-full h-10 lg:h-12 rounded mt-2.5 flex justify-center items-center"
          >
            {t("emailSignIn.howToSignIn")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailSignIn;
