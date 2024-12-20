import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { BundleFormDataProps } from "./form";
import { QRCodeCanvas } from "qrcode.react";

type pdfCodeData = {
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
};

type QrData = {
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
};
type sizes =
  | "S Size"
  | "M Size"
  | "L Size"
  | "XL Size"
  | "2XL Size"
  | "3XL Size";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    flexWrap: "wrap",
    gap: ".3in",
    margin: 10,
  },
  qrBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: ".7in",
    paddingBottom: ".1in",
    borderWidth: 2,
    borderColor: "blue",
    width: "1.5in",
    justifyContent: "center",
  },
  qrText: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  qrTextBox: {
    marginBottom: ".3in",
    textAlign: "left",
    width: "1.3in",
  },
  qrImage: {
    width: "1.3in",
    height: "1.3in",
    objectFit: "cover",
  },
});

// Create Document Component
const QRCodeComponent = ({ pdfDatas }: { pdfDatas: Array<pdfCodeData> }) => {
  return (
    <Document>
      <Page size="A4" dpi={72} style={styles.page}>
        {pdfDatas.map((pdfData) => (
          <View style={styles.qrBox}>
            <View style={styles.qrTextBox}>
              <Text style={styles.qrText}>Cut no: {pdfData.cutNo} </Text>
              <Text style={styles.qrText}>Size: {pdfData.size} </Text>
              <Text style={styles.qrText}>Bundle no: {pdfData.bunNo} </Text>
              <Text style={styles.qrText}>
                {pdfData.start} - {pdfData.end}{" "}
              </Text>
            </View>
            {pdfData.dataUrl && (
              <Image style={styles.qrImage} source={pdfData.dataUrl || ""} />
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default function PdfRenderer() {
  const location = useLocation();
  const data: BundleFormDataProps = location.state;
  const sizes: Array<sizes> = [
    "S Size",
    "M Size",
    "L Size",
    "XL Size",
    "2XL Size",
    "3XL Size",
  ];
  const [PdfCodesDatas, setPdfCodesDatas] = useState<Array<pdfCodeData>>([]);
  const [qrCodeDatas, setQrCodeDatas] = useState<Array<QrData>>([]);

  useEffect(() => {
    if (data.buyer) {
      const newQrDatas: QrData[] = [];
      const newPdfCodesDatas: pdfCodeData[] = [];

      for (const size of sizes) {
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
              size: size.replace(" Size", ""),
              bunNo: i + 1,
              start: 10 * i + 1,
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

      setQrCodeDatas(newQrDatas);
      setPdfCodesDatas(newPdfCodesDatas);
    }
  }, [data]);
  const [qrCodes, setQrCodes] = useState<string[]>([]);
  const qrCodeCanvas = useRef<HTMLCanvasElement>(null);

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

  return (
    <>
      <div className="hidden">
        {qrCodeDatas.map((qrData, index) => (
          <QRCodeCanvas
            key={index}
            size={350}
            className="qr-code-canvas" //   id="qrcode-canvas"
            ref={qrCodeCanvas}
            value={qrData.qrString}
          />
        ))}
      </div>
      {qrCodes.length > 0 && (
        <PDFViewer style={{ width: "100%", height: "600px" }}>
          <QRCodeComponent pdfDatas={PdfCodesDatas} />
        </PDFViewer>
      )}
    </>
  );
}
