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
import {
  fetchAccountList,
  addRecurringIncome,
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

const RecurringIncome = () => {
  interface days {
    date: string;
  }
  const [selectedDays, setSelectedDays] = useState<days[]>([]);
  const [incomeData, setIncomeData] = useState({});

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

  const recurringIncome = useMutation({
    mutationFn: addRecurringIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringIncome"] });
    },
  });

  function mutateIncome(data: any) {
    recurringIncome.mutate(data);
  }

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
            onSelect={(e: any) => {
              if (e?.target.value) {
                setIncomeAccount(e?.target.value);
              }
            }}
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
              { label: "Salary", value: "Salary" },
              { label: "Other", value: "Other" },
            ]}
            onSelect={(e: any) => {
              if (e?.target.value) {
                setIncomeType(e?.target.value);
              }
            }}
            size="xs"
          />
          <TextInput
            size="xs"
            type="string"
            placeholder="Note"
            onChange={(e: any) => {
              setIncomeType(e?.target.value);
            }}
          />
          <Button
            variant="default"
            size="xs"
            leftIcon={<IconFileUpload size="1rem" />}
            onClick={() => {
              mutateIncome({
                account: incomeAccount,
                amount: incomeAmount,
                type: incomeType,
                dates: selectedDays.map((day) => {
                  return day.date.slice(0, -2); // This is ugly
                }),
              });
              close;
            }}
          >
            Submit
          </Button>
        </div>
        <div className="flex flex-col p-2">
          <DayPicker setSelectedDays={addNewDay} />
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
