"use client";
import { signIn } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

export default function SignInBtn() {
  return (
    <div className=" flex gap-3 items-center">
      <FaUserCircle size={32} className=" text-gray-500" />
      <button onClick={() => signIn()} className=" font-medium text-gray-200 md:text-gray-800">Sign In</button>
    </div>
  );
}
