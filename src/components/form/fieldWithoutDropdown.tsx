import React from "react";

export type FieldProps = {
  label: string;
  labelClassname?: string;
  input: string;
  inputClassname?: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  inputType:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "range"
    | "color"
    | "file"
    | "checkbox"
    | "radio"
    | "button"
    | "submit"
    | "reset"
    | "image"
    | "hidden"
    | "datetime";
};

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function FieldWithoutDropdown({
  label,
  input,
  setInput,
  inputType,
}: FieldProps) {
  const inputHandler = (value: string) => {
    // For number and tel input types, validate that the value is numeric
    if (
      (inputType === "number" || inputType === "tel") &&
      !/^\d*\.?\d*$/.test(value) // Regular expression to allow digits and decimal point
    ) {
      return; // Prevent invalid input (non-numeric or special characters)
    } else {
      setInput(value); // Update the state with the valid input
    }
  };
  return (
    <div className="flex items-center content-center relative w-25 gap-2 mr-auto">
      <label className="text-black relative font-semibold">
        {capitalize(label)} :
      </label>
      <input
        type={inputType}
        value={input}
        className="border-2 px-2 py-[2px] text-black rounded-sm w-28 shadow-md bg-transparent border-gray-800  "
        onChange={(e) => inputHandler(e.target.value)}
      />
    </div>
  );
}
