"use client";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { CgSpinner } from "react-icons/cg";

export default function FollowClient({ isFollowing, targetUserId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const follow = async () => {
    setIsLoading(true);
    await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    startTransition(() => {
      router.refresh();
    });
  };
  const unFollow = async () => {
    setIsLoading(true);
    await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE",
    });
    setIsLoading(false);
    startTransition(() => {
      router.refresh();
    });
  };
  if (isFollowing) {
    return (
      <button
        onClick={unFollow}
        className=" grid place-items-center mx-auto h-[38px] w-[100px] rounded-md bg-blue-600 text-white"
      >
        {isMutating ? (
          <CgSpinner size={22} className=" animate-spin duration-300" />
        ) : (
          "UnFollow"
        )}
      </button>
    );
  } else {
    return (
      <button
        onClick={follow}
        className=" grid place-items-center mx-auto h-[38px] w-[100px] rounded-md bg-blue-600 text-white"
      >
        {isMutating ? (
          <CgSpinner size={22} className=" animate-spin duration-300" />
        ) : (
          "Follow"
        )}
      </button>
    );
  }
}
