import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserCard({ user }) {
  const { id, name, image } = user;
  return (
    <Link href={`/users/${id}`} className=" rounded-md p-3 shadow-md">
      <Image src={image} alt={name} width={50} height={50} />
      <h2 className=" mt-3">{name}</h2>
    </Link>
  );
}
