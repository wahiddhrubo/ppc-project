import { useEffect, useRef, useState } from "react";
import FieldWithDropdown, {
  DropDownFieldProps,
} from "../components/form/fieldWithDropdown";
import FieldWithoutDropdown, {
  FieldProps,
} from "../components/form/fieldWithoutDropdown";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  BundleFormDataProps,
  pdfCodeData,
  QrData,
} from "../types/bundlerTypes";
import { generateQrData, hasEmptyFields } from "../utils/formUtils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfComponent from "../components/pdfRendered/pdf";
import PreviewQrCodeComponent from "../components/pdfRendered/previewQrCodeComponent";

export default function Form() {
  const navigate = useNavigate();
  const [navigatePage, setNavigatePage] = useState(false);
  const qrCodeCanvas = useRef<HTMLCanvasElement>(null);

  const [pdfCodesDatas, setPdfCodesDatas] = useState<Array<pdfCodeData>>([]);
  const [qrCodes, setQrCodes] = useState<string[]>([]);

  const [qrCodeDatas, setQrCodeDatas] = useState<Array<QrData>>([]);

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
  const linkGenerated = pdfCodesDatas.filter((pdf) => pdf?.dataUrl).length > 0;

  const infoFields = {
    company: company,
    buyer: buyer,
    color: color,
    "PO No": poNo,
    style: style,
    shade: shade,
    "Cutting Number": cuttingNumber,
    part: part,
  };

  const sizesFields = {
    "S Size": sSize,
    "M Size": mSize,
    "L Size": lSize,
    "XL Size": xLSize,
    "2XL Size": xL2Size,
    "3XL Size": xL3Size,
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

  // GENERATE DATA FOR THE QR CODES FROM THE FORM
  const submitHandler = () => {
    const emptyfields = hasEmptyFields({ infoFields, sizesFields });
    const data: BundleFormDataProps = Object.assign(
      {},
      infoFields,
      sizesFields
    );

    if (!emptyfields) {
      const [newQrDatas, newPdfCodesDatas] = generateQrData({ data });

      setQrCodeDatas(newQrDatas);
      setPdfCodesDatas(newPdfCodesDatas);
    }
  };

  // GENERATE URL OF THE QR CODES
  useEffect(() => {
    if (qrCodeDatas.length > 0) {
      const canvasRefs =
        document.querySelectorAll<HTMLCanvasElement>(".qr-code-canvas");
      const interval = setInterval(() => {
        const allImagesGenerated = Array.from(canvasRefs).every(
          (canvas) => canvas.toDataURL().length > 0
        );
        if (allImagesGenerated) {
          const generatedCodes = Array.from(canvasRefs).map((canvas) =>
            canvas.toDataURL("image/jpg", 1)
          );
          setQrCodes(generatedCodes);
          clearInterval(interval);
        }
      }, 100);
    }
  }, [qrCodeDatas]);

  // ASSIGN THE  QR CODES URL TO THE PDFDATA
  useEffect(() => {
    if (qrCodes.length > 0) {
      setPdfCodesDatas((prevPdfCodesDatas) =>
        prevPdfCodesDatas.map((obj, index) => ({
          ...obj,
          dataUrl: qrCodes[index] || "",
        }))
      );
    }
  }, [qrCodes]);

  useEffect(() => {
    const test = pdfCodesDatas.filter((pdf) => pdf?.dataUrl);

    if (navigatePage && qrCodes.length > 0 && test.length > 0) {
      navigate("/pdf-renderer", { state: pdfCodesDatas });
      console.log(pdfCodesDatas);
    }
  }, [navigatePage, qrCodes, pdfCodesDatas]);

  return (
    <div className="py-10">
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
        {linkGenerated ? (
          <PDFDownloadLink
            document={<PdfComponent pdfDatas={pdfCodesDatas} />}
            fileName="Bundle.pdf"
          >
            <input type="submit" value="Download Pdf" className="btn" />
          </PDFDownloadLink>
        ) : (
          <button
            className="btn btn-disabled !text-black"
            tabIndex={-1}
            role="button"
            aria-disabled="true"
          >
            Download Pdf
          </button>
        )}
        <input
          onClick={() => setNavigatePage(true)}
          type="submit"
          value="Print this out!"
          className="btn"
        />
      </div>
      <div className="flex justify-center flex-wrap w-fit mx-auto gap-4">
        {pdfCodesDatas.map((qrData, index) => (
          <PreviewQrCodeComponent pdfData={qrData} />
        ))}
      </div>
      <div className="hidden">
        {qrCodeDatas.map((qrData, index) => (
          <QRCodeCanvas
            key={index}
            size={125}
            className="qr-code-canvas w-[125px] h-[125px]" //   id="qrcode-canvas"
            ref={qrCodeCanvas}
            value={qrData.qrString}
          />
        ))}
      </div>
    </div>
  );
}
