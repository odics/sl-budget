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
} from "@mantine/core";

import { fetchAccounts } from "@/app/lib/data/dataHandler";

import { useState } from "react";

import { IconFileUpload } from "@tabler/icons-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Accounts() {
  const [accountName, setAccountName] = useState();
  const [institution, setInstitution] = useState();
  const [accountOwner, setAccountOwner] = useState();
  const [accountCurrency, setAccountCurrency] = useState();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["accountData"],
    queryFn: fetchAccounts,
  });

  const elements = [
    {
      name: "HSBC Joint",
      institution: "HSBC",
      owner: "Linh and Severin",
      currency: "Pounds",
    },
    {
      name: "Revolut",
      institution: "Revolut",
      owner: "Linh",
      currency: "Pounds",
    },
    {
      name: "Bank of America Joint",
      institution: "Bank of America",
      owner: "Linh and Severin",
      currency: "Dollars",
    },
  ];

  if (isLoading) {
    return "Loading";
  }

  if (data.length !== 0) {
    const rows = data.map((element: any) => (
      <tr key={element.name}>
        <td>{element.name}</td>
        <td>{element.institution}</td>
        <td>{element.owner}</td>
        <td>{element.currency}</td>
      </tr>
    ));

    return (
      <Grid justify="center">
        <Grid.Col span={7}>
          <Flex direction="column">
            <Title order={3} color="dimmed">
              Account management
            </Title>
            <Text fz="xs" color="dimmed">
              Use this section to add and remove bank accounts, label them, and
              set currencies, etc.
            </Text>
            <Paper shadow="xs" p="sm" mt="sm" mb="md" withBorder>
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
                    <th>Account currency</th>
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
                    console.log(
                      accountName,
                      institution,
                      accountOwner,
                      accountCurrency
                    );
                  }}
                >
                  Submit
                </Button>
              </Flex>
            </Paper>
          </Flex>
        </Grid.Col>
        <Grid.Col span={5}>
          <Flex direction="column">
            <Title order={3} color="dimmed">
              Transaction management
            </Title>
            <Text fz="xs" color="dimmed">
              Use this section to customize things like spending categories.
            </Text>
            <Paper shadow="xs" p="sm" mt="sm" mb="md" withBorder>
              Transaction shit goes here.
            </Paper>
          </Flex>
        </Grid.Col>
      </Grid>
    );
  }
}
