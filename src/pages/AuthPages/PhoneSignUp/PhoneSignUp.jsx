import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth/useAuth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import GoogleSignUp from "../GoogleSignUp/GoogleSignUp";
import FacebookSignUp from "../FacebookSignUp/FacebookSignUp";

const PhoneSignUp = () => {
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { onPhoneSignUp } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async () => {
    const phoneNumber = "+" + phone;
    // console.log("phoneNumber", phoneNumber);
    try {
      const res = await onPhoneSignUp(phoneNumber);
      // console.log("RES INSIDE PHONE SIGNUP", res);
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-dark text-light dark:text-dark">
      <div className="w-full h-full lg:max-w-2xl lg:mx-auto px-2.5 lg:px-0 py-10 lg:py-5 2xl:py-10">
        {showOtp ? (
          <>
            {/* OTP Verification Input */}
            <h1 className="text-2xl font-bold text-center mb-5">আপনার ও টি পি লিখুন </h1>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              // autoFocus={true}
              className="flex justify-center items-center mb-5"
              inputClassName="bg-gray-200 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white text-xl font-semibold flex justify-center items-center gap-2.5"
            >
              {otpVerifyLoading && (
                <>
                  <CgSpinner size={24} className="animate-spin"></CgSpinner>
                  <span>ভেরিফাই হচ্ছে...</span>
                </>
              )}

              <span>ভেরিফাই করুন</span>
            </button>
          </>
        ) : (
          <>
            {/* Phone Number SignUp Form */}
            <h1 className="text-2xl font-bold text-center mb-5">সাইনআপ</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="relative w-full h-full">
                <input
                  {...register("name", { required: "true" })}
                  type="text"
                  placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                  className="w-full h-12 rounded pl-14 bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                  aria-invalid={errors.name ? "true" : "false"}
                />

                <div className="absolute top-0 left-0 bg-light dark:bg-black w-12 h-12 flex justify-center items-center rounded-l">
                  <FaRegUser className="text-2xl lg:text-3xl text-white dark:text-gray-800"></FaRegUser>
                </div>

                {errors.name?.type === "required" && <p role="alert">Name is required</p>}
              </div>

              <div id="recaptcha-container"></div>

              <div className="relative w-full h-full">
                <PhoneInput
                  country={"bd"}
                  onlyCountries={["bd"]}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  containerClass="relative w-full h-12 rounded bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                  inputClass="w-full lg:w-[672px] h-12 rounded-l bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-base font-medium focus:outline-none"
                  searchClass="w-full lg:w-[672px] h-12"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded bg-black dark:bg-black text-white dark:text-white text-xl font-semibold"
              >
                ও টি পি পাঠান
              </button>

              <p className="text-center lg:text-start text-[15px] font-medium">
                ইতিমধ্যে একাউন্ট আছে? তাহল{" "}
                <Link to="/sign-in-with-email-address" className="underline">
                  এখানে চাপুন
                </Link>
              </p>
            </form>
          </>
        )}

        <Link
          to="/sign-up-with-email-address"
          className="w-full h-12 mt-5 rounded bg-gray-200 dark:bg-gray-800 text-light dark:text-dark text-xl font-semibold flex justify-center items-center gap-2.5"
        >
          <MdOutlineEmail className="text-3xl"></MdOutlineEmail>
          <span>ইমেইল দিয়ে সাইনআপ করুন</span>
        </Link>

        <GoogleSignUp></GoogleSignUp>
        <FacebookSignUp></FacebookSignUp>
      </div>
    </div>
  );
};

export default PhoneSignUp;

