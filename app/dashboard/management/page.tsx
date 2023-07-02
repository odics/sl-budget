"use client";

import React from "react";
import { Tabs, Paper, Container } from "@mantine/core";
import Accounts from "@/app/components/settings/Accounts";
import Transactions from "@/app/components/settings/Transactions";

import {
  IconFileInvoice,
  IconBuildingBank,
  IconMoneybag,
} from "@tabler/icons-react";

const page = () => {
  return (
    <Paper shadow="xs" p="sm" mt="sm" withBorder>
      <Tabs defaultValue="accounts" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="accounts" icon={<IconBuildingBank size="0.8rem" />}>
            Accounts
          </Tabs.Tab>
          <Tabs.Tab value="income" icon={<IconMoneybag size="0.8rem" />}>
            Income
          </Tabs.Tab>
          <Tabs.Tab
            value="transactions"
            icon={<IconFileInvoice size="0.8rem" />}
          >
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
          Income
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default page;
