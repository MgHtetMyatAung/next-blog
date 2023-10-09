import React from "react";

export default function TextArea({
  label,
  id,
  name,
  defaultValue,
  className,
  rows,
}) {
  return (
    <div className=" flex flex-col gap-2">
      <label htmlFor={label} className=" text-gray-500 text-sm">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        cols="30"
        rows={rows}
        defaultValue={defaultValue}
        className={className}
      ></textarea>
    </div>
  );
}
