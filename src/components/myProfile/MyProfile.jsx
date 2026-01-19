import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/orders/user/${user.email}`)
        .then(res => res.json())
        .then(data => setOrders(data));
    }
  }, [user]);

  const pending = orders.filter(o => o.orderStatus !== "delivered").length;
  const completed = orders.filter(o => o.orderStatus === "delivered").length;

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        👤 My Profile
      </h2>

      <div className="bg-white p-6 rounded-xl shadow">
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> User</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-indigo-50 p-4 rounded">
            <p>Total Orders</p>
            <p className="text-xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <p>Running</p>
            <p className="text-xl font-bold">{pending}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <p>Completed</p>
            <p className="text-xl font-bold">{completed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
