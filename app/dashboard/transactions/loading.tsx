"use client";

import React from "react";
import { Paper, Skeleton, Group } from "@mantine/core";

const Loading = () => {
  return (
    <div className="h-screen w-screen mx-auto my-auto flex justify-items-center items-center">
      <div className="my-auto mx-auto w-screen h-screen">
        <Skeleton height={40} width="200px" radius="sm" />
        <Paper shadow="xs" p="sm" mt="sm" mb="md" w="100%" withBorder>
          <Group grow>
            <Skeleton height={40} radius="sm" />
            <Skeleton height={40} radius="sm" />
            <Skeleton height={40} radius="sm" />
            <Skeleton height={40} radius="sm" />
            <Skeleton height={40} radius="sm" />
          </Group>
        </Paper>
        <Skeleton height={40} width="200px" radius="sm" />
        <Paper shadow="xs" p="sm" mt="sm" mb="md" withBorder>
          <Group grow mb="lg">
            <Skeleton height={40} radius="sm" />
            <Skeleton height={40} radius="sm" />
            <Skeleton height={40} radius="sm" />
            <Skeleton height={40} radius="sm" />
          </Group>
          <Group grow>
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
          </Group>
          <Group grow>
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
          </Group>
          <Group grow>
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
            <Skeleton height={25} radius="sm" mb="sm" />
          </Group>
          <Group grow>
            <Skeleton height={25} radius="sm" />
            <Skeleton height={25} radius="sm" />
            <Skeleton height={25} radius="sm" />
            <Skeleton height={25} radius="sm" />
          </Group>
        </Paper>
      </div>
    </div>
  );
};

export default Loading;
