import { useState } from "react";
import Bkash from "../../assets/paymentOptionImage/bkash.jpg";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const BkashPayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleBkashPayment = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axiosSecure.post("/bkash/create-payment", {
        amount: 1000,
        orderID: "ORD1020069",
        intent: "sale",
      });

      setPaymentData(response.data);
      console.log("Payment Created:", response.data);

      // Optional: redirect to payment URL if returned
      // if (response.data?.bkashURL) window.location.href = response.data.bkashURL;

    } catch (err) {
      console.error("Bkash Payment Error:", err);
      setError(
        err.response?.data?.error || err.message || "Payment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={Bkash}
        alt="bKash payment"
        className="w-[150px] h-[80px] cursor-pointer object-cover"
        onClick={handleBkashPayment}
      />

      {loading && <p className="mt-2 text-blue-500">Processing payment...</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      {paymentData && (
        <div className="mt-4 p-4 rounded bg-green-50 text-green-700 w-full max-w-md text-sm">
          <p className="font-medium mb-2">Payment Created Successfully!</p>
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(paymentData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BkashPayment;