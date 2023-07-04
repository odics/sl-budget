"use client";

import React from "react";
import {
  Paper,
  Group,
  Grid,
  Flex,
  Title,
  Text,
  Divider,
  Table,
  TextInput,
  Select,
  Button,
  Center,
  UnstyledButton,
  Tooltip,
  Modal,
  Skeleton,
  Container,
  ActionIcon,
  rem,
  Badge,
} from "@mantine/core";

import { IconX, IconFileUpload } from "@tabler/icons-react";

import { useState } from "react";

import { notifications } from "@mantine/notifications";

import { useDisclosure } from "@mantine/hooks";

import { useSession } from "next-auth/react";

import {
  fetchTransactionCategories,
  addTransactionCategory,
  deleteTransactionCategory,
} from "@/app/lib/data/dataHandler";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Transactions = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryName, setCategoryName] = useState();
  const [category, setCategory] = useState();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const queryClient = useQueryClient();

  const removeButton = (
    <ActionIcon
      size="xs"
      color="blue"
      radius="xl"
      variant="transparent"
      onClick={() => {
        removeCategory(category);
      }}
    >
      <IconX size={rem(10)} />
    </ActionIcon>
  );

  const { isLoading, error, data } = useQuery({
    queryKey: ["categoryData"],
    queryFn: fetchTransactionCategories,
  });

  const mutateAddCategory = useMutation({
    mutationFn: addTransactionCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryData"] });
      notifications.show({
        message: "Category successfully added.",
      });
    },
  });

  const mutateDeleteCategory = useMutation({
    mutationFn: deleteTransactionCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryData"] });
      notifications.show({
        message: "Category successfully removed.",
      });
    },
  });

  function addCategory(data: any) {
    const category = { userId: userId, category: data };
    mutateAddCategory.mutate(category);
    close();
  }

  function removeCategory(category: any) {
    const data = { categoryId: category };
    mutateDeleteCategory.mutate(data);
  }

  if (isLoading) {
    return "Loading";
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add category"
        centered
        size="auto"
        closeOnClickOutside={false}
      >
        <Flex direction="column" gap="1rem">
          <TextInput
            type="string"
            label="Category name"
            value={categoryName}
            onChange={(e: any) => {
              if (e?.target.value) {
                setCategoryName(e?.target.value);
              }
            }}
          />
          <Button
            variant="default"
            size="xs"
            leftIcon={<IconFileUpload size="1rem" />}
            onClick={() => {
              addCategory(categoryName);
            }}
          >
            Submit
          </Button>
        </Flex>
      </Modal>

      <Container>
        <Flex direction="column">
          <Title order={3} color="dimmed">
            Transaction management
          </Title>
          <Text fz="xs" color="dimmed" className="mb-4">
            Use this section to manage transaction categories.
          </Text>
          <Title order={4} color="dimmed">
            Current transaction categories
          </Title>
          <Divider my="sm" />
          <div>
            {data.map((category: any) => {
              return (
                <Badge
                  variant="outline"
                  color="gray"
                  radius="sm"
                  size="md"
                  rightSection={
                    <ActionIcon
                      size="xs"
                      color="blue"
                      radius="xl"
                      variant="transparent"
                      onClick={() => {
                        removeCategory(category.id);
                      }}
                    >
                      <IconX size={rem(10)} />
                    </ActionIcon>
                  }
                  className="m-1"
                >
                  {category.category}
                </Badge>
              );
            })}
          </div>
          <Divider my="sm" />
          <div>
            <Button
              variant="default"
              size="xs"
              leftIcon={<IconFileUpload size="1rem" />}
              onClick={open}
            >
              Add new category
            </Button>
          </div>
        </Flex>
      </Container>
    </>
  );
};

export default Transactions;
