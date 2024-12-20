import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import { pdfCodeData } from "../../types/bundlerTypes";

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

export default function PdfComponent({
  pdfDatas,
}: {
  pdfDatas: Array<pdfCodeData>;
}) {
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
}
