import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Forgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { passwordResetEmail } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await passwordResetEmail(data?.email)
        .then(() => {
          Swal.fire({
            text: t("forgot.resetEmailSendMessage"),
            icon: "warning",
          });

          reset();
          navigate("/sign-in-with-email-address");
        })
        .catch((error) => {
          Swal.fire({
            text: "Failed to sent email!",
            icon: "warning",
          });
          console.error(error);
        });
    } catch (error) {
      toast.error("This is an error!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-dark text-light dark:text-dark">
      <Helmet>
        <title>FreeFeel | Reset Your Password</title>
      </Helmet>
      <div className="w-full h-full lg:max-w-2xl lg:mx-auto px-2.5 lg:px-0 py-10 lg:py-5 2xl:py-10">
        <div className="flex flex-col justify-center items-center gap-2.5 mb-5">
          <FaCircleUser className="text-7xl"></FaCircleUser>
          <h1 className="text-2xl font-bold">{t("forgot.title")}</h1>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                placeholder={t("forgot.emailPlaceholder")}
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

            <button
              type="submit"
              className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white text-xl font-semibold flex justify-center items-center gap-2.5"
            >
              {isLoading && <CgSpinner size={24} className="animate-spin"></CgSpinner>}

              <span>{t("forgot.resetPassword")}</span>
            </button>

            <p className="text-center text-[15px] font-medium">
              <Link to="/" className="underline">
                {t("forgot.cancel")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
