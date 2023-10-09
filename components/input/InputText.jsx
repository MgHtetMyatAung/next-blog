import React from "react";

export default function InputText({
  label,
  id,
  name,
  defaultValue,
  className,
}) {
  return (
    <div className=" flex flex-col gap-2">
      <label htmlFor={label} className=" text-gray-500 text-sm">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={className}
      />
    </div>
  );
}
