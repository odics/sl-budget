import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { data } = await request.json();

  let transaction: Prisma.TransactionsCreateInput;

  console.log(data);

  transaction = {
    account: data.account,
    amount: parseInt(data.amount as string),
    category: data.category,
    date: data.date,
    note: data.note,
    userId: data.user,
  };

  console.log(transaction);

  const createTransaction = await prisma.transactions.create({
    data: transaction,
  });

  return NextResponse.json({ message: "Data received." });
}

export async function GET() {
  const session = await getSession();
  const userId = session?.user?.id;

  const transactions = await prisma.transactions.findMany({
    where: {
      userId: userId,
    },
  });

  return NextResponse.json(transactions);

  console.log(transactions);
}
