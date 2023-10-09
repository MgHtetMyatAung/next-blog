import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "./prisma";

export default async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  const currentUserId = await prisma.user
    .findUnique({
      where: {
        email: session?.user.email,
      },
    })
    .then((res) => res.id);
  return await { email: session?.user.email, id: currentUserId };
}
