"use client";
import CheckBox from "@/components/input/CheckBox";
import InputText from "@/components/input/InputText";
import TextArea from "@/components/input/TextArea";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CgSpinner } from "react-icons/cg";

export default function BlogPopup({ onClick, type, post = null }) {
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

    if (type == "edit") {
      await fetch(`/api/blog?blogId=${post?.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    setIsLoading(false);
    startTransition(() => {
      router.refresh();
      onClick();
    });
  };
  return (
    <section className=" w-full h-screen absolute top-0 left-0 right-0 bottom-0 bg-[#333333a1] grid place-items-center">
      <div className=" container mx-auto">
        <div className=" max-w-[500px] mx-auto flex flex-col gap-3 bg-white p-3 rounded-md">
          <div className="">
            <div className=" grid place-items-center h-[100px] w-full border border-gray-400 rounded-md">
              <label
                className=" text-gray-500 underline cursor-pointer"
                htmlFor=""
              >
                {" "}
                Image not support
              </label>
              <input
                type="file"
                id="image"
                className=" hidden"
                accept="image/*"
              />
            </div>
          </div>
          <div className="">
            <form action="" onSubmit={handleSubmit}>
              <InputText
                label={"Title"}
                name={"title"}
                id={"title"}
                defaultValue={post ? post?.title : ""}
                className={
                  " border border-gray-400 p-1 rounded-md focus:outline-none"
                }
              />
              <div className="my-5"></div>
              <TextArea
                label={"Content"}
                id={"content"}
                name={"content"}
                defaultValue={post ? post?.content : ""}
                rows={5}
                className={
                  "border border-gray-400 p-1 rounded-md focus:outline-none"
                }
              />
              <div className=" my-3"></div>
              <CheckBox
                label={"Published"}
                name={"published"}
                defaultChecked={post ? post?.published : false}
                onChange={() => setPublished(!published)}
              />
              <div className="flex gap-3 items-center">
                {type == "edit" ? (
                  <button
                    type=" submit"
                    className=" grid place-items-center h-[35px] w-[100px] bg-blue-600 text-white rounded-md mt-3"
                  >
                    {isMutating ? (
                      <CgSpinner
                        size={22}
                        className=" animate-spin duration-300"
                      />
                    ) : (
                      "Update"
                    )}
                  </button>
                ) : (
                  <button
                    type=" submit"
                    className=" grid place-items-center h-[35px] w-[100px] bg-blue-600 text-white rounded-md mt-3"
                  >
                    {isMutating ? (
                      <CgSpinner
                        size={22}
                        className=" animate-spin duration-300"
                      />
                    ) : (
                      "Create"
                    )}
                  </button>
                )}

                <button
                  onClick={onClick}
                  className="  h-[35px] w-[100px] border rounded-md mt-3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
