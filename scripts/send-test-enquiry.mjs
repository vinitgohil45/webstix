import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Load .env.local if present
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.substring(0, eqIdx).trim();
      const val = trimmed.substring(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT) || 465;
const secure = process.env.SMTP_SECURE !== "false";
const user = process.env.SMTP_USER || "hello.webstix@gmail.com";
const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();
const recipient = process.env.CONTACT_TO || "hello.webstix@gmail.com";

console.log("===================================================================");
console.log("  WEBSTIX STUDIO — GMAIL SMTP TEST PROCEDURE");
console.log("===================================================================");
console.log(`SMTP Host:    ${host}`);
console.log(`SMTP Port:    ${port}`);
console.log(`SMTP Secure:  ${secure}`);
console.log(`SMTP User:    ${user}`);
console.log(`Recipient:    ${recipient}`);

if (!pass || pass === "YOUR_GOOGLE_APP_PASSWORD" || pass === "your_app_password_here") {
  console.log("\n❌ STATUS: SMTP_PASS is NOT configured in .env.local.");
  console.log("Please create a .env.local file in the project root with your 16-character Google App Password:");
  console.log(`
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=465
  SMTP_SECURE=true
  SMTP_USER=hello.webstix@gmail.com
  SMTP_PASS=abcd efgh ijkl mnop
  CONTACT_TO=hello.webstix@gmail.com
  `);
  console.log("See EMAIL_SETUP.md for complete step-by-step instructions.\n");
  process.exit(1);
}

console.log("\nAttempting SMTP connection and verification...");

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

try {
  await transporter.verify();
  console.log("✓ SMTP Transporter Verified: Connection established with Gmail SMTP servers.");

  const testRef = "WSX-TEST-" + Date.now().toString(36).toUpperCase();
  const mailOptions = {
    from: `"Webstix Studio Test" <${user}>`,
    to: recipient,
    replyTo: `"Vinit & Riddhi" <hello.webstix@gmail.com>`,
    subject: `New Webstix Enquiry — Test Verification [${testRef}]`,
    text: `Webstix Email Backend Verification\n\nReference: ${testRef}\nTimestamp: ${new Date().toISOString()}\n\nThis is an automated test verification proving that Nodemailer + Gmail SMTP is configured and operational for Webstix Studio.`,
    html: `
      <div style="font-family: sans-serif; background-color: #0B1020; color: #F8FAFC; padding: 24px; border-radius: 12px; max-width: 500px;">
        <h2 style="color: #60A5FA; margin-top: 0;">Webstix Email Backend Verified</h2>
        <p>Reference: <strong>${testRef}</strong></p>
        <p>This email confirms that the Gmail SMTP transport is operational and sending project enquiries directly to <strong>${recipient}</strong>.</p>
        <hr style="border: 0; border-top: 1px solid #29324B; margin: 16px 0;" />
        <p style="font-size: 12px; color: #A7B0C4;">Webstix Digital Studio • hello.webstix@gmail.com</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✓ Test Email Dispatched Successfully!`);
  console.log(`  Message ID: ${info.messageId}`);
  console.log(`  Recipient:  ${recipient}`);
  console.log(`\nPlease check your inbox at ${recipient} to confirm arrival.\n`);
} catch (error) {
  console.error("\n❌ Delivery test failed with error:");
  console.error(error.message || error);
  console.log("\nCheck EMAIL_SETUP.md troubleshooting section for common fixes.\n");
  process.exit(1);
}
