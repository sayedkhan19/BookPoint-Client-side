import { useLocation, useNavigate } from "react-router";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
    const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <CheckCircle size={60} className="mx-auto text-green-500 mb-4" />

        <h2 className="text-2xl font-bold mb-2">
          Order Placed Successfully 🎉
        </h2>

        <p className="text-gray-600 mb-4">
          Thank you for your order!
        </p>

        <div className="text-sm text-left space-y-2 bg-gray-50 p-4 rounded-lg">
          <p><strong>Order ID:</strong> {order?._id}</p>
          <p><strong>Total:</strong> ৳{order?.totalAmount}</p>
          <p><strong>Payment:</strong> {order?.paymentMethod}</p>
          <p><strong>Status:</strong> {order?.orderStatus}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg"
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;


    
    
  