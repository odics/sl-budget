type Transaction = {
  account: string;
  amount: number;
  category: string;
  date: string;
  note: string;
  user: string;
};

// Transactions

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

export const deleteTransaction = async (data: any) => {
  try {
    console.log("Data being sent via fetch: ", data);
    const response: Response = await fetch(
      `http://localhost:3000/api/db/delete/`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId: data.userId,
          transactionId: data.transactionId,
        }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateTransaction = async (data: any) => {
  try {
    console.log("Data being sent via fetch: ", data);
    const response: Response = await fetch(`http://localhost:3000/api/db/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        data,
      }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

// Accounts

export const fetchAccounts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/db/accounts", {
      cache: "no-store",
    });
    const accounts = await response.json();

    const data = { data: accounts };
    console.log(data);
    return accounts;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAccountList = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/db/accounts/accountlist",
      {
        cache: "no-store",
      }
    );
    const accounts = await response.json();

    const data = accounts.map((account: any) => {
      return { value: account.name, label: account.name };
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addAccount = async (data: Transaction) => {
  try {
    const response: Response = await fetch(
      "http://localhost:3000/api/db/accounts",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ data }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAccount = async (data: any) => {
  try {
    console.log("Data being sent via fetch: ", data);
    const response: Response = await fetch(
      `http://localhost:3000/api/db/accounts/delete/`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          accountId: data.accountId,
        }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateAccount = async (data: any) => {
  try {
    console.log("Data being sent via fetch: ", data);
    const response: Response = await fetch(
      `http://localhost:3000/api/db/accounts`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          data,
        }),
      }
    );

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTransactionCategories = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/db/categories", {
      cache: "no-store",
    });
    const categories = await response.json();

    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const addTransactionCategory = async (data: any) => {
  try {
    const response: Response = await fetch(
      "http://localhost:3000/api/db/categories",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ data }),
      }
    );

    const result = await response.json();
    console.log("Transaction adding", data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTransactionCategory = async (data: any) => {
  try {
    console.log("Data being sent via fetch: ", data);
    const response: Response = await fetch(
      `http://localhost:3000/api/db/categories/delete/`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          id: data.categoryId,
        }),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};
