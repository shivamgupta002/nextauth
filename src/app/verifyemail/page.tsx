"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
     const response= await axios.post("/api/users/verifyemail", { token });
     console.log(response);
     
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const { query } = router;
    // const urlToken = query.token;
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div>
        <h1>Verify email</h1>
        <h2>{token ? `${token}` : "no token found"}</h2>
        {verified && (
          <div>
            <h2>Verified</h2>
            <Link href="/login">Login</Link>
          </div>
        )}
        {error && (
          <div>
            <h2>Error</h2>
          </div>
        )}
      </div>
    </>
  );
}
