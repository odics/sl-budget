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
  Badge,
} from "@mantine/core";

import "@/app/globals.css";

import DayPicker from "./DayPicker";

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

const RecurringIncome = () => {
  const [selectedDays, setSelectedDays] = useState([]);

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

  const dates = [
    { date: "1st of every month" },
    { date: "15th of every month" },
    { date: "28th of every month" },
  ];

  return (
    <Container>
      <Flex direction="row">
        <div className="flex flex-col gap-2 p-2">
          <Select
            placeholder="Account"
            data={
              !isLoading
                ? data.map((account: any) => ({
                    value: account.value,
                    label: account.label,
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
        <div className="flex flex-col p-2">
          <DayPicker />
        </div>
        <div className="flex flex-col p-2">
          <div className="flex flex-col p-2 gap-2 items-center border border-[#373a40] rounded">
            {dates.length !== 0
              ? dates.map((date) => {
                  return (
                    <Badge color="gray" variant="outline" radius="sm" fullWidth>
                      {date.date}
                    </Badge>
                  );
                })
              : "Pick dates"}
          </div>
        </div>
      </Flex>
    </Container>
  );
};

export default RecurringIncome;
