import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserBlogList from "@/components/blog/UserBlogList";
import FollowBtn from "@/components/follow/FollowBtn";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { MdWorkOutline } from "react-icons/md";

export const revalidate = 60;

export default async function UserDetail({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <section>
      <div className="container mx-auto">
        <div className=" text-center mt-5">
          <Image
            src={user.image}
            alt={user.name}
            width={100}
            height={100}
            className=" rounded-full mx-auto"
          />
          <div className=" flex flex-col justify-center gap-1 items-center mb-2">
            <h2 className=" text-lg font-medium mt-2">{user.name}</h2>
            <p className=" flex gap-2 items-center text-gray-500 font-medium py-1 px-2 rounded-md">
              <MdWorkOutline />
              {user.bio}
            </p>
          </div>
          {/* <p className=" text-gray-500 mb-3 mt-2">{user.email}</p> */}
          <FollowBtn targetUserId={user.id} />
        </div>
        <UserBlogList userId={user.id} />
      </div>
    </section>
  );
}
