import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { pdfCodeData } from "../../types/bundlerTypes";
import PdfQrCodeComponent from "./pdfQrCodeComponent";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    flexWrap: "wrap",
    gap: ".12in",
    margin: 10,
  },
});

export default function PdfComponent({
  pdfDatas,
}: {
  pdfDatas: Array<pdfCodeData>;
}) {
  return (
    <Document>
      <Page size="A4" dpi={72} style={styles.page}>
        {pdfDatas.length > 0 &&
          pdfDatas.map((pdfData) => <PdfQrCodeComponent pdfData={pdfData} />)}
      </Page>
    </Document>
  );
}
