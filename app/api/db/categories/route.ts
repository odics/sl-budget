import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  const userId = session?.user?.id;

  const accounts = await prisma.transactionCategories.findMany({
    where: {
      userId: userId,
    },
  });

  return NextResponse.json(accounts);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  const userId = session?.user?.id;
  const { data } = await request.json();

  let category: Prisma.TransactionCategoriesCreateInput;

  category = {
    category: data.category,
    userId: data.userId,
  };

  console.log("Add category ", data);

  try {
    const createCategory = await prisma.transactionCategories.create({
      data: category,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
