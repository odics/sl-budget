import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Breadcrumbs } from "@mantine/core";
import { DEFAULT_CIPHERS } from "tls";

const Logo = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "auto",
      }}
    >
      <Image src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
