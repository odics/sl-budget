"use client";

import React from "react";
import { Center, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <div className="h-screen mx-auto my-auto flex flex-col justify-items-center items-center">
      <div className="my-auto mx-auto p-10 items-center">
        <Loader size="xl" />
      </div>
    </div>
  );
};

export default Loading;
