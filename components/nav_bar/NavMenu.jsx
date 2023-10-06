import AuthCheck from "@/libs/AuthCheck";
import Link from "next/link";
import { FaBloggerB } from "react-icons/fa";
import SignInBtn from "../auth/SignInBtn";
import ProfileBtn from "../auth/ProfileBtn";
import CreateBtn from "../auth/CreateBtn";

export default function NavMenu() {
  return (
    <main>
      <nav className="container mx-auto flex justify-between items-center h-[60px] md:h-[70px]">
        <Link href={"/"}>
          <div className=" flex gap-3 items-center text-lg">
            <FaBloggerB className=" text-blue-700" />
            <h1 className=" font-semibold text-gray-800">My Blog</h1>
          </div>
        </Link>
        <ul className=" flex items-center">
          <li className=" font-medium text-gray-800 me-10">
            <Link href={"/users"}>Users</Link>
          </li>
          <li className=" font-medium text-gray-800 me-10">
            <Link href={"/about"}>About</Link>
          </li>
          <li>
            <CreateBtn />
          </li>
          <li>
            <ProfileBtn />
          </li>
          <li>
            <AuthCheck>
              <SignInBtn />
            </AuthCheck>
          </li>
        </ul>
      </nav>
    </main>
  );
}
