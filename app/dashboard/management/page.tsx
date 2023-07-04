"use client";

import React from "react";
import { Tabs, Paper, Container } from "@mantine/core";
import Accounts from "@/app/components/settings/Accounts";
import Transactions from "@/app/components/settings/Transactions";
import Income from "@/app/components/settings/Income";

import {
  IconFileInvoice,
  IconBuildingBank,
  IconMoneybag,
  IconCoin,
} from "@tabler/icons-react";

const page = () => {
  return (
    <Paper shadow="xs" p="sm" mt="sm" withBorder>
      <Tabs defaultValue="accounts" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="accounts" icon={<IconBuildingBank size="1rem" />}>
            Accounts
          </Tabs.Tab>
          <Tabs.Tab value="income" icon={<IconMoneybag size="1rem" />}>
            Recurring Income
          </Tabs.Tab>
          <Tabs.Tab value="expenses" icon={<IconCoin size="1rem" />}>
            Recurring Expenses
          </Tabs.Tab>
          <Tabs.Tab value="transactions" icon={<IconFileInvoice size="1rem" />}>
            Transactions
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="accounts" pt="xs">
          <Accounts />
        </Tabs.Panel>

        <Tabs.Panel value="transactions" pt="xs">
          <Transactions />
        </Tabs.Panel>
        <Tabs.Panel value="income" pt="xs">
          <Income />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default page;
