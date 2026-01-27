import nodemailer from "nodemailer";

let transporter; // lazy-loaded

const getTransporter = () => {
  if (!transporter) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials are missing in environment variables");
    }

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  return transporter;
};

export const sendMail = async ({ to, subject, html }) => {
  const mailer = getTransporter();

  return mailer.sendMail({
    from: `"Smart Campus Placement" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};
