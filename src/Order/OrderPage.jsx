import React from "react";
import { useForm } from "react-hook-form";

const OrderPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Order Info:", data);
    alert("Order placed successfully!");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        📦 Order Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Full Name" className="input" />
        <input {...register("email")} placeholder="Email" className="input" />
        <input {...register("phone")} placeholder="Phone" className="input" />
        <textarea {...register("address")} placeholder="Address" className="input"></textarea>

        <button className="w-full bg-indigo-600 text-white py-3 rounded">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
