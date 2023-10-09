"use client";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import ProfileBtn from "../auth/ProfileBtn";
import AuthCheck from "@/libs/AuthCheck";
import SignInBtn from "../auth/SignInBtn";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const location = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
  }, [location]);
  return (
    <div className="md:hidden">
      <button onClick={() => setShow(true)} disabled={show}>
        <HiMenuAlt3 size={23} className={`${show ? " text-gray-500" : ""}`} />
      </button>
      <ul
        className={`py-3 absolute top-[60px] w-full transition-all duration-200 ${
          show ? "left-0" : "left-[-100%]"
        } flex items-center container mx-auto bg-[#333333] justify-between`}
      >
        <li className=" font-medium text-gray-200 me-10">
          <Link href={"/users"}>Users</Link>
        </li>
        <li className=" font-medium text-gray-200 me-10">
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <ProfileBtn />
        </li>
        <li>
          <AuthCheck>
            <SignInBtn />
          </AuthCheck>
        </li>
        <li className=" ms-3">
          <button className=" mt-1" onClick={() => setShow(false)}>
            <IoMdClose size={23} className=" text-gray-100" />
          </button>
        </li>
      </ul>
    </div>
  );
}
