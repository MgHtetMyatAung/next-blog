"use client";
import CheckBox from "@/components/input/CheckBox";
import InputText from "@/components/input/InputText";
import TextArea from "@/components/input/TextArea";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CgSpinner } from "react-icons/cg";

export default function BlogForm() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const handleUploadImage = () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const body = {
      title: formData.get("title"),
      content: formData.get("content"),
      published,
      image: "",
    };
    await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <div className=" max-w-[500px] mx-auto flex gap-8">
      <div className=" w-1/4">
        <div className=" grid place-items-center h-[100px] w-full border border-gray-400 rounded-md">
          <label
            className=" text-gray-500 underline cursor-pointer"
            htmlFor="image"
          >
            {" "}
            Image
          </label>
          <input type="file" id="image" className=" hidden" />
        </div>
      </div>
      <div className=" w-3/4">
        <form action="" onSubmit={handleSubmit}>
          <InputText
            label={"Title"}
            name={"title"}
            id={"title"}
            defaultValue={""}
            className={
              " border border-gray-400 p-1 rounded-md focus:outline-none"
            }
          />
          <div className="my-5"></div>
          <TextArea
            label={"Content"}
            id={"content"}
            name={"content"}
            defaultValue={""}
            rows={5}
            className={
              "border border-gray-400 p-1 rounded-md focus:outline-none"
            }
          />
          <div className=" my-3"></div>
          <CheckBox
            label={"Published"}
            name={"published"}
            defaultChecked={false}
            onChange={() => setPublished(!published)}
          />
          <button
            type=" submit"
            className=" grid place-items-center h-[35px] w-[100px] bg-blue-600 text-white rounded-md mt-3"
          >
            {isMutating ? (
              <CgSpinner size={22} className=" animate-spin duration-300" />
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
