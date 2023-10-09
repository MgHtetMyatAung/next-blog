import { getServerSession } from "next-auth";
import Profile from "./Profile";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";
import OwnerBlogList from "@/components/profile/OwnerBlogList";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <section>
      <div className="container mx-auto">
        <Profile user={currentUser} />
        <OwnerBlogList />
      </div>
    </section>
  );
}
