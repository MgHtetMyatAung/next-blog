import getCurrentUser from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

export default async function BlogDetail({ blogId }) {
  const { id } = await getCurrentUser();
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: blog.authorId,
    },
  });
  const dateFormat = (date) => {
    const newDate = new Date(date);
    return newDate
      .toDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
      .replace(" ", " - ");
  };
  const url = id == user.id ? "/profile" : `/users/${user.id}`;
  // console.log(blog, user);
  return (
    <div>
      <h2 className=" text-xl font-semibold mb-3 mt-3 lg:mt-0">{blog.title}</h2>
      <div className=" flex gap-5 items-center mb-3">
        <Link href={url}>
          <Image
            src={user.image}
            alt={user.name}
            width={32}
            height={32}
            className=" rounded-full"
          />
        </Link>
        <div className="">
          <div className=" flex gap-3 items-center ">
            <BiPencil className=" text-gray-500" />
            <p className=" text-gray-500 text-sm md:text-base">{user.name}</p>
          </div>
          <div className=" flex gap-3 items-center ">
            <AiOutlineClockCircle className=" text-gray-500" />
            <span className=" text-gray-500 text-sm md:text-base">{dateFormat(blog.createdAt)}</span>
          </div>
        </div>
      </div>
      <p>{blog.content}</p>
    </div>
  );
}
