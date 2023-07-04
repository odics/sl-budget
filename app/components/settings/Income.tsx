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

import "@/app/globals.css";

import { DatePickerInput } from "@mantine/dates";

// React Query
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";

import { useState } from "react";
import { fetchAccountList } from "@/app/lib/data/dataHandler";

import {
  IconPencilMinus,
  IconTrashXFilled,
  IconFileUpload,
} from "@tabler/icons-react";

import { notifications } from "@mantine/notifications";

import { useDisclosure } from "@mantine/hooks";

import { useSession } from "next-auth/react";
import Accounts from "./Accounts";

const Income = () => {
  const incomeData = [
    {
      account: "HSBC",
      amount: "4200",
      type: "Salary",
      frequency: "Monthly",
      dayOfMonth: "15th",
    },
    {
      account: "Revolut",
      amount: "1200",
      type: "Salary",
      frequency: "Bi-monthly",
      dayOfMonth: "15th and 28th",
    },
    {
      account: "HSBC",
      amount: "2300",
      type: "Salary",
      frequency: "Monthly",
      dayOfMonth: "15",
    },
  ];

  const [incomeAccount, setIncomeAccount] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("");
  const [incomeDayOfMOnth, setIncomeDayOfMOnth] = useState("");

  const [calValue, setCalValue] = useState<Date[]>([]);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["accountData"],
    queryFn: fetchAccountList,
  });

  const rows = incomeData.map((element: any) => (
    <tr key={element.account}>
      <td>{element.account}</td>
      <td>{element.amount}</td>
      <td>{element.type}</td>
      <td>{element.frequency}</td>
      <td>{element.dayOfMonth}</td>
      <td>
        <Center>
          <Group>
            <Tooltip label="Edit income">
              <UnstyledButton>
                <IconPencilMinus size="1.2rem" />
              </UnstyledButton>
            </Tooltip>
            <Tooltip label="Delete income">
              <UnstyledButton>
                <IconTrashXFilled size="1.2rem" />
              </UnstyledButton>
            </Tooltip>
          </Group>
        </Center>
      </td>
    </tr>
  ));

  function dateTest(dates: any) {
    const newDates = dates.map((date: any) => {
      const newDate = new Date(date as any).toLocaleDateString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      return newDate;
    });

    console.log(newDates);
  }

  const datePickerInputStyles = {
    margin: 0,
  };

  return (
    <Container>
      <Flex direction="column">
        <Title order={3} color="dimmed">
          Recurring income
        </Title>
        <Text fz="xs" color="dimmed" className="mb-4">
          Use this section to set up recurring sources of income. Income will be
          automatically added to the list of transactions based on the specified
          frequency, and day of the month in which it is received.
        </Text>
        <Title order={4} color="dimmed">
          Current recurring income
        </Title>
        <Divider my="sm" />
        <Table striped className="mb-6">
          <thead>
            <tr>
              <th>Receiving account</th>
              <th>Income amount</th>
              <th>Income type</th>
              <th>Income frequency</th>
              <th>Dates of deposit</th>
              <th className="th-icon">
                <Center>Action</Center>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Title order={4} color="dimmed">
          Add recurring income
        </Title>
        <Divider my="sm" />
        <div className="flex gap-2">
          <Select
            placeholder="Account"
            data={
              !isLoading
                ? data.map((account: any) => ({
                    value: account.name,
                    label: account.name,
                  }))
                : [{ label: "Loading", value: "Loading" }]
            }
            size="xs"
          />
          <TextInput
            size="xs"
            type="string"
            placeholder="Income amount"
            onChange={(e: any) => {
              if (e?.target.value) {
                setIncomeAmount(e?.target.value);
              }
            }}
          />
          <TextInput
            size="xs"
            type="string"
            placeholder="Income type (salary, etc)"
            onChange={(e: any) => {
              setIncomeType(e?.target.value);
              console.log(e.target.value);
            }}
          />
          <DatePickerInput
            className="cal-style"
            clearable
            type="multiple"
            dropdownType="modal"
            placeholder="Pick date"
            value={calValue}
            onChange={setCalValue}
            mx="auto"
            maw={400}
            size="xs"
          />
          <Button
            variant="default"
            size="xs"
            leftIcon={<IconFileUpload size="1rem" />}
            onClick={() => {
              dateTest(calValue);
            }}
          >
            Submit
          </Button>
        </div>
      </Flex>
    </Container>
  );
};

export default Income;
