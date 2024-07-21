"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("api/users/me");
      console.log(res.data.data._id);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out");
      router.push("/login ");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div>
        <h1>Profile Page</h1>
        <hr />
        <h2>
          {data === "" ? (
            "No Data found"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <hr />
        <button onClick={logout}>logout</button>
        <button onClick={getUserDetails}>Get User Detail</button>
      </div>
    </>
  );
}
