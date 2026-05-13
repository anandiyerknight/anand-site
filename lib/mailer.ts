import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendBriefNotification(data: {
  name: string;
  email: string;
  company: string;
  stage: string | null;
  brief: string;
}) {
  if (!process.env.GMAIL_USER || !process.env.NOTIFICATION_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
    console.log("[MAILER] Skipped (not configured)");
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🚀 New Brief: ${data.company}`,
      html: `
        <h2>New System Build Brief</h2>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Stage:</strong> ${data.stage || "—"}</p>
        <p><strong>Contact:</strong> ${data.name} (${data.email})</p>
        <hr />
        <h3>The Brief</h3>
        <p>${data.brief.replace(/\n/g, "<br />")}</p>
        <hr />
        <p><small>Check your Google Sheet for the full audit log.</small></p>
      `,
    });

    console.log("[MAILER] Email sent successfully");
  } catch (error) {
    console.error("[MAILER] Failed to send email:", error);
    throw error;
  }
}
