import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  const userId = session?.user?.id;

  const transactions = await prisma.accounts.findMany({
    where: {
      userId: userId,
    },
  });

  return NextResponse.json(transactions);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  const userId = session?.user?.id;
  const { data } = await request.json();

  let account: Prisma.AccountsCreateInput;

  account = {
    name: data.accountName,
    institution: data.institution,
    owner: data.accountOwner,
    currency: data.accountCurrency,
    userId: data.userId,
  };

  console.log(account);

  try {
    const createTransaction = await prisma.accounts.create({
      data: account,
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  //   console.log("PUT data", typeof data.data.amount);
  const session = await getSession();
  const userId = session?.user?.id;

  const updateAccount = await prisma.accounts.update({
    where: {
      id: data.data.id,
    },
    data: {
      name: data.data.accountName,
      institution: data.data.institution,
      owner: data.data.accountOwner,
      currency: data.data.accountCurrency,
    },
  });

  return NextResponse.json("Success");
}
