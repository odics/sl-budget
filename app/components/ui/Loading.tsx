import React from "react";
import { Loader } from "@mantine/core";

const Loading = () => {
  return (
    <div className="h-screen mx-auto my-auto flex justify-items-center items-center">
      <div className="my-auto mx-auto">
        <Loader size="xl" />
      </div>
    </div>
  );
};

export default Loading;
