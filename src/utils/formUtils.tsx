import {
  BundleFormDataProps,
  InfoFieldsProps,
  pdfCodeData,
  QrData,
  sizes,
  SizesFieldProps,
} from "../types/bundlerTypes";
const sizesList: Array<sizes> = [
  "S Size",
  "M Size",
  "L Size",
  "XL Size",
  "2XL Size",
  "3XL Size",
];

export const getQrCodeUrls = ({
  qrCodeDatas,
  setQrCodes,
}: {
  qrCodeDatas: Array<QrData>;
  setQrCodes: (value: string[]) => void;
}) => {
  if (qrCodeDatas.length > 0) {
    const canvasRefs =
      document.querySelectorAll<HTMLCanvasElement>(".qr-code-canvas");
    const interval = setInterval(() => {
      const allImagesGenerated = Array.from(canvasRefs).every(
        (canvas) => canvas.toDataURL().length > 0
      );
      if (allImagesGenerated) {
        const generatedCodes: Array<string> = Array.from(canvasRefs).map(
          (canvas) => canvas.toDataURL("image/jpg", 1)
        );
        setQrCodes(generatedCodes);
        clearInterval(interval);
      }
    }, 100);
  }
};

export const generateQrData = ({
  data,
}: {
  data: BundleFormDataProps;
}): [QrData[], pdfCodeData[]] => {
  const newQrDatas: QrData[] = [];
  const newPdfCodesDatas: pdfCodeData[] = [];

  for (const size of sizesList) {
    const qrCodesLen = Math.ceil(parseFloat(data[size]) / 10);
    if (qrCodesLen > 0) {
      for (let i = 0; i < qrCodesLen; i++) {
        const newPdfCodeData: pdfCodeData = {
          buyer: data["buyer"],
          po: data["PO No"],
          style: data["style"],
          color: data["color"],
          shade: data["shade"],
          cutNo: data["Cutting Number"],
          part: data["part"],
          size: size.replace(" Size", ""),
          bunNo: i + 1,
          start: 10 * i + 1,
          company: data["company"],
          end: qrCodesLen - 1 === i ? parseFloat(data[size]) : 10 * (i + 1),
        };
        newPdfCodesDatas.push(newPdfCodeData);
        newQrDatas.push({
          ...newPdfCodeData,
          qrString: JSON.stringify(newPdfCodeData),
        });
      }
    }
  }
  return [newQrDatas, newPdfCodesDatas];
};

export const hasEmptyFields = ({
  sizesFields,
  infoFields,
}: {
  sizesFields: SizesFieldProps;
  infoFields: InfoFieldsProps;
}): boolean => {
  const emptyFields = Object.entries(infoFields)
    .filter(([_, value]) => !value) // Filter fields with empty values
    .map(([key]) => key); // Get only the keys (field names)

  const sizeGiven = Object.values(sizesFields).join("");
  if (emptyFields.length > 0) {
    alert(`The following fields are not filled: ${emptyFields.join(", ")}`);
    return true;
  } else if (sizeGiven === "") {
    alert(`No Size Given`);
    return true;
  } else {
    return false;
  }
};
