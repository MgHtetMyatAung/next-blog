import getCurrentUser from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const { email: currentUserEmail } = await getCurrentUser();
  const data = await req.json();

  const record = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    data,
  });
  return NextResponse.json(record);
}
