"use client";

import React from "react";
import { Tabs, Paper, Container } from "@mantine/core";
import Accounts from "@/app/components/settings/Accounts";
import Transactions from "@/app/components/settings/Transactions";

import {
  IconFileInvoice,
  IconBuildingBank,
  IconMoneybag,
  IconCoin,
} from "@tabler/icons-react";

import RecurringTransactions from "@/app/components/settings/RecurringTransactions";

const page = () => {
  return (
    <Paper shadow="xs" p="sm" mt="sm" withBorder>
      <Tabs defaultValue="accounts" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="accounts" icon={<IconBuildingBank size="1rem" />}>
            Account settings
          </Tabs.Tab>
          <Tabs.Tab value="transactions" icon={<IconFileInvoice size="1rem" />}>
            Transaction settings
          </Tabs.Tab>
          <Tabs.Tab
            value="recurring-transactions"
            icon={<IconMoneybag size="1rem" />}
          >
            Recurring Transactions
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="accounts" pt="xs">
          <Accounts />
        </Tabs.Panel>

        <Tabs.Panel value="transactions" pt="xs">
          <Transactions />
        </Tabs.Panel>
        <Tabs.Panel value="recurring-transactions" pt="xs">
          <RecurringTransactions />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default page;
