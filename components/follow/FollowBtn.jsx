import getCurrentUser from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";
import FollowClient from "./FollowClient";

export default async function FollowBtn({ targetUserId }) {
  const { id: currentUserId } = await getCurrentUser();
  const isFollowing = await prisma.follows.findFirst({
    where: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });
  return <FollowClient isFollowing={isFollowing} targetUserId={targetUserId} />;
}
