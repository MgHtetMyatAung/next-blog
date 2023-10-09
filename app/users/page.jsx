import { prisma } from "@/libs/prisma";
import UserCard from "./UserCard";
import getCurrentUser from "@/libs/getCurrentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const { email } = await getCurrentUser();
  const users = await prisma.user.findMany();
  const otherUsers = users.filter((user) => user.email !== email);

  if (otherUsers?.length < 1)
    return (
      <p className=" text-gray-500 mt-5 text-center">Not found other users</p>
    );

  console.log(users);
  return (
    <div>
      <div className=" container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {otherUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
