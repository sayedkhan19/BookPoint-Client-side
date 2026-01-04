import React from "react";
import { NavLink, Outlet } from "react-router";
import authImg from "../../assets/book.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">

      {/* Top Logo / Back */}
      <div className="p-4">
        <NavLink
          to="/"
          className="text-3xl font-bold hover:opacity-80 inline-block"
        >
          📚 BookPoint
        </NavLink>
      </div>

      {/* Main Auth Section */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-5xl rounded-xl  overflow-hidden">

          <div className="flex flex-col lg:flex-row">

            {/* Image Section */}
            <div className="hidden lg:flex flex-1 items-center justify-center  p-8">
              <img
                src={authImg}
                alt="Auth Illustration"
                className="max-w-sm w-full object-contain"
              />
            </div>

            {/* Outlet Section */}
            <div className="flex-1 p-6 sm:p-10">
              <Outlet />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
