import { Table, Center, Tooltip, Paper, Group, Skeleton } from "@mantine/core";
import { IconTrashXFilled, IconArticle } from "@tabler/icons-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTransaction } from "@/app/lib/data/dataHandler";
import "@/app/globals.css";

export function Transactions() {
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
        <td>
          <Center>
            <Tooltip label={element.note}>
              <IconArticle size="1.2rem" />
            </Tooltip>
          </Center>
        </td>
        <td>
          <Center>
            <IconTrashXFilled
              size="1.2rem"
              onClick={() => {
                handleClick({
                  transactionId: element.id,
                  userId: element.userId,
                });
              }}
            />
          </Center>
        </td>
      </tr>
    ));

    return (
      <Table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th className="th-icon">
              <Center>Note</Center>
            </th>
            <th className="th-icon">
              <Center>Action</Center>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
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
