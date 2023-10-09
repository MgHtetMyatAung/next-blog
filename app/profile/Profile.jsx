"use client";

import BlogPopup from "@/components/blog/BlogPopup";
import EditProfilePopup from "@/components/profile/EditProfilePopup";
import Image from "next/image";
import { useState } from "react";

export default function Profile({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  // console.log(user);
  return (
    <section className=" mt-3">
      <Image
        src={user?.image}
        alt={user?.name}
        width={100}
        height={100}
        className=" rounded-full mx-auto"
      />
      <p className=" text-lg font-medium text-center mt-3">{user?.name}</p>
      {/* <p className=" text-center text-gray-500 my-2">{user?.email}</p> */}
      <p className=" text-center text-gray-600 my-2">{user?.bio}</p>
      <div className=" flex gap-3 items-center justify-center mt-3">
        <button
          className=" h-[35px] w-[100px] rounded-md bg-blue-600 text-white"
          onClick={() => setIsBlogOpen(true)}
        >
          Create Blog
        </button>
        <button
          className=" h-[35px] w-[100px] rounded-md border"
          onClick={() => setIsOpen(!isOpen)}
        >
          Edit Profile
        </button>
      </div>
      {isOpen ? (
        <EditProfilePopup user={user} onClick={() => setIsOpen(false)} />
      ) : null}
      {isBlogOpen ? <BlogPopup onClick={() => setIsBlogOpen(false)} /> : null}
    </section>
  );
}
