import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("Category to delete", data.id);
  const session = await getSession();
  const userId = session?.user?.id;

  const deleteCategory = await prisma.transactionCategories.delete({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json({ message: "Success" });
}
