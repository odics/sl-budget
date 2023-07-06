import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  const userId = session?.user?.id;

  const recurringIncome = await prisma.recurringIncome.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(recurringIncome);
  return NextResponse.json(recurringIncome);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  const userId = session?.user?.id;
  const { data } = await request.json();

  let recurringIncome: Prisma.RecurringIncomeCreateInput;

  recurringIncome = {
    account: data.account,
    amount: data.amount,
    type: data.type,
    dates: data.dates,
    userId: data.userId,
  };

  console.log(data);

  try {
    const addRecurringIncome = await prisma.recurringIncome.create({
      data: recurringIncome,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(data);
}
