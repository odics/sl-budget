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
import {
  fetchAccountList,
  fetchRecurringIncome,
} from "@/app/lib/data/dataHandler";

import {
  IconPencilMinus,
  IconTrashXFilled,
  IconFileUpload,
} from "@tabler/icons-react";

import { notifications } from "@mantine/notifications";

import { useDisclosure } from "@mantine/hooks";

import { useSession } from "next-auth/react";
import Accounts from "./Accounts";
import RecurringIncome from "../ui/RecurringIncome";

const RecurringTransactions = () => {
  // const incomeData = [

  //   {
  //     account: "Revolut",
  //     amount: "1200",
  //     type: "Salary",
  //     frequency: "Bi-monthly",
  //     dayOfMonth: "15th and 28th",
  //   },
  //   {
  //     account: "HSBC",
  //     amount: "2300",
  //     type: "Salary",
  //     frequency: "Monthly",
  //     dayOfMonth: "15",
  //   },
  // ];

  const [incomeAccount, setIncomeAccount] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("");
  const [incomeDayOfMOnth, setIncomeDayOfMOnth] = useState("");
  const [incomeData, setIncomeData] = useState([
    {
      account: "HSBC",
      amount: "4200",
      type: "Salary",
      frequency: "Monthly",
      dayOfMonth: "15th",
    },
  ]);

  const [addIncomeOpened, { open: addIncomeOpen, close: addIncomeClose }] =
    useDisclosure(false);

  const [calValue, setCalValue] = useState<Date[]>([]);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["accountData"],
    queryFn: fetchAccountList,
  });

  const {
    isLoading: isLoadingIncome,
    error: errorIncome,
    data: recurringIncomeData,
  } = useQuery({
    queryKey: ["recurringIncome"],
    queryFn: fetchRecurringIncome,
  });

  if (!isLoadingIncome) {
    const rows = recurringIncomeData.map((element: any) => (
      <tr key={element.account}>
        <td>{element.account}</td>
        <td>{element.amount}</td>
        <td>{element.type}</td>
        <td>
          <Tooltip label={element.dates}>
            <UnstyledButton>View dates</UnstyledButton>
          </Tooltip>
        </td>
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

    const datePickerInputStyles = {
      margin: 0,
    };

    return (
      <Container>
        <Modal
          opened={addIncomeOpened}
          onClose={addIncomeClose}
          title="Add recurring income"
          centered
          size="auto"
        >
          <RecurringIncome />
        </Modal>
        <Flex direction="column">
          <Title order={3} color="dimmed">
            Recurring income
          </Title>
          <Text fz="xs" color="dimmed" className="mb-4">
            Use this section to set up recurring sources of income. Income will
            be automatically added to the list of transactions based on the
            specified frequency, and day of the month in which it is received.
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
                <th>Dates of deposit</th>
                <th className="th-icon">
                  <Center>Action</Center>
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <div>
            <Button
              variant="default"
              size="xs"
              leftIcon={<IconFileUpload size="1rem" />}
              onClick={addIncomeOpen}
            >
              Add new recurring income
            </Button>
          </div>
        </Flex>
      </Container>
    );
  } else {
    const loading = [
      {
        account: "loading",
        amount: "loading",
        type: "loading",
        dayOfMonth: "loading",
      },
    ];
    const rows = loading.map((element: any) => (
      <tr key={element.account}>
        <td>{element.account}</td>
        <td>{element.amount}</td>
        <td>{element.type}</td>
        <td>
          <Tooltip label={element.dayOfMonth}>
            <UnstyledButton>View dates</UnstyledButton>
          </Tooltip>
        </td>
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
              <th>Dates of deposit</th>
              <th className="th-icon">
                <Center>Action</Center>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <div>
          <Button
            variant="default"
            size="xs"
            leftIcon={<IconFileUpload size="1rem" />}
            onClick={addIncomeOpen}
          >
            Add new recurring income
          </Button>
        </div>
      </Flex>
    </Container>;
  }
};

export default RecurringTransactions;
