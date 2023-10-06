"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/logout");
      toast.success("Successfully logged out");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setUserLoading(true);
    try {
      const user = await axios.get("/api/users/me");
      console.log(user);
      setUserId(user?.data.data._id);
    } catch (error: any) {
      toast.error("Error on fetching user");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (userLoading)
    return (
      <div className="flex h-screen py-2 justify-center items-center color-white flex-col">
        <h1 className="text-center text-white text-3xl">Loading...</h1>
      </div>
    );

  return (
    <div className="flex h-screen py-2 justify-center items-center color-white flex-col">
      <h1 className="text-center text-white text-3xl">Profile</h1>
      <ul className="list-none text-white">
        <li
          onClick={() => router.push(`/profile/${userId}`)}
          className="text-white w-[400px] flex items-center justify-between  p-2 text-red-500 rounded hover:cursor-pointer"
        >
          <span>Id</span>
          <span>{userId}</span>
        </li>
      </ul>
      <button
        disabled={loading}
        onClick={handleLogout}
        className="border-none outline-none bg-blue-600 p-2 rounded-md w-full mt-3 max-w-sm"
      >
        {loading ? "Loading..." : "Logout"}
      </button>
    </div>
  );
};

export default Profile;
