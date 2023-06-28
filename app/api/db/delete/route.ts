import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  const session = await getSession();
  const userId = session?.user?.id;

  const deleteTransaction = await prisma.transactions.delete({
    where: {
      id: data.transactionId,
    },
  });

  return NextResponse.json({ message: "Success" });
}
