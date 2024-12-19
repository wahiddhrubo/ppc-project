import { useState } from "react";
import FieldWithDropdown, {
  DropDownFieldProps,
} from "./form/fieldWithDropdown";
import FieldWithoutDropdown, { FieldProps } from "./form/fieldWithoutDropdown";

export default function Form() {
  const [company, setCompany] = useState("");
  const [buyer, setBuyer] = useState("");
  const [color, setColor] = useState("");
  const [poNo, setPoNo] = useState("");
  const [style, setStyle] = useState("");
  const [shade, setShade] = useState("");
  const [cuttingNumber, setCuttingNumber] = useState("");
  const [sSize, setSSize] = useState("");
  const [mSize, setMSize] = useState("");
  const [lSize, setLSize] = useState("");
  const [xLSize, setXLSize] = useState("");
  const [xL2Size, setXL2Size] = useState("");
  const [xL3Size, setXL3Size] = useState("");
  const [part, setPart] = useState("");

  const checkSizeOrder = (sizes: any): boolean => {
    const sizeLabels = [
      "S Size",
      "M Size",
      "L Size",
      "XL Size",
      "2XL Size",
      "3XL Size",
    ];
    const sizeOrder = sizeLabels.map((label) => sizes[label]);
    for (let i = 0; i < sizeOrder.length - 1; i++) {
      console.log(sizeOrder[i]);
      if (parseFloat(sizeOrder[i]) > parseFloat(sizeOrder[i + 1])) {
        alert(
          `Problem detected: "${sizeLabels[i]}" (${sizeOrder[i]}) > "${
            sizeLabels[i + 1]
          }" (${sizeOrder[i + 1]})`
        );
        return false;
      }
    }

    return true;
  };

  const fields = {
    company: company,
    buyer: buyer,
    color: color,
    "PO No": poNo,
    style: style,
    shade: shade,
    "Cutting Number": cuttingNumber,
    "S Size": sSize,
    "M Size": mSize,
    "L Size": lSize,
    "XL Size": xLSize,
    "2XL Size": xL2Size,
    "3XL Size": xL3Size,
    part: part,
  };

  const hasEmptyFields = (fields: Record<string, any>): boolean => {
    const emptyFields = Object.entries(fields)
      .filter(([_, value]) => !value) // Filter fields with empty values
      .map(([key]) => key); // Get only the keys (field names)

    if (emptyFields.length > 0) {
      alert(`The following fields are not filled: ${emptyFields.join(", ")}`);
      return true;
    } else {
      return false;
    }
  };

  const clearFields = () => {
    setCompany("");
    setBuyer("");
    setColor("");
    setPoNo("");
    setStyle("");
    setShade("");
    setCuttingNumber("");
    setSSize("");
    setMSize("");
    setLSize("");
    setXLSize("");
    setXL2Size("");
    setXL3Size("");
    setPart("");
    alert("Fields Cleared");
  };
  const submitHandler = () => {
    const emptyfields = hasEmptyFields(fields);
    const sizeInOrder = checkSizeOrder(fields);

    if (!emptyfields && sizeInOrder) {
    }
  };

  const otherField: Array<FieldProps> = [
    {
      input: shade,
      inputType: "text",
      label: "Shade",
      setInput: setShade,
    },
    {
      input: cuttingNumber,
      inputType: "number",
      label: "CuTtingNumber",
      setInput: setCuttingNumber,
    },
  ];
  const sizeFields: Array<FieldProps> = [
    {
      input: sSize,
      inputType: "number",
      label: "S",
      setInput: setSSize,
    },
    {
      input: mSize,
      inputType: "number",
      label: "M",
      setInput: setMSize,
    },
    {
      input: lSize,
      inputType: "number",
      label: "L",
      setInput: setLSize,
    },
    {
      input: xLSize,
      inputType: "number",
      label: "XL",
      setInput: setXLSize,
    },
    {
      input: xL2Size,
      inputType: "number",
      label: "2XL",
      setInput: setXL2Size,
    },
    {
      input: xL3Size,
      inputType: "number",
      label: "3XL",
      setInput: setXL3Size,
    },
  ];
  const dropdownFields: Array<DropDownFieldProps> = [
    {
      input: company,
      label: "Company",
      options: [
        {
          name: "Desh Garments",
          property: "New Group 1",
        },
      ],
      setInput: setCompany,
    },
    {
      input: buyer,
      label: "Buyer",
      options: [
        {
          name: "Storm Tech",
          property: "New Group 1",
        },
      ],
      setInput: setBuyer,
    },
    {
      input: poNo,
      label: "PO No",
      options: [
        {
          name: "vc-45667",
          property: "New Group 1",
        },
      ],
      setInput: setPoNo,
    },
    {
      input: style,
      label: "Style",
      options: [
        {
          name: "5435344",
          property: "New Group 1",
        },
      ],
      setInput: setStyle,
    },
    {
      input: part,
      label: "Part",
      options: [
        {
          name: "Front",
          property: "New Group 1",
        },
      ],
      setInput: setPart,
    },
    {
      input: color,
      label: "Color",
      options: [
        {
          name: "RED PLAID",
          property: "New Group 1",
        },
      ],
      setInput: setColor,
    },
  ];
  return (
    <>
      <div className="flex text-black border-2 justify-center border-blue-600 py-12  gap-y-4 flex-wrap lg:w-1/2 w-2/3 mx-auto px-12 ">
        <h1 className="text-4xl leading-loose text-bold">
          Bundle Card Generator
        </h1>
        {dropdownFields.map((field, index) => (
          <div className="w-full relative my-4">
            <FieldWithDropdown
              key={index}
              input={field.input}
              label={field.label}
              options={field.options}
              setInput={field.setInput}
            />
          </div>
        ))}
        {otherField.map((field, index) => (
          <div className="w-full my-4">
            <FieldWithoutDropdown
              key={index}
              input={field.input}
              label={field.label}
              setInput={field.setInput}
              inputType={field.inputType}
            />
          </div>
        ))}
        <div className="flex items-center content-center  flex-wrap gap-4">
          {sizeFields.map((field, index) => (
            <div className="relative my-4">
              <FieldWithoutDropdown
                key={index}
                input={field.input}
                label={field.label}
                setInput={field.setInput}
                inputType={field.inputType}
              />
            </div>
          ))}
        </div>
        <div className="mr-auto my-4 w-fit">
          <input
            onClick={submitHandler}
            type="submit"
            value="Submit"
            className="btn"
          />
        </div>
      </div>
      <div className="mr-auto my-8 w-fit mx-auto gap-8 text-center flex  ">
        <input
          type="submit"
          onClick={clearFields}
          value="Clear"
          className="btn"
        />
        <input type="submit" value="Print this out!" className="btn" />
      </div>
    </>
  );
}
