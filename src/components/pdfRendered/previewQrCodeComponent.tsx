import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { pdfCodeData } from "../../types/bundlerTypes";

export default function PreviewQrCodeComponent({
  pdfData,
}: {
  pdfData: pdfCodeData;
}) {
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
  console.log(dataUrl);

  const styles = StyleSheet.create({
    qrBox: {
      display: "flex",
      flexDirection: "row",
      textAlign: "left",
      fontWeight: 500,

      color: "black",
      flexWrap: "wrap",
      paddingTop: 0,
      paddingBottom: 0,
      width: "185px",
      justifyContent: "center",
      borderWidth: 1,
      borderBottom: 0,
      borderColor: "grey",
      borderStyle: "solid",
    },
    hero: {
      flexDirection: "row",
      display: "flex",

      gap: 0,
      width: "100%",
      height: "75px",
      borderBottom: 1,
      borderColor: "grey",
      borderStyle: "solid",
    },
    heroImageBox: {
      width: "50%",
      flexDirection: "row",
      display: "flex",

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
      borderStyle: "solid",
      flexDirection: "column",
      display: "flex",
    },
    heroTitle: {
      fontSize: 7,
      padding: 2,
    },
    heroTextView: {
      fontSize: 6,
      flexDirection: "row",
      display: "flex",

      borderBottom: 1,
      borderColor: "grey",
      borderStyle: "solid",
      flexGrow: 1,
      alignItems: "center",
      height: "100%",
    },
    heroTextShort: {
      paddingLeft: 2,
      borderRight: 1,
      borderColor: "grey",
      borderStyle: "solid",
      height: "100%",
      flexDirection: "row",
      display: "flex",

      alignItems: "center",
      //   flexGrow: 0.5,
      width: 21,
    },
    heroTextLong: {
      flexGrow: 1,
      borderColor: "grey",
      borderStyle: "solid",
      paddingHorizontal: 0.05 * 100,
      fontWeight: 600,
      paddingLeft: 5,
    },
    qrImage: {
      width: 0.65 * 100,
      height: 0.65 * 100,
      objectFit: "cover",
    },
    shortBox: {
      fontSize: 0.06 * 100,
      borderRight: 1,
      borderColor: "grey",
      borderStyle: "solid",
      padding: 2,
      margin: 0,
      flex: 1,
      //   width: "10%",
    },
    shortTextBox: {
      fontSize: 0.06 * 100,
      borderRight: 1,
      borderColor: "grey",
      borderStyle: "solid",
      padding: 2,
      paddingRight: 11,
      margin: 0,
    },
    longText: {},
    section: {
      flexDirection: "row",
      display: "flex",

      gap: 0,
      padding: 0,
      width: 2 * 100,
      alignContent: "center",
      borderBottom: 1,
      borderColor: "grey",
      borderStyle: "solid",
    },
    title: {
      fontSize: 5.5,
      borderBottom: 1,
      borderTop: 0,
      borderColor: "grey",
      borderStyle: "solid",
      padding: 3,
      margin: 0,
      color: "black",
      width: "100%",
    },
    lastBox: {
      width: 0.35 * 100,
      fontSize: 0.06 * 100,
      borderColor: "grey",
      borderStyle: "solid",
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
    <div style={styles.qrBox}>
      <div style={styles.hero}>
        <div style={styles.heroTextBox}>
          <div style={styles.heroTextView}>
            <div style={styles.heroTitle}>{company}</div>
          </div>
          <div style={styles.heroTextView}>
            <div style={styles.heroTextShort}>
              <div>BY</div>
            </div>
            <div style={styles.heroTextLong}>{buyer}</div>
          </div>
          <div style={styles.heroTextView}>
            <div style={styles.heroTextShort}>
              <div>PO</div>
            </div>
            <div style={styles.heroTextLong}>{po}</div>
          </div>
          <div style={{ ...styles.heroTextView, borderBottom: 0 }}>
            <div style={styles.heroTextShort}>
              <div>ST</div>
            </div>
            <div style={styles.heroTextLong}>{pdfData.style}</div>
          </div>
        </div>
        <div style={styles.heroImageBox}>
          {dataUrl && <img style={styles.qrImage} src={dataUrl || ""} />}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.shortTextBox}>
          <div>PT</div>
        </div>
        <div style={styles.shortBox}>
          <div style={{ fontWeight: 600 }}>{part}</div>
        </div>
        <div style={styles.shortTextBox}>
          <div>CL</div>
        </div>
        <div style={styles.shortBox}>
          <div style={{ fontWeight: 600 }}>{color}</div>
        </div>
        <div style={styles.shortTextBox}>
          <div>SD</div>
        </div>
        <div style={styles.lastBox}>
          <div style={{ fontWeight: 600 }}>{shade}</div>
        </div>
      </div>
      <div
        style={{
          ...styles.section,
          backgroundColor: "grey",
          color: "white",
          borderColor: "white",
          border: 0,
        }}
      >
        <div style={{ ...styles.shortBox, borderColor: "white" }}>
          <div>SZ</div>
        </div>
        <div style={{ ...styles.shortBox, borderColor: "white" }}>
          <div style={{ fontWeight: 600 }}>{size}</div>
        </div>
        <div style={{ ...styles.shortBox, borderColor: "white" }}>
          <div>C</div>
        </div>
        <div style={{ ...styles.shortBox, borderColor: "white" }}>
          <div style={{ fontWeight: 600 }}>{cutNo}</div>
        </div>
        <div style={{ ...styles.shortBox, borderColor: "white" }}>
          <div>BN</div>
        </div>
        <div style={{ ...styles.shortBox, borderColor: "white" }}>
          <div style={{ fontWeight: 600 }}>{bunNo}</div>
        </div>
        <div style={{ ...styles.shortBox, borderColor: "white" }}>
          <div>SR</div>
        </div>
        <div style={styles.lastBox}>
          <div style={{ fontWeight: 600 }}>
            {start}~{end}
          </div>
        </div>
      </div>

      <div
        style={{
          flexDirection: "column",
          display: "flex",

          width: "100%",
          borderTop: 1,
          borderColor: "grey",
          borderStyle: "solid",
        }}
      >
        <div style={styles.title}>
          <div style={{}}>{formattedTime}, by Panacea Private Consulting</div>
        </div>
        <div style={styles.title}>
          <div style={{ fontWeight: 600, textAlign: "center" }}> Replace </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.shortTextBox}>
          <div>ST</div>
        </div>
        <div style={styles.shortBox}>
          <div style={{ fontWeight: 600 }}>{pdfData.style}</div>
        </div>
        <div style={styles.shortTextBox}>
          <div>PT</div>
        </div>
        <div style={styles.shortBox}>
          <div style={{ fontWeight: 600 }}>{part}</div>
        </div>
        <div style={styles.shortTextBox}>
          <div>SD</div>
        </div>
        <div style={styles.lastBox}>
          <div style={{ fontWeight: 600 }}>{shade}</div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.shortBox}>
          <div>SZ</div>
        </div>
        <div style={styles.shortBox}>
          <div style={{ fontWeight: 600 }}>{size}</div>
        </div>
        <div style={styles.shortBox}>
          <div>C</div>
        </div>
        <div style={styles.shortBox}>
          <div style={{ fontWeight: 600 }}>{cutNo}</div>
        </div>
        <div style={styles.shortBox}>
          <div>BN</div>
        </div>
        <div style={styles.shortBox}>
          <div style={{ fontWeight: 600 }}>{bunNo}</div>
        </div>
        <div style={styles.shortBox}>
          <div>PCS</div>
        </div>
        <div style={styles.lastBox}>
          <div></div>
        </div>
      </div>
    </div>
  );
}
