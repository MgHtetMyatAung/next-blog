"use client";
import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return <button onClick={() => signOut()} className=" font-medium text-gray-200 md:text-gray-800">Sign Out</button>;
}
