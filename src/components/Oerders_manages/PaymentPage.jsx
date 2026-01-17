import { useLocation, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const PaymentPage = () => {
    const { method } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const orderData = state?.orderData;

  const handlePayment = async () => {
    const paidOrder = {
      ...orderData,
      paymentStatus: "paid",
      orderStatus: "confirmed",
      createdAt: new Date(),
    };

    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(paidOrder),
    });

    const result = await res.json();

    toast.success("Payment successful ✅");
    navigate("/order-success", { state: { order: result } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {method} Payment
        </h2>

        <p className="text-gray-600 mb-6">
          This is a mock payment page
        </p>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Pay ৳{orderData?.totalAmount}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

    
  