"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CreateBtn() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") return null;
  return (
    <Link href={"/create-blog"} className="font-medium text-gray-800 me-10">
      Create
    </Link>
  );
}
