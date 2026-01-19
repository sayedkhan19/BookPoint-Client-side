import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { googleLogin, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, formState: { errors } } = useForm();

  /* ================= EMAIL LOGIN ================= */
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Login successful 📚");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Invalid email or password");
      });
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      // 🔥 save google user ONLY IF NOT EXISTS
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          provider: "google",
        }),
      });

      toast.success("Logged in with Google 🎉");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl">

        <h2 className="text-2xl font-bold text-center text-indigo-600">
          BookPoint Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="input"
          />

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="input"
          />

          <button className="btn-primary w-full">Login</button>
        </form>

        <div className="my-4 text-center">OR</div>

        <button onClick={handleGoogleLogin} className="btn-outline w-full">
          Continue with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <NavLink to="/register" className="text-indigo-600">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
