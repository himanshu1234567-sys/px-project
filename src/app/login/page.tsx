"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskModal from "@/app/components/TaskModal";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { IoIosAddCircleOutline } from "react-icons/io";
import Layout from "@/app/layout"; // Ensure the path is correct
import { login } from "../../actions/actions";
import axios from "axios";
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import LoginForm from "../components/LoginForm";

const Home = () => {
  const router = useRouter();

  const handleLogin = async (username = 'Admin', password = "pg@1034") => {
    console.log("username", username);
    console.log("password", password);
    const resp = await login({
      username,
      password,
      licenseKey: 'M2M5ODZhZWI1YmVlNjQ3ZmZlNWYzZTNjZDczZDM3',
      signOnToken: '',
    })
    if (resp?.token) {
      Cookies.set('token', resp?.token);
      router.push('/home'); // Replace with your actual dashboard route
    }

    console.log("resp", resp)
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Home;
