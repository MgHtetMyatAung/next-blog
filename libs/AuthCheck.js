"use client";
import { useSession } from "next-auth/react";

export default function AuthCheck({ children }) {
  const { status } = useSession();
  if (status === "authenticated") return <></>;
  return <div>{children}</div>;
}
