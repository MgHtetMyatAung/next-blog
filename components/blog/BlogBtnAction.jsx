"use client";
import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import BlogPopup from "./BlogPopup";
import DeleteConfirm from "./DeleteConfirm";

export default function BlogBtnAction({ blog }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  return (
    <div className=" flex gap-3 items-center">
      <button onClick={() => setIsEdit(true)}>
        <BiEdit />
      </button>
      <button onClick={() => setIsDelete(true)}>
        <BiTrash />
      </button>
      {isEdit ? (
        <BlogPopup post={blog} type={"edit"} onClick={() => setIsEdit(false)} />
      ) : null}
      {isDelete ? (
        <DeleteConfirm onClick={() => setIsDelete(false)} blogId={blog?.id} />
      ) : null}
    </div>
  );
}
