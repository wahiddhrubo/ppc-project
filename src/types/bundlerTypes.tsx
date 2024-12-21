export type pdfCodeData = {
  dataUrl?: string;
  buyer: string;
  po: string;
  style: string;
  color: string;
  shade: string;
  cutNo: string;
  size: string;
  bunNo: number;
  start: number;
  end: number;
  part: string;
  company: string;
};

export type QrData = {
  buyer: string;
  qrString: string;
  po: string;
  style: string;
  color: string;
  shade: string;
  cutNo: string;
  size: string;
  bunNo: number;
  start: number;
  end: number;
  part: string;
  company: string;
};
export type sizes =
  | "S Size"
  | "M Size"
  | "L Size"
  | "XL Size"
  | "2XL Size"
  | "3XL Size";

export type BundleFormDataProps = {
  company: string;
  buyer: string;
  color: string;
  "PO No": string;
  style: string;
  shade: string;
  "Cutting Number": string;
  part: string;
  "S Size": string;
  "M Size": string;
  "L Size": string;
  "XL Size": string;
  "2XL Size": string;
  "3XL Size": string;
};

export type SizesFieldProps = {
  "S Size": string;
  "M Size": string;
  "L Size": string;
  "XL Size": string;
  "2XL Size": string;
  "3XL Size": string;
};

export type InfoFieldsProps = {
  company: string;
  buyer: string;
  color: string;
  "PO No": string;
  style: string;
  shade: string;
  "Cutting Number": string;
  part: string;
};
