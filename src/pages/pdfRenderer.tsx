import { useLocation } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import PdfComponent from "../components/pdfRendered/pdf";
import { pdfCodeData } from "../types/bundlerTypes";

export default function PdfRenderer() {
  const location = useLocation();
  const pdfCodeDatas: Array<pdfCodeData> = location.state;
  return (
    <>
      <div className="hidden"></div>
      {pdfCodeDatas && (
        <PDFViewer style={{ width: "100%", height: "600px" }}>
          <PdfComponent pdfDatas={pdfCodeDatas} />
        </PDFViewer>
      )}
    </>
  );
}
