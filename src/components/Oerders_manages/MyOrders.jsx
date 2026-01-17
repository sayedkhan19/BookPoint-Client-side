import { useEffect, useState } from "react";
import useAuth from "../useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/orders?email=${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        📦 My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded-lg">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ৳{order.totalAmount}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
