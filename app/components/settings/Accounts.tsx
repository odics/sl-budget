"use client";

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
} from "@mantine/core";

import { notifications } from "@mantine/notifications";

import { useDisclosure } from "@mantine/hooks";

import { useSession } from "next-auth/react";

import {
  fetchAccounts,
  addAccount,
  deleteAccount,
  updateAccount,
} from "@/app/lib/data/dataHandler";

import { useState } from "react";

import {
  IconFileUpload,
  IconPencilMinus,
  IconTrashXFilled,
} from "@tabler/icons-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Accounts() {
  // User data
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [opened, { open, close }] = useDisclosure(false);

  const [accountName, setAccountName] = useState();
  const [institution, setInstitution] = useState();
  const [accountOwner, setAccountOwner] = useState();
  const [accountCurrency, setAccountCurrency] = useState();

  const [editName, setEditName] = useState();
  const [editInstitution, setEditInstitution] = useState();
  const [editOwner, setEditOwner] = useState();
  const [editCurrency, setEditCurrency] = useState();
  const [editId, setEditId] = useState();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["accountData"],
    queryFn: fetchAccounts,
  });

  const mutateAddAccount = useMutation({
    mutationFn: addAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountData"] });
      notifications.show({
        message: "Account successfully added.",
      });
    },
  });

  const mutateDeleteAccount = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountData"] });
      notifications.show({
        message: "Account successfully removed.",
      });
    },
  });

  const mutateEditAccount = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountData"] });
      notifications.show({
        message: "Account successfully modified.",
      });
    },
  });

  function handleAddAccount(data: any) {
    if (
      !data.accountName ||
      !data.accountCurrency ||
      !data.institution ||
      !data.accountOwner
    ) {
      alert("Please make sure that all fields are filled out.");
      return;
    }
    console.log(data.accountName);
    mutateAddAccount.mutate(data);
  }

  function handleDeleteAccount(data: any) {
    mutateDeleteAccount.mutate(data);
  }

  function handleEditAccount(data: any) {
    mutateEditAccount.mutate(data);
    close();
  }

  function editAccount(accountData: any) {
    setEditName(accountData.name);
    setEditInstitution(accountData.institution);
    setEditOwner(accountData.owner);
    setEditCurrency(accountData.currency);
    setEditId(accountData.id);
    open();
  }

  if (isLoading) {
    return (
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
    );
  }

  if (data.length !== 0) {
    const rows = data.map((element: any) => (
      <tr key={element.name}>
        <td>{element.name}</td>
        <td>{element.institution}</td>
        <td>{element.owner}</td>
        <td>{element.currency}</td>
        <td>
          <Center>
            <Group>
              <Tooltip label="Edit account">
                <UnstyledButton
                  onClick={() => {
                    editAccount({
                      name: element.name,
                      institution: element.institution,
                      owner: element.owner,
                      currency: element.currency,
                      id: element.id,
                    });
                  }}
                >
                  <IconPencilMinus size="1.2rem" />
                </UnstyledButton>
              </Tooltip>
              <Tooltip label="Delete account">
                <UnstyledButton>
                  <IconTrashXFilled
                    size="1.2rem"
                    onClick={() => {
                      handleDeleteAccount({
                        accountId: element.id,
                      });
                    }}
                  />
                </UnstyledButton>
              </Tooltip>
            </Group>
          </Center>
        </td>
      </tr>
    ));

    return (
      <>
        <Modal
          opened={opened}
          onClose={close}
          title="Edit account"
          centered
          size="auto"
          closeOnClickOutside={false}
        >
          <Flex direction="column" gap="1rem">
            <TextInput
              type="string"
              label="Account name"
              value={editName}
              onChange={(e: any) => {
                if (e?.target.value) {
                  setEditName(e?.target.value);
                }
              }}
            />
            <TextInput
              type="string"
              label="Institution"
              value={editInstitution}
              onChange={(e: any) => {
                if (e?.target.value) {
                  setEditInstitution(e?.target.value);
                }
              }}
            />
            <TextInput
              type="string"
              label="Account owner"
              value={editOwner}
              onChange={(e: any) => {
                if (e?.target.value) {
                  setEditOwner(e?.target.value);
                }
              }}
            />
            <Select
              placeholder={editCurrency}
              label="Currency"
              data={[
                { value: "dollars", label: "Dollars" },
                { value: "pounds", label: "Pounds" },
              ]}
              onSelect={(e: any) => {
                if (e?.target.value) {
                  setEditCurrency(e?.target.value);
                }
              }}
            />
            <Button
              variant="default"
              leftIcon={<IconFileUpload size="1rem" />}
              onClick={() => {
                handleEditAccount({
                  accountName: editName,
                  institution: editInstitution,
                  accountOwner: editOwner,
                  accountCurrency: editCurrency,
                  id: editId,
                });
              }}
            >
              Submit changes
            </Button>
          </Flex>
        </Modal>
        <Container>
          <Flex direction="column">
            <Title order={3} color="dimmed">
              Account management
            </Title>
            <Text fz="xs" color="dimmed" className="mb-4">
              Use this section to add and remove bank accounts.
            </Text>
            <Title order={4} color="dimmed">
              Current accounts
            </Title>
            <Divider my="sm" />
            <Table striped className="mb-6">
              <thead>
                <tr>
                  <th>Account name</th>
                  <th>Institution</th>
                  <th>Account owner</th>
                  <th>Currency</th>
                  <th className="th-icon">
                    <Center>Action</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Title order={4} color="dimmed">
              Add account
            </Title>
            <Divider my="sm" />
            <Flex justify="center" align="center" gap="lg">
              <TextInput
                size="xs"
                type="string"
                placeholder="Account name"
                width={"100px"}
                onChange={(e: any) => {
                  if (e?.target.value) {
                    setAccountName(e?.target.value);
                  }
                }}
              />
              <TextInput
                size="xs"
                type="string"
                placeholder="Institution"
                onChange={(e: any) => {
                  if (e?.target.value) {
                    setInstitution(e?.target.value);
                  }
                }}
              />
              <TextInput
                size="xs"
                type="string"
                placeholder="Account owner(s)"
                onChange={(e: any) => {
                  setAccountOwner(e?.target.value);
                  console.log(e.target.value);
                }}
              />
              <Select
                size="xs"
                placeholder="Currency"
                data={[
                  { value: "pounds", label: "Pounds" },
                  { value: "dollars", label: "Dollars" },
                ]}
                onSelect={(e: any) => {
                  if (e?.target.value) {
                    setAccountCurrency(e?.target.value);
                  }
                }}
              />
              <Button
                variant="default"
                size="xs"
                leftIcon={<IconFileUpload size="1rem" />}
                onClick={() => {
                  handleAddAccount({
                    accountName: accountName,
                    institution: institution,
                    accountOwner: accountOwner,
                    accountCurrency: accountCurrency,
                    userId: userId,
                  });
                }}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </Container>
      </>
    );
  }
}
