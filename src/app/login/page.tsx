"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const onSignIn = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", {
        ...user,
      });
      console.log(res);
      router.push("/profile");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen py-2 justify-center items-center color-white flex-col">
      <h1 className="text-center text-white text-3xl">Login</h1>
      <div className="w-[400px]">
        <div className="my-2 f-width">
          <div className="flex flex-col">
            <label htmlFor="Email" className="cursor-pointer">
              Email
            </label>
            <input
              className="p-2 border-white rounded-md active:border-blue outline-none text-black"
              type="text"
              id="Email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>
        <div className="my-2 f-width">
          <div className="flex flex-col">
            <label htmlFor="Password" className="cursor-pointer">
              Password
            </label>
            <input
              className="p-2 border-white rounded-md active:border-blue outline-none text-black"
              type="password"
              id="Password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </div>
        <div className="my-2 w-full">
          <button
            disabled={loading}
            onClick={onSignIn}
            className="border-none outline-none bg-blue-600 p-2 rounded-md w-full mt-3"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        <Link href="/signup">New here?</Link>
      </div>
    </div>
  );
};

export default LoginPage;
