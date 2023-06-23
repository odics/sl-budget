"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const Index = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return redirect("/dashboard");
  }
  return (
    <>
      <Login />
    </>
  );
};

export default Index;
