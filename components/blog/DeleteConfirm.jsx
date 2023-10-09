"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CgSpinner } from "react-icons/cg";

export default function DeleteConfirm({ onClick, blogId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const handleDelete = async () => {
    setIsLoading(true);
    await fetch("/api/blog", {
      method: "DELETE",
      body: JSON.stringify({ blogId }),
    });
    setIsLoading(false);
    startTransition(() => {
      router.refresh();
      onClick();
    });
  };
  return (
    <section className=" w-full h-screen absolute top-0 left-0 right-0 bottom-0 grid place-items-center bg-[#333333a1]">
      <div className=" max-w-[300px] mx-auto bg-white p-3 rounded-md">
        <h2>Are you sure to delete this blog ?</h2>
        <div className=" flex justify-center gap-3 items-center mt-3">
          <button
            onClick={handleDelete}
            className=" grid place-items-center h-[35px] w-[100px] rounded-md bg-red-500 text-white"
          >
            {isMutating ? (
              <CgSpinner size={22} className=" animate-spin duration-300" />
            ) : (
              "Yes"
            )}
          </button>
          <button
            onClick={onClick}
            className=" h-[35px] w-[100px] rounded-md border"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
