import React from "react";

export default function CheckBox({ label, name, defaultChecked, onChange }) {
  return (
    <div className=" flex gap-2 items-center">
      <input
        type="checkbox"
        name={name}
        id={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
