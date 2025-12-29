import nodemailer from "nodemailer";

const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = process.env.EMAIL_PORT
  ? parseInt(process.env.EMAIL_PORT)
  : undefined;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FROM_EMAIL =
  process.env.FROM_EMAIL || process.env.EMAIL_USER || "no-reply@example.com";

let transporter: nodemailer.Transporter | null = null;
let usingEthereal = false;

async function init() {
  // Prefer Gmail-like EMAIL_USER / EMAIL_PASS
  if (EMAIL_USER && EMAIL_PASS) {
    const port = EMAIL_PORT ?? 465; // default to 465 for Gmail
    const secure = port === 465;

    transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port,
      secure,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      ...(port === 587 ? { requireTLS: true } : {}),
    });

    try {
      await transporter.verify();
      console.info("✅ Email transport verified using EMAIL_USER");
      return;
    } catch (err: any) {
      console.error("⚠️ EMAIL transport verify failed:", err?.message || err);
      transporter = null;
    }
  }
  // Fallback to Ethereal
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  usingEthereal = true;
  try {
    await transporter.verify();
    console.warn(
      "⚠️ Using Ethereal test account. Emails will not be delivered to real inboxes. Preview URLs will be logged."
    );
  } catch (err: any) {
    console.error("Ethereal verify failed:", err?.message || err);
  }
}

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  if (!transporter) await init();
  if (!transporter) throw new Error("No email transport available");

  const info = await transporter.sendMail({
    from: FROM_EMAIL,
    to ,
    subject,
    text,
    html,
  });

  if (usingEthereal) {
    // @ts-ignore
    console.info("Ethereal preview URL:", nodemailer.getTestMessageUrl(info));
  }

  return info;
}

export async function sendTestEmail(to: string) {
  try {
    const info = await sendEmail(
      to,
      "Test email",
      "This is a test message from your app"
    );
    return { ok: true, info };
  } catch (err: any) {
    return { ok: false, error: err?.message || String(err) };
  }
}

export default sendEmail;
