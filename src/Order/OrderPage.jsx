import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  const cartItems = state?.cartItems || [];
  const baseTotal = state?.totalPrice || 0;
  const user = state?.user;

  const deliveryArea = watch("deliveryArea");
  const paymentMethod = watch("paymentMethod");

  /* ================= DELIVERY CHARGE ================= */
  const deliveryCharge = useMemo(() => {
    if (deliveryArea === "inside_dhaka") return 50;
    if (deliveryArea === "outside_dhaka") return 100;
    return 0;
  }, [deliveryArea]);

  const finalTotal = baseTotal + deliveryCharge;

  /* ================= SUBMIT ORDER ================= */
  const onSubmit = async (data) => {
    if (!cartItems.length) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      userId: user.uid,
      userEmail: user.email,
      items: cartItems.map(item => ({
        bookId: item.bookId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: baseTotal,
      deliveryArea: data.deliveryArea,
      deliveryCharge,
      totalAmount: finalTotal,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === "cod" ? "pending" : "unpaid",
      orderStatus: "pending",
    };

    if (data.paymentMethod === "cod") {
      await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(orderData),
      });

      toast.success("Order placed successfully 🎉");
      navigate("/");
      return;
    }

    navigate(`/payment/${data.paymentMethod}`, {
      state: { orderData },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8 text-indigo-600 text-center">
        📦 Complete Your Order
      </h2>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT: FORM ================= */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-semibold">🧍 Customer Information</h3>

          <input
            {...register("name", { required: true })}
            defaultValue={user?.displayName}
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            {...register("email", { required: true })}
            defaultValue={user?.email}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <textarea
            {...register("address", { required: true })}
            placeholder="Full Delivery Address"
            className="w-full px-4 py-3 border rounded-lg h-24"
          />

          {/* DELIVERY */}
          <div className="border p-4 rounded-lg">
            <p className="font-semibold mb-3">📍 Delivery Area</p>

            <label className="flex items-center gap-2">
              <input type="radio" value="inside_dhaka"
                {...register("deliveryArea", { required: true })} />
              Inside Dhaka (৳50)
            </label>

            <label className="flex items-center gap-2 mt-2">
              <input type="radio" value="outside_dhaka"
                {...register("deliveryArea", { required: true })} />
              Outside Dhaka (৳100)
            </label>
          </div>

          {/* PAYMENT */}
          <div className="border p-4 rounded-lg">
            <p className="font-semibold mb-3">💳 Payment Method</p>

            {[
              ["cod", "Cash on Delivery"],
              ["bkash", "bKash"],
              ["nagad", "Nagad"],
              ["stripe", "Stripe"],
            ].map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  value={value}
                  {...register("paymentMethod", { required: true })}
                />
                {label}
              </label>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="submit"
            className="lg:hidden w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            ✅ Confirm Order
          </button>
        </form>

        {/* ================= RIGHT: SUMMARY ================= */}
        <div className="bg-white p-6 rounded-xl shadow h-fit lg:sticky lg:top-24">
          <h3 className="text-lg font-semibold mb-4">🧾 Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{baseTotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>৳{deliveryCharge}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>৳{finalTotal}</span>
            </div>
          </div>

          {/* DESKTOP BUTTON */}
          <button
            onClick={handleSubmit(onSubmit)}
            className="hidden lg:block mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
          >
            ✅ Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
