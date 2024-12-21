import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { pdfCodeData } from "../../types/bundlerTypes";

export default function PdfQrCodeComponent({
  pdfData,
}: {
  pdfData: pdfCodeData;
}) {
  console.log(pdfData);
  const {
    cutNo,
    part,
    size,
    bunNo,
    start,
    end,
    dataUrl,
    buyer,
    color,
    po,
    shade,
    company,
  } = pdfData;

  const styles = StyleSheet.create({
    qrBox: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingTop: 0,
      paddingBottom: 0,
      width: "1.9in",
      justifyContent: "center",
      borderWidth: 1,
      borderBottom: 0,
      borderColor: "grey",
    },
    hero: {
      flexDirection: "row",
      gap: 0,
      width: "100%",
      height: ".75in",
      borderBottom: 1,
      borderColor: "grey",
    },
    heroImageBox: {
      width: "50%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    heroImage: {},
    heroTextBox: {
      width: "50%",
      fontSize: 6,
      borderRight: 1,
      borderColor: "grey",
      flexDirection: "column",
    },
    heroTitle: {
      fontSize: 7,
      padding: 2,
    },
    heroTextView: {
      fontSize: 6,
      flexDirection: "row",
      borderBottom: 1,
      borderColor: "grey",
      flexGrow: 1,
      alignItems: "center",
      height: "100%",
    },
    heroTextShort: {
      paddingLeft: 2,
      borderRight: 1,
      borderColor: "grey",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      //   flexGrow: 0.5,
      width: 15.5,
    },
    heroTextLong: {
      flexGrow: 1,
      borderColor: "grey",
      paddingHorizontal: ".05in",
      fontFamily: "Helvetica-Bold",
    },
    qrImage: {
      width: ".65in",
      height: ".65in",
      objectFit: "cover",
    },
    shortBox: {
      fontSize: ".06in",
      borderRight: 1,
      borderColor: "grey",
      padding: 2,
      margin: 0,
      flex: 1,
      //   width: "10%",
    },
    shortTextBox: {
      fontSize: ".06in",
      borderRight: 1,
      borderColor: "grey",
      padding: 2,
      paddingRight: 7,
      margin: 0,
    },
    longText: {},
    section: {
      flexDirection: "row",
      gap: 0,
      padding: 0,
      width: "2in",
      alignContent: "center",
      borderBottom: 1,
      borderColor: "grey",
    },
    title: {
      fontSize: 5.5,
      borderBottom: 1,
      borderTop: 0,
      borderColor: "grey",
      padding: 3,
      margin: 0,
      color: "black",
      width: "100%",
    },
    lastBox: {
      width: ".35in",
      fontSize: ".06in",
      borderColor: "grey",
      padding: 2,
      paddingRight: 9,
      margin: 0,
    },
  });
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = now.getFullYear();

  const formattedTime = `${hours}:${minutes}, ${day}-${month}-${year}`;

  return (
    <View style={styles.qrBox}>
      <View style={styles.hero}>
        <View style={styles.heroTextBox}>
          <View style={styles.heroTextView}>
            <Text style={styles.heroTitle}>{company}</Text>
          </View>
          <View style={styles.heroTextView}>
            <View style={styles.heroTextShort}>
              <Text>BY</Text>
            </View>
            <Text style={styles.heroTextLong}>{buyer}</Text>
          </View>
          <View style={styles.heroTextView}>
            <View style={styles.heroTextShort}>
              <Text>PO</Text>
            </View>
            <Text style={styles.heroTextLong}>{po}</Text>
          </View>
          <View style={{ ...styles.heroTextView, borderBottom: 0 }}>
            <View style={styles.heroTextShort}>
              <Text>ST</Text>
            </View>
            <Text style={styles.heroTextLong}>{pdfData.style}</Text>
          </View>
        </View>
        <View style={styles.heroImageBox}>
          {dataUrl && <Image style={styles.qrImage} source={dataUrl || ""} />}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.shortTextBox}>
          <Text>PT</Text>
        </View>
        <View style={styles.shortBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{part}</Text>
        </View>
        <View style={styles.shortTextBox}>
          <Text>CL</Text>
        </View>
        <View style={styles.shortBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{color}</Text>
        </View>
        <View style={styles.shortTextBox}>
          <Text>SD</Text>
        </View>
        <View style={styles.lastBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{shade}</Text>
        </View>
      </View>
      <View
        style={{
          ...styles.section,
          backgroundColor: "grey",
          color: "white",
          borderColor: "white",
          border: 0,
        }}
      >
        <View style={{ ...styles.shortBox, borderColor: "white" }}>
          <Text>SZ</Text>
        </View>
        <View style={{ ...styles.shortBox, borderColor: "white" }}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{size}</Text>
        </View>
        <View style={{ ...styles.shortBox, borderColor: "white" }}>
          <Text>C</Text>
        </View>
        <View style={{ ...styles.shortBox, borderColor: "white" }}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{cutNo}</Text>
        </View>
        <View style={{ ...styles.shortBox, borderColor: "white" }}>
          <Text>BN</Text>
        </View>
        <View style={{ ...styles.shortBox, borderColor: "white" }}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{bunNo}</Text>
        </View>
        <View style={{ ...styles.shortBox, borderColor: "white" }}>
          <Text>SR</Text>
        </View>
        <View style={styles.lastBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>
            {start}~{end}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          width: "100%",
          borderTop: 1,
          borderColor: "grey",
        }}
      >
        <View style={styles.title}>
          <Text style={{}}>{formattedTime}, by Panacea Private Consulting</Text>
        </View>
        <View style={styles.title}>
          <Text style={{ fontFamily: "Helvetica-Bold", textAlign: "center" }}>
            {" "}
            Replace{" "}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.shortTextBox}>
          <Text>ST</Text>
        </View>
        <View style={styles.shortBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{pdfData.style}</Text>
        </View>
        <View style={styles.shortTextBox}>
          <Text>PT</Text>
        </View>
        <View style={styles.shortBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{part}</Text>
        </View>
        <View style={styles.shortTextBox}>
          <Text>SD</Text>
        </View>
        <View style={styles.lastBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{shade}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.shortBox}>
          <Text>SZ</Text>
        </View>
        <View style={styles.shortBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{size}</Text>
        </View>
        <View style={styles.shortBox}>
          <Text>C</Text>
        </View>
        <View style={styles.shortBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{cutNo}</Text>
        </View>
        <View style={styles.shortBox}>
          <Text>BN</Text>
        </View>
        <View style={styles.shortBox}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{bunNo}</Text>
        </View>
        <View style={styles.shortBox}>
          <Text>PCS</Text>
        </View>
        <View style={styles.lastBox}>
          <Text></Text>
        </View>
      </View>
    </View>
  );
}
