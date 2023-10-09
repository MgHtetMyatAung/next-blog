import { prisma } from "@/libs/prisma";
import Image from "next/image";
import Link from "next/link";
import BlogBtnAction from "./BlogBtnAction";

export default async function BlogCart({ blog, type }) {
  const { id, title, image, authorId, published } = blog;
  const author = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
  });
  // console.log(author);
  return (
    <div className=" p-3 rounded-md shadow border">
      {type == "owner" ? (
        <p
          className={`w-fit mb-1 py-1 px-2 rounded-md text-sm font-medium ${
            published
              ? "bg-green-100 text-green-700"
              : " bg-blue-100 text-blue-700"
          }`}
        >
          {published ? "Published" : "Only me"}
        </p>
      ) : null}
      <Link href={`/users/${authorId}/${id}`}>
        <h2 className=" font-semibold text-lg">{title}</h2>
      </Link>
      <div className="flex justify-between items-center mt-[20px]">
        <div className=" flex gap-3 items-center ">
          <Image
            src={author.image}
            alt={author.name}
            width={32}
            height={32}
            className=" rounded-full"
          />
          <div className="">
            <span className=" text-gray-500">{author.name}</span>
          </div>
        </div>
        {type == "owner" ? <BlogBtnAction blog={blog} /> : null}
      </div>
    </div>
  );
}
