import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  // const prisma = new PrismaClient();
  // let transaction = Prisma.TransactionsCreateInput;

  // transaction = { ...data };

  // createTransaction = await prisma.transactions.create({
  //   data: transaction,
  // });
  return NextResponse.json({ message: "This Worked" });
}
