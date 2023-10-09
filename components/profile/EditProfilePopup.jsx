"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CgSpinner } from "react-icons/cg";

export default function EditProfilePopup({ user, onClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsTransition] = useTransition();
  const router = useRouter();
  const isMutating = isLoading || isPending;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      bio: formData.get("bio"),
    };

    await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).finally(() => {
      setIsLoading(false);
    });

    setIsTransition(() => {
      router.refresh();
      onClick();
    });
  };
  return (
    <section className=" w-full h-screen absolute top-0 left-0 bottom-0 right-0 bg-[#333333a1] grid place-items-center">
      <div className="container mx-auto">
        <div className=" max-w-[500px] mx-auto bg-white p-3 rounded-md">
          <form action="" onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-1">
              <label htmlFor="name" className=" text-gray-500">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={user.name ?? ""}
                className=" p-1 border focus:outline-none rounded-md"
              />
            </div>
            <div className=" flex flex-col gap-1 mt-3">
              <label htmlFor="bio" className=" text-gray-500">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                cols="10"
                rows="5"
                defaultValue={user.bio ?? ""}
                className=" p-1 border focus:outline-none rounded-md"
              ></textarea>
            </div>
            <div className=" flex gap-5 items-center">
              <button
                type="submit"
                className=" grid place-items-center bg-blue-500 text-white rounded-md mt-3 h-[38px] w-[100px]"
              >
                {isMutating ? (
                  <CgSpinner size={22} className=" animate-spin duration-300" />
                ) : (
                  "Save"
                )}
              </button>
              <button
                className=" grid place-items-center border rounded-md mt-3 h-[38px] w-[100px]"
                onClick={onClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
