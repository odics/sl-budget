"use client";

// React
import React from "react";
import { useState, useEffect } from "react";

// Reach Query
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";

// Auth
import { useSession, getSession } from "next-auth/react";

// API
import {
  fetchTransactions,
  fetchAccountList,
} from "@/app/lib/data/dataHandler";
import { addTransaction } from "@/app/lib/data/dataHandler";

// Styles and UI
import {
  Paper,
  TextInput,
  createStyles,
  rem,
  Group,
  Select,
  NativeSelect,
  Button,
  Input,
  Title,
  Skeleton,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconFileUpload } from "@tabler/icons-react";

import DatePicker from "@/app/components/ui/DateInput";

// Custom components
import { Transactions } from "../../components/data/Transactions";
import { json } from "stream/consumers";
import { test } from "node:test";

const useStyles = createStyles(
  (theme, { floating }: { floating: boolean }) => ({
    root: {
      position: "relative",
    },

    label: {
      position: "absolute",
      zIndex: 2,
      top: rem(7),
      left: theme.spacing.sm,
      pointerEvents: "none",
      color: floating
        ? theme.colorScheme === "dark"
          ? theme.white
          : theme.black
        : theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
      transition:
        "transform 150ms ease, color 150ms ease, font-size 150ms ease",
      transform: floating
        ? `translate(-${theme.spacing.sm}, ${rem(-28)})`
        : "none",
      fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
      fontWeight: floating ? 500 : 400,
    },

    required: {
      transition: "opacity 150ms ease",
      opacity: floating ? 1 : 0,
    },

    input: {
      "&::placeholder": {
        transition: "color 150ms ease",
        color: !floating ? "transparent" : undefined,
      },
    },
  })
);

const page = () => {
  // User data
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Transaction data
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [note, setNote] = useState("");
  const [transactionData, setTransactionData] = useState<any>(null);
  const [fetching, setFetching] = useState(false);
  const [accountData, setAccountData] = useState([
    { value: "Loading", label: "Loading Accounts" },
  ]);
  const [type, setType] = useState("");

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  const currency = [
    { value: "eur", label: "🇪🇺 EUR" },
    { value: "usd", label: "🇺🇸 USD" },
    { value: "cad", label: "🇨🇦 CAD" },
    { value: "gbp", label: "🇬🇧 GBP" },
    { value: "aud", label: "🇦🇺 AUD" },
  ];

  const select = (
    <NativeSelect
      data={currency}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: rem(92),
        },
      }}
    />
  );

  type Transaction = {
    account: string;
    amount: number;
    category: string;
    type: string;
    date: string;
    note: string;
    user: string;
  };

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["accountData"],
    queryFn: fetchAccountList,
  });

  const {
    isLoading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/db/categories").then((res) =>
        res.json()
      ),
  });

  const mutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactionData"] });
    },
  });

  function handleSubmit(data: Transaction) {
    mutation.mutate(data);
  }

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <Title order={3} color="dimmed">
        Add new transaction
      </Title>
      <Paper shadow="xs" p="sm" mt="sm" mb="md" withBorder>
        <Group grow>
          <Select
            placeholder="Account"
            data={data}
            onSelect={(e: any) => {
              if (e?.target.value) {
                setAccount(e?.target.value);
              }
            }}
          />
          <TextInput
            type="number"
            placeholder="Amount"
            onChange={(e: any) => {
              if (e?.target.value) {
                setAmount(e?.target.value);
              }
            }}
          />
          <Select
            placeholder="Category"
            data={
              !categoryLoading
                ? categoryData.map((category: any) => ({
                    value: category.category,
                    label: category.category,
                  }))
                : [{ label: "Loading", value: "Loading" }]
            }
            onSelect={(e: any) => {
              if (e?.target.value) {
                setCategory(e?.target.value);
              }
            }}
          />
          <Select
            placeholder="Type"
            data={[
              { value: "Income", label: "Income" },
              { value: "Expense", label: "Expense" },
            ]}
            onSelect={(e: any) => {
              if (e?.target.value) {
                setType(e?.target.value);
              }
            }}
          />
          <DateInput
            value={date}
            valueFormat="DD MM YYYY"
            onChange={setDate}
            placeholder="Transaction Date"
            maw={400}
            mx="auto"
          />
          <Input
            placeholder="Add Note"
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <Button
            variant="default"
            onClick={() => {
              handleSubmit({
                account: account,
                amount: amount,
                category: category,
                type: type,
                date: new Date(date as any).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }),
                note: note,
                user: userId,
              });
              notifications.show({
                message: "Transaction successfully added.",
              });
            }}
            leftIcon={<IconFileUpload size="1rem" />}
          >
            Submit
          </Button>
        </Group>
      </Paper>
      <Title order={3} color="dimmed">
        All transactions
      </Title>
      <Paper shadow="xs" p="sm" mb="md" mt="sm" withBorder>
        <Transactions />
      </Paper>
    </>
  );
};

export default page;
