export async function addBriefToSheet(data: {
  name: string;
  email: string;
  company: string;
  stage: string | null;
  brief: string;
  timestamp: string;
}) {
  if (!process.env.GOOGLE_SCRIPT_URL) {
    console.log("[SHEETS] Skipped (GOOGLE_SCRIPT_URL not configured)");
    return;
  }

  const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      timestamp: data.timestamp,
      name: data.name,
      email: data.email,
      company: data.company,
      stage: data.stage || "",
      brief: data.brief,
    }),
  });

  if (!res.ok) {
    throw new Error(`[SHEETS] Apps Script failed with ${res.status}`);
  }

  console.log("[SHEETS] Row added successfully");
}
