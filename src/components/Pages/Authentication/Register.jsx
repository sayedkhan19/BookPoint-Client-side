import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../useAuth";
import toast from "react-hot-toast";
import axios from "axios";

/* 🔹 Axios instance */
const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});

const Register = () => {
  const { createUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ================= EMAIL/PASSWORD REGISTER ================= */
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user",          // ✅ default role
          provider: "password",  // auth method
        };

        // Save user to DB
        axiosPublic.post("/users", userInfo).then(() => {
          toast.success("Account created successfully 🎉");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  /* ================= GOOGLE REGISTER / LOGIN ================= */
  const handleGoogleRegister = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

        const userInfo = {
          name: user.displayName || "Anonymous",
          email: user.email,
          role: "user",         // ✅ default role
          provider: "google",
        };

        // Save user to DB (first time only)
        axiosPublic.post("/users", userInfo).then(() => {
          toast.success("Signed in with Google 🎉");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        toast.error("Google sign-in failed");
        console.error(error);
      });
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

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
                message: "Invalid email",
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 6 characters"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
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
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
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
        className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <NavLink to="/login" className="text-indigo-600 hover:underline">
          Login
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
