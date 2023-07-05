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
  ActionIcon,
  rem,
} from "@mantine/core";

import { IconX } from "@tabler/icons-react";

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
  interface days {
    date: string;
  }
  const [selectedDays, setSelectedDays] = useState<days[]>([]);

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

  function addNewDay(day: any) {
    const suffixes = ["st", "nd", "rd"];
    const specialSuffix = "th";
    const lastDigit = day % 10;
    const specialCases = [11, 12, 13];

    // Handle special cases (11th, 12th, 13th)
    if (specialCases.includes(day)) {
      const newDate = { date: day + specialSuffix };
      const findDay = selectedDays.find((day) => day.date === newDate.date);
      const dayExists = !!findDay;
      if (dayExists == false) {
        setSelectedDays([...selectedDays, { date: day + specialSuffix }]);
      }
    } else {
      const suffix = suffixes[lastDigit - 1] || specialSuffix;
      const newDate = { date: day + specialSuffix };
      const findDay = selectedDays.find((day) => day.date === newDate.date);
      const dayExists = !!findDay;
      if (dayExists == false) {
        setSelectedDays([...selectedDays, { date: day + suffix }]);
        console.log(selectedDays);
      }
    }
  }

  function removeDay(day: any) {
    const newDays = selectedDays.filter((obj) => obj.date !== day);
    setSelectedDays([...newDays]);
  }

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
            placeholder="Transaction amount"
            onChange={(e: any) => {
              if (e?.target.value) {
                setIncomeAmount(e?.target.value);
              }
            }}
          />
          <Select
            placeholder="Transaction type"
            data={[
              { label: "Income", value: "Income" },
              { label: "Expense", value: "Expense" },
            ]}
            size="xs"
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
          <DayPicker setSelectedDays={addNewDay} removeDay={removeDay} />
        </div>
        <div className="flex flex-col p-2">
          <div className="flex flex-col p-2 gap-2 items-center border border-[#373a40] rounded">
            <Text fz="xs" color="dimmed">
              Select one or more dates
            </Text>
            {selectedDays.length !== 0
              ? selectedDays.map((date) => {
                  return (
                    <Badge
                      color="gray"
                      variant="outline"
                      radius="sm"
                      fullWidth
                      rightSection={
                        <ActionIcon
                          size="xs"
                          radius="xl"
                          variant="transparent"
                          onClick={() => {
                            removeDay(date.date);
                          }}
                        >
                          <IconX size={rem(10)} />
                        </ActionIcon>
                      }
                    >
                      {date.date} of every month
                    </Badge>
                  );
                })
              : null}
          </div>
        </div>
      </Flex>
    </Container>
  );
};

export default RecurringIncome;
