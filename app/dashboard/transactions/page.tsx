"use client";

// React
import React from "react";
import { useState } from "react";

// API
import axios from "axios";

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
  Title,
} from "@mantine/core";

import { DateInput } from "@mantine/dates";
import { IconFileUpload } from "@tabler/icons-react";

import DatePicker from "@/app/components/ui/DateInput";

// Custom components
import { Transactions } from "../../components/data/Transactions";
import { json } from "stream/consumers";

const data = {
  data: [
    {
      account: "HSBC",
      amount: "345.00",
      category: "Food",
      date: "January 21, 2022",
    },
    {
      account: "HSBC",
      amount: "2100.00",
      category: "Bills",
      date: "March 14, 2022",
    },
    {
      account: "Revolut",
      amount: "1200.00",
      category: "Bills",
      date: "June 20, 2022",
    },
    {
      account: "HSBC",
      amount: "4200.00",
      category: "Income",
      date: "July 8, 2022",
    },
    {
      account: "Revolut",
      amount: "4.00",
      category: "Food",
      date: "July 27, 2022",
    },
  ],
};

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
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | null>(null);

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

  async function handleSubmit() {
    try {
      const response: Response = await fetch("http://localhost:3000/api/db", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ hello: "world", please: "work" }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    // const stringDate = new Date(date as any);
  }

  return (
    <>
      <Title order={3} color="dimmed">
        Add new transaction
      </Title>
      <Paper shadow="xs" p="sm" mt="sm" mb="md" withBorder>
        <Group grow>
          <Select
            placeholder="Pick one"
            data={[
              { value: "react", label: "React" },
              { value: "ng", label: "Angular" },
              { value: "svelte", label: "Svelte" },
              { value: "vue", label: "Vue" },
            ]}
            onSelect={(e: any) => {
              if (e?.target.value) {
                setAccount(e?.target.value);
              }
            }}
          />
          <TextInput
            type="number"
            placeholder="1000"
            rightSection={select}
            rightSectionWidth={92}
            onChange={(e: any) => {
              if (e?.target.value) {
                setAmount(e?.target.value);
              }
            }}
          />
          <Select
            placeholder="Category"
            data={[
              { value: "entertainment", label: "Entertainment" },
              { value: "bills", label: "Bills" },
              { value: "food", label: "Food" },
              { value: "health", label: "Healthcare" },
            ]}
            onSelect={(e: any) => {
              if (e?.target.value) {
                setCategory(e?.target.value);
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
          <Button
            variant="default"
            onClick={handleSubmit}
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
        <Transactions {...data} />
      </Paper>
    </>
  );
};

export default page;
