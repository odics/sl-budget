"use client";

// React
import React from "react";

// Auth
import { useSession } from "next-auth/react";

// Next
import { redirect } from "next/navigation";

// Custom components
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
