import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { data } = await request.json();

  const prisma = new PrismaClient();
  let transaction: Prisma.TransactionsCreateInput;

  console.log(data);

  transaction = {
    account: data.account,
    amount: parseInt(data.amount as string),
    category: data.category,
    date: data.date,
    userId: data.user,
  };

  console.log(transaction);

  const createTransaction = await prisma.transactions.create({
    data: transaction,
  });

  return NextResponse.json({ message: "Data received." });
}
