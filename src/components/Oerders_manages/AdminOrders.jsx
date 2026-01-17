import { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(() => {
      setOrders(prev =>
        prev.map(o =>
          o._id === id ? { ...o, orderStatus: status } : o
        )
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        🛠 Admin Order Management
      </h2>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="border p-4 rounded-lg">
            <p><strong>User:</strong> {order.userEmail}</p>
            <p><strong>Total:</strong> ৳{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>

            <div className="flex gap-2 mt-2">
              {["pending", "confirmed", "shipped", "delivered"].map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(order._id, s)}
                  className="px-3 py-1 border rounded"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
