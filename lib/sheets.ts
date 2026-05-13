import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

let sheetDoc: GoogleSpreadsheet | null = null;

async function getSheet() {
  if (!sheetDoc) {
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
      : null;

    if (!serviceAccountKey || !process.env.GOOGLE_SHEET_ID) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_SHEET_ID not configured");
    }

    const auth = new JWT({
      email: serviceAccountKey.client_email,
      key: serviceAccountKey.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    sheetDoc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
    await sheetDoc.loadInfo();
  }
  return sheetDoc;
}

export async function addBriefToSheet(data: {
  name: string;
  email: string;
  company: string;
  stage: string | null;
  brief: string;
  timestamp: string;
}) {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.log("[SHEETS] Skipped (not configured)");
    return;
  }

  try {
    const doc = await getSheet();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRows([
      {
        timestamp: data.timestamp,
        name: data.name,
        email: data.email,
        company: data.company,
        stage: data.stage || "—",
        brief: data.brief,
      },
    ]);

    console.log("[SHEETS] Row added successfully");
  } catch (error) {
    console.error("[SHEETS] Failed to add row:", error);
    throw error;
  }
}
