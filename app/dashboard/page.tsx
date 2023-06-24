"use client";

import React from "react";
import {
  Container,
  Grid,
  useMantineTheme,
  rem,
  Title,
  Paper,
} from "@mantine/core";

import BudgetOverview from "../components/data/BudgetOverview";
import { BudgetSplit } from "../components/data/BudgetSplit";
import { Transactions } from "../components/data/Transactions";

const PRIMARY_COL_HEIGHT = rem(300);

const Dashboard = () => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

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

  return (
    <Container my="md" fluid>
      <Title order={2} mb="sm" color="dimmed">
        At a glance
      </Title>
      <Grid style={{ marginBottom: rem(20) }}>
        <Grid.Col span={"auto"}>
          <Paper shadow="xs" p="sm" withBorder>
            <BudgetOverview />
          </Paper>
        </Grid.Col>
        <Grid.Col span={"auto"} style={{ minHeight: rem(120) }} md={6} lg={6}>
          <Paper shadow="xs" p="sm" withBorder style={{ height: "100%" }}>
            <BudgetSplit />
          </Paper>
        </Grid.Col>
      </Grid>
      <Title order={2} color="dimmed">
        Recent transactions
      </Title>
      <Grid>
        <Grid.Col span={"auto"}>
          <Paper shadow="xs" p="sm" mt="sm" withBorder>
            <Transactions {...data} />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
