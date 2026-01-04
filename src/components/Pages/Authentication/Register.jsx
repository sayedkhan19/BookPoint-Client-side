import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    // Firebase createUserWithEmailAndPassword later
    console.log("Register Data:", data);
    alert("Account created successfully (Firebase will be added later)");
  };

  const handleGoogleRegister = () => {
    alert("Google signup (Firebase will be added later)");
  };

  return (
    <div className="w-full">

      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
        📚 Create Account
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Join BookPoint and start reading
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition"
        >
          Register
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t"></div>
        <span className="px-3 text-sm text-gray-500">OR</span>
        <div className="flex-grow border-t"></div>
      </div>

      {/* Google Signup */}
      <button
        onClick={handleGoogleRegister}
        className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-sm font-medium">
          Continue with Google
        </span>
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <NavLink to={"/login"}><a href="/auth/login" className="text-indigo-600 hover:underline">
          Login
        </a></NavLink>
      </p>
    </div>
  );
};

export default Register;
