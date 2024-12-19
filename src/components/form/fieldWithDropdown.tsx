import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";

export type DropDownFieldProps = {
  label: string;
  labelClassname?: string;
  input: string;
  inputClassname?: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  options: Array<Option>;
};

type Option = {
  name: string;
  property: string;
};

// function capitalize(str: string): string {
//   if (!str) return str;
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// }

export default function FieldWithDropdown({
  label,
  input,
  setInput,
  options,
}: DropDownFieldProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const inputHandler = (value: string) => {
    setInput(value);
    if (input === "" && value === "/") {
      setShowDropdown(true);
    }
  };
  const handleBlur = () => {
    // Delay closing dropdown to allow `optionHandler` to finish.
    if (input === "/") {
      setInput("");
    }
    setTimeout(() => {
      setShowDropdown(false);
    }, 300);
  };

  const optionHandler = (value: string) => {
    setInput(value);
    setShowDropdown(false);
  };
  return (
    <div className="flex items-center content-center relative w-25 gap-2 mr-auto">
      <label className="text-black relative font-semibold">{label} :</label>
      <input
        type="text"
        value={input}
        className="border-2 px-2 py-[2px] text-black rounded-sm w-40 shadow-md bg-transparent border-gray-800  "
        onChange={(e) => inputHandler(e.target.value)}
        onBlur={() => handleBlur()}
      />
      <div
        style={{
          scale: showDropdown ? "100%" : "0%",
        }}
        className="absolute z-10 bg-white text-black p-2 transition-opacity duration-300 origin-top   border-2 top-full mt-2 shadow-lg rounded-[4px] left-0 border-blue-500 w-80 "
      >
        <div className="border-b-2 pb-2 items-center p-2 mb-2 relative text-[12px] font-semibold text-gray-600 border-b-black flex">
          Type "/" to search from your saved info
          <div
            onClick={() => setShowDropdown(false)}
            className="ml-auto my-auto cursor-pointer"
          >
            <IoCloseOutline className="text-[20px] text-black" />
          </div>
        </div>
        {options.map((option) => (
          <div
            onClick={() => optionHandler(option.name)}
            key={option.name}
            className="flex px-5 text-left hover:bg-blue-200 hover:border-black border-opacity-60 rounded-sm border-transparent cursor-pointer border-2 py-2 text-sm font-semibold my-3"
          >
            <div className="">{option.name}</div>
            <div className=" text-center mx-auto">{label}</div>
            <div className="">{option.property}</div>
          </div>
        ))}
        <div className="gap-3 items-center p-2 mt-2 relative text-[12px] font-bold text-black border-black flex">
          <div className="">
            <MdManageAccounts className="text-[24px]" />
          </div>
          Manage Personal Info
        </div>
      </div>
    </div>
  );
}
