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