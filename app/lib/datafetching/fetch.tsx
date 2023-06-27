export const fetchTransactions = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/db");
    const transactions = await response.json();

    const data = { data: transactions };

    return data;
  } catch (error) {
    console.log(error);
  }
};
