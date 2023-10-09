import { prisma } from "@/libs/prisma";
import BlogCart from "./BlogCart";

export default async function UserBlogList({ userId }) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      blogs: {
        where: {
          published: true,
        },
      },
    },
  });
  //   console.log(user);
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {user.blogs.map((blog) => (
        <BlogCart key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
