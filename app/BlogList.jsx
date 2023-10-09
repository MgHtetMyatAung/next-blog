import BlogCart from "@/components/blog/BlogCart";
import { prisma } from "@/libs/prisma";

export const revalidate = 60;

export default async function BlogList() {
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
  });
  // console.log(blogs);
  return (
    <section className=" ">
      <div className=" container mx-auto my-[30px] md:my-[60px] ">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {blogs.map((blog) => (
            <BlogCart key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
