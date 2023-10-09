import getCurrentUser from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id: currentUserId } = await getCurrentUser();
  const { targetUserId } = await req.json();
  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  return NextResponse.json(record);
}

export async function DELETE(req) {
  const { id: currentUserId } = await getCurrentUser();
  const targetUserId = await req.nextUrl.searchParams.get("targetUserId");
  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    },
  });
  return NextResponse.json(record);
}
