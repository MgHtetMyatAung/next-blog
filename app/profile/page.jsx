"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  return (
    <section>
      <div className="container mx-auto">
        <div className=" max-w-[400px] mx-auto">
          <Image
            src={session?.user.image ?? ""}
            alt={session?.user.name}
            width={100}
            height={100}
            className=" rounded-full"
          />
          <form action="">
            <div className="">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={session?.user.name ?? ""}
              />
            </div>
            <div className="">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                name="bio"
                id="bio"
                value={session?.user.bio ?? ""}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
