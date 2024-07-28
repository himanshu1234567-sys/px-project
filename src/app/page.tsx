"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { login } from "../actions/actions";
import Cookies from 'js-cookie';
import Link from "next/link";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login'); // Redirect to login if no token found
    }
  }, [router]);

  const handleLogin = async (username = 'Admin', password = "pg@1034") => {
    console.log("username", username);
    console.log("password", password);
    const resp = await login({
      username,
      password,
      licenseKey: 'M2M5ODZhZWI1YmVlNjQ3ZmZlNWYzZTNjZDczZDM3',
      signOnToken: '',
    });

    if (resp?.token) {
      Cookies.set('token', resp.token);
      // Replace the current URL state to avoid navigating back to login
      router.replace('/home');
    } else {
      console.log("Login failed");
    }

    console.log("resp", resp);
  };

  return (
    <div>
      <Link href='/home'>404 not found, go home</Link>
    </div>
  );
};

export default Home;
