"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import Loading from "./ui/Loading";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  ButtonProps,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Loader,
  Center,
} from "@mantine/core";

const Login = (props: PaperProps) => {
  const [type, toggle] = useToggle(["login", "register"]);
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  } else {
    return (
      <div className="flex h-screen">
        <div className="w-1/2 border-r border-slate-400 bg-[url(../public/login2.jpg)] bg-no-repeat bg-cover bg-center p-6 font-bold text-2xl">
          EV Save
          <p className="text-sm font-thin mt-2">
            Plan and manage your spending.
          </p>
        </div>
        <div className="w-1/2 flex content-center">
          <div className="w-3/5 mx-auto my-auto">
            <Paper radius="md" p="xl" withBorder {...props}>
              <Text size="lg" weight={500}>
                Welcome to EV Save, {type} with:
              </Text>

              <Group grow mb="md" mt="md">
                <Button
                  variant="default"
                  color="gray"
                  leftIcon={<FcGoogle />}
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                >
                  Google
                </Button>
                <Button
                  variant="default"
                  color="gray"
                  leftIcon={<AiFillGithub />}
                  onClick={() => signIn("github")}
                >
                  GitHub
                </Button>
              </Group>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
