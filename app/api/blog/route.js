import { prisma } from "@/libs/prisma";
import getCurrentUser from "@/libs/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await getCurrentUser();
  const data = await req.json();
  const record = await prisma.blog.create({
    data: {
      authorId: id,
      ...data,
    },
  });
  return NextResponse.json(record);
}

export async function PUT(req) {
  const data = await req.json();
  const blogId = await req.nextUrl.searchParams.get("blogId");
  const record = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data,
  });
  return NextResponse.json(record);
}

export async function DELETE(req) {
  const { blogId } = await req.json();
  const record = await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });

  return NextResponse.json(record);
}
