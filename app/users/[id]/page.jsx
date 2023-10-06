import FollowBtn from "@/components/follow/FollowBtn";
import { prisma } from "@/libs/prisma";
import Image from "next/image";
import React from "react";

export default async function UserDetail({ params }) {
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
          <h2 className=" text-lg font-medium mt-3">{user.name}</h2>
          <p className=" text-gray-500 mb-3">{user.email}</p>
          <FollowBtn />
        </div>
      </div>
    </section>
  );
}
