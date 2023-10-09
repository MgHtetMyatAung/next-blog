import getCurrentUser from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import React from "react";
import BlogCart from "../blog/BlogCart";

export default async function OwnerBlogList() {
  const { id: userId } = await getCurrentUser();
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      blogs: true,
    },
  });
  console.log(user);
  return (
    <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {user.blogs.map((blog) => (
        <BlogCart key={blog.id} type={"owner"} blog={blog} />
      ))}
    </div>
  );
}
