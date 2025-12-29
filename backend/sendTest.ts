import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER || "";
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS || "";
  const host =
    process.env.EMAIL_HOST || process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT) || 465;
  const secure = port === 465;
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS?.length);

  console.log(
    "SMTP test config -> host:",
    host,
    "port:",
    port,
    "userPresent:",
    !!user,
    "passLen:",
    pass.length
  );

  if (!user || !pass) {
    console.error("Missing EMAIL_USER or EMAIL_PASS in env. Please set them.");
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user: user || "apikey", pass },
    ...(port === 587 ? { requireTLS: true } : {}),
    logger: true,
    debug: true,
  });

  try {
    await transporter.verify();
    console.log("SMTP verify OK");

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || user,
      to: process.env.FROM_EMAIL || user,
      subject: "SMTP test",
      text: "SMTP test body",
    });
    console.log("send ok", info);
  } catch (e: any) {
    console.error("SMTP test failed:", e?.message || e);
    if (!process.env.EMAIL_USER)
      console.info("Hint: set EMAIL_USER and EMAIL_PASS in .env");
  }
})();
