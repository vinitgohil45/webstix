# Webstix — Websites Built for What's Next

Webstix is a high-performance digital engineering studio and agency founded by **Vinit Gohil** and **Riddhi Patthar**, delivering state-of-the-art web applications, e-commerce platforms, and real-time media systems for clients in India and internationally.

---

## 🚀 Key Technologies
- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Styling:** Modern Tailwind CSS with custom dark futuristic design system
- **Backend & APIs:** Next.js Route Handlers (`/api/contact`, `/api/github/projects`)
- **Email Delivery:** Gmail SMTP with Nodemailer, RFC validation, anti-bot honeypots, and IP rate limiting
- **Integration:** Automated GitHub repository synchronization & multi-account showcase

---

## 🛠️ Local Development

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```
Configure your Gmail SMTP credentials:
- `SMTP_USER`: `hello.webstix@gmail.com`
- `SMTP_PASS`: Your 16-character Google App Password (see [EMAIL_SETUP.md](./EMAIL_SETUP.md))

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Testing & Quality Assurance

```bash
# Run unit & integration test suite
npm test

# Run ESLint validation
npm run lint

# Compile production build
npm run build
```

---

## 🌐 Founders & Engineering Leadership
- **Vinit Gohil** — CEO & Lead Developer ([@vinitgohil45](https://github.com/vinitgohil45))
- **Riddhi Patthar** — CEO & Lead Developer ([@riddhipatthar](https://github.com/riddhipatthar))

---

## 📬 Contact & Inquiries
- **Email:** [hello.webstix@gmail.com](mailto:hello.webstix@gmail.com)
- **WhatsApp:** [+91 9136730898](https://wa.me/919136730898)
- **Website:** [https://webstix.studio](https://webstix.studio)
