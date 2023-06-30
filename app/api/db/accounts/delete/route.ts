import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  const session = await getSession();
  const userId = session?.user?.id;

  const deleteAccount = await prisma.accounts.delete({
    where: {
      id: data.accountId,
    },
  });

  return NextResponse.json({ message: "Success" });
}
