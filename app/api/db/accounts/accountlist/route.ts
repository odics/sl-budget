import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  const userId = session?.user?.id;

  const accounts = await prisma.accounts.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(accounts);
  return NextResponse.json(accounts);
}
