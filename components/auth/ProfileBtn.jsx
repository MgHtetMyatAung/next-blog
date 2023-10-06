"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SignOutBtn from "./SignOutBtn";
import Link from "next/link";

export default function ProfileBtn() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>...</p>;
  if (status === "unauthenticated") return null;
  return (
    <div className=" flex gap-5 items-center">
      <Link href={"/profile"}>
        <Image
          src={session?.user?.image}
          alt={session?.user.name}
          width={32}
          height={32}
          title={session?.user.name}
          className=" rounded-full"
        />
      </Link>
      <SignOutBtn />
    </div>
  );
}
