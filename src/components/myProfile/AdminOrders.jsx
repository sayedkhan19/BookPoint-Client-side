// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const statusColors = {
//   pending: "bg-yellow-100 text-yellow-700",
//   confirmed: "bg-blue-100 text-blue-700",
//   shipped: "bg-purple-100 text-purple-700",
//   delivered: "bg-green-100 text-green-700",
// };

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     const res = await axios.get("http://localhost:5000/orders");
//     setOrders(res.data);
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.patch(`http://localhost:5000/orders/${id}`, { status });
//       toast.success(`Order ${status.toUpperCase()} successfully`);
//       fetchOrders();
//     } catch (err) {
//       toast.error("Failed to update status");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">📦 Admin Orders</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {orders.map(order => (
//           <div
//             key={order._id}
//             className="border rounded-xl shadow-md p-5 bg-white"
//           >
//             <div className="mb-3">
//               <h3 className="font-semibold">Order ID: {order.orderId}</h3>
//               <p className="text-sm text-gray-500">{order.customerName}</p>
//               <p className="text-sm">{order.email}</p>
//             </div>

//             <p className="font-medium mb-2">
//               Total: <span className="font-bold">৳{order.totalAmount}</span>
//             </p>

//             <span
//               className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${statusColors[order.status]}`}
//             >
//               {order.status.toUpperCase()}
//             </span>

//             <div className="grid grid-cols-2 gap-2">
//               {["pending", "confirmed", "shipped", "delivered"].map(st => (
//                 <button
//                   key={st}
//                   onClick={() => updateStatus(order._id, st)}
//                   className={`text-xs py-2 rounded font-medium transition
//                     ${statusColors[st]} hover:opacity-80`}
//                 >
//                   {st}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;
