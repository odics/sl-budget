"use client";

import React from "react";
import { useSession } from "next-auth/react";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const Index = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <>
        <Dashboard />
      </>
    );
  }
  return (
    <>
      <Login />
    </>
  );
};

export default Index;
