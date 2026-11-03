# Webstix — Gmail SMTP Contact Backend Setup Guide

This document explains how to configure and verify email delivery for the Webstix digital agency contact inquiry system using **Gmail SMTP** and **Nodemailer**.

---

## 1. Prerequisites (Google Account Setup)

Because Google deprecated "Less Secure Apps", you **must use an App Password**, not your regular Gmail account password.

### Step 1: Enable 2-Step Verification
1. Sign in to your Google Account for `hello.webstix@gmail.com`:  
   👉 [https://myaccount.google.com/](https://myaccount.google.com/)
2. Navigate to **Security** on the left menu.
3. Under "How you sign in to Google", select **2-Step Verification** and follow the prompts to enable it (SMS, Google Authenticator, or Security Key).

### Step 2: Generate a 16-Character App Password
1. Once 2-Step Verification is active, go to:  
   👉 [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)  
   *(Or search "App passwords" in the top search bar of your Google Account).*
2. Enter an app name, e.g., `Webstix Website Contact Form`.
3. Click **Create**.
4. Google will display a **16-character password** (e.g., `abcd efgh ijkl mnop`).
5. **Copy this password immediately** (you will not be able to view it again).

---

## 2. Local Environment Configuration

1. In the root directory of the project, create a file named `.env.local` (this file is already excluded in `.gitignore` and must **never** be committed to GitHub):

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello.webstix@gmail.com
SMTP_PASS=your_16_character_app_password_without_spaces
CONTACT_TO=hello.webstix@gmail.com
```

> **Note**: You can paste the 16 characters either with or without spaces (Nodemailer accepts both, but removing spaces is best practice: `abcdefghijklmnop`).

---

## 3. Verifying Email Delivery

### Option A: Run the Automated CLI Test Script
We provide a dedicated test procedure that validates the SMTP handshake and dispatches a test verification email without needing a browser:

```bash
node scripts/send-test-enquiry.mjs
```

**Expected output:**
```
✓ SMTP Transporter Verified: Connection established with Gmail SMTP servers.
✓ Test Email Dispatched Successfully!
  Message ID: <...>
  Recipient:  hello.webstix@gmail.com
```
Check the inbox of `hello.webstix@gmail.com` to see the notification.

### Option B: Test via the Live Website UI
1. Start the local server:
   ```bash
   npm run dev
   # or for production:
   npm run build && npm run start
   ```
2. Open your browser and navigate to `http://localhost:3000/contact`.
3. Fill in the form:
   - **Name**: Test Client
   - **Email**: client@example.com
   - **Project Type**: E-Commerce Storefront
   - **Description**: This is a test enquiry for Webstix digital agency.
   - Check the **Consent** checkbox.
4. Click **Submit Project Inquiry**.
5. The form will show a loading spinner and then display:
   > *"Thank you for contacting Webstix! Your enquiry has been submitted successfully."*  
   > along with a tracking reference ID (e.g., `WSX-M2X8...`).
6. Check `hello.webstix@gmail.com` for the incoming HTML email.

---

## 4. Production Hosting Configuration (Vercel / Cloud Platforms)

When deploying Webstix to production (such as on Vercel):

1. Go to your project dashboard on Vercel (or your hosting provider).
2. Navigate to **Settings** → **Environment Variables**.
3. Add the following variables:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `465`
   - `SMTP_SECURE` = `true`
   - `SMTP_USER` = `hello.webstix@gmail.com`
   - `SMTP_PASS` = *(Your 16-character Google App Password)*
   - `CONTACT_TO` = `hello.webstix@gmail.com`
4. Redeploy the project so the new environment variables take effect.

---

## 5. Security & Anti-Spam Architecture

The `/api/contact` route implements several defensive layers:
- **Zero Client Credential Leakage**: All SMTP credentials are strictly server-side (`process.env`).
- **HTML Entity Escaping**: Prevents script injection in incoming email bodies (`escapeHtml`).
- **SMTP Header Injection Protection**: Newline and carriage return characters (`\r`, `\n`) are stripped from subjects and sender names (`sanitizeHeader`).
- **Honeypot Trap**: Invisible field for bots; if filled, the submission is rejected immediately.
- **Sliding-Window Rate Limiter**: Maximum 5 submissions per 10 minutes per IP address to prevent spam flooding.
- **Payload Size Cap**: Rejects bodies exceeding 50 KB (`HTTP 413 Payload Too Large`).
- **Reply-To Mapping**: When you receive an enquiry email at `hello.webstix@gmail.com`, hitting **Reply** automatically addresses the prospective client's email.

---

## 6. Troubleshooting Common Issues

| Issue / Error | Cause | Solution |
| :--- | :--- | :--- |
| `SMTP_NOT_CONFIGURED` (503) | `SMTP_PASS` is missing or placeholder | Create `.env.local` and add your real Google App Password. |
| `535-5.7.8 Username and Password not accepted` | Used regular Gmail password instead of App Password | Generate a Google App Password from [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). |
| `ETIMEDOUT` or `ECONNREFUSED` | Port 465 blocked by local firewall | Ensure outgoing port 465 or 587 is not blocked by a corporate VPN or antivirus firewall. |
| Emails going to Spam / Junk | First-time automated emails | Open `hello.webstix@gmail.com`, check Spam folder, and click **Report not spam**. |
| Daily Sending Limit | Gmail free tier limit is 500 emails/day | Sufficient for agency inquiries. For high volume, upgrade to Google Workspace (2,000/day) or Resend/SendGrid. |
