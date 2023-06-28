type Transaction = {
  account: string;
  amount: number;
  category: string;
  date: string;
  note: string;
  user: string;
};

export const fetchTransactions = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/db", {
      cache: "no-store",
    });
    const transactions = await response.json();

    const data = { data: transactions };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addTransaction = async (data: Transaction) => {
  try {
    const response: Response = await fetch("http://localhost:3000/api/db", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ data }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};
