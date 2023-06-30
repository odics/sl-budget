import {
  Table,
  Center,
  Tooltip,
  Paper,
  Group,
  Skeleton,
  Modal,
  UnstyledButton,
  Input,
  Select,
  TextInput,
  Flex,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { DateInput, DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  IconTrashXFilled,
  IconArticle,
  IconPencilMinus,
  IconPencil,
  IconFileUpload,
} from "@tabler/icons-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  deleteTransaction,
  updateTransaction,
} from "@/app/lib/data/dataHandler";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import "@/app/globals.css";

export function Transactions() {
  const [transactionData, setTransactionData] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [note, setNote] = useState("");
  const [transactionId, setTransactionId] = useState();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  type Transaction = {
    account: string;
    amount: number;
    category: string;
    date: string;
    note: string;
    user: string;
    transactionId: string;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactionData"] });
    },
  });

  function handleClick(data: any) {
    mutation.mutate(data);
  }

  const update = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactionData"] });
      notifications.show({
        message: "Transaction successfully updated.",
      });
    },
  });

  function handleSubmit(data: Transaction) {
    console.log("Handle Submit data", data);
    update.mutate(data);
    close();
  }

  function editTransaction(transactionData: any) {
    console.log(transactionData);
    setTransactionData(transactionData);
    setAccount(transactionData.account);
    setAmount(transactionData.amount);
    setCategory(transactionData.category);
    setNote(transactionData.note);
    setDate(transactionData.date);
    setTransactionId(transactionData.id);
    open();
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["transactionData"],
    queryFn: () =>
      fetch("http://localhost:3000/api/db").then((res) => res.json()),
  });

  if (isLoading)
    return (
      <Paper shadow="xs" p="sm" mt="sm" mb="md" withBorder>
        <Group grow mb="lg">
          <Skeleton height={40} radius="sm" />
          <Skeleton height={40} radius="sm" />
          <Skeleton height={40} radius="sm" />
          <Skeleton height={40} radius="sm" />
        </Group>
        <Group grow>
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
        </Group>
        <Group grow>
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
        </Group>
        <Group grow>
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
          <Skeleton height={25} radius="sm" mb="sm" />
        </Group>
        <Group grow>
          <Skeleton height={25} radius="sm" />
          <Skeleton height={25} radius="sm" />
          <Skeleton height={25} radius="sm" />
          <Skeleton height={25} radius="sm" />
        </Group>
      </Paper>
    );
  if (data.length !== 0) {
    const rows = data.map((element: any) => (
      <tr key={element.amount}>
        <td>{element.account}</td>
        <td>{element.amount}</td>
        <td>{element.category}</td>
        <td>{element.date}</td>
        <td>{element.note}</td>
        <td>
          <Center>
            <Group>
              <Tooltip label="Edit transaction">
                <UnstyledButton
                  onClick={() => {
                    editTransaction({
                      account: element.account,
                      amount: element.amount as number,
                      category: element.category,
                      id: element.id,
                      date: element.date,
                      note: element.note,
                    });
                  }}
                >
                  <IconPencilMinus size="1.2rem" />
                </UnstyledButton>
              </Tooltip>
              <Tooltip label="Delete transaction">
                <UnstyledButton>
                  <IconTrashXFilled
                    size="1.2rem"
                    onClick={() => {
                      handleClick({
                        transactionId: element.id,
                        userId: element.userId,
                      });
                    }}
                  />
                </UnstyledButton>
              </Tooltip>
            </Group>
          </Center>
        </td>
      </tr>
    ));

    return (
      <>
        <Modal
          opened={opened}
          onClose={close}
          title="Edit transaction"
          centered
          size="auto"
        >
          <Group>
            <Flex direction="column" gap="1rem">
              <TextInput
                type="number"
                value={amount}
                onChange={(e: any) => {
                  if (e?.target.value) {
                    setAmount(e?.target.value);
                  }
                }}
              />
              <Select
                placeholder={category}
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
              <Input
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
              <Select
                placeholder={account}
                data={[
                  { value: "hsbc", label: "HSBC" },
                  { value: "bofa", label: "Bank of America" },
                  { value: "revolut", label: "Revolut" },
                ]}
                onSelect={(e: any) => {
                  if (e?.target.value) {
                    setAccount(e?.target.value);
                  }
                }}
                value={account}
              />
              <Button
                variant="default"
                leftIcon={<IconFileUpload size="1rem" />}
                onClick={() => {
                  handleSubmit({
                    account: account,
                    amount: amount as number,
                    category: category,
                    date: new Date(date as any).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }),
                    note: note,
                    user: userId,
                    transactionId: transactionId ? transactionId : "",
                  });
                }}
              >
                Submit changes
              </Button>
            </Flex>
            <Flex direction="column">
              <DatePicker
                value={date}
                defaultDate={date as Date | undefined}
                onChange={setDate}
                placeholder="Transaction Date"
                maw={400}
                mx="auto"
              />
            </Flex>
          </Group>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Note</th>
              <th className="th-icon">
                <Center>Action</Center>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </>
    );
  } else {
    return (
      <>
        You have no transactions. You can add transactions in the Budget
        Management section.
      </>
    );
  }
}
